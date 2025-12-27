"""
Signals utility - Load emergency signals from Firestore
"""

try:
    from firebase_admin import firestore  # type: ignore
    db = firestore.client()
except Exception:
    db = None

# Default signals in case Firestore is unavailable
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

def get_signals():
    """Retrieve signals from Firestore or return default."""
    if not db:
        return DEFAULT_SIGNALS
    
    try:
        doc = db.collection("config").document("signals").get()
        if doc.exists:
            return doc.to_dict()
    except Exception as e:
        print(f"Warning: Could not fetch signals from Firestore: {e}")
    
    return DEFAULT_SIGNALS

def get_symptom_signals():
    """Get symptom signals."""
    signals = get_signals()
    return signals.get("symptomSignals", {})

def get_context_signals():
    """Get context signals."""
    signals = get_signals()
    return signals.get("contextSignals", {})

def check_symptom(text, category=None):
    """
    Check if text contains emergency symptoms.
    If category is None, check all categories.
    Returns matched symptom and category.
    """
    symptoms = get_symptom_signals()
    text_lower = text.lower()
    
    if category and category in symptoms:
        for symptom in symptoms[category]:
            if isinstance(symptom, dict):
                symptom_text = symptom.get("text", "").lower()
            else:
                symptom_text = str(symptom).lower()
            
            if symptom_text in text_lower:
                return {"symptom": symptom_text, "category": category, "emergency": True}
    else:
        for cat, symptom_list in symptoms.items():
            for symptom in symptom_list:
                if isinstance(symptom, dict):
                    symptom_text = symptom.get("text", "").lower()
                else:
                    symptom_text = str(symptom).lower()
                
                if symptom_text in text_lower:
                    return {"symptom": symptom_text, "category": cat, "emergency": True}
    
    return {"emergency": False}

def check_context(text):
    """
    Check if text contains context signals (severity indicators).
    Returns matched contexts.
    """
    contexts = get_context_signals()
    text_lower = text.lower()
    matched = []
    
    for ctx_type, ctx_list in contexts.items():
        for ctx in ctx_list:
            if isinstance(ctx, dict):
                ctx_text = ctx.get("text", "").lower()
            else:
                ctx_text = str(ctx).lower()
            
            if ctx_text in text_lower:
                matched.append({"context": ctx_text, "type": ctx_type})
    
    return matched
