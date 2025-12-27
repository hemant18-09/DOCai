📘 README.md — Project Format & Structure (Buildathon)
Below is a clean, professional, developer-facing README explaining:

repo layout
service boundaries
how teams should work
where each responsibility lives
You can paste this directly.

📂 Project Format & Repository Structure
This repository follows a multi-service monorepo structure to clearly separate application orchestration from AI intelligence.

docai-1/
├── backend/                # Node.js (system orchestrator)
│   ├── src/
│   │   ├── app.js          # Express app configuration
│   │   ├── index.js        # Server bootstrap
│   │   ├── routes/         # HTTP routes (API layer)
│   │   ├── services/       # Business & workflow logic
│   │   ├── rules/          # Deterministic rule engine
│   │   ├── db/             # Database connectors (Firebase)
│   │   └── utils/          # Shared helpers
│   ├── package.json
│   └── package-lock.json
│
├── ai-service/             # FastAPI (AI microservice)
│   └── app/
│       ├── main.py         # FastAPI entry point
│       ├── api/            # AI HTTP endpoints
│       ├── services/       # LLM, OCR, STT logic
│       ├── rag/            # Vector DB & retrieval logic
│       └── utils/          # AI-side helpers
│
├── frontend/               # React frontend
│
├── docs/                   # Architecture diagrams & flows
│
├── .gitignore
└── README.md
🧠 Service Responsibilities
🟦 Backend (Node.js)
The backend acts as the system orchestrator.

Responsibilities:

Expose public APIs to frontend
Validate and normalize user input
Run deterministic business rules (risk classification)
Coordinate workflows across modules
Call AI services when needed
Persist data and trigger notifications
Important rule:

Backend owns all medical decisions and authority.

🟩 AI Service (FastAPI)
The AI service is a stateless intelligence layer.

Responsibilities:

Speech-to-text
OCR for prescriptions
LLM-based extraction and summarization
RAG-based explanation retrieval
Important rule:

AI service never makes medical decisions and never writes to the database.

🎨 Frontend
The frontend is a thin interaction layer.

Responsibilities:

Collect patient input
Display structured output and explanations
Trigger user-initiated actions (book appointment, analyze prescription)
Show timelines and reminders
🔄 Development Flow
Frontend sends requests to Node.js backend
Backend validates input and applies rules
Backend optionally calls AI service
AI service returns structured or retrieved data
Backend assembles final response and returns it to frontend
This ensures:

Clear separation of concerns
Safe AI usage
Auditable workflows
🧪 Local Development
Each service can be run independently.

Backend (FastAPI, Python):

```powershell
cd c:\hackooo\DOC-AI-main\backend
# Use Python 3.11 or 3.12 (recommended) to avoid building pydantic-core from source
py -3.12 -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
# Point to your Firebase service account JSON (do not commit it)
$env:GOOGLE_APPLICATION_CREDENTIALS = "c:\Users\heman\Downloads\doc-ai-c866d-firebase-adminsdk-fbsvc-b800d676ab.json"
python main.py
```

If credentials are valid, logs show: "✓ Firebase Firestore connected successfully".

AI Service (FastAPI):

```powershell
cd c:\hackooo\DOC-AI-main\backend\ai-service\app
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r ..\..\requirements.txt
python main.py
```

Frontend (React):

```powershell
cd c:\hackooo\DOC-AI-main\frontend
npm install
npm run dev
```

⚠️ Python Version Note

- Python 3.14 can force `pydantic-core` to build from source and requires Rust/Cargo. Use Python 3.11/3.12 for smooth installs.
- Install Python 3.12 from python.org and ensure it’s on PATH, then create the venv with `py -3.12 -m venv .venv`.

🚦 Contribution Rules (Buildathon)
Do not move AI logic into backend
Do not put decision-making into AI service
Keep all rules deterministic
Prefer clarity over cleverness
🧠 Why This Format?
This project format mirrors real-world production systems where:

AI is treated as a supporting component
Core decisions remain deterministic
Safety and explainability are first-class concerns
After that we push to GitHub and move forward.
