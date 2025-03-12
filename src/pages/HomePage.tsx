import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, MapPin, Calendar, Bell, ChevronDown, BarChart, Briefcase, Shield, MessageCircle } from 'lucide-react'
import ExpandingCard from '../components/ExpandingCard'

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
      <section className="relative min-h-screen flex items-center">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videohome.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mx-auto max-w-[80%]">
            <div className="text-left lg:pl-[20%]">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-anton mb-6 leading-tight text-white">
                <span className="text-primary">ŽELITE DA POMOGNETE</span> STUDENTIMA?
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white max-w-xl">
                Zajedno možemo stvoriti <br />promene koje su nam potrebne.<br />
                <strong>Vaš glas i angažman su ključni za izgradnju društva kakvo zaslužujemo.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/radne-grupe#grupe-lista"
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
            <div className="hidden lg:flex justify-center items-center relative">
              <img 
                src="/9__1_-removebg-preview.png" 
                alt="Budi i ti na frontu" 
                className="transform scale-125 absolute right-0 h-auto w-auto object-contain z-10"
                style={{ maxWidth: "130%" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white border-t border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-anton mb-4 text-primary">KAKO FUNKCIONIŠE GRAĐANSKI FRONT?</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Naša platforma omogućava građanima da se organizuju, povezuju i aktivno učestvuju u
              društvenim promenama.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Povezivanje</h3>
              <p className="text-foreground/70">
                Povežite se sa drugim građanima koji dele vaše vrednosti i interese za promene u društvu.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Radne grupe</h3>
              <p className="text-foreground/70">
                Pridružite se ili formirajte radne grupe koje se bave specifičnim društvenim pitanjima.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Zborovi</h3>
              <p className="text-foreground/70">
                Učestvujte na lokalnim zborovima gde građani zajednički odlučuju o važnim pitanjima u svojoj zajednici.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Akcije</h3>
              <p className="text-foreground/70">
                Organizujte i učestvujte u konkretnim akcijama koje donose pozitivne promene u društvu.
              </p>
            </div>
          </div>
          
          {/* Questions and Answers Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Question 1 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-primary">Šta je građanski front?</h3>
              <p className="text-foreground/80 text-lg leading-relaxed">
                Platforma koja omogućava građanima da se organizuju, povezuju i aktivno učestvuju u društvenim promenama. 
                Kroz saradnju i zajedničku akciju, stvaramo prostor za aktivno učešće svih koji žele da utiču na bolje sutra.
              </p>
            </div>
            
            {/* Question 2 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-primary">Zašto baš građanski front?</h3>
              <p className="text-foreground/80 text-lg leading-relaxed">
                Građanski front postoji jer samo zajedno možemo stvoriti društvo koje zaslužujemo. 
                Podrška studentima nije samo čin solidarnosti, već korak ka pravednijoj budućnosti za sve. 
                Zajedno ne čekamo promene – mi ih stvaramo!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Građanske Radne Grupe Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-anton mb-4 text-primary">GRAĐANSKE RADNE GRUPE</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Pridružite se nekoj od naših radnih grupa i doprinesite svojim znanjem i iskustvom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* GRG za logistiku */}
            <Link to="/radne-grupe/logistika" className="block">
              <ExpandingCard 
                title="GRG za logistiku i donacije (GRGL)"
                description="Brine o nabavci hrane, vode, medicinske pomoći i ostalih resursa potrebnih za proteste i blokade."
                image="/logistika.jpg"
                icon={<Briefcase className="h-8 w-8" />}
                footer={
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      <Users className="inline-block mr-1 h-4 w-4" />
                      42 članova
                    </span>
                    <span className="text-primary font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform">
                      Saznaj više
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                }
              />
            </Link>

            {/* GRG za bezbednost */}
            <Link to="/radne-grupe/bezbednost" className="block">
              <ExpandingCard 
                title="GRG za bezbednost (GRGB)"
                description="Organizuje redarske službe, pruža podršku učesnicima protesta i sprečava provokacije."
                image="/bezbednost.jpg"
                icon={<Shield className="h-8 w-8" />}
                footer={
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      <Users className="inline-block mr-1 h-4 w-4" />
                      38 članova
                    </span>
                    <span className="text-primary font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform">
                      Saznaj više
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                }
              />
            </Link>

            {/* GRG za komunikaciju */}
            <Link to="/radne-grupe/komunikacija" className="block">
              <ExpandingCard 
                title="GRG za komunikaciju (GRGK)"
                description="Obezbeđuje pravovremene informacije za sve učesnike protesta, održava Telegram grupe i pomaže u koordinaciji akcija."
                image="/komunikacije.jpg"
                icon={<MessageCircle className="h-8 w-8" />}
                footer={
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      <Users className="inline-block mr-1 h-4 w-4" />
                      56 članova
                    </span>
                    <span className="text-primary font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform">
                      Saznaj više
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                }
              />
            </Link>
          </div>

          <div className="text-center mt-10">
            <Link to="/radne-grupe" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors">
              VIDI SVE RADNE GRUPE
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
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
            src="/crven.png" 
            alt="Pomogni Građanskom Frontu" 
            className="h-48 mx-auto mb-6"
          />
          <h2 className="text-3xl md:text-4xl font-anton mb-6">SPREMNI DA SE PRIDRUŽITE?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Popunite formular za prijavu i postanite deo Građanskog fronta. Zajedno možemo napraviti promenu.
          </p>
          <div className="flex justify-center">
            <Link
              to="/obavesti-me"
              className="px-8 py-4 bg-white text-primary font-bold text-lg uppercase tracking-wider rounded-md hover:bg-white/90 transition-colors inline-flex items-center justify-center"
            >
              Obavesti me
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