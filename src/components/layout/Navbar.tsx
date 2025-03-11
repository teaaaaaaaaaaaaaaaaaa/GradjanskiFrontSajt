import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from '../theme/ThemeProvider'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme } = useTheme()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

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
    <nav className="gf-navbar fixed top-0 left-0 right-0 z-50 h-16 md:h-20 shadow-sm">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          className="md:hidden text-foreground"
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
                `gf-navbar-link text-sm uppercase tracking-wide ${isActive ? 'active' : ''}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Logo - centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
          <Link to="/" className="flex items-center">
            <img src="/logomain.png" alt="Građanski Front Logo" className="h-32 md:h-48" />
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
                    ? 'gf-button-outline gf-button'
                    : 'gf-button gf-button-primary'
                } rounded-md ${isActive ? 'active' : ''}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile navigation menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-white z-40 p-6">
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `gf-navbar-link text-lg ${isActive ? 'active' : ''}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-6 border-t border-gray-100 flex flex-col space-y-4">
                {authLinks.map((link, index) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `${
                        index === 0
                          ? 'gf-button-outline gf-button'
                          : 'gf-button gf-button-primary'
                      } rounded-md text-center ${isActive ? 'active' : ''}`
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