import { useEffect, useState } from 'react'
import MapView from '../components/MapView.jsx'
import { DoctorIcon } from '../utils/doctorIcon.js'

function SlotsView({ goTo }) {
  const [userLocation, setUserLocation] = useState([37.7749, -122.4194])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude])
      },
      () => {
        console.log('Location permission denied')
      },
    )
  }, [])
  const doctors = [
    {
      name: 'Dr. Emily Yu',
      specialization: 'Primary Care Physician',
      lat: 37.7749,
      lng: -122.4194,
    },
    {
      name: 'Dr. Michael Chen',
      specialization: 'Internal Medicine',
      lat: 37.7849,
      lng: -122.4294,
    },
  ]

  const filteredDoctors =
    filter === 'All'
      ? doctors
      : doctors.filter((d) => d.specialization === filter)

  return (
    <>
      <h1 className="card-title" style={{ marginBottom: '8px' }}>
        Available Appointments
      </h1>
      <div className="location-header">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginRight: '6px' }}
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        Near Current Location (San Francisco, CA)
      </div>
      <div className="slot-card">
        <div className="doc-info-header">
          <div className="doc-details">
            <h3 className="doc-name">Dr. Emily Yu</h3>
            <span className="doc-specialty">Primary Care Physician</span>
            <span className="doc-distance">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              0.8 miles away
            </span>
          </div>
          <img
            src="https://i.pravatar.cc/150?img=42"
            className="doc-avatar"
            alt="Dr Yu"
          />
        </div>
        <div className="slots-container">
          <div className="slot-row">
            <span className="slot-day">Today</span>
            <div className="slot-pills">
              <div
                className="slot-pill"
                onClick={() => alert('Demo: Booking slot for 2:30 PM')}
              >
                2:30 PM
              </div>
              <div
                className="slot-pill"
                onClick={() => alert('Demo: Booking slot for 4:00 PM')}
              >
                4:00 PM
              </div>
            </div>
          </div>
          <div className="slot-row">
            <span className="slot-day">Tmrw</span>
            <div className="slot-pills">
              <div
                className="slot-pill"
                onClick={() => alert('Demo: Booking slot for 9:00 AM')}
              >
                9:00 AM
              </div>
              <div
                className="slot-pill"
                onClick={() => alert('Demo: Booking slot for 11:15 AM')}
              >
                11:15 AM
              </div>
              <div
                className="slot-pill"
                onClick={() => alert('Demo: Booking slot for 3:45 PM')}
              >
                3:45 PM
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="slot-card">
        <div className="doc-info-header">
          <div className="doc-details">
            <h3 className="doc-name">Dr. Michael Chen</h3>
            <span className="doc-specialty">Internal Medicine</span>
            <span className="doc-distance">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              1.5 miles away
            </span>
          </div>
          <img
            src="https://i.pravatar.cc/150?img=11"
            className="doc-avatar"
            alt="Dr Chen"
          />
        </div>
        <div className="slots-container">
          <div className="slot-row">
            <span className="slot-day">Today</span>
            <div className="slot-pills">
              <div
                className="slot-pill"
                onClick={() => alert('Demo: Booking slot for 5:15 PM')}
              >
                5:15 PM
              </div>
            </div>
          </div>
          <div className="slot-row">
            <span className="slot-day">Tmrw</span>
            <div className="slot-pills">
              <div
                className="slot-pill"
                onClick={() => alert('Demo: Booking slot for 10:30 AM')}
              >
                10:30 AM
              </div>
              <div
                className="slot-pill"
                onClick={() => alert('Demo: Booking slot for 1:00 PM')}
              >
                1:00 PM
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <h2 className="card-title" style={{ marginBottom: '8px' }}>
          Nearby Doctors on Map
        </h2>
        <div style={{ marginBottom: '8px' }}>
          <label htmlFor="doc-filter" style={{ fontSize: '14px', marginRight: '8px', color: 'var(--text-soft)' }}>
            Filter by specialization:
          </label>
          <select
            id="doc-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: '8px 10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
          >
            <option>All</option>
            <option>Primary Care Physician</option>
            <option>Internal Medicine</option>
          </select>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-soft)', marginBottom: '8px' }}>
          Showing {filteredDoctors.length} of {doctors.length}
        </div>
        <MapView center={userLocation} locations={filteredDoctors} icon={DoctorIcon} />
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
        onClick={() => goTo('triage')}
      >
        Back
      </button>
    </>
  )
}

export default SlotsView
