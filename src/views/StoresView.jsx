import MapView from '../components/MapView.jsx'

function StoresView() {
  const pharmacies = [
    {
      name: 'CVS Pharmacy',
      specialization: 'Pharmacy • Open until 10 PM',
      lat: 37.7749,
      lng: -122.4194,
    },
    {
      name: 'Walgreens',
      specialization: 'Pharmacy • 24 Hours',
      lat: 37.7849,
      lng: -122.4094,
    },
  ]

  return (
    <>
      <div
        style={{
          marginBottom: '16px',
        }}
      >
        <h2 className="card-title" style={{ marginBottom: '4px' }}>
          Pharmacies Near You
        </h2>
        <MapView locations={pharmacies} />
      </div>
      <h2 className="card-title">Nearby Pharmacies</h2>
      <div className="list-item-card">
        <div className="item-left">
          <span className="item-title">CVS Pharmacy</span>
          <span className="item-sub">0.5 miles • Open until 10 PM</span>
        </div>
        <button
          className="small-btn"
          style={{ background: '#F1F5F9', color: 'var(--text-dark)' }}
          onClick={() =>
            window.open(
              'https://www.google.com/maps/search/?api=1&query=CVS+Pharmacy+near+me',
              '_blank',
            )
          }
        >
          Directions
        </button>
      </div>
      <div className="list-item-card">
        <div className="item-left">
          <span className="item-title">Walgreens</span>
          <span className="item-sub">1.2 miles • 24 Hours</span>
        </div>
        <button
          className="small-btn"
          style={{ background: '#F1F5F9', color: 'var(--text-dark)' }}
          onClick={() =>
            window.open(
              'https://www.google.com/maps/search/?api=1&query=Walgreens+near+me',
              '_blank',
            )
          }
        >
          Directions
        </button>
      </div>
    </>
  )
}

export default StoresView
