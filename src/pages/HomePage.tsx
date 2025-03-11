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
      description: 'Pronađite najbliže zborove i aktivnosti u vašem okruženju',
      link: '/mapa',
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: 'Zborovi',
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
        'Građanski front je platforma za organizovanje građana kroz radne grupe i zborove, sa ciljem aktivnog učešća u društvenim promenama i demokratskim procesima.',
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
    <div className="pt-0 bg-white">
      {/* Hero Section */}
      <section className="relative bg-white py-0 md:py-0 mb-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-anton mb-6 leading-tight">
                ORGANIZUJMO SE ZA <span className="text-primary">BOLJU BUDUĆNOST</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-lg">
                Građanski front je platforma za organizovanje građana kroz radne grupe i
                zborove. Pridružite se i budite deo promene.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="gf-button gf-button-primary rounded-md flex items-center justify-center"
                >
                  Pridruži se
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/radne-grupe"
                  className="gf-button bg-secondary text-white hover:bg-secondary/90 rounded-md flex items-center justify-center"
                >
                  Istraži radne grupe
                </Link>
              </div>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <img
                src="/budinafrontu.png"
                alt="Budi i ti na frontu"
                className="w-auto h-auto max-h-[650px] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white border-t border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-anton mb-4">KAKO FUNKCIONIŠE GRAĐANSKI FRONT?</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Naša platforma omogućava građanima da se organizuju, povezuju i aktivno učestvuju u
              društvenim promenama.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="bg-primary/10 p-3 rounded-full inline-block mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold uppercase mb-2">{feature.title}</h3>
                <p className="text-foreground/80 mb-4">{feature.description}</p>
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-anton mb-4">INTERAKTIVNA MAPA AKTIVNOSTI</h2>
              <p className="text-lg text-foreground/80 mb-6">
                Pronađite najbliže zborove i aktivnosti u vašem okruženju. Filtrirajte po
                datumu, vrsti događaja i lokaciji.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full map-status-yellow mr-3 mt-1"></div>
                  <div>
                    <span className="font-medium">Crvena oznaka (svetlija)</span> - Zbor nije sazvan
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full map-status-blue mr-3 mt-1"></div>
                  <div>
                    <span className="font-medium">Crvena oznaka</span> - Zbor je sazvan
                  </div>
                </li>
              </ul>
              <Link
                to="/mapa"
                className="gf-button gf-button-primary rounded-md inline-flex items-center justify-center"
              >
                Istraži mapu
                <MapPin className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
              <div className="aspect-video bg-gray-50 rounded-md flex items-center justify-center">
                <p className="text-foreground/60">Interaktivna mapa će biti učitana ovde</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <img 
            src="/logopomogni.png" 
            alt="Pomogni Građanskom Frontu" 
            className="h-48 mx-auto mb-6"
          />
          <h2 className="text-3xl md:text-4xl font-anton mb-6">SPREMNI DA SE PRIDRUŽITE?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Registrujte se danas i postanite deo Građanskog fronta. Zajedno možemo napraviti promenu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-6 py-3 bg-white text-primary font-bold uppercase tracking-wider rounded-md hover:bg-white/90 transition-colors inline-flex items-center justify-center"
            >
              Registruj se
            </Link>
            <Link
              to="/radne-grupe"
              className="px-6 py-3 bg-white/10 text-white border border-white/20 font-bold uppercase tracking-wider rounded-md hover:bg-white/20 transition-colors inline-flex items-center justify-center"
            >
              Istraži radne grupe
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-anton mb-4">ČESTO POSTAVLJANA PITANJA</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Odgovori na najčešća pitanja o Građanskom frontu i načinu funkcionisanja.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 border border-gray-100">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-100 last:border-0 py-5"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h3 className="text-lg font-bold">{faq.question}</h3>
                  <ChevronDown
                    className={`h-5 w-5 text-foreground/60 transition-transform ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="mt-4 text-foreground/80">
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