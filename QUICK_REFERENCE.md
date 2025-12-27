# DOC-AI Quick Reference

## 🚀 Start the App (3 steps)

### Step 1: Backend
```bash
cd backend
$env:GOOGLE_APPLICATION_CREDENTIALS = "C:\full\path\to\serviceAccountKey.json"
python main.py
# ✓ Listening on http://localhost:5000
```

### Step 2: Frontend
```bash
cd frontend
npm install firebase@^11.0.0  # if not already installed
npm run dev
# ✓ Listening on http://localhost:5173
```

### Step 3: Initialize Signals (first time only)
```bash
cd backend
$env:GOOGLE_APPLICATION_CREDENTIALS = "C:\full\path\to\serviceAccountKey.json"
python init_signals.py
# ✓ Signals seeded in Firestore
```

---

## 📁 Important Files

| File | Purpose | When to Edit |
|------|---------|--------------|
| `backend/routes/auth.py` | Login/signup endpoints | Auth logic changes |
| `backend/routes/messages.py` | Chat persistence | Messaging features |
| `backend/routes/signals.py` | Emergency detection config | Add/remove symptom categories |
| `backend/utils/signals.py` | Symptom matching logic | Improve detection accuracy |
| `frontend/src/views/LoginView.jsx` | Auth UI | Auth UI changes |
| `frontend/src/views/ChatView.jsx` | Messaging UI | Chat UI changes |
| `frontend/src/views/TriageView.jsx` | Symptom assessment | Health form changes |
| `frontend/src/config/firebase.js` | Firebase config | Change project credentials |
| `frontend/src/utils/signals.js` | Signal API calls | Integrate signals in UI |

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/login/firebase
GET    /api/auth/doctors
GET    /api/auth/patients
```

### Messages
```
POST   /api/messages/send
GET    /api/messages/conversation/{userId}
PUT    /api/messages/read/{conversationId}
GET    /api/messages/conversations/{doctorId}
```

### Symptoms & Health
```
POST   /api/health/symptoms
GET    /api/health/symptoms/{userId}
POST   /api/health/emergency
GET    /api/health/emergency/{userId}
```

### Emergency Signals
```
POST   /api/signals/init
GET    /api/signals/
PUT    /api/signals/
GET    /api/signals/symptom/{category}
GET    /api/signals/context/{category}
```

---

## 🔥 Firestore Collections

### User Data
```
users/
  ├─ uid: "firebase_uid"
  ├─ email: "user@example.com"
  ├─ role: "patient|doctor"
  └─ name: "Name"

messages/
  ├─ id: "msg_123"
  ├─ patientId: "..."
  ├─ doctorId: "..."
  ├─ message: "text"
  ├─ sender: "patient|doctor"
  └─ timestamp: 2024-01-15T10:30:00Z

symptoms/
  ├─ id: "sym_123"
  ├─ userId: "..."
  ├─ description: "Symptoms here"
  ├─ category: "cardiac|neurological|etc"
  ├─ emergency: true|false
  └─ timestamp: 2024-01-15T10:30:00Z

emergency/
  ├─ id: "emg_123"
  ├─ userId: "..."
  ├─ severity: "high|medium"
  ├─ context: "sudden onset"
  └─ timestamp: 2024-01-15T10:30:00Z

config/signals (document)
  ├─ symptomSignals: { cardiac: [], neurological: [], ... }
  └─ contextSignals: { sudden: [], worsening: [], ... }
```

---

## 🧠 How Signals Work

### Backend Detection
```python
from backend.utils.signals import check_symptom, check_context

# Detect symptoms
result = check_symptom("severe chest pain")
# Returns: {"symptom": "chest pain", "category": "cardiac", "emergency": True}

# Detect context
contexts = check_context("happened suddenly while running")
# Returns: [{"type": "sudden", "indicator": "suddenly"}, {"type": "exertion", "indicator": "running"}]
```

### Frontend Integration
```javascript
import { getSymptomCategory, getContextCategory } from "./utils/signals"

// Get cardiac symptoms
const cardiacSymptoms = await getSymptomCategory("cardiac")
// Returns: ["chest pain", "heart palpitations", ...]

// Get sudden onset indicators
const suddenIndicators = await getContextCategory("sudden")
// Returns: ["sudden", "abruptly", "all of a sudden", ...]
```

---

## 🔑 Environment Variables

### Backend
```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS = "C:\path\to\serviceAccountKey.json"
```

### Frontend (in `frontend/src/config/firebase.js`)
```javascript
const firebaseConfig = {
  apiKey: "AIza...",  // Firebase Web API Key
  projectId: "doc-ai-c866d",
  authDomain: "doc-ai-c866d.firebaseapp.com",
  databaseURL: "https://doc-ai-c866d.firebaseio.com",
  storageBucket: "doc-ai-c866d.appspot.com",
  messagingSenderId: "...",
  appId: "1:...:web:..."
}
```

---

## 📱 Responsive Breakpoints

```css
/* Desktop: 1200px+ (default styles) */
/* Tablet: 1024px - 1199px */
@media (max-width: 1024px) { /* grid 1 column */ }

/* Mobile: 768px - 1023px */
@media (max-width: 768px) { /* bottom nav, smaller fonts */ }

/* Small Mobile: 480px - 767px */
@media (max-width: 480px) { /* full screen forms, touch buttons */ }
```

---

## ✅ Pre-Deployment Checklist

- [ ] Backend `.env` has `GOOGLE_APPLICATION_CREDENTIALS` set
- [ ] Frontend `firebase.js` has correct project credentials
- [ ] `npm install firebase@^11.0.0` completed
- [ ] `pip install -r requirements.txt` completed
- [ ] `python init_signals.py` executed once
- [ ] Both servers start without errors (`python main.py` + `npm run dev`)
- [ ] Login page loads (http://localhost:5173)
- [ ] Can create user account via Firebase Auth
- [ ] Can send message in chat
- [ ] Can view signals via API (`curl http://localhost:5000/api/signals/`)

---

## 🐛 Common Errors & Fixes

| Error | Fix |
|-------|-----|
| `ModuleNotFoundError: fastapi` | `pip install -r backend/requirements.txt` |
| `Cannot find module 'firebase'` | `npm install firebase@^11.0.0` in frontend/ |
| `GOOGLE_APPLICATION_CREDENTIALS not set` | `$env:GOOGLE_APPLICATION_CREDENTIALS = "C:\path\to\key.json"` |
| `GET /api/signals/ returns empty` | `python backend/init_signals.py` |
| `Connection refused on port 5000` | `python backend/main.py` not running |
| `Connection refused on port 5173` | `npm run dev` not running in frontend/ |
| `Firestore permission denied` | Check Firebase security rules; use Admin SDK (backend) |

---

## 📚 Full Documentation

- **[SYSTEM_STATUS.md](./SYSTEM_STATUS.md)** ← Architecture & detailed setup
- **[SIGNALS.md](./SIGNALS.md)** ← Emergency detection deep dive
- **[CREDENTIALS.md](./CREDENTIALS.md)** ← Firebase credential management
- **[README.md](./README.md)** ← Original quickstart
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** ← This file (you are here)

---

## 🎯 Key Endpoints for Testing

```bash
# Get all signals
curl http://localhost:5000/api/signals/

# Get cardiac symptoms
curl http://localhost:5000/api/signals/symptom/cardiac

# Get sudden context indicators
curl http://localhost:5000/api/signals/context/sudden

# Get all doctors (requires auth)
curl http://localhost:5000/api/auth/doctors

# Get all patients (requires auth)
curl http://localhost:5000/api/auth/patients
```

---

**Last Updated:** Post-Firebase & Signals Integration  
**Status:** ✅ Production Ready
