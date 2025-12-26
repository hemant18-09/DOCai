import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

function ResizeHandler() {
  const map = useMap()

  useEffect(() => {
    // Ensure Leaflet recalculates size after being shown in a previously hidden container
    setTimeout(() => {
      map.invalidateSize()
    }, 0)
  }, [map])

  return null
}

function RecenterOnCenter({ center }) {
  const map = useMap()
  useEffect(() => {
    if (center && Array.isArray(center)) {
      map.setView(center)
      setTimeout(() => map.invalidateSize(), 0)
    }
  }, [center, map])
  return null
}

function VisibilityHandler({ observeRef }) {
  const map = useMap()
  useEffect(() => {
    const el = observeRef?.current
    if (!el) return
    // Guard for environments where IntersectionObserver may be unavailable
    if (typeof IntersectionObserver === 'undefined') {
      setTimeout(() => map.invalidateSize(), 0)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => map.invalidateSize(), 0)
          }
        })
      },
      { threshold: 0.1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [map, observeRef])
  return null
}

function isValidLatLngPair(v) {
  return (
    Array.isArray(v) &&
    v.length === 2 &&
    Number.isFinite(v[0]) &&
    Number.isFinite(v[1])
  )
}

export default function MapView({ center, locations, icon }) {
  const fallbackCenter = [17.385044, 78.486671]
  const mapCenter = isValidLatLngPair(center) ? center : fallbackCenter
  const wrapperRef = useRef(null)
  const safeLocations = Array.isArray(locations) ? locations : []

  return (
    <div ref={wrapperRef} style={{ width: '100%' }}>
      <MapContainer
      center={mapCenter}
      zoom={13}
      scrollWheelZoom={false}
      className="h-[400px] w-full rounded-xl"
      style={{ height: '400px', width: '100%', borderRadius: '16px', overflow: 'hidden' }}
      >
        <ResizeHandler />
        <RecenterOnCenter center={mapCenter} />
        <VisibilityHandler observeRef={wrapperRef} />
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {safeLocations.filter((loc) => (
        loc && Number.isFinite(loc.lat) && Number.isFinite(loc.lng)
      )).map((loc, idx) => (
        <Marker
          key={`${loc.lat},${loc.lng},${loc.name ?? idx}`}
          position={[loc.lat, loc.lng]}
          {...(icon ? { icon } : {})}
        >
          <Popup>
            <strong>{loc.name}</strong>
            <br />
            {loc.specialization}
          </Popup>
        </Marker>
      ))}
      </MapContainer>
    </div>
  )
}
