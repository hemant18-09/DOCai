from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, List

try:
    from firebase_admin import firestore  # type: ignore
    db = firestore.client()
except Exception:
    db = None

router = APIRouter()

class SignalDefinition(BaseModel):
    symptomSignals: Dict[str, List[str]]
    contextSignals: Dict[str, List[str]]

# Default signal definitions
DEFAULT_SIGNALS = {
    "symptomSignals": {
        "cardiac": [
            "chest pain",
            "crushing chest",
            "pain in left arm",
            "jaw pain",
            "heart attack",
            "tightness in chest"
        ],
        "neurological": [
            "slurred speech",
            "facial droop",
            "numbness on one side",
            "arm weakness",
            "stroke",
            "seizure",
            "loss of vision",
            "confused",
            "worst headache of my life"
        ],
        "respiratory": [
            "cannot breathe",
            "shortness of breath",
            "gasping for air",
            "turning blue",
            "choking"
        ],
        "bleeding": [
            "heavy bleeding",
            "vomiting blood",
            "coughing up blood",
            "deep wound",
            "stab wound",
            "gunshot"
        ],
        "trauma": [
            "fall from height",
            "car accident",
            "head injury",
            "broken bone"
        ]
    },
    "contextSignals": {
        "sudden": ["sudden", "abrupt", "instantly"],
        "worsening": ["getting worse", "rapidly", "unbearable"],
        "exertion": ["while running", "during exercise", "walking up stairs"],
        "duration": ["for hours", "persisting", "constant"]
    }
}

@router.post("/init")
async def initialize_signals():
    """Initialize signal definitions in Firestore."""
    if not db:
        raise HTTPException(status_code=503, detail="Database not available")
    
    try:
        db.collection("config").document("signals").set(DEFAULT_SIGNALS)
        return {
            "success": True,
            "message": "Signal definitions initialized in Firestore",
            "data": DEFAULT_SIGNALS
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to initialize signals: {str(e)}")

@router.get("/")
async def get_signals():
    """Retrieve signal definitions from Firestore."""
    if not db:
        raise HTTPException(status_code=503, detail="Database not available")
    
    try:
        doc = db.collection("config").document("signals").get()
        if doc.exists:
            return {
                "success": True,
                "data": doc.to_dict()
            }
        else:
            # Return default if not found
            return {
                "success": True,
                "data": DEFAULT_SIGNALS
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve signals: {str(e)}")

@router.put("/")
async def update_signals(signals: SignalDefinition):
    """Update signal definitions in Firestore."""
    if not db:
        raise HTTPException(status_code=503, detail="Database not available")
    
    try:
        data = signals.dict()
        db.collection("config").document("signals").set(data)
        return {
            "success": True,
            "message": "Signal definitions updated",
            "data": data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update signals: {str(e)}")

@router.get("/symptom/{category}")
async def get_symptom_category(category: str):
    """Get symptoms for a specific category."""
    if not db:
        raise HTTPException(status_code=503, detail="Database not available")
    
    try:
        doc = db.collection("config").document("signals").get()
        if doc.exists:
            data = doc.to_dict()
            symptoms = data.get("symptomSignals", {}).get(category, [])
            if symptoms:
                return {
                    "success": True,
                    "category": category,
                    "symptoms": symptoms
                }
        
        # Fallback to default
        symptoms = DEFAULT_SIGNALS["symptomSignals"].get(category, [])
        return {
            "success": True,
            "category": category,
            "symptoms": symptoms
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve symptoms: {str(e)}")

@router.get("/context/{category}")
async def get_context_category(category: str):
    """Get context signals for a specific category."""
    if not db:
        raise HTTPException(status_code=503, detail="Database not available")
    
    try:
        doc = db.collection("config").document("signals").get()
        if doc.exists:
            data = doc.to_dict()
            contexts = data.get("contextSignals", {}).get(category, [])
            if contexts:
                return {
                    "success": True,
                    "category": category,
                    "contexts": contexts
                }
        
        # Fallback to default
        contexts = DEFAULT_SIGNALS["contextSignals"].get(category, [])
        return {
            "success": True,
            "category": category,
            "contexts": contexts
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve contexts: {str(e)}")
