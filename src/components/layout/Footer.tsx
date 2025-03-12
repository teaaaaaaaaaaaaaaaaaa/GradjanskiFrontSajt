import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone, FileText, Shield, ExternalLink, HelpCircle } from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <Facebook size={20} />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <Twitter size={20} />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <Instagram size={20} />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <Youtube size={20} />, url: 'https://youtube.com', label: 'YouTube' },
  ]

  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and Mission */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="block mb-4">
              <img 
                src="/5__1_-removebg-preview.png" 
                alt="Građanski Front Logo" 
                className="h-30 md:h-32" 
              />
            </Link>
            <p className="text-white/80 text-sm mt-4">
              Platforma za organizovanje građana kroz radne grupe i zborove. Zajedno stvaramo promene koje su nam potrebne.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Brzi linkovi</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors text-sm flex items-center">
                  <span className="w-5">•</span> Početna
                </Link>
              </li>
              <li>
                <Link to="/zborovi" className="text-white/70 hover:text-white transition-colors text-sm flex items-center">
                  <span className="w-5">•</span> Zborovi
                </Link>
              </li>
              <li>
                <Link to="/radne-grupe" className="text-white/70 hover:text-white transition-colors text-sm flex items-center">
                  <span className="w-5">•</span> Radne grupe
                </Link>
              </li>
              <li>
                <Link to="/mapa" className="text-white/70 hover:text-white transition-colors text-sm flex items-center">
                  <span className="w-5">•</span> Mapa
                </Link>
              </li>
              <li>
                <Link to="/obavesti-me" className="text-white/70 hover:text-white transition-colors text-sm flex items-center">
                  <span className="w-5">•</span> Obavesti me
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Dokumenti</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-white/70 hover:text-white transition-colors text-sm flex items-center">
                  <Shield className="h-4 w-4 mr-2" /> Politika privatnosti
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/70 hover:text-white transition-colors text-sm flex items-center">
                  <FileText className="h-4 w-4 mr-2" /> Uslovi korišćenja
                </Link>
              </li>
              <li>
                <a href="https://www.blokada.info/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" /> INFO
                </a>
              </li>
              <li>
                <Link to="/#faq" className="text-white/70 hover:text-white transition-colors text-sm flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2" /> FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">info@gradjanskifront.rs</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">Beograd, Srbija</span>
              </li>
              <li>
                <h4 className="text-white font-medium text-sm mb-2 mt-4">Pratite nas</h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 hover:bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center transition-colors"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Row - Copyright */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            © {currentYear} Građanski Front. Sva prava zadržana.
          </p>
          <p className="text-white/50 text-sm mt-2 md:mt-0">
            Platforma za organizovanje građana kroz radne grupe i zborove.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 