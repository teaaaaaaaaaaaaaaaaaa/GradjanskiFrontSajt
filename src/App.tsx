import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ThemeProvider from './components/theme/ThemeProvider'

// Pages
import HomePage from './pages/HomePage'
import RadneGrupe from './pages/RadneGrupe'
import MapaPage from './pages/MapaPage'
import ObavestiMe from './pages/ObavestiMe'
import ZboroviPage from './pages/ZboroviPage'
import PlenumiPage from './pages/PlenumiPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Građanski Front</h1>
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider defaultTheme="light">
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/radne-grupe" element={<RadneGrupe />} />
              <Route path="/mapa" element={<MapaPage />} />
              <Route path="/obavesti-me" element={<ObavestiMe />} />
              <Route path="/zborovi" element={<ZboroviPage />} />
              <Route path="/plenumi" element={<PlenumiPage />} />
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
