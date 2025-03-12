import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <Facebook size={20} />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <Twitter size={20} />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <Instagram size={20} />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <Youtube size={20} />, url: 'https://youtube.com', label: 'YouTube' },
  ]

  return (
    <footer className="bg-secondary text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row">
          {/* Large Logo on Left */}
          <div className="md:w-1/3 flex justify-center md:justify-start mb-6 md:mb-0">
            <Link to="/">
              <img 
                src="/5__1_-removebg-preview.png" 
                alt="Građanski Front Logo" 
                className="h-32 md:h-40" 
              />
            </Link>
          </div>
          
          {/* Links on Right */}
          <div className="md:w-2/3 flex flex-col justify-between">
            {/* Top Row - Navigation Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Brzi linkovi</h3>
                <ul className="space-y-1">
                  <li>
                    <Link to="/" className="gf-footer-link text-sm">Početna</Link>
                  </li>
                  <li>
                    <Link to="/zborovi" className="gf-footer-link text-sm">Zborovi</Link>
                  </li>
                  <li>
                    <Link to="/radne-grupe" className="gf-footer-link text-sm">Radne grupe</Link>
                  </li>
                  <li>
                    <Link to="/mapa" className="gf-footer-link text-sm">Mapa</Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-bold text-lg mb-2">Resursi</h3>
                <ul className="space-y-1">
                  <li>
                    <Link to="/obavesti-me" className="gf-footer-link text-sm">Obavesti me</Link>
                  </li>
                  <li>
                    <a href="#" className="gf-footer-link text-sm">Blog</a>
                  </li>
                  <li>
                    <a href="#" className="gf-footer-link text-sm">Dokumenti</a>
                  </li>
                  <li>
                    <a href="#" className="gf-footer-link text-sm">FAQ</a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-bold text-lg mb-2">Pratite nas</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Row - Copyright */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-white/70 text-sm">
            Platforma za organizovanje građana kroz radne grupe i zborove.
          </p>
          <p className="text-white/50 text-sm mt-2">
            © {currentYear} Građanski Front. Sva prava zadržana.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 