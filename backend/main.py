from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import sys
from pathlib import Path

load_dotenv()

# Ensure the shared database package is importable
# Add the repository root to PYTHONPATH so imports like `import database.*` work
ROOT_DIR = Path(__file__).resolve().parents[1]
if str(ROOT_DIR) not in sys.path:
    sys.path.append(str(ROOT_DIR))

# Initialize Firebase Admin (if credentials are available)
try:
    from config import firebase  # noqa: F401 - import triggers initialization
except Exception:
    # Continue without Firebase; modules will fallback to in-memory
    pass

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import routes
from routes.auth import router as auth_router
from routes.messages import router as messages_router
from routes.symptoms import router as symptoms_router
from routes.signals import router as signals_router

# Register routes
app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(messages_router, prefix="/api/messages", tags=["messages"])
app.include_router(symptoms_router, prefix="/api/health", tags=["health"])
app.include_router(signals_router, prefix="/api/signals", tags=["signals"])

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Backend server is running"}

@app.get("/api")
def api_root():
    return {"message": "DOC-AI Backend API"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 5000))
    uvicorn.run(app, host="0.0.0.0", port=port)
