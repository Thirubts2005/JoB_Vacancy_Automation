from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ExtractRequest(BaseModel):
    text: str

class JobCreate(BaseModel):
    company: str
    role: str
    qualification: str
    experience: str
    vacancies: str
    last_date: str
    location: str
    raw_text: Optional[str] = None

class JobResponse(JobCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
