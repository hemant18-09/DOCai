import L from 'leaflet'

// Inline SVG marker as a data URL (teal circle with MD letters)
const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'>
  <defs>
    <filter id='shadow' x='-20%' y='-20%' width='140%' height='140%'>
      <feDropShadow dx='0' dy='2' stdDeviation='2' flood-color='rgba(0,0,0,0.25)'/>
    </filter>
  </defs>
  <circle cx='20' cy='20' r='18' fill='#00879e' filter='url(#shadow)'/>
  <text x='50%' y='56%' text-anchor='middle' font-size='14' font-family='Inter, Arial, sans-serif' fill='#ffffff' font-weight='700'>MD</text>
</svg>`

const iconUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`

export const DoctorIcon = L.icon({
  iconUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -32],
})
