@echo off
echo Starting Equal Collective Prep Platform (Docker)...
docker-compose up --build -d
echo.
echo Application started!
echo Frontend: http://localhost:3000
echo Backend: http://localhost:8000/docs
pause
