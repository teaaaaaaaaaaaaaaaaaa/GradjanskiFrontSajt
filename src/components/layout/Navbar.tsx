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
  ]

  // Transparent only when on home page and not scrolled
  const shouldBeTransparent = isHomePage && !scrolled

  const getNavLinkStyles = (isActive: boolean) => {
    return {
      color: '#ffffff', // Always white
      fontWeight: isActive ? 'bold' : 'normal',
      fontSize: '0.875rem', // text-sm
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em', // tracking-wide
      transition: 'all 0.2s ease',
    }
  }

  const getNavLinkClass = (isActive: boolean) => {
    return `nav-link ${isActive ? 'active' : ''}`;
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-24 transition-all duration-300 ${
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

        {/* Logo - left aligned and much larger */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/5__1_-removebg-preview.png" 
              alt="Građanski Front Logo" 
              className="h-20 w-auto" 
              style={{ 
                maxHeight: "none",
                height: "80px",
                display: "block"
              }} 
            />
          </Link>
        </div>

        {/* Desktop navigation links - right side */}
        <div className="hidden md:flex items-center space-x-8 ml-auto">
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

        {/* Mobile navigation menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed left-0 top-16 w-full h-auto bg-black z-40">
            <div className="flex flex-col p-6 space-y-6">
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