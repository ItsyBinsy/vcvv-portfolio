import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.jsx'
import { DarkModeProvider } from './context/DarkModeContext'

// Lenis smooth scroll — runs outside React, global
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
})
window.__lenis = lenis

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

document.addEventListener('visibilitychange', () => {
  document.hidden ? lenis.stop() : lenis.start()
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkModeProvider>
      <App />
      <Analytics />
    </DarkModeProvider>
  </StrictMode>,
)
