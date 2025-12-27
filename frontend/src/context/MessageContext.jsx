import { createContext, useState, useCallback } from 'react'

export const MessageContext = createContext()

export function MessageProvider({ children }) {
  // Conversations structure
  const [conversations, setConversations] = useState({
    0: {
      id: 0,
      patientName: 'Simulated Patient',
      patientId: 'patient-001',
      doctorName: 'Dr. Sarah Chen',
      doctorId: 'doctor-001',
      doctorRole: 'Primary Care',
      doctorAvatar: 'https://i.pravatar.cc/150?img=47',
      patientAvatar: 'https://i.pravatar.cc/150?img=1',
      messages: [
        {
          id: 'msg-1',
          sender: 'patient', // 'patient' or 'doctor'
          senderName: 'Simulated Patient',
          text: 'Hello Dr. Chen, I started the new medication yesterday but I\'m feeling a bit dizzy this morning. Is this normal?',
          timestamp: '9:45 AM',
          date: 'Today'
        },
        {
          id: 'msg-2',
          sender: 'doctor',
          senderName: 'Dr. Sarah Chen',
          text: 'Hi there. Mild dizziness can be a common side effect when starting. Please monitor your blood pressure if possible and let me know if it gets worse or persists beyond a few days. We can adjust if needed.',
          timestamp: '10:05 AM',
          date: 'Today'
        }
      ]
    },
    1: {
      id: 1,
      patientName: 'Mark Ruffalo',
      patientId: 'patient-002',
      doctorName: 'Dr. James Miller',
      doctorId: 'doctor-002',
      doctorRole: 'Cardiologist',
      doctorAvatar: 'https://i.pravatar.cc/150?img=12',
      patientAvatar: 'https://i.pravatar.cc/150?img=2',
      messages: [
        {
          id: 'msg-3',
          sender: 'patient',
          senderName: 'Mark Ruffalo',
          text: 'Thanks for the appointment yesterday. When should I schedule the follow-up?',
          timestamp: '3:30 PM',
          date: 'Yesterday'
        },
        {
          id: 'msg-4',
          sender: 'doctor',
          senderName: 'Dr. James Miller',
          text: 'Schedule your follow-up appointment for 4 weeks from now. I\'ll have my office send you available slots.',
          timestamp: '4:15 PM',
          date: 'Yesterday'
        }
      ]
    }
  })

  // Get current time
  const getCurrentTime = useCallback(() => {
    const now = new Date()
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }, [])

  // Get current date label
  const getCurrentDateLabel = useCallback(() => {
    return 'Today'
  }, [])

  // Send message from patient
  const sendPatientMessage = useCallback((conversationId, messageText) => {
    setConversations(prev => ({
      ...prev,
      [conversationId]: {
        ...prev[conversationId],
        messages: [
          ...prev[conversationId].messages,
          {
            id: `msg-${Date.now()}`,
            sender: 'patient',
            senderName: prev[conversationId].patientName,
            text: messageText,
            timestamp: getCurrentTime(),
            date: getCurrentDateLabel()
          }
        ]
      }
    }))
  }, [getCurrentTime, getCurrentDateLabel])

  // Send message from doctor
  const sendDoctorMessage = useCallback((conversationId, messageText) => {
    setConversations(prev => ({
      ...prev,
      [conversationId]: {
        ...prev[conversationId],
        messages: [
          ...prev[conversationId].messages,
          {
            id: `msg-${Date.now()}`,
            sender: 'doctor',
            senderName: prev[conversationId].doctorName,
            text: messageText,
            timestamp: getCurrentTime(),
            date: getCurrentDateLabel()
          }
        ]
      }
    }))
  }, [getCurrentTime, getCurrentDateLabel])

  // Get conversation for patient view
  const getPatientConversations = useCallback(() => {
    return Object.values(conversations).map(conv => ({
      ...conv,
      lastMessage: conv.messages[conv.messages.length - 1]?.text || '',
      lastTimestamp: conv.messages[conv.messages.length - 1]?.timestamp || ''
    }))
  }, [conversations])

  // Get conversation for doctor view (list of patients)
  const getDoctorConversations = useCallback(() => {
    return Object.values(conversations).map(conv => ({
      id: conv.id,
      patientName: conv.patientName,
      patientAvatar: conv.patientAvatar,
      lastMessage: conv.messages[conv.messages.length - 1]?.text || '',
      timestamp: conv.messages[conv.messages.length - 1]?.timestamp || '',
      messages: conv.messages
    }))
  }, [conversations])

  // Get specific conversation
  const getConversation = useCallback((conversationId) => {
    return conversations[conversationId]
  }, [conversations])

  const value = {
    conversations,
    sendPatientMessage,
    sendDoctorMessage,
    getPatientConversations,
    getDoctorConversations,
    getConversation
  }

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  )
}
