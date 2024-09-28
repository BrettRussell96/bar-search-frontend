import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MapProvider } from './context/MapContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MapProvider>
      <App />
    </MapProvider>   
  </StrictMode>,
)
