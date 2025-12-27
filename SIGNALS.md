# Emergency Signals & Symptom Detection

This system stores emergency symptom and context signals in Firestore for dynamic detection and management.

## Signal Structure

Signals are stored in Firestore under `config/signals` with two main categories:

### Symptom Signals
Detected symptoms are organized by medical category:
- **cardiac**: Heart/chest-related symptoms
- **neurological**: Brain/stroke symptoms
- **respiratory**: Breathing-related symptoms
- **bleeding**: Hemorrhage/injury symptoms
- **trauma**: Impact/accident injuries

### Context Signals
Additional severity indicators:
- **sudden**: Abrupt onset markers
- **worsening**: Escalation indicators
- **exertion**: Activity-related triggers
- **duration**: Time-based persistence

## Firestore Collection Structure

```
firestore/
├── config/
│   └── signals (document)
│       ├── symptomSignals
│       │   ├── cardiac: [...]
│       │   ├── neurological: [...]
│       │   ├── respiratory: [...]
│       │   ├── bleeding: [...]
│       │   └── trauma: [...]
│       └── contextSignals
│           ├── sudden: [...]
│           ├── worsening: [...]
│           ├── exertion: [...]
│           └── duration: [...]
```

## Backend API Endpoints

### Initialize Signals
```
POST /api/signals/init
```
Seeds Firestore with default signal definitions. Run once on setup.

**Response:**
```json
{
  "success": true,
  "message": "Signal definitions initialized in Firestore",
  "data": { ... }
}
```

### Get All Signals
```
GET /api/signals/
```
Retrieves all symptom and context signals from Firestore.

**Response:**
```json
{
  "success": true,
  "data": {
    "symptomSignals": { ... },
    "contextSignals": { ... }
  }
}
```

### Get Symptom Category
```
GET /api/signals/symptom/{category}
```
Retrieves symptoms for a specific category (e.g., `cardiac`, `neurological`).

**Response:**
```json
{
  "success": true,
  "category": "cardiac",
  "symptoms": ["chest pain", "heart attack", ...]
}
```

### Get Context Category
```
GET /api/signals/context/{category}
```
Retrieves context signals for a specific type (e.g., `sudden`, `worsening`).

**Response:**
```json
{
  "success": true,
  "category": "sudden",
  "contexts": ["sudden", "abrupt", "instantly"]
}
```

### Update Signals
```
PUT /api/signals/
```
Updates signal definitions in Firestore.

**Request Body:**
```json
{
  "symptomSignals": { ... },
  "contextSignals": { ... }
}
```

## Backend Python Usage

### Initialize Signals
```python
from utils.signals import DEFAULT_SIGNALS
from config.firebase import db

db.collection("config").document("signals").set(DEFAULT_SIGNALS)
```

### Check Symptoms
```python
from utils.signals import check_symptom

result = check_symptom("I have chest pain and shortness of breath")
# Returns: {"symptom": "chest pain", "category": "cardiac", "emergency": True}

result = check_symptom("I feel fine", category="cardiac")
# Returns: {"emergency": False}
```

### Check Context
```python
from utils.signals import check_context

contexts = check_context("Suddenly I can't breathe and it's getting worse")
# Returns: [
#   {"context": "suddenly", "type": "sudden"},
#   {"context": "getting worse", "type": "worsening"}
# ]
```

## Frontend JavaScript Usage

### Initialize Signals
```javascript
import { initializeSignals } from '@/utils/signals'

await initializeSignals()
```

### Fetch All Signals
```javascript
import { getSignals } from '@/utils/signals'

const signals = await getSignals()
console.log(signals.symptomSignals.cardiac)  // ["chest pain", ...]
```

### Fetch Category
```javascript
import { getSymptomCategory, getContextCategory } from '@/utils/signals'

const cardiac = await getSymptomCategory('cardiac')
const sudden = await getContextCategory('sudden')
```

### Update Signals
```javascript
import { updateSignals } from '@/utils/signals'

await updateSignals(newSymptomSignals, newContextSignals)
```

## Setup Instructions

### 1. Initialize Firestore with Signals
Run once after backend is running:

```bash
cd c:\hackooo\DOC-AI-main\backend
$env:GOOGLE_APPLICATION_CREDENTIALS = "c:\Users\heman\Downloads\doc-ai-c866d-firebase-adminsdk-fbsvc-b800d676ab.json"
python init_signals.py
```

Or use the API:
```bash
curl -X POST http://localhost:5000/api/signals/init
```

### 2. Use in Backend Routes
```python
from utils.signals import check_symptom, check_context

# In your route handler
result = check_symptom(user_input_text)
if result.get("emergency"):
    # Trigger emergency response
    emergency_type = result.get("category")
    # ...
```

### 3. Use in Frontend
```javascript
import { getSymptomCategory } from '@/utils/signals'

// In a component
const [symptoms, setSymptoms] = useState([])

useEffect(() => {
  getSymptomCategory('cardiac').then(setSymptoms)
}, [])

return (
  <ul>
    {symptoms.map(s => <li key={s}>{s}</li>)}
  </ul>
)
```

## Signal Format

### Simple String Format
```json
["chest pain", "heart attack", "tightness in chest"]
```

### Multilingual Format
```json
[
  { "text": "chest pain", "lang": "en" },
  { "text": "सीने में दर्द", "lang": "hi" },
  { "text": "ఛాతిలో నొప్పి", "lang": "te" }
]
```

## Emergency Detection Workflow

```
User Input
  ↓
check_symptom() → Match against Firestore signals
  ↓
Match found? → Extract category, trigger alert
  ↓
check_context() → Detect severity markers
  ↓
Combine signals → Determine priority/action
```

## Notes

- Signals are cached in Firestore for fast retrieval
- Falls back to DEFAULT_SIGNALS if Firestore unavailable
- Supports multi-language symptom detection
- All symptom/context updates persist to Firestore
- Real-time updates possible with Firestore listeners
