import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react'

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
        { name: 'Plenumi', path: '/plenumi' },
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
    { icon: <Mail size={20} />, url: 'mailto:info@gradjanskifront.org', label: 'Email' },
  ]

  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-primary">Građanski</span>
              <span className="text-2xl font-bold ml-2">Front</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Građanski front je platforma za organizovanje građana kroz radne grupe, plenume i zborove,
              sa ciljem aktivnog učešća u društvenim promenama i demokratskim procesima.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            &copy; {currentYear} Građanski Front. Sva prava zadržana.
          </p>
          <div className="flex space-x-6">
            <Link to="/privatnost" className="text-sm text-muted-foreground hover:text-primary">
              Politika privatnosti
            </Link>
            <Link to="/uslovi" className="text-sm text-muted-foreground hover:text-primary">
              Uslovi korišćenja
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 