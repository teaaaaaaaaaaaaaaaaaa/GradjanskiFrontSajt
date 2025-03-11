import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'Građanski Front',
      links: [
        { name: 'O nama', path: '/o-nama' },
        { name: 'Misija i vizija', path: '/misija-vizija' },
        { name: 'Kontakt', path: '/kontakt' },
        { name: 'Pridruži se', path: '/register' },
      ],
    },
    {
      title: 'Aktivnosti',
      links: [
        { name: 'Radne grupe', path: '/radne-grupe' },
        { name: 'Zborovi', path: '/zborovi' },
        { name: 'Mapa', path: '/mapa' },
      ],
    },
    {
      title: 'Resursi',
      links: [
        { name: 'Blog', path: '/blog' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Dokumenti', path: '/dokumenti' },
        { name: 'Mediji', path: '/mediji' },
      ],
    },
  ]

  const socialLinks = [
    { icon: <Facebook size={20} />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <Twitter size={20} />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <Instagram size={20} />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <Youtube size={20} />, url: 'https://youtube.com', label: 'YouTube' },
  ]

  return (
    <footer className="bg-secondary py-12 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img src="/logomain.png" alt="Građanski Front Logo" className="h-16" />
            </Link>
            <p className="text-white/70 text-sm">
              Platforma za organizovanje građana kroz radne grupe i zborove.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Brzi linkovi</h3>
            <ul className="space-y-2">
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
            <h3 className="text-white font-bold text-lg mb-4">Resursi</h3>
            <ul className="space-y-2">
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
            <h3 className="text-white font-bold text-lg mb-4">Pratite nas</h3>
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

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm">
            © {currentYear} Građanski Front. Sva prava zadržana.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 