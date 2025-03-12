import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  
  const isHomePage = location.pathname === '/'
  
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
  ]

  // Transparent only when on home page and not scrolled
  const shouldBeTransparent = isHomePage && !scrolled

  const getNavLinkStyles = (isActive: boolean) => {
    return {
      color: '#ffffff', // Always white
      fontWeight: isActive ? 'bold' : 'normal',
      fontSize: '0.875rem', // text-sm
      textTransform: 'uppercase',
      letterSpacing: '0.05em', // tracking-wide
      transition: 'all 0.2s ease',
    }
  }

  const getNavLinkClass = (isActive: boolean) => {
    return `nav-link ${isActive ? 'active' : ''}`;
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-20 transition-all duration-300 ${
      shouldBeTransparent ? 'bg-transparent' : 'bg-secondary shadow-md backdrop-blur-sm'
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
              style={({ isActive }) => getNavLinkStyles(isActive)}
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Logo - centered with top margin */}
        <div className="absolute left-1/2 transform -translate-x-1/2 z-10 mt-3">
          <Link to="/" className="flex items-center">
            <img src="/5__1_-removebg-preview.png" alt="Građanski Front Logo" className="h-32 md:h-48" />
          </Link>
        </div>

        {/* Empty div to maintain navbar layout */}
        <div className="hidden md:block w-[120px]"></div>

        {/* Mobile navigation menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-secondary/95 backdrop-blur-sm z-40 p-6">
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  style={({ isActive }) => ({
                    ...getNavLinkStyles(isActive),
                    fontSize: '1.125rem' // text-lg
                  })}
                  className={({ isActive }) => getNavLinkClass(isActive)}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 