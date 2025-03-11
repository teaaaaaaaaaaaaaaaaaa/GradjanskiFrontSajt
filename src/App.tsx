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
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-white">
          <Navbar />
          <main className="flex-grow pt-24 md:pt-36">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/radne-grupe" element={<RadneGrupe />} />
              <Route path="/mapa" element={<MapaPage />} />
              <Route path="/zborovi" element={<ZboroviPage />} />
              <Route path="/plenumi" element={<PlenumiPage />} />
              <Route path="/obavesti-me" element={<ObavestiMe />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
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
