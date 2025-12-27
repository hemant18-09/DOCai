# Firestore-backed user management
try:
    from firebase_admin import firestore  # type: ignore
    db = firestore.client()
except Exception:
    db = None

async def find_user_by_email(email):
    """Find user by email from Firestore."""
    if not db:
        return None
    try:
        docs = db.collection("users").where("email", "==", email).limit(1).stream()
        for doc in docs:
            return doc.to_dict()
        return None
    except Exception:
        return None

async def find_user_by_id(user_id):
    """Find user by ID from Firestore."""
    if not db:
        return None
    try:
        doc = db.collection("users").document(user_id).get()
        return doc.to_dict() if doc.exists else None
    except Exception:
        return None

async def find_all_doctors():
    """Get all doctors from Firestore."""
    if not db:
        return []
    try:
        docs = db.collection("users").where("role", "==", "doctor").stream()
        return [d.to_dict() for d in docs]
    except Exception:
        return []

async def find_all_patients():
    """Get all patients from Firestore."""
    if not db:
        return []
    try:
        docs = db.collection("users").where("role", "==", "patient").stream()
        return [d.to_dict() for d in docs]
    except Exception:
        return []

async def create_user(user_data):
    """Create a new user in Firestore."""
    if not db:
        return None
    try:
        user_id = user_data.get("id") or db.collection("users").document().id
        db.collection("users").document(user_id).set(user_data)
        return user_data
    except Exception:
        return None

async def update_user(user_id, updates):
    """Update user in Firestore."""
    if not db:
        return None
    try:
        db.collection("users").document(user_id).update(updates)
        return await find_user_by_id(user_id)
    except Exception:
        return None
