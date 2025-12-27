from datetime import datetime

# Optional Firestore client (initialized if Firebase Admin is active)
try:
    from firebase_admin import firestore  # type: ignore
    db = firestore.client()
except Exception:
    db = None

# In-memory message storage fallback
messages_cache = []

def _now_iso():
    return datetime.now().isoformat()

def send_message(patient_id, doctor_id, patient_name, doctor_name, message, sender):
    """Send a message and store it in Firestore if available, else memory."""
    msg_id = f"MSG{int(datetime.now().timestamp() * 1000)}"
    msg = {
        "id": msg_id,
        "patientId": patient_id,
        "doctorId": doctor_id,
        "patientName": patient_name,
        "doctorName": doctor_name,
        "message": message,
        "sender": sender,
        "timestamp": _now_iso(),
        "read": False,
    }

    if db:
        db.collection("messages").document(msg_id).set(msg)
    else:
        messages_cache.append(msg)
    return msg

def get_conversation(patient_id, doctor_id):
    """Get messages between a patient and doctor."""
    if db:
        q = (
            db.collection("messages")
            .where("patientId", "==", patient_id)
            .where("doctorId", "==", doctor_id)
        )
        docs = q.stream()
        conversation = [d.to_dict() for d in docs]
    else:
        conversation = [
            msg for msg in messages_cache
            if msg["patientId"] == patient_id and msg["doctorId"] == doctor_id
        ]
    conversation.sort(key=lambda x: x["timestamp"])  # ascending
    return conversation

def get_conversations_for_doctor(doctor_id):
    """Get all conversations for a doctor grouped by patient."""
    if db:
        docs = db.collection("messages").where("doctorId", "==", doctor_id).stream()
        doctor_messages = [d.to_dict() for d in docs]
    else:
        doctor_messages = [msg for msg in messages_cache if msg["doctorId"] == doctor_id]

    conversations = {}
    for msg in sorted(doctor_messages, key=lambda x: x["timestamp"], reverse=True):
        patient_id = msg["patientId"]
        if patient_id not in conversations:
            conversations[patient_id] = {
                "patientId": patient_id,
                "patientName": msg.get("patientName"),
                "lastMessage": msg["message"],
                "lastMessageTime": msg["timestamp"],
                "unreadCount": 0 if msg.get("read") else 1,
                "messages": [],
            }
        elif not msg.get("read") and msg["sender"] != "doctor":
            conversations[patient_id]["unreadCount"] += 1
        conversations[patient_id]["messages"].append(msg)

    return list(conversations.values())

def get_conversations_for_patient(patient_id):
    """Get all conversations for a patient grouped by doctor."""
    if db:
        docs = db.collection("messages").where("patientId", "==", patient_id).stream()
        patient_messages = [d.to_dict() for d in docs]
    else:
        patient_messages = [msg for msg in messages_cache if msg["patientId"] == patient_id]

    conversations = {}
    for msg in sorted(patient_messages, key=lambda x: x["timestamp"], reverse=True):
        doctor_id = msg["doctorId"]
        if doctor_id not in conversations:
            conversations[doctor_id] = {
                "doctorId": doctor_id,
                "doctorName": msg.get("doctorName"),
                "lastMessage": msg["message"],
                "lastMessageTime": msg["timestamp"],
                "messages": [],
            }
        conversations[doctor_id]["messages"].append(msg)
    return list(conversations.values())

def mark_conversation_as_read(patient_id, doctor_id):
    """Mark all messages in a conversation as read."""
    if db:
        docs = (
            db.collection("messages")
            .where("patientId", "==", patient_id)
            .where("doctorId", "==", doctor_id)
        ).stream()
        batch = db.batch()
        for d in docs:
            ref = db.collection("messages").document(d.id)
            batch.update(ref, {"read": True, "readAt": _now_iso()})
        batch.commit()
        return True
    else:
        for msg in messages_cache:
            if msg["patientId"] == patient_id and msg["doctorId"] == doctor_id:
                msg["read"] = True
                msg["readAt"] = _now_iso()
        return True

def delete_message(message_id):
    """Delete a message by id."""
    if db:
        db.collection("messages").document(message_id).delete()
        return True
    else:
        global messages_cache
        messages_cache = [msg for msg in messages_cache if msg["id"] != message_id]
        return True
