function TriageView({ goTo }) {
  return (
    <>
      <div className="triage-banner">
        <h3>Suggested Next Step: Consult a Doctor Today</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>
          Based on your symptoms, a professional evaluation is recommended soon.
        </p>
      </div>
      <div className="card">
        <h2 className="card-title">Analysis Summary</h2>
        <p className="reasoning-text">
          You reported a <strong>pounding headache</strong> accompanied by{' '}
          <strong>light sensitivity</strong> and <strong>nausea</strong>. These
          combined symptoms warrant a discussion with a healthcare provider to
          rule out acute conditions.
        </p>
      </div>
      <div
        className="card"
        style={{
          backgroundColor: 'var(--primary-teal-light)',
          border: '1px solid var(--primary-teal)',
        }}
      >
        <h2 className="card-title" style={{ color: 'var(--primary-teal)' }}>
          Recommended Action
        </h2>
        <p>Book a same-day video visit with a primary care provider.</p>
        <button className="cta-button" onClick={() => goTo('slots')}>
          Find Available Appointments
        </button>
      </div>
      <button
        style={{
          color: 'var(--text-soft)',
          background: 'none',
          border: 'none',
          padding: '12px',
          width: '100%',
          cursor: 'pointer',
          marginTop: '12px',
        }}
        onClick={() => goTo('home')}
      >
        Start Over
      </button>
    </>
  )
}

export default TriageView
