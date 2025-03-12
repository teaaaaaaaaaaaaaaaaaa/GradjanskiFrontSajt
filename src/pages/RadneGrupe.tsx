import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, Shield, MessageCircle, Megaphone, Briefcase, Search, Filter } from 'lucide-react'

function RadneGrupe() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const radneGrupe = [
    {
      id: 1,
      name: 'GRG za logistiku i donacije (GRGL)',
      description: 'Brine o nabavci hrane, vode, medicinske pomoći i ostalih resursa potrebnih za proteste i blokade.',
      category: 'logistika',
      members: 42,
      icon: <Briefcase className="h-10 w-10 text-white" />,
    },
    {
      id: 2,
      name: 'GRG za bezbednost (GRGB)',
      description: 'Organizuje redarske službe, pruža podršku učesnicima protesta i sprečava provokacije.',
      category: 'bezbednost',
      members: 38,
      icon: <Shield className="h-10 w-10 text-white" />,
    },
    {
      id: 3,
      name: 'GRG za komunikaciju (GRGK)',
      description: 'Obezbeđuje pravovremene informacije za sve učesnike protesta, održava Telegram grupe i pomaže u koordinaciji akcija.',
      category: 'komunikacija',
      members: 56,
      icon: <MessageCircle className="h-10 w-10 text-white" />,
    }
  ]

  const categories = [
    { id: 'sve', name: 'Sve grupe' },
    { id: 'logistika', name: 'Logistika' },
    { id: 'bezbednost', name: 'Bezbednost' },
    { id: 'komunikacija', name: 'Komunikacija' }
  ]

  const filteredGrupe = radneGrupe.filter((grupa) => {
    const matchesSearch = grupa.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          grupa.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === null || selectedCategory === 'sve' || grupa.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="bg-primary pt-32">
      {/* Hero Section */}
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-anton mb-6">
              GRAĐANSKE RADNE GRUPE SU SRCE I MOZAK NAŠE BORBE!
            </h1>
            <p className="text-xl mb-8 opacity-90">
              <strong>Svaki uspešan pokret zavisi od organizovanih ljudi</strong> koji zajednički rade na ostvarenju ciljeva. 
              Pridruži se jednoj od radnih grupa i <strong>postani deo otpora!</strong>
            </p>
            <Link
              to="#grupe"
              className="px-8 py-4 bg-white text-primary font-bold text-lg uppercase tracking-wider rounded-md hover:bg-white/90 transition-colors inline-flex items-center justify-center"
            >
              Pridruži se sada
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Explanation Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-anton mb-8 text-center">
              ŠTA SU GRAĐANSKE RADNE GRUPE?
            </h2>
            
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 mb-12">
              <p className="text-lg mb-6">
                Svaka Građanska Radna Grupa (GRG) ima svoju specifičnu funkciju, ali svi zajedno činimo organizovani i efikasni pokret. 
                GRG-ovi su <strong>autonomne, samostalne jedinice</strong> koje pomažu u organizaciji protesta, komunikaciji i logistici.
              </p>
              <p className="text-lg mb-6">
                <strong>Odluke donosimo zajedno</strong>, kroz otvorenu diskusiju i dogovor! Nema hijerarhije, 
                svako može preuzeti odgovornost i doprineti na svoj način.
              </p>
              <p className="text-lg font-bold">
                Građanske Radne Grupe su osnova našeg pokreta i ključ za ostvarivanje promena!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-secondary text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">✅ HORIZONTALNA ORGANIZACIJA</h3>
                <p>
                  Nema lidera ni hijerarhije. Svaki član ima jednako pravo glasa i mogućnost da preuzme inicijativu.
                </p>
              </div>
              <div className="bg-secondary text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">✅ TRANSPARENTNOST</h3>
                <p>
                  Sve odluke i aktivnosti su javne i dostupne svim članovima. Nema tajnih dogovora ni skrivenih agendi.
                </p>
              </div>
              <div className="bg-secondary text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">✅ SOLIDARNOST</h3>
                <p>
                  Međusobna podrška i pomoć su temelj našeg delovanja. Zajedno smo jači!
                </p>
              </div>
              <div className="bg-secondary text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">✅ DIREKTNA AKCIJA</h3>
                <p>
                  Ne čekamo da neko drugi reši probleme. Mi sami preuzimamo inicijativu i delujemo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Working Groups List Section */}
      <section id="grupe-lista" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-anton mb-4">RADNE GRUPE</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Pridružite se nekoj od naših radnih grupa i doprinesite svojim znanjem i iskustvom.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              {/* Removed search and filter inputs */}
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredGrupe.map((grupa) => (
                <div key={grupa.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary p-3 rounded-full">
                        {grupa.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{grupa.name}</h3>
                        <p className="text-gray-600 mb-4">{grupa.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            <Users className="inline-block mr-1 h-4 w-4" />
                            {grupa.members} članova
                          </span>
                          <div className="flex gap-2">
                            <Link 
                              to={`/radne-grupe/${grupa.category}`} 
                              className="gf-button gf-button-outline rounded-md flex items-center"
                            >
                              Saznaj više
                              <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                            <button className="gf-button gf-button-primary rounded-md">
                              Pridruži se
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Join Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-anton mb-8">
              ŽELIŠ DA SE PRIKLJUČIŠ? POSTUPAK JE JEDNOSTAVAN!
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 p-6 rounded-lg border border-white/20">
                <div className="text-4xl font-bold mb-4">1</div>
                <h3 className="text-xl font-bold mb-4">Klikni na dugme "Pridruži se"</h3>
                <p>Odaberi radnu grupu koja odgovara tvojim interesima i veštinama</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg border border-white/20">
                <div className="text-4xl font-bold mb-4">2</div>
                <h3 className="text-xl font-bold mb-4">Uđi u Telegram grupu izabrane GRG</h3>
                <p>Dobićeš link za pristup Telegram grupi gde se odvija komunikacija</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg border border-white/20">
                <div className="text-4xl font-bold mb-4">3</div>
                <h3 className="text-xl font-bold mb-4">Prati uputstva i preuzmi ulogu u organizaciji</h3>
                <p>Uključi se u aktivnosti i doprinesi na svoj način</p>
              </div>
            </div>
            
            <div className="bg-secondary p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">SAMO ZAJEDNO MOŽEMO POBEDITI!</h3>
              <p className="text-lg mb-6">
                Ne čekaj da neko drugi pokrene promene. <strong>Budi deo rešenja!</strong>
              </p>
              <Link
                to="#grupe"
                className="px-8 py-4 bg-white text-primary font-bold text-lg uppercase tracking-wider rounded-md hover:bg-white/90 transition-colors inline-flex items-center justify-center"
              >
                Organizujmo se!
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RadneGrupe 