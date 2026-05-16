from sqlalchemy import Column, Integer, String, Text, DateTime
from database.database import Base
from datetime import datetime

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    company = Column(String, index=True)
    role = Column(String, index=True)
    qualification = Column(String)
    experience = Column(String)
    vacancies = Column(String)
    last_date = Column(String)
    location = Column(String)
    raw_text = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
