# 🔐 DOC-AI User Credentials

## 📋 Patient Accounts

### 1. Rohit Singh
- **Email**: `rohit.singh@email.com`
- **Password**: `rohit123`
- **ID**: P001
- **Age**: 32 years
- **Gender**: Male
- **Blood Group**: O+

### 2. Pankaj Joshi
- **Email**: `pankaj.joshi@email.com`
- **Password**: `pankaj123`
- **ID**: P002
- **Age**: 28 years
- **Gender**: Male
- **Blood Group**: A+

### 3. Shekhar Iyer
- **Email**: `shekhar.iyer@email.com`
- **Password**: `shekhar123`
- **ID**: P003
- **Age**: 45 years
- **Gender**: Male
- **Blood Group**: B+

### 4. Basil Joseph
- **Email**: `basil.joseph@email.com`
- **Password**: `basil123`
- **ID**: P004
- **Age**: 35 years
- **Gender**: Male
- **Blood Group**: AB+

### 5. Shankar Patil
- **Email**: `shankar.patil@email.com`
- **Password**: `shankar123`
- **ID**: P005
- **Age**: 52 years
- **Gender**: Male
- **Blood Group**: O-

### 6. Nitish Kumar
- **Email**: `nitish.kumar@email.com`
- **Password**: `nitish123`
- **ID**: P006
- **Age**: 29 years
- **Gender**: Male
- **Blood Group**: A-

---

## 👨‍⚕️ Doctor Accounts

### 1. Dr. Shwetha Pandey
- **Email**: `shwetha.pandey@hospital.com`
- **Password**: `doctor123`
- **ID**: D001
- **Specialization**: Cardiologist
- **Experience**: 12 years
- **Qualification**: MBBS, MD (Cardiology)

### 2. Dr. Anand Pillai
- **Email**: `anand.pillai@hospital.com`
- **Password**: `doctor123`
- **ID**: D002
- **Specialization**: General Physician
- **Experience**: 8 years
- **Qualification**: MBBS, MD

### 3. Dr. Srinivas Naidu
- **Email**: `srinivas.naidu@hospital.com`
- **Password**: `doctor123`
- **ID**: D003
- **Specialization**: Neurologist
- **Experience**: 15 years
- **Qualification**: MBBS, DM (Neurology)

### 4. Dr. Surender Shetty
- **Email**: `surender.shetty@hospital.com`
- **Password**: `doctor123`
- **ID**: D004
- **Specialization**: Orthopedic Surgeon
- **Experience**: 10 years
- **Qualification**: MBBS, MS (Orthopedics)

### 5. Dr. Prem Kumar
- **Email**: `prem.kumar@hospital.com`
- **Password**: `doctor123`
- **ID**: D005
- **Specialization**: Dermatologist
- **Experience**: 7 years
- **Qualification**: MBBS, MD (Dermatology)

### 6. Dr. Chandana Banerjee
- **Email**: `chandana.banerjee@hospital.com`
- **Password**: `doctor123`
- **ID**: D006
- **Specialization**: Pediatrician
- **Experience**: 11 years
- **Qualification**: MBBS, MD (Pediatrics)

---

## 🔒 Login Validation

### Error Messages:
- **No user found**: Displayed when email doesn't exist in the database
- **Invalid password**: Displayed when email exists but password is incorrect
- **Connection error**: Displayed when unable to connect to backend API

### Login Flow:
1. Enter email and password
2. System checks if email exists
3. If email found, validates password
4. On success:
   - **Patients** → Redirected to Home view
   - **Doctors** → Redirected to Provider Portal
5. User data stored in localStorage for session management

---

## 💬 Chat Features

### For Patients:
- View all 6 doctors in the chat list
- Select any doctor to start/continue conversation
- Send messages in real-time
- Messages automatically refresh every 3 seconds

### For Doctors (Provider Portal):
- View all patient conversations
- See unread message count
- Reply to patient messages
- Real-time message updates every 3 seconds
- See patient ID and name in conversation

---

## 🚀 Quick Start

1. **Login as Patient**: Use any patient email/password above
2. **Navigate to Messages**: Click on "Messages" tab
3. **Select Doctor**: Choose any of the 6 doctors
4. **Send Message**: Type and send your message

5. **Login as Doctor**: Use any doctor email with password `doctor123`
6. **View Messages**: Click "Messages" in Provider Portal sidebar
7. **Reply to Patients**: Select conversation and reply

---

## 📝 Notes

- All doctor accounts use the same password: `doctor123`
- Patient passwords follow the pattern: `firstname123`
- Backend API runs on: `http://localhost:5000`
- Frontend runs on: `http://localhost:5173`
- Messages persist in memory (will be lost on backend restart) unless Firebase is configured.

---

## 🔧 Firebase Setup (Backend)

To enable Firestore persistence and Firebase Auth login:

- Prefer using an environment variable to point at your service account JSON file. Do not commit credentials to the repo.
- Supported paths: the env var `GOOGLE_APPLICATION_CREDENTIALS`, or the bundled file at `backend/config/serviceAccountKey.json`.

### Windows PowerShell (recommended)

```powershell
cd c:\hackooo\DOC-AI-main\backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
$env:GOOGLE_APPLICATION_CREDENTIALS = "c:\Users\heman\Downloads\doc-ai-c866d-firebase-adminsdk-fbsvc-b800d676ab.json"
python main.py
```

If credentials are valid, the backend will log: "✓ Firebase Firestore connected successfully".

### Security Tips

- Keep service account files out of version control.
- Use environment variables or a secrets manager in production.
- Rotate keys periodically and restrict IAM roles to least privilege.

---

## 🌐 Firebase Setup (Frontend)

To fix `auth/api-key-not-valid.-please-pass-a-valid-api-key.` in the browser, configure the Firebase Web App credentials via Vite environment variables.

1. Open Firebase Console → Project Settings → Your apps → Config (Web).
2. In `frontend/`, copy `.env.example` to `.env.local` and fill values:

   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_MEASUREMENT_ID` (optional)

3. Restart the dev server:

```powershell
npm run dev
```

Notes:
- Vite only exposes client env vars prefixed with `VITE_`.
- The app will show a clear error if required keys are missing.
