function RecordsView({ goTo }) {
  return (
    <>
      <h1 className="card-title" style={{ fontSize: '24px' }}>
        Medical History
      </h1>

      <div className="action-card-dashed" onClick={() => goTo('rx-upload')}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginBottom: '8px' }}
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>
          Add New Record
        </h3>
        <p
          style={{
            margin: '4px 0 0 0',
            fontSize: '14px',
            opacity: 0.8,
          }}
        >
          Upload prescriptions, lab reports, or images.
        </p>
      </div>

      <h2 className="section-subtitle">Your Timeline</h2>

      <div
        className="list-item-card"
        onClick={() => goTo('triage')}
        style={{ cursor: 'pointer' }}
      >
        <div className="item-left">
          <span className="history-pill pill-summary">Summary</span>
          <span className="item-title">Symptom Summary: Headache</span>
          <span className="item-sub">
            Today • View patient &amp; doctor summaries.
          </span>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#CBD5E0"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
      <div
        className="list-item-card"
        onClick={() => goTo('rx-analysis')}
        style={{ cursor: 'pointer' }}
      >
        <div className="item-left">
          <span className="history-pill pill-prescription">Prescription</span>
          <span className="item-title">Prescription Image</span>
          <span className="item-sub">
            Nov 15, 2023 • View or analyze image.
          </span>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#CBD5E0"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
      <div
        className="list-item-card"
        onClick={() =>
          alert('Demo: Opening lab results details for Lipid Panel')
        }
        style={{ cursor: 'pointer' }}
      >
        <div className="item-left">
          <span className="history-pill pill-report">Report</span>
          <span className="item-title">Lab Results: Lipid Panel</span>
          <span className="item-sub">Nov 14, 2023 • Reviewed</span>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#CBD5E0"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </>
  )
}

export default RecordsView
