import { useState } from 'react'
import { Search, Filter, Users, ArrowRight, ChevronDown } from 'lucide-react'

function RadneGrupe() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null)

  const toggleGroupExpand = (id: number) => {
    setExpandedGroup(expandedGroup === id ? null : id)
  }

  const categories = [
    'Sve kategorije',
    'Ekologija',
    'Obrazovanje',
    'Zdravstvo',
    'Infrastruktura',
    'Kultura',
    'Socijalna pitanja',
    'Ekonomija',
    'Mediji',
  ]

  const radneGrupe = [
    {
      id: 1,
      name: 'Ekološka radna grupa',
      category: 'Ekologija',
      members: 24,
      description:
        'Radna grupa koja se bavi ekološkim problemima, zaštitom životne sredine i održivim razvojem.',
      longDescription:
        'Naša ekološka radna grupa se fokusira na rešavanje problema zagađenja, očuvanje prirodnih resursa i promociju održivog razvoja. Radimo na projektima kao što su mapiranje divljih deponija, organizovanje akcija čišćenja, edukacija građana o reciklaži i zagovaranje za bolje ekološke politike.',
      projects: [
        'Mapiranje divljih deponija',
        'Akcije čišćenja gradskih zelenih površina',
        'Edukativne radionice o reciklaži',
        'Zagovaranje za bolje ekološke politike',
      ],
      meetings: 'Svake srede u 18h',
      coordinator: 'Ana Petrović',
    },
    {
      id: 2,
      name: 'Obrazovna radna grupa',
      category: 'Obrazovanje',
      members: 18,
      description:
        'Radna grupa koja se bavi unapređenjem obrazovnog sistema i dostupnosti kvalitetnog obrazovanja za sve.',
      longDescription:
        'Obrazovna radna grupa radi na unapređenju kvaliteta obrazovanja i njegovoj dostupnosti svim građanima. Fokusiramo se na analizu obrazovnih politika, razvoj alternativnih obrazovnih programa i podršku učenicima i studentima iz marginalizovanih grupa.',
      projects: [
        'Analiza obrazovnih politika',
        'Razvoj alternativnih obrazovnih programa',
        'Podrška učenicima iz marginalizovanih grupa',
        'Organizovanje besplatnih edukativnih radionica',
      ],
      meetings: 'Svakog utorka u 17:30h',
      coordinator: 'Marko Jovanović',
    },
    {
      id: 3,
      name: 'Zdravstvena radna grupa',
      category: 'Zdravstvo',
      members: 15,
      description:
        'Radna grupa koja se bavi unapređenjem zdravstvenog sistema i dostupnosti zdravstvene zaštite.',
      longDescription:
        'Zdravstvena radna grupa se bavi analizom stanja u zdravstvenom sistemu i predlaganjem rešenja za unapređenje kvaliteta i dostupnosti zdravstvene zaštite. Radimo na projektima koji uključuju monitoring rada zdravstvenih ustanova, edukaciju građana o pravima pacijenata i zagovaranje za bolje zdravstvene politike.',
      projects: [
        'Monitoring rada zdravstvenih ustanova',
        'Edukacija građana o pravima pacijenata',
        'Zagovaranje za bolje zdravstvene politike',
        'Organizovanje preventivnih zdravstvenih pregleda',
      ],
      meetings: 'Svakog četvrtka u 19h',
      coordinator: 'Dr Jelena Nikolić',
    },
    {
      id: 4,
      name: 'Infrastrukturna radna grupa',
      category: 'Infrastruktura',
      members: 20,
      description:
        'Radna grupa koja se bavi unapređenjem gradske infrastrukture i javnog prostora.',
      longDescription:
        'Infrastrukturna radna grupa se fokusira na analizu stanja gradske infrastrukture i javnog prostora, kao i na predlaganje rešenja za njihovo unapređenje. Radimo na projektima koji uključuju mapiranje problematičnih lokacija, zagovaranje za bolje urbanističke politike i organizovanje akcija uređenja javnih prostora.',
      projects: [
        'Mapiranje problematičnih infrastrukturnih lokacija',
        'Zagovaranje za bolje urbanističke politike',
        'Organizovanje akcija uređenja javnih prostora',
        'Razvoj predloga za unapređenje javnog prevoza',
      ],
      meetings: 'Svakog petka u 18h',
      coordinator: 'Milan Đorđević',
    },
    {
      id: 5,
      name: 'Kulturna radna grupa',
      category: 'Kultura',
      members: 12,
      description:
        'Radna grupa koja se bavi promocijom kulture i umetnosti i njihovom dostupnošću svim građanima.',
      longDescription:
        'Kulturna radna grupa radi na promociji kulture i umetnosti i njihovoj dostupnosti svim građanima. Fokusiramo se na organizovanje kulturnih događaja, podršku nezavisnoj kulturnoj sceni i zagovaranje za bolje kulturne politike.',
      projects: [
        'Organizovanje kulturnih događaja u javnom prostoru',
        'Podrška nezavisnoj kulturnoj sceni',
        'Zagovaranje za bolje kulturne politike',
        'Razvoj programa kulturne edukacije za mlade',
      ],
      meetings: 'Svake subote u 16h',
      coordinator: 'Ivana Simić',
    },
    {
      id: 6,
      name: 'Socijalna radna grupa',
      category: 'Socijalna pitanja',
      members: 16,
      description:
        'Radna grupa koja se bavi socijalnim pitanjima i podrškom marginalizovanim grupama.',
      longDescription:
        'Socijalna radna grupa se bavi analizom socijalnih problema i razvojem programa podrške marginalizovanim grupama. Radimo na projektima koji uključuju pružanje direktne pomoći ugroženim građanima, zagovaranje za bolje socijalne politike i edukaciju o socijalnim pravima.',
      projects: [
        'Pružanje direktne pomoći ugroženim građanima',
        'Zagovaranje za bolje socijalne politike',
        'Edukacija o socijalnim pravima',
        'Razvoj programa podrške za beskućnike',
      ],
      meetings: 'Svake srede u 17h',
      coordinator: 'Nikola Pavlović',
    },
  ]

  const filteredGroups = radneGrupe.filter((group) => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'Sve kategorije' || selectedCategory === null || 
                           group.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="pt-16">
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Radne grupe</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Pridružite se radnim grupama prema vašim interesima i veštinama. Zajedno možemo
              napraviti promenu u oblastima koje su vam važne.
            </p>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Pretraži radne grupe..."
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-input bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <select
                  className="w-full md:w-48 pl-4 pr-10 py-3 rounded-md border border-input bg-background appearance-none"
                  value={selectedCategory || 'Sve kategorije'}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredGroups.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                Nema radnih grupa koje odgovaraju vašoj pretrazi. Pokušajte sa drugim kriterijumima.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredGroups.map((group) => (
                <div
                  key={group.id}
                  className="bg-card rounded-lg shadow-sm overflow-hidden border border-border"
                >
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() => toggleGroupExpand(group.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-2">
                          <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mr-3">
                            {group.category}
                          </span>
                          <div className="flex items-center text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" />
                            <span className="text-sm">{group.members} članova</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{group.name}</h3>
                        <p className="text-muted-foreground">{group.description}</p>
                      </div>
                      <ChevronDown
                        className={`h-6 w-6 text-muted-foreground transition-transform ${
                          expandedGroup === group.id ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {expandedGroup === group.id && (
                    <div className="px-6 pb-6 pt-2 border-t border-border mt-2">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                          <h4 className="text-lg font-medium mb-3">O radnoj grupi</h4>
                          <p className="text-muted-foreground mb-4">{group.longDescription}</p>

                          <h4 className="text-lg font-medium mb-3">Projekti</h4>
                          <ul className="list-disc list-inside text-muted-foreground mb-6">
                            {group.projects.map((project, index) => (
                              <li key={index} className="mb-1">
                                {project}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="text-lg font-medium mb-3">Informacije</h4>
                          <div className="space-y-3 text-sm">
                            <div>
                              <span className="font-medium">Koordinator:</span>
                              <p className="text-muted-foreground">{group.coordinator}</p>
                            </div>
                            <div>
                              <span className="font-medium">Sastanci:</span>
                              <p className="text-muted-foreground">{group.meetings}</p>
                            </div>
                            <div>
                              <span className="font-medium">Broj članova:</span>
                              <p className="text-muted-foreground">{group.members}</p>
                            </div>
                          </div>

                          <div className="mt-6">
                            <button className="w-full px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center">
                              Pridruži se grupi
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Želite da predložite novu radnu grupu?</h2>
            <p className="text-muted-foreground mb-6">
              Ako imate ideju za novu radnu grupu koja bi se bavila temom koja nije pokrivena
              postojećim grupama, možete predložiti njeno osnivanje.
            </p>
            <button className="px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors inline-flex items-center justify-center">
              Predloži novu radnu grupu
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RadneGrupe 