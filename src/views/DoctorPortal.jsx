import { useState } from "react";
import "./DoctorPortal.css";

export default function DoctorPortal() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedPatientName, setSelectedPatientName] = useState('Simulated Patient');
  const [selectedMessage, setSelectedMessage] = useState(0);

  const switchView = (viewName, patientName = null) => {
    setCurrentView(viewName);
    if (patientName) {
      setSelectedPatientName(patientName);
    }
  };

  const getHeaderTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return 'Dashboard overview';
      case 'appointments':
        return 'Calendar & Scheduling';
      case 'messages':
        return 'Patient Messages';
      case 'records-queue':
        return 'Records for Review';
      case 'patient-detail':
        return 'Patient Chart';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="doctor-portal">
      <aside className="sidebar">
        <div className="logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" />
            <path d="M12 8V16" />
            <path d="M8 12H16" />
          </svg>
          DocAI Provider
        </div>
        <nav>
          <div className="nav-group">
            <div className="nav-label">CLINICAL</div>
            <div 
              className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
              onClick={() => switchView('dashboard')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              Dashboard
            </div>
            <div 
              className={`nav-item ${currentView === 'appointments' ? 'active' : ''}`}
              onClick={() => switchView('appointments')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Appointments
            </div>
            <div 
              className={`nav-item ${currentView === 'messages' ? 'active' : ''}`}
              onClick={() => switchView('messages')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Messages <span className="badge">3</span>
            </div>
          </div>
          <div className="nav-group">
            <div className="nav-label">ADMINISTRATIVE</div>
            <div 
              className={`nav-item ${currentView === 'records-queue' ? 'active' : ''}`}
              onClick={() => switchView('records-queue')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
              Incoming Records <span className="badge badge-amber">5</span>
            </div>
          </div>
        </nav>
      </aside>

      <div className="main-content">
        <header className="top-bar">
          <div className="header-title">{getHeaderTitle()}</div>
          <div className="header-right">
            <button className="btn btn-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            <div className="user-profile">
              <div className="user-info">
                <div className="user-name">Dr. Sarah Chen</div>
                <div className="user-role">Primary Care</div>
              </div>
              <img src="https://i.pravatar.cc/150?img=47" alt="Dr. Sarah Chen" className="user-avatar" />
            </div>
          </div>
        </header>

        <div className="content-scroll-area">
          {currentView === 'dashboard' && <DashboardView switchView={switchView} />}
          {currentView === 'appointments' && <AppointmentsView switchView={switchView} />}
          {currentView === 'messages' && <MessagesView selectedMessage={selectedMessage} setSelectedMessage={setSelectedMessage} />}
          {currentView === 'records-queue' && <RecordsQueueView />}
          {currentView === 'patient-detail' && <PatientDetailView patientName={selectedPatientName} switchView={switchView} />}
        </div>
      </div>
    </div>
  );
}

function DashboardView({ switchView }) {
  return (
    <section className="dashboard-view">
      <div className="dashboard-header">
        <h1 className="page-title">Today's Overview</h1>
        <div className="current-date">Dec 26, 2025</div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Appointments</div>
          <div className="stat-value">12</div>
        </div>
        <div className="stat-card stat-high">
          <div className="stat-label">High Priority Triage</div>
          <div className="stat-value">3</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Video Visits</div>
          <div className="stat-value">8</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending Lab Reviews</div>
          <div className="stat-value">5</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="section-title">Appointment Queue</h2>
          <button className="btn btn-outline">View Full Calendar</button>
        </div>
        <table className="appointments-table">
          <thead>
            <tr>
              <th>TIME</th>
              <th>PATIENT</th>
              <th>AI TRIAGE SUMMARY (REASON)</th>
              <th>TYPE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr className="clickable-row" onClick={() => switchView('patient-detail', 'Simulated Patient')}>
              <td className="time-cell">10:00 AM</td>
              <td>
                <div className="patient-name">Simulated Patient</div>
                <div className="patient-meta">34 F • MRN #882910</div>
              </td>
              <td>
                <div className="triage-title">Acute Cephalalgia & Photophobia</div>
                <div className="triage-desc">Severe, sudden onset headache (8/10) with nausea and distinct light sensitivity. High suspicion for acute migraine.</div>
              </td>
              <td><span className="type-badge type-video">Video</span></td>
              <td><span className="status-badge status-high">High Priority</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function AppointmentsView({ switchView }) {
  return (
    <section className="appointments-view">
      <div className="appointments-header">
        <h1 className="page-title">Schedule</h1>
        <div className="appointments-actions">
          <button className="btn btn-outline">Today</button>
          <button className="btn btn-primary">New Appointment</button>
        </div>
      </div>

      <div className="calendar-wrapper">
        <div className="calendar-grid">
          <div className="cal-header"></div>
          <div className="cal-header">Mon 26</div>
          <div className="cal-header">Tue 27</div>
          <div className="cal-header">Wed 28</div>
          <div className="cal-header">Thu 29</div>
          <div className="cal-header">Fri 30</div>

          <div className="cal-time-slot">9:00 AM</div>
          <div className="cal-cell">
            <div className="appt-block appt-inperson">Team Meeting</div>
          </div>
          <div className="cal-cell"></div>
          <div className="cal-cell">
            <div className="appt-block appt-video">J. Smith (Video)</div>
          </div>
          <div className="cal-cell"></div>
          <div className="cal-cell"></div>

          <div className="cal-time-slot">10:00 AM</div>
          <div className="cal-cell cal-cell-priority">
            <div className="appt-block appt-video appt-high-priority" onClick={() => switchView('patient-detail', 'Simulated Patient')}>
              Simulated Patient (High Priority)
            </div>
          </div>
          <div className="cal-cell">
            <div className="appt-block appt-inperson">R. Downey Jr.</div>
          </div>
          <div className="cal-cell"></div>
          <div className="cal-cell">
            <div className="appt-block appt-video">A. Patel (Follow-up)</div>
          </div>
          <div className="cal-cell"></div>

          <div className="cal-time-slot">11:00 AM</div>
          <div className="cal-cell">
            <div className="appt-block appt-video">C. Evans (Cough)</div>
          </div>
          <div className="cal-cell"></div>
          <div className="cal-cell">
            <div className="appt-block appt-inperson">Physical Slots</div>
          </div>
          <div className="cal-cell"></div>
          <div className="cal-cell"></div>
        </div>
      </div>
    </section>
  );
}

function MessagesView({ selectedMessage, setSelectedMessage }) {
  return (
    <section className="messages-view">
      <h1 className="page-title">Messages</h1>
      <div className="messages-container">
        <div className="msg-list">
          <div className="msg-search">
            <input type="text" placeholder="Search messages..." />
          </div>
          <div 
            className={`msg-preview ${selectedMessage === 0 ? 'active' : ''}`}
            onClick={() => setSelectedMessage(0)}
          >
            <div className="msg-preview-header">
              <div className="msg-preview-name">Simulated Patient</div>
              <div className="msg-preview-time">9:45 AM</div>
            </div>
            <div className="msg-preview-text">Re: Question about new medication side effect...</div>
          </div>
          <div 
            className={`msg-preview ${selectedMessage === 1 ? 'active' : ''}`}
            onClick={() => setSelectedMessage(1)}
          >
            <div className="msg-preview-header">
              <div className="msg-preview-name">Mark Ruffalo</div>
              <div className="msg-preview-time">Yesterday</div>
            </div>
            <div className="msg-preview-text">Thanks for the refill dr chen.</div>
          </div>
        </div>

        <div className="msg-content">
          <div className="msg-header">
            <div className="msg-header-title">Simulated Patient</div>
            <div className="msg-header-mrn">MRN #882910</div>
          </div>
          <div className="msg-body">
            <div className="msg-bubble msg-in">
              Hello Dr. Chen, I started the new medication yesterday but I'm feeling a bit dizzy this morning. Is this normal?
              <div className="msg-time">9:45 AM</div>
            </div>
            <div className="msg-bubble msg-out">
              Hi there. Mild dizziness can be a common side effect when starting. Please monitor your blood pressure if possible and let me know if it gets worse or persists beyond a few days. We can adjust if needed.
              <div className="msg-time">10:05 AM</div>
            </div>
          </div>
          <div className="msg-input-area">
            <input type="text" placeholder="Type a reply..." />
            <button className="btn btn-primary">Send</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function RecordsQueueView() {
  return (
    <section className="records-view">
      <div className="records-header">
        <h1 className="page-title">Incoming Records Queue</h1>
        <div className="records-count">5 items pending review</div>
      </div>

      <div className="card">
        <table className="records-table">
          <thead>
            <tr>
              <th>DATE UPLOADED</th>
              <th>PATIENT</th>
              <th>TYPE</th>
              <th>AI EXTRACTED DATA SUMMARY</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Today, 8:45 AM</td>
              <td className="patient-name">Simulated Patient</td>
              <td><span className="record-type-badge record-prescription">Prescription</span></td>
              <td className="ai-summary">
                <div className="code-block">
                  MED: Amoxicillin 500mg<br/>
                  SIG: 1 cap q12h x 10d
                </div>
                <div className="alert-text">Alert: Potential interaction with current Lisinopril.</div>
              </td>
              <td className="actions-cell">
                <button className="btn btn-primary btn-sm">Review</button>
                <button className="btn btn-outline btn-sm">Dismiss</button>
              </td>
            </tr>
            <tr>
              <td>Yesterday</td>
              <td className="patient-name">Chris Evans</td>
              <td><span className="record-type-badge record-lab">Lab Report</span></td>
              <td className="ai-summary">
                CBC w/ Diff. AI Flags: None. All values appear within normal ranges.
              </td>
              <td className="actions-cell">
                <button className="btn btn-primary btn-sm">Review</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PatientDetailView({ patientName, switchView }) {
  return (
    <section className="patient-detail-view">
      <button className="back-button" onClick={() => switchView('dashboard')}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </button>

      <div className="patient-header">
        <div>
          <h1 className="patient-name">{patientName}</h1>
          <div className="patient-demographics">
            <span>34 Y/O Female</span>
            <span>DOB: 05/12/1989</span>
            <span>MRN: #882910</span>
          </div>
        </div>
        <div className="patient-actions">
          <button className="btn btn-outline">Message</button>
          <button className="btn btn-primary btn-video">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 7l-7 5 7 5V7z"></path>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
            Start Video Visit
          </button>
        </div>
      </div>

      <div className="alert-banner alert-critical">
        <div className="alert-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <div>
          <div className="alert-title">High Risk Symptom Presentation (Today, 8:30 AM)</div>
          <p className="alert-summary">
            <strong>Chief Complaint:</strong> Severe, sudden onset headache.<br/>
            <strong>AI Summary:</strong> Patient indicates acute cephalalgia (rated "pounding", 8/10) with marked photophobia and nausea. Symptom cluster raises suspicion for acute migraine vs. other neurological etiologies. Immediate evaluation recommended.
          </p>
        </div>
      </div>

      <div className="patient-content-grid">
        <div className="patient-main">
          <div className="card">
            <div className="card-header">
              <h2 className="section-title">Medical History Timeline</h2>
            </div>
            <div className="card-body">
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-date">Today, 8:30 AM</div>
                    <div className="timeline-title">Symptom Triage Event</div>
                    <div className="timeline-desc">Patient submitted symptoms via mobile app resulting in High Priority alert.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="patient-sidebar">
          <div className="card">
            <div className="card-header">
              <h2 className="section-title">Current Medications</h2>
            </div>
            <div className="card-body">
              <div className="med-item">
                <div className="med-name">Lisinopril (10mg)</div>
                <div className="med-dosage">PO Daily (HTN)</div>
              </div>
              <div className="med-item">
                <div className="med-name">Atorvastatin (20mg)</div>
                <div className="med-dosage">PO Daily at bedtime</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="section-title">Vitals & Allergies</h2>
            </div>
            <div className="card-body">
              <div className="vitals-section">
                <div className="vitals-label">Allergies</div>
                <span className="allergy-badge">Penicillin (Hives)</span>
              </div>
              <div className="vitals-grid">
                <div className="vital-item">
                  <div className="vital-label">Last BP (Nov 15)</div>
                  <div className="vital-value">128/82</div>
                </div>
                <div className="vital-item">
                  <div className="vital-label">Heart Rate</div>
                  <div className="vital-value">72 bpm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
