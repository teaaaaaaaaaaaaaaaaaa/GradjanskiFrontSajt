import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from '../theme/ThemeProvider'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme } = useTheme()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navLinks = [
    { name: 'Početna', path: '/' },
    { name: 'Zborovi', path: '/zborovi' },
    { name: 'Radne grupe', path: '/radne-grupe' },
    { name: 'Mapa', path: '/mapa' },
    { name: 'Plenumi', path: '/plenumi' },
  ]

  const authLinks = [
    { name: 'Prijavi se', path: '/login' },
    { name: 'Registruj se', path: '/register' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-20 transition-all duration-300 ${
      scrolled ? 'bg-secondary/90 shadow-md backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Zatvori meni' : 'Otvori meni'}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop navigation links - left side */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-white text-sm uppercase tracking-wide hover:text-primary transition-colors ${isActive ? 'font-bold' : ''}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Logo - centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
          <Link to="/" className="flex items-center">
            <img src="/5__1_-removebg-preview.png" alt="Građanski Front Logo" className="h-32 md:h-48" />
          </Link>
        </div>

        {/* Auth links - right side */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme toggle button */}
          <button
            className="p-2 rounded-md hover:bg-secondary/10 transition-colors"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          
          {authLinks.map((link, index) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `${
                  index === 0
                    ? 'border border-white text-white hover:bg-white/10'
                    : 'bg-primary text-white hover:bg-primary/90'
                } px-4 py-2 rounded-md transition-colors ${isActive ? 'font-bold' : ''}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile navigation menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-secondary/95 backdrop-blur-sm z-40 p-6">
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-white text-lg ${isActive ? 'font-bold' : ''}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-6 border-t border-white/20 flex flex-col space-y-4">
                {authLinks.map((link, index) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `${
                        index === 0
                          ? 'border border-white text-white'
                          : 'bg-primary text-white'
                      } py-3 rounded-md text-center ${isActive ? 'font-bold' : ''}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 