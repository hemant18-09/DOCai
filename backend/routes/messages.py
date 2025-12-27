from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database.messages import (
    send_message,
    get_conversation,
    get_conversations_for_doctor,
    get_conversations_for_patient,
    mark_conversation_as_read,
    delete_message
)

router = APIRouter()

class SendMessageRequest(BaseModel):
    patientId: str
    doctorId: str
    patientName: str
    doctorName: str
    message: str
    sender: str

class MarkReadRequest(BaseModel):
    patientId: str
    doctorId: str

@router.post("/send")
def send_new_message(request: SendMessageRequest):
    """Send a message"""
    if not all([request.patientId, request.doctorId, request.message, request.sender]):
        raise HTTPException(status_code=400, detail="Missing required fields")
    
    try:
        msg = send_message(
            request.patientId,
            request.doctorId,
            request.patientName,
            request.doctorName,
            request.message,
            request.sender
        )
        return {
            "success": True,
            "message": "Message sent successfully",
            "data": msg
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/conversation")
def get_message_conversation(patientId: str, doctorId: str):
    """Get messages for a conversation"""
    if not patientId or not doctorId:
        raise HTTPException(status_code=400, detail="Patient ID and Doctor ID are required")
    
    try:
        conversation = get_conversation(patientId, doctorId)
        return {
            "success": True,
            "messages": conversation
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/doctor/{doctorId}")
def get_doctor_conversations(doctorId: str):
    """Get all conversations for a doctor"""
    try:
        conversations = get_conversations_for_doctor(doctorId)
        return {
            "success": True,
            "conversations": conversations
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/patient/{patientId}")
def get_patient_conversations(patientId: str):
    """Get all conversations for a patient"""
    try:
        conversations = get_conversations_for_patient(patientId)
        return {
            "success": True,
            "conversations": conversations
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")

@router.put("/mark-read")
def mark_read(request: MarkReadRequest):
    """Mark messages as read"""
    if not request.patientId or not request.doctorId:
        raise HTTPException(status_code=400, detail="Patient ID and Doctor ID are required")
    
    try:
        mark_conversation_as_read(request.patientId, request.doctorId)
        return {
            "success": True,
            "message": "Messages marked as read"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")
