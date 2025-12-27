function RxAnalysisView({ goTo }) {
  return (
    <>
      <div className="triage-banner banner-success">
        <h3>Analysis Complete</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>
          Prescription details extracted successfully.
        </p>
      </div>

      <div className="card">
        <h2 className="card-title">Detected Medication</h2>
        <div className="list-item-card" style={{ border: 'none', padding: 0 }}>
          <div className="item-left">
            <span className="item-title" style={{ fontSize: '18px' }}>
              Amoxicillin
            </span>
            <span className="item-sub" style={{ fontSize: '15px' }}>
              500mg capsule • Take 1 capsule every 12 hours for 10 days.
            </span>
          </div>
        </div>
      </div>

      <div
        className="triage-banner banner-alert"
        style={{ display: 'flex', gap: '12px', marginTop: '12px' }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--accent-red)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>
            Potential Interaction Alert
          </h3>
          <p
            style={{ margin: 0, fontSize: '14px', color: 'var(--text-dark)' }}
          >
            Amoxicillin may interact with <strong>Lisinopril</strong> (currently
            in your medication list). Consult your doctor.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
        <button
          className="cta-button secondary"
          onClick={() => goTo('records')}
        >
          Save to Records
        </button>
        <button className="cta-button" onClick={() => goTo('doctor')}>
          Consult Doctor
        </button>
      </div>
    </>
  )
}

export default RxAnalysisView
