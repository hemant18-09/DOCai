from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

try:
    from firebase_admin import firestore  # type: ignore
    db = firestore.client()
except Exception:
    db = None

router = APIRouter()

class SymptomRecord(BaseModel):
    userId: str
    symptoms: List[str]
    severity: Optional[str] = None
    description: Optional[str] = None
    timestamp: Optional[str] = None

class EmergencyRecord(BaseModel):
    userId: str
    emergencyType: str
    location: Optional[str] = None
    description: Optional[str] = None
    contactNumber: Optional[str] = None
    timestamp: Optional[str] = None

@router.post("/symptoms")
async def record_symptoms(record: SymptomRecord):
    """Record patient symptoms to Firestore."""
    if not db:
        raise HTTPException(status_code=503, detail="Database not available")
    
    if not record.userId:
        raise HTTPException(status_code=400, detail="userId is required")
    
    try:
        record_data = record.dict()
        record_data["timestamp"] = record_data.get("timestamp") or datetime.now().isoformat()
        
        # Create document in symptoms collection
        doc_ref = db.collection("symptoms").document()
        doc_ref.set(record_data)
        
        return {
            "success": True,
            "message": "Symptoms recorded successfully",
            "id": doc_ref.id,
            "data": record_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to record symptoms: {str(e)}")

@router.get("/symptoms/{user_id}")
async def get_user_symptoms(user_id: str):
    """Get all symptom records for a user."""
    if not db:
        raise HTTPException(status_code=503, detail="Database not available")
    
    try:
        docs = db.collection("symptoms").where("userId", "==", user_id).stream()
        records = [d.to_dict() for d in docs]
        return {
            "success": True,
            "records": records
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve symptoms: {str(e)}")

@router.post("/emergency")
async def record_emergency(record: EmergencyRecord):
    """Record emergency incident to Firestore."""
    if not db:
        raise HTTPException(status_code=503, detail="Database not available")
    
    if not record.userId or not record.emergencyType:
        raise HTTPException(status_code=400, detail="userId and emergencyType are required")
    
    try:
        record_data = record.dict()
        record_data["timestamp"] = record_data.get("timestamp") or datetime.now().isoformat()
        
        # Create document in emergency collection
        doc_ref = db.collection("emergency").document()
        doc_ref.set(record_data)
        
        return {
            "success": True,
            "message": "Emergency recorded successfully",
            "id": doc_ref.id,
            "data": record_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to record emergency: {str(e)}")

@router.get("/emergency/{user_id}")
async def get_user_emergency(user_id: str):
    """Get all emergency records for a user."""
    if not db:
        raise HTTPException(status_code=503, detail="Database not available")
    
    try:
        docs = db.collection("emergency").where("userId", "==", user_id).stream()
        records = [d.to_dict() for d in docs]
        return {
            "success": True,
            "records": records
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve emergency records: {str(e)}")
