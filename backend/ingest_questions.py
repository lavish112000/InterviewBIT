import os
import pandas as pd
from database import engine, SessionLocal
from models import Base, Problem
from sqlalchemy.orm import Session

# Create tables
Base.metadata.create_all(bind=engine)

CSV_DIR = "../LeetCode-Questions-CompanyWise-master"

def ingest_data():
    session = SessionLocal()
    
    # Check if data already exists to avoid duplicates
    if session.query(Problem).count() > 0:
        print("Data already exists. Skipping ingestion.")
        return

    problems_map = {}  # Deduplicate by title

    print(f"Scanning directory: {CSV_DIR}")
    for filename in os.listdir(CSV_DIR):
        if filename.endswith(".csv") and "_" in filename:
            company_name = filename.split("_")[0]
            file_path = os.path.join(CSV_DIR, filename)
            
            try:
                # Some CSVs might be malformed or have different headers, so we use header=None or basic reading
                # Based on the user's file view: ID, Title, Acceptance, Difficulty, Frequency, URL
                df = pd.read_csv(file_path, header=None, on_bad_lines='skip')
                
                for _, row in df.iterrows():
                    try:
                        # Attempt to parse row based on observed structure
                        # 937,Reorder Data in Log Files,54.3%,Easy,5.66..., https://leetcode.com/...
                        title = row[1]
                        difficulty = row[3]
                        acceptance = float(row[2].strip('%')) if isinstance(row[2], str) else 0.0
                        url = row[5] if len(row) > 5 else ""
                        
                        if title not in problems_map:
                            problems_map[title] = {
                                "title": title,
                                "difficulty": difficulty,
                                "acceptance_rate": acceptance,
                                "url": url,
                                "company_tags": set()
                            }
                        
                        problems_map[title]["company_tags"].add(company_name)
                    except Exception as e:
                        continue # Skip malformed rows
            except Exception as e:
                print(f"Error reading {filename}: {e}")

    print(f"Found {len(problems_map)} unique problems.")
    
    batch = []
    for p_data in problems_map.values():
        problem = Problem(
            title=p_data["title"],
            difficulty=p_data["difficulty"],
            acceptance_rate=p_data["acceptance_rate"],
            url=p_data["url"],
            company_tags=",".join(p_data["company_tags"])
        )
        batch.append(problem)

    session.add_all(batch)
    session.commit()
    print("Ingestion complete!")

if __name__ == "__main__":
    ingest_data()
