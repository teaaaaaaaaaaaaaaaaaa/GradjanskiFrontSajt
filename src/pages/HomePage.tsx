import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, MapPin, Calendar, Bell, ChevronDown } from 'lucide-react'

function HomePage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const features = [
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: 'Radne grupe',
      description: 'Pridružite se radnim grupama prema vašim interesima i veštinama',
      link: '/radne-grupe',
    },
    {
      icon: <MapPin className="h-10 w-10 text-primary" />,
      title: 'Interaktivna mapa',
      description: 'Pronađite najbliže zborove, plenume i aktivnosti u vašem okruženju',
      link: '/mapa',
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: 'Zborovi i plenumi',
      description: 'Učestvujte u donošenju odluka i organizovanju akcija',
      link: '/zborovi',
    },
    {
      icon: <Bell className="h-10 w-10 text-primary" />,
      title: 'Obaveštenja',
      description: 'Budite u toku sa najnovijim aktivnostima i događajima',
      link: '/obavesti-me',
    },
  ]

  const faqs = [
    {
      question: 'Šta je Građanski front?',
      answer:
        'Građanski front je platforma za organizovanje građana kroz radne grupe, plenume i zborove, sa ciljem aktivnog učešća u društvenim promenama i demokratskim procesima.',
    },
    {
      question: 'Kako mogu da se pridružim radnoj grupi?',
      answer:
        'Možete se pridružiti radnoj grupi tako što ćete se registrovati na našem sajtu, a zatim odabrati radnu grupu koja odgovara vašim interesima i veštinama. Takođe možete popuniti formular za preporuku radne grupe.',
    },
    {
      question: 'Šta su plenumi i zborovi?',
      answer:
        'Plenumi su otvoreni sastanci na kojima građani diskutuju o važnim pitanjima i donose odluke. Zborovi su lokalni sastanci organizovani u mesnim zajednicama gde se rešavaju problemi specifični za to područje.',
    },
    {
      question: 'Kako mogu da organizujem zbor u mojoj mesnoj zajednici?',
      answer:
        'Da biste organizovali zbor, potrebno je da se registrujete, a zatim kroz sekciju "Zborovi" popunite formular za organizovanje zbora. Naš tim će vam pružiti podršku u organizaciji.',
    },
    {
      question: 'Da li moram biti član da bih učestvovao/la u aktivnostima?',
      answer:
        'Ne, većina aktivnosti je otvorena za sve građane. Međutim, registracija vam omogućava da dobijate obaveštenja, učestvujete u radnim grupama i imate pristup dodatnim resursima.',
    },
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-muted py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Organizujmo se za <span className="text-primary">bolju budućnost</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                Građanski front je platforma za organizovanje građana kroz radne grupe, plenume i
                zborove. Pridružite se i budite deo promene.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors inline-flex items-center justify-center"
                >
                  Pridruži se
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/radne-grupe"
                  className="px-6 py-3 bg-secondary text-foreground rounded-md font-medium hover:bg-secondary/80 transition-colors inline-flex items-center justify-center"
                >
                  Istraži radne grupe
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg"></div>
              <img
                src="/placeholder-hero.jpg"
                alt="Građanski front - organizovanje građana"
                className="rounded-lg shadow-lg relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Kako funkcioniše Građanski front?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Naša platforma omogućava građanima da se organizuju, povezuju i aktivno učestvuju u
              društvenim promenama.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-primary/10 p-3 rounded-full inline-block mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Link
                  to={feature.link}
                  className="text-primary font-medium inline-flex items-center hover:underline"
                >
                  Saznaj više
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Preview Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Interaktivna mapa aktivnosti</h2>
              <p className="text-xl text-muted-foreground mb-6">
                Pronađite najbliže zborove, plenume i aktivnosti u vašem okruženju. Filtrirajte po
                datumu, vrsti događaja i lokaciji.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full map-status-yellow mr-3 mt-1"></div>
                  <div>
                    <span className="font-medium">Žuta oznaka</span> - Zbor nije sazvan
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full map-status-blue mr-3 mt-1"></div>
                  <div>
                    <span className="font-medium">Plava oznaka</span> - Zbor je sazvan
                  </div>
                </li>
              </ul>
              <Link
                to="/mapa"
                className="px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors inline-flex items-center justify-center"
              >
                Istraži mapu
                <MapPin className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="bg-card rounded-lg shadow-lg p-4">
              <div className="aspect-video bg-muted-foreground/10 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Interaktivna mapa će biti učitana ovde</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Spremni da se pridružite?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Registrujte se danas i postanite deo Građanskog fronta. Zajedno možemo napraviti promenu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-6 py-3 bg-white text-primary rounded-md font-medium hover:bg-white/90 transition-colors inline-flex items-center justify-center"
            >
              Registruj se
            </Link>
            <Link
              to="/radne-grupe"
              className="px-6 py-3 bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 rounded-md font-medium hover:bg-primary-foreground/20 transition-colors inline-flex items-center justify-center"
            >
              Istraži radne grupe
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Često postavljana pitanja</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Odgovori na najčešća pitanja o Građanskom frontu i načinu funkcionisanja.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-border last:border-0 py-6"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="mt-4 text-muted-foreground">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage 