"""
Emergency Message Utility
 - Mirrors frontend emergencyGovernor logic in Python
 - Provides multilingual emergency messages and simple risk scoring
 - Optional Firestore logging helper

Usage:
    from utils.emergency_message import assess_emergency, log_emergency_message

    result = assess_emergency("Severe chest pain and shortness of breath")
    if result["isEmergency"]:
        print(result["message"])  # Localized guidance

    # Optionally persist a record in Firestore
    log_emergency_message(user_id="abc123", input_text="...", assessment=result)
"""

from typing import Dict, List, Optional

try:
    from firebase_admin import firestore  # type: ignore
    _db = firestore.client()
except Exception:
    _db = None


def _normalize(text: str) -> str:
    if not text:
        return ""
    lower = text.lower()
    # Basic Unicode-safe cleanup: keep letters/numbers/spaces
    cleaned = []
    for ch in lower:
        # Keep common whitespace
        if ch.isspace():
            cleaned.append(" ")
            continue
        # Keep alnum; for other unicode letters, rely on .isalpha()
        if ch.isalnum() or ch.isalpha():
            cleaned.append(ch)
            continue
        # Replace punctuation with space
        cleaned.append(" ")
    return " ".join("".join(cleaned).split())


# Emergency messages in English, Hindi, Telugu
EMERGENCY_MESSAGES: Dict[str, str] = {
    "en": (
        "⚠️ This may be a medical emergency.\n\n"
        "Based on your symptoms, it may not be safe to continue.\n"
        "Please seek immediate medical attention or go to the nearest emergency department now."
    ),
    "hi": (
        "⚠️ यह एक चिकित्सा आपात स्थिति हो सकती है।\n\n"
        "आपके लक्षणों के आधार पर यहाँ आगे बढ़ना सुरक्षित नहीं है।\n"
        "कृपया तुरंत नज़दीकी अस्पताल या आपातकालीन सेवा से संपर्क करें।"
    ),
    "te": (
        "⚠️ ఇది వైద్య అత్యవసర పరిస్థితి కావచ్చు.\n\n"
        "మీ లక్షణాల ఆధారంగా ఇక్కడ కొనసాగడం సురక్షితం కాదు.\n"
        "దయచేసి వెంటనే సమీప ఆసుపత్రికి వెళ్లండి లేదా అత్యవసర వైద్య సహాయం పొందండి."
    ),
}


# Multilingual symptom and context signals (parity with frontend)
SYMPTOM_SIGNALS: Dict[str, List[str]] = {
    "cardiac": [
        "chest pain",
        "crushing chest",
        "pain in left arm",
        "jaw pain",
        "heart attack",
        "tightness in chest",
        "सीने में दर्द",
        "दिल का दौरा",
        "बाएं हाथ में दर्द",
        "छाती में जकड़न",
        "ఛాతిలో నొప్పి",
        "గుండె నొప్పి",
        "హృదయాఘాతం",
    ],
    "neurological": [
        "slurred speech",
        "stroke",
        "seizure",
        "arm weakness",
        "बोलने में कठिनाई",
        "लकवा",
        "दौरा",
        "మాట తడబడటం",
        "పక్షవాతం",
        "ఫిట్స్",
    ],
    "respiratory": [
        "shortness of breath",
        "cannot breathe",
        "gasping for air",
        "सांस लेने में कठिनाई",
        "सांस नहीं आ रही",
        "శ్వాస తీసుకోవడంలో ఇబ్బంది",
        "ఊపిరి రావడం లేదు",
    ],
    "bleeding": [
        "heavy bleeding",
        "vomiting blood",
        "बहुत ज्यादा खून बहना",
        "खून की उल्टी",
        "అధిక రక్తస్రావం",
        "రక్త వాంతులు",
    ],
    "trauma": [
        "car accident",
        "head injury",
        "कार दुर्घटना",
        "सिर में चोट",
        "రోడ్డు ప్రమాదం",
        "తల గాయం",
    ],
}

CONTEXT_SIGNALS: Dict[str, List[str]] = {
    "sudden": ["sudden", "अचानक", "అకస్మాత్తుగా"],
    "worsening": ["getting worse", "बढ़ रहा है", "మరింత ఎక్కువవుతోంది"],
    "exertion": ["walking", "exercise", "चलते समय", "నడుస్తున్నప్పుడు"],
    "duration": ["for hours", "कई घंटों से", "గంటలుగా"],
}


def _detect_language(text: str) -> str:
    """Very lightweight language hint based on matched signals."""
    # If any Hindi script matches
    if any(token in text for token in ("अ", "आ", "इ", "ई", "उ", "ऊ", "ए", "ऐ", "ओ", "औ", "क", "ख", "ग")):
        return "hi"
    # If any Telugu script matches
    if any(token in text for token in ("అ", "ఆ", "ఇ", "ఈ", "ఉ", "ఊ", "ఎ", "ఏ", "ఐ", "ఒ", "ఓ", "ఔ", "క", "ఖ", "గ")):
        return "te"
    return "en"


def _calculate_risk(text: str) -> Dict[str, object]:
    score = 0
    categories: List[str] = []

    for category, signals in SYMPTOM_SIGNALS.items():
        if any(_normalize(s) in text for s in signals):
            categories.append(category)
            if category == "cardiac":
                score += 60
            elif category == "neurological":
                score += 70
            elif category == "bleeding":
                score += 80
            elif category == "respiratory":
                score += 70
            else:
                score += 40

    detected_lang = _detect_language(text)
    return {"score": score, "categories": categories, "detectedLang": detected_lang}


def _detect_context(text: str) -> List[str]:
    ctx: List[str] = []
    for name, tokens in CONTEXT_SIGNALS.items():
        if any(_normalize(t) in text for t in tokens):
            ctx.append(name)
    return ctx


def assess_emergency(input_text: Optional[str], threshold: int = 70) -> Dict[str, object]:
    """Assess input free-text for emergency signals and produce a report.

    Returns a dict with keys: isEmergency, risk, reasons, message.
    """
    text = _normalize(input_text or "")
    risk_data = _calculate_risk(text)
    ctx = _detect_context(text)

    is_emergency = int(risk_data["score"]) >= threshold

    reasons: List[str] = []
    for c in risk_data["categories"]:  # type: ignore
        reasons.append(f"signal: {c}")
    for c in ctx:
        reasons.append(f"context: {c}")

    lang = str(risk_data["detectedLang"]) if risk_data.get("detectedLang") else "en"
    message = (
        EMERGENCY_MESSAGES.get(lang) or EMERGENCY_MESSAGES["en"]
        if is_emergency
        else "No emergency signals detected by screen."
    )

    return {
        "isEmergency": is_emergency,
        "risk": int(risk_data["score"]),
        "reasons": reasons,
        "message": message,
    }


def log_emergency_message(user_id: str, input_text: str, assessment: Dict[str, object]) -> Optional[str]:
    """Persist an emergency assessment record to Firestore.

    Returns the document ID if saved, else None.
    """
    if not _db:
        return None

    try:
        payload = {
            "userId": user_id,
            "input": input_text,
            "assessment": assessment,
        }
        doc_ref = _db.collection("emergency_messages").document()
        doc_ref.set(payload)
        return doc_ref.id
    except Exception:
        return None
