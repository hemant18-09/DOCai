import { createRoot } from 'react-dom/client'
import 'leaflet/dist/leaflet.css'
import './utils/leafletIcon'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
)
