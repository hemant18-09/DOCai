# 🧪 DOC-AI Testing Guide

## 🚀 Servers Running
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## ✅ Features & What to Test

### 1. **Authentication** ✅
**What to test:**
- Click "Sign Up"
- Select Patient or Doctor
- Fill required fields
- Click "Sign Up" → Should show success message on login page
- Login with created credentials
- Should redirect to Home (patient) or Provider Portal (doctor)

### 2. **Home View - Symptom Checker** ✅
**What works:**
- Text input for symptoms
- Speech-to-text in 6 languages (English, Hindi, Telugu, Tamil, Kannada, Malayalam)
- Emergency detection (chest pain, difficulty breathing, etc.)
- Navigate to Triage for detailed assessment

**What to test:**
- Type "chest pain and difficulty breathing" → Should show emergency warning
- Type "headache and fever" → Click Continue → Goes to Triage
- Click microphone button → Speak symptoms → Should transcribe
- Try different languages from dropdown

### 3. **Messages/Chat** ✅
**What works:**
- Patient can see all doctors
- Select doctor to chat
- Send and receive messages
- Real-time updates every 3 seconds
- Doctor can see all patient conversations in Provider Portal

**What to test:**
- Login as patient → Click "Messages"
- Select a doctor from list
- Type message and send
- Login as doctor → Click "Provider Portal" → "Messages"
- See patient conversations and reply

### 4. **Medication View** ✅
**What works:**
- Search for medications
- View medication information
- Sample medication data displayed

**What to test:**
- Click "Medication" in nav
- View medication list
- Search functionality

### 5. **Availability/Stores** ✅
**What works:**
- Interactive map showing pharmacies
- Store locations and details
- Map centered on user location

**What to test:**
- Click "Availability"
- View pharmacy locations on map
- Click markers for store details

### 6. **Records** ✅
**What works:**
- Upload medical records
- View uploaded documents
- Prescription analysis

**What to test:**
- Click "Records"
- Upload a document/prescription
- View uploaded files
- Analyze prescription

### 7. **Provider Portal** (Doctors Only) ✅
**What works:**
- Dashboard with statistics
- Patient list
- Messages/conversations
- Appointment management

**What to test:**
- Login as doctor
- View dashboard stats
- Click "Messages" → See patient conversations
- Reply to patients

### 8. **Triage View** ✅
**What works:**
- Symptom assessment
- Risk scoring
- Recommendations

**What to test:**
- From Home, enter symptoms → Click Continue
- Answer triage questions
- Get risk assessment

### 9. **Prescription Upload** ✅
**What works:**
- Upload prescription image
- OCR/AI analysis
- Medication extraction

**What to test:**
- Click "Prescription Analyzer" from Home
- Upload a prescription image
- View analysis results

## 📝 Test Accounts

### Create Your Own:
1. Click "Sign Up"
2. Fill in details
3. Use for testing

### Test Flow:
```
1. Sign up as Patient → Test patient features
2. Sign up as Doctor → Test provider portal
3. Send messages between patient and doctor accounts
```

## 🐛 Known Limitations

1. **Messages** - Currently in-memory, will reset on server restart (use Firebase for persistence)
2. **Real-time** - Messages refresh every 3 seconds, not instant WebSocket
3. **Prescription OCR** - May need AI service integration for actual image analysis
4. **Map** - Requires actual pharmacy data for production

## 🔧 Quick Fixes if Something Breaks

### Frontend won't load:
```powershell
cd c:\hackooo\DOC-AI-main\frontend
npm run dev
```

### Backend won't start:
```powershell
cd c:\hackooo\DOC-AI-main\backend
.venv\Scripts\python.exe main.py
```

### Port already in use:
```powershell
# Kill processes on port 5000
Get-NetTCPConnection -LocalPort 5000 | ForEach-Object { taskkill /F /PID $_.OwningProcess }

# Kill processes on port 5173
Get-NetTCPConnection -LocalPort 5173 | ForEach-Object { taskkill /F /PID $_.OwningProcess }
```

## ✨ Tips

- Use **Ctrl+Shift+I** to open browser dev tools for debugging
- Check backend terminal for API logs
- Check frontend terminal for build/runtime errors
- Clear browser cache/localStorage if login issues occur: `localStorage.clear()`

## 🎯 Priority Test Order

1. **Authentication** - Must work for everything else
2. **Home & Symptom Checker** - Core feature
3. **Messages** - Patient-doctor communication
4. **Provider Portal** - Doctor workflow
5. **Other features** - Medication, Records, etc.

---

**All features are implemented and ready to test!** 🎉

Start with creating a patient account and exploring the app.
