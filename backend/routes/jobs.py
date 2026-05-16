from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from models import models, schemas
from services.llm_service import extract_job_details

router = APIRouter()

@router.post("/extract", response_model=schemas.JobCreate)
def extract_job(req: schemas.ExtractRequest):
    """
    Receive raw text, extract job info using Ollama, and return JSON without saving.
    """
    extracted_data = extract_job_details(req.text)
    if not extracted_data:
        raise HTTPException(status_code=500, detail="Failed to extract job details")
    
    # ensure keys exist and fallback if not
    job = schemas.JobCreate(
        company=extracted_data.get("company", "Not specified"),
        role=extracted_data.get("role", "Not specified"),
        qualification=extracted_data.get("qualification", "Not specified"),
        experience=extracted_data.get("experience", "Not specified"),
        vacancies=str(extracted_data.get("vacancies", "Not specified")),
        last_date=extracted_data.get("last_date", "Not specified"),
        location=extracted_data.get("location", "Not specified"),
        raw_text=req.text
    )
    return job

@router.post("/jobs", response_model=schemas.JobResponse)
def create_job(job: schemas.JobCreate, db: Session = Depends(get_db)):
    """
    Save the extracted job to the database.
    """
    db_job = models.Job(**job.model_dump())
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job

@router.get("/jobs", response_model=list[schemas.JobResponse])
def get_jobs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Get all jobs.
    """
    jobs = db.query(models.Job).order_by(models.Job.created_at.desc()).offset(skip).limit(limit).all()
    return jobs

@router.get("/jobs/{job_id}", response_model=schemas.JobResponse)
def get_job(job_id: int, db: Session = Depends(get_db)):
    """
    Get a specific job.
    """
    job = db.query(models.Job).filter(models.Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job
