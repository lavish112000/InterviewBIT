from fastapi import FastAPI, Depends, Query, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
import models
import auth
from database import SessionLocal, engine 

# Create DB tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Equal Collective Prep Platform API")

# OAuth2 Scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Pydantic Schemas
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class ExecuteRequest(BaseModel):
    code: str
    language: str = "python"
    problem_id: Optional[int] = None

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = auth.jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except auth.JWTError:
        raise credentials_exception
    user = db.query(models.User).filter(models.User.username == username).first()
    if user is None:
        raise credentials_exception
    return user

# CORS Setup
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/register", response_model=Token)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(email=user.email, username=user.username, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token = auth.create_access_token(data={"sub": new_user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me")
async def read_users_me(current_user: models.User = Depends(get_current_user)):
    return {"username": current_user.username, "email": current_user.email}

@app.post("/execute")
async def execute_code(request: ExecuteRequest, current_user: models.User = Depends(get_current_user)):
    if request.language != "python":
        raise HTTPException(status_code=400, detail="Only Python is supported for now")
    
    import subprocess
    import sys
    
    # Security: In a real app, use Docker/nsjail. 
    # Here we use a simple timeout and run locally (NOT SAFE for public production).
    
    try:
        # Run the code in a subprocess
        result = subprocess.run(
            [sys.executable, "-c", request.code],
            capture_output=True,
            text=True,
            timeout=5 # 5 seconds timeout
        )
        
        output = result.stdout
        if result.stderr:
            output += f"\nError:\n{result.stderr}"
            
        return {"output": output, "status": "success" if result.returncode == 0 else "error"}
        
    except subprocess.TimeoutExpired:
        return {"output": "Execution timed out (limit: 5s)", "status": "error"}
    except Exception as e:
        return {"output": f"System Error: {str(e)}", "status": "error"}

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Equal Collective Prep Platform API"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.get("/problems")
def get_problems(
    skip: int = 0, 
    limit: int = 100, 
    company: Optional[str] = None,
    difficulty: Optional[str] = None, 
    db: Session = Depends(get_db)
):
    query = db.query(models.Problem)
    if company:
        query = query.filter(models.Problem.company_tags.contains(company))
    if difficulty:
        query = query.filter(models.Problem.difficulty == difficulty)
    
    problems = query.offset(skip).limit(limit).all()
    return problems

@app.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    total_problems = db.query(models.Problem).count()
    easy_count = db.query(models.Problem).filter(models.Problem.difficulty == 'Easy').count()
    medium_count = db.query(models.Problem).filter(models.Problem.difficulty == 'Medium').count()
    hard_count = db.query(models.Problem).filter(models.Problem.difficulty == 'Hard').count()
    
    return {
        "total_questions": total_problems,
        "easy": easy_count,
        "medium": medium_count,
        "hard": hard_count,
        "solved": 0  # Mocked for now, will link to UserProgress later
    }
