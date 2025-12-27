#!/usr/bin/env python
"""
Initialize Firestore with signal definitions.
Run this once to seed the database.

Usage:
    python backend/init_signals.py
"""

import os
from pathlib import Path

# Add database to path
backend_path = Path(__file__).parent
if str(backend_path) not in __import__('sys').path:
    __import__('sys').path.append(str(backend_path))

# Set Firebase credentials
firebase_creds = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
if not firebase_creds:
    print("⚠️  GOOGLE_APPLICATION_CREDENTIALS not set. Using bundled credentials.")

try:
    from config.firebase import db, firebase_connected
    from utils.signals import DEFAULT_SIGNALS
    
    if not firebase_connected or not db:
        print("❌ Firebase not connected. Aborting.")
        exit(1)
    
    print("📝 Initializing signal definitions in Firestore...")
    db.collection("config").document("signals").set(DEFAULT_SIGNALS)
    print("✅ Signal definitions initialized successfully!")
    print(f"   - Symptom categories: {list(DEFAULT_SIGNALS['symptomSignals'].keys())}")
    print(f"   - Context types: {list(DEFAULT_SIGNALS['contextSignals'].keys())}")
    
except Exception as e:
    print(f"❌ Error initializing signals: {e}")
    exit(1)
