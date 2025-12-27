import firebase_admin
from firebase_admin import credentials, firestore
import os
from pathlib import Path

# Initialize Firebase
firebase_connected = False
db = None

try:
    # Prefer env var path; fallback to bundled file
    env_creds_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
    bundled_path = Path(__file__).parent.parent / "config" / "serviceAccountKey.json"

    cred = None
    if env_creds_path and Path(env_creds_path).exists():
        cred = credentials.Certificate(env_creds_path)
    elif bundled_path.exists():
        cred = credentials.Certificate(str(bundled_path))

    if cred:
        if not firebase_admin._apps:
            firebase_admin.initialize_app(cred)
        db = firestore.client()
        firebase_connected = True
        print("✓ Firebase Firestore connected successfully")
    else:
        print("⚠ Firebase credentials file not found, using in-memory storage")
        firebase_connected = False
except Exception as e:
    print(f"⚠ Firebase initialization failed: {str(e)}")
    print("  Falling back to in-memory storage")
    firebase_connected = False
