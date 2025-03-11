import { useState } from 'react'
import { Search, Filter, Calendar, MapPin, Users, ChevronDown, ArrowRight } from 'lucide-react'

function PlenumiPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [expandedPlenum, setExpandedPlenum] = useState<number | null>(null)

  const togglePlenumExpand = (id: number) => {
    setExpandedPlenum(expandedPlenum === id ? null : id)
  }

  const categories = ['Sve kategorije', 'Kultura', 'Ekologija', 'Obrazovanje', 'Zdravstvo', 'Infrastruktura', 'Socijalna pitanja']

  const plenumi = [
    {
      id: 1,
      title: 'Plenum o kulturnoj politici',
      category: 'Kultura',
      date: '2023-06-18',
      time: '19:00',
      location: 'Trg Republike 1, Beograd',
      description:
        'Plenum o kulturnoj politici i finansiranju nezavisne scene. Diskutovaćemo o problemima finansiranja nezavisne kulturne scene, dostupnosti kulturnih sadržaja i mogućnostima za unapređenje kulturne politike.',
      agenda: [
        'Predstavljanje trenutnog stanja kulturne politike',
        'Diskusija o problemima finansiranja nezavisne scene',
        'Predlozi za unapređenje dostupnosti kulturnih sadržaja',
        'Formiranje radne grupe za izradu predloga kulturne politike',
      ],
      attendees: 45,
      organizer: 'Radna grupa za kulturu',
      contact: 'kultura@gradjanskifront.org',
      moderator: 'Marija Jovanović',
      notes: 'Plenum je otvoren za sve građane. Posebno pozivamo umetnike, kulturne radnike i sve zainteresovane za oblast kulture.',
    },
    {
      id: 2,
      title: 'Plenum o ekološkim problemima',
      category: 'Ekologija',
      date: '2023-06-22',
      time: '18:00',
      location: 'Park Prijateljstva, Novi Beograd',
      description:
        'Plenum o ekološkim problemima i zaštiti životne sredine. Razgovaraćemo o problemima zagađenja vazduha, vode i zemljišta, upravljanju otpadom i zaštiti zelenih površina.',
      agenda: [
        'Predstavljanje trenutnog stanja životne sredine',
        'Diskusija o ključnim ekološkim problemima',
        'Predlozi za unapređenje zaštite životne sredine',
        'Formiranje radne grupe za izradu ekološkog akcionog plana',
      ],
      attendees: 60,
      organizer: 'Radna grupa za ekologiju',
      contact: 'ekologija@gradjanskifront.org',
      moderator: 'Nikola Petrović',
      notes: 'Plenum će biti održan na otvorenom, u Parku prijateljstva. U slučaju lošeg vremena, biće premešten u zatvoreni prostor u blizini.',
    },
    {
      id: 3,
      title: 'Plenum o obrazovnom sistemu',
      category: 'Obrazovanje',
      date: '2023-06-25',
      time: '17:00',
      location: 'Studentski kulturni centar, Kralja Milana 48, Beograd',
      description:
        'Plenum o problemima obrazovnog sistema i mogućnostima za njegovo unapređenje. Diskutovaćemo o kvalitetu obrazovanja, dostupnosti obrazovanja za sve i reformama obrazovnog sistema.',
      agenda: [
        'Predstavljanje trenutnog stanja obrazovnog sistema',
        'Diskusija o ključnim problemima u obrazovanju',
        'Predlozi za unapređenje kvaliteta i dostupnosti obrazovanja',
        'Formiranje radne grupe za izradu predloga obrazovne politike',
      ],
      attendees: 50,
      organizer: 'Radna grupa za obrazovanje',
      contact: 'obrazovanje@gradjanskifront.org',
      moderator: 'Ana Simić',
      notes: 'Plenum je otvoren za sve građane. Posebno pozivamo prosvetne radnike, studente, roditelje i sve zainteresovane za oblast obrazovanja.',
    },
    {
      id: 4,
      title: 'Plenum o zdravstvenom sistemu',
      category: 'Zdravstvo',
      date: '2023-06-30',
      time: '18:30',
      location: 'Dom omladine, Makedonska 22, Beograd',
      description:
        'Plenum o problemima zdravstvenog sistema i mogućnostima za njegovo unapređenje. Diskutovaćemo o kvalitetu zdravstvene zaštite, dostupnosti zdravstvenih usluga i reformama zdravstvenog sistema.',
      agenda: [
        'Predstavljanje trenutnog stanja zdravstvenog sistema',
        'Diskusija o ključnim problemima u zdravstvu',
        'Predlozi za unapređenje kvaliteta i dostupnosti zdravstvene zaštite',
        'Formiranje radne grupe za izradu predloga zdravstvene politike',
      ],
      attendees: 40,
      organizer: 'Radna grupa za zdravstvo',
      contact: 'zdravstvo@gradjanskifront.org',
      moderator: 'Dr Jelena Nikolić',
      notes: 'Plenum je otvoren za sve građane. Posebno pozivamo zdravstvene radnike i sve zainteresovane za oblast zdravstva.',
    },
    {
      id: 5,
      title: 'Plenum o infrastrukturnim problemima',
      category: 'Infrastruktura',
      date: '2023-07-05',
      time: '19:00',
      location: 'Opština Vračar, Njegoševa 77, Beograd',
      description:
        'Plenum o infrastrukturnim problemima i urbanom razvoju. Diskutovaćemo o problemima saobraćajne infrastrukture, javnog prevoza, komunalnih usluga i urbanog planiranja.',
      agenda: [
        'Predstavljanje trenutnog stanja infrastrukture',
        'Diskusija o ključnim infrastrukturnim problemima',
        'Predlozi za unapređenje infrastrukture i urbanog razvoja',
        'Formiranje radne grupe za izradu predloga infrastrukturne politike',
      ],
      attendees: 35,
      organizer: 'Radna grupa za infrastrukturu',
      contact: 'infrastruktura@gradjanskifront.org',
      moderator: 'Milan Đorđević',
      notes: 'Plenum je otvoren za sve građane. Posebno pozivamo stručnjake iz oblasti urbanizma, saobraćaja i komunalnih delatnosti.',
    },
    {
      id: 6,
      title: 'Plenum o socijalnim pitanjima',
      category: 'Socijalna pitanja',
      date: '2023-07-10',
      time: '18:00',
      location: 'Centar za socijalni rad, Ruska 4, Beograd',
      description:
        'Plenum o socijalnim pitanjima i socijalnoj zaštiti. Diskutovaćemo o problemima socijalno ugroženih grupa, socijalnoj inkluziji i reformama sistema socijalne zaštite.',
      agenda: [
        'Predstavljanje trenutnog stanja socijalne zaštite',
        'Diskusija o ključnim socijalnim problemima',
        'Predlozi za unapređenje socijalne zaštite i inkluzije',
        'Formiranje radne grupe za izradu predloga socijalne politike',
      ],
      attendees: 30,
      organizer: 'Radna grupa za socijalna pitanja',
      contact: 'socijala@gradjanskifront.org',
      moderator: 'Ivana Petrović',
      notes: 'Plenum je otvoren za sve građane. Posebno pozivamo socijalne radnike, predstavnike nevladinih organizacija i sve zainteresovane za socijalna pitanja.',
    },
  ]

  const filteredPlenumi = plenumi.filter((plenum) => {
    const matchesSearch = plenum.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plenum.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plenum.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'Sve kategorije' || selectedCategory === null || 
                           plenum.category === selectedCategory
    
    const matchesDate = !selectedDate || plenum.date === selectedDate
    
    return matchesSearch && matchesCategory && matchesDate
  })

  return (
    <div className="pt-16">
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Plenumi</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Plenumi su otvoreni sastanci na kojima građani diskutuju o važnim društvenim pitanjima
              i donose odluke o zajedničkim akcijama.
            </p>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Pretraži plenume..."
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
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="date"
                  className="w-full md:w-48 pl-10 pr-4 py-3 rounded-md border border-input bg-background"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredPlenumi.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                Nema plenuma koji odgovaraju vašoj pretrazi. Pokušajte sa drugim kriterijumima.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredPlenumi.map((plenum) => (
                <div
                  key={plenum.id}
                  className="bg-card rounded-lg shadow-sm overflow-hidden border border-border"
                >
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() => togglePlenumExpand(plenum.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-2">
                          <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mr-3">
                            {plenum.category}
                          </span>
                          <div className="flex items-center text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" />
                            <span className="text-sm">{plenum.attendees} učesnika</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{plenum.title}</h3>
                        <div className="flex items-center text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>
                            {new Date(plenum.date).toLocaleDateString('sr-RS')} u {plenum.time}
                          </span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{plenum.location}</span>
                        </div>
                      </div>
                      <ChevronDown
                        className={`h-6 w-6 text-muted-foreground transition-transform ${
                          expandedPlenum === plenum.id ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {expandedPlenum === plenum.id && (
                    <div className="px-6 pb-6 pt-2 border-t border-border mt-2">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                          <h4 className="text-lg font-medium mb-3">O plenumu</h4>
                          <p className="text-muted-foreground mb-6">{plenum.description}</p>

                          <h4 className="text-lg font-medium mb-3">Dnevni red</h4>
                          <ol className="list-decimal list-inside text-muted-foreground mb-6">
                            {plenum.agenda.map((item, index) => (
                              <li key={index} className="mb-1">
                                {item}
                              </li>
                            ))}
                          </ol>

                          <div className="bg-muted/50 p-4 rounded-md border border-border">
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium">Napomena:</span> {plenum.notes}
                            </p>
                          </div>
                        </div>

                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="text-lg font-medium mb-3">Informacije</h4>
                          <div className="space-y-3 text-sm">
                            <div>
                              <span className="font-medium">Organizator:</span>
                              <p className="text-muted-foreground">{plenum.organizer}</p>
                            </div>
                            <div>
                              <span className="font-medium">Moderator:</span>
                              <p className="text-muted-foreground">{plenum.moderator}</p>
                            </div>
                            <div>
                              <span className="font-medium">Kontakt:</span>
                              <p className="text-muted-foreground">{plenum.contact}</p>
                            </div>
                            <div>
                              <span className="font-medium">Broj učesnika:</span>
                              <p className="text-muted-foreground">{plenum.attendees}</p>
                            </div>
                          </div>

                          <div className="mt-6 space-y-3">
                            <button className="w-full px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center">
                              Prijavi se za učešće
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </button>
                            <button className="w-full px-4 py-2 bg-secondary text-foreground rounded-md font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center">
                              Prijavi se za zapisničara
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
            <h2 className="text-2xl font-bold mb-4">Želite da organizujete plenum?</h2>
            <p className="text-muted-foreground mb-6">
              Ako želite da organizujete plenum o temi koja vam je važna, možete to učiniti kroz
              našu platformu. Pružićemo vam podršku u organizaciji i promociji plenuma.
            </p>
            <button className="px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors inline-flex items-center justify-center">
              Organizuj plenum
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PlenumiPage 