import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ThemeProvider from './components/theme/ThemeProvider'
import LoadingScreen from './components/animation/LoadingScreen'

// Pages
import HomePage from './pages/HomePage'
import RadneGrupe from './pages/RadneGrupe'
import MapaPage from './pages/MapaPage'
import ObavestiMe from './pages/ObavestiMe'
import ZboroviPage from './pages/ZboroviPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'
import GRGLogistika from './pages/GRGLogistika'
import GRGBezbednost from './pages/GRGBezbednost'
import GRGKomunikacija from './pages/GRGKomunikacija'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'

function App() {
  const [showLoading, setShowLoading] = useState(true)
  const [hasVisited, setHasVisited] = useState(false)

  useEffect(() => {
    // Proveri da li je korisnik već posetio sajt
    const visited = localStorage.getItem('hasVisitedGradjanskiFront')
    
    if (visited) {
      // Ako je već posetio, prikaži loading screen samo kratko
      // Ipak prikazujemo loading screen, ali kraće vreme
      setHasVisited(true)
    } else {
      // Ako je prvi put, prikaži punu animaciju
      localStorage.setItem('hasVisitedGradjanskiFront', 'true')
      setHasVisited(false)
    }
    
    // Ne prekidamo loading screen ovde, već puštamo da animacija sama završi
  }, [])

  const handleLoadingComplete = () => {
    setShowLoading(false)
  }

  return (
    <ThemeProvider>
      {showLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      
      <Router>
        <div className={`flex flex-col min-h-screen bg-white ${showLoading ? 'hidden' : ''}`}>
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/radne-grupe" element={<RadneGrupe />} />
              <Route path="/radne-grupe/logistika" element={<GRGLogistika />} />
              <Route path="/radne-grupe/bezbednost" element={<GRGBezbednost />} />
              <Route path="/radne-grupe/komunikacija" element={<GRGKomunikacija />} />
              <Route path="/mapa" element={<MapaPage />} />
              <Route path="/zborovi" element={<ZboroviPage />} />
              <Route path="/obavesti-me" element={<ObavestiMe />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
