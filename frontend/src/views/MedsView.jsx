function MedsView() {
  return (
    <>
      <h1 className="card-title" style={{ fontSize: '24px' }}>
        Today&apos;s Schedule
      </h1>
      <div className="list-item-card">
        <div className="item-left">
          <span className="item-title">Lisinopril (10mg)</span>
          <span className="item-sub">Taken at 8:00 AM</span>
        </div>
        <span className="status-pill status-done">Taken</span>
      </div>
      <div
        className="list-item-card"
        style={{ borderColor: 'var(--primary-teal)' }}
      >
        <div className="item-left">
          <span className="item-title">Atorvastatin (20mg)</span>
          <span className="item-sub">Due: Evening (8:00 PM)</span>
        </div>
        <button className="small-btn">Mark Taken</button>
      </div>
      <h2 className="card-title" style={{ marginTop: '24px' }}>
        As Needed
      </h2>
      <div className="list-item-card">
        <div className="item-left">
          <span className="item-title">Ibuprofen (200mg)</span>
          <span className="item-sub">For pain relief. Max 3 per day.</span>
        </div>
      </div>
    </>
  )
}

export default MedsView
