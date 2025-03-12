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
      question: "Šta je Građanski Front?",
      answer: "Građanski Front je platforma za organizovanje građana kroz radne grupe i zborove. Naš cilj je da olakšamo koordinaciju i komunikaciju između građana koji žele da se aktivno uključe u društvene promene."
    },
    {
      question: "Kako se mogu pridružiti radnoj grupi?",
      answer: "Možete se pridružiti radnoj grupi pristupom na link Telegram grupe za određenu radnu grupu."
    },
    {
      question: "Kako mogu da učestvujem na zboru?",
      answer: "Na stranici 'zborovi' možete odabrati svoju mesnu zajednicu i klikom na nju dati predlog za održavanje zbora na lokalnom nivou."
    },
    {
      question: "Kako mogu da pomognem?", 
      answer: "Na stranici 'radne grupe' možete pronaći različite načine da se uključite u aktivnosti Građanskog Fronta, od logistike do komunikacije."
    },
    {
      question: "Da li je Građanski front zvanična organizacija?",
      answer: "Ne, Građanski front nije formalna organizacija, već digitalna platforma koja pomaže u povezivanju ljudi i širenju informacija."
    },
    {
      question: "Ko stoji iza Građanskog fronta?",
      answer: "Građanski front čini grupa građana koji veruju u pravo na otpor i demokratiju. Platforma nije vezana za političke stranke."
    },
    {
      question: "Kako mogu da pomognem ako ne mogu fizički da prisustvujem protestima i zborovima?",
      answer: "Možete širiti informacije na društvenim mrežama, donirati resurse ili pomoći u organizaciji iz pozadine."
    },
    {
      question: "Kako se razlikujemo od drugih aktivističkih pokreta?",
      answer: "Građanski front se fokusira na povezivanje i logističku podršku građanima, uz transparentne informacije i digitalnu koordinaciju."
    },
    {
      question: "Šta radimo ako vlasti pokušaju da blokiraju pristup sajtu?",
      answer: "Imamo alternativne komunikacione kanale, Telegram grupe, kako one vezane za radne grupe tako i one na nivou mesne zajednice."
    },
    {
      question: "Ko može da koristi platformu Građanskog Fronta?",
      answer: "Platforma je otvorena za sve građane koji žele da se informišu ili uključe u aktivnosti protesta."
    }
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
              <h1 className="text-5xl md:text-6xl font-anton mb-6">INTERAKTIVNA MAPA ZBOROVA</h1>
              <p className="text-lg text-foreground/80 mb-6">
                Pronađite najbliže zborove u vašem okruženju. Pratite novosti i uključite se u rad lokalne zajednice kroz zborove građana. <br></br><strong>Zajedno možemo napraviti promene koje su nam potrebne.</strong>
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
                to="/zborovi"
                className="gf-button gf-button-primary rounded-md inline-flex items-center justify-center"
              >
                Istraži mapu
                <MapPin className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <Link to="/zborovi" className="block">
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="aspect-video bg-gray-50 rounded-md overflow-hidden relative group">
                  {/* Map image */}
                  <img 
                    src="/mapica.png" 
                    alt="Interaktivna mapa zborova" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Static overlay - always visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>
                  
                  {/* Red pin markers highlight effect */}
                  <div className="absolute inset-0 bg-primary/10 mix-blend-color-burn pointer-events-none"></div>
                  
                  {/* Text overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-lg drop-shadow-md">Mapa zborova Beograda</h3>
                    <p className="text-sm text-white/80 drop-shadow-md">Pronađite i pridružite se zborovima u vašoj mesnoj zajednici</p>
                  </div>
                  
                  {/* Simple hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </Link>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Column */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              {faqs.slice(0, 5).map((faq, index) => (
              <div
                key={index}
                  className="border-b border-gray-100 last:border-0 py-6"
              >
                <button
                  onClick={() => toggleFaq(index)}
                    className="flex justify-between items-center w-full text-left group"
                >
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors duration-200">{faq.question}</h3>
                  <ChevronDown
                      className={`h-5 w-5 text-foreground/60 transition-transform duration-300 group-hover:text-primary ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                  <div 
                    className={`mt-4 text-foreground/80 overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedFaq === index 
                        ? 'max-h-96 opacity-100 transform translate-y-0' 
                        : 'max-h-0 opacity-0 transform -translate-y-2'
                    }`}
                  >
                    <p className="transform transition-transform duration-300 ease-in-out">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Right Column */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              {faqs.slice(5, 10).map((faq, index) => (
                <div
                  key={index + 5}
                  className="border-b border-gray-100 last:border-0 py-6"
                >
                  <button
                    onClick={() => toggleFaq(index + 5)}
                    className="flex justify-between items-center w-full text-left group"
                  >
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors duration-200">{faq.question}</h3>
                    <ChevronDown
                      className={`h-5 w-5 text-foreground/60 transition-transform duration-300 group-hover:text-primary ${
                        expandedFaq === index + 5 ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div 
                    className={`mt-4 text-foreground/80 overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedFaq === index + 5 
                        ? 'max-h-96 opacity-100 transform translate-y-0' 
                        : 'max-h-0 opacity-0 transform -translate-y-2'
                    }`}
                  >
                    <p className="transform transition-transform duration-300 ease-in-out">{faq.answer}</p>
                  </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage 