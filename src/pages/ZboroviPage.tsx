import { useState } from 'react'
import { Search, Filter, Calendar, MapPin, Users, ChevronDown, ArrowRight } from 'lucide-react'

function ZboroviPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [expandedZbor, setExpandedZbor] = useState<number | null>(null)

  const toggleZborExpand = (id: number) => {
    setExpandedZbor(expandedZbor === id ? null : id)
  }

  const statusOptions = ['Svi zborovi', 'Sazvani', 'Nisu sazvani']

  const zborovi = [
    {
      id: 1,
      name: 'Zbor građana mesne zajednice Centar',
      status: 'sazvan',
      date: '2023-06-15',
      time: '18:00',
      location: 'Ulica Slobode 1, Beograd',
      description:
        'Zbor građana mesne zajednice Centar o problemima saobraćaja i parkinga. Diskutovaćemo o mogućim rešenjima za poboljšanje saobraćajne infrastrukture i regulisanje parkinga u centralnoj zoni grada.',
      agenda: [
        'Predstavljanje problema saobraćaja i parkinga u mesnoj zajednici',
        'Diskusija o mogućim rešenjima',
        'Formiranje radne grupe za izradu predloga',
        'Dogovor o narednim koracima',
      ],
      attendees: 28,
      organizer: 'Savet mesne zajednice Centar',
      contact: 'mz.centar@gmail.com',
    },
    {
      id: 2,
      name: 'Zbor građana mesne zajednice Novi Grad',
      status: 'nije-sazvan',
      date: '',
      time: '',
      location: 'Bulevar Oslobođenja 15, Beograd',
      description:
        'Inicijativa za sazivanje zbora građana mesne zajednice Novi Grad o problemima komunalne infrastrukture. Potrebno je prikupiti još 50 potpisa građana za sazivanje zbora.',
      agenda: [],
      attendees: 0,
      organizer: 'Inicijativni odbor građana',
      contact: 'inicijativa.novigrad@gmail.com',
    },
    {
      id: 3,
      name: 'Zbor građana mesne zajednice Dorćol',
      status: 'sazvan',
      date: '2023-06-25',
      time: '18:30',
      location: 'Cara Dušana 35, Beograd',
      description:
        'Zbor građana o problemima komunalne infrastrukture na Dorćolu. Razgovaraćemo o problemima vodovodne i kanalizacione mreže, javne rasvete i održavanja zelenih površina.',
      agenda: [
        'Predstavljanje problema komunalne infrastrukture',
        'Diskusija o prioritetima za rešavanje',
        'Formiranje radne grupe za praćenje realizacije',
        'Dogovor o narednim koracima',
      ],
      attendees: 32,
      organizer: 'Savet mesne zajednice Dorćol',
      contact: 'mz.dorcol@gmail.com',
    },
    {
      id: 4,
      name: 'Zbor građana mesne zajednice Vračar',
      status: 'sazvan',
      date: '2023-06-28',
      time: '19:00',
      location: 'Njegoševa 77, Beograd',
      description:
        'Zbor građana o problemima javnih površina i zelenih oaza na Vračaru. Diskutovaćemo o očuvanju postojećih i stvaranju novih zelenih površina, kao i o problemima uzurpacije javnih površina.',
      agenda: [
        'Predstavljanje stanja javnih i zelenih površina',
        'Diskusija o problemima i mogućim rešenjima',
        'Formiranje radne grupe za izradu predloga',
        'Dogovor o narednim koracima',
      ],
      attendees: 25,
      organizer: 'Savet mesne zajednice Vračar',
      contact: 'mz.vracar@gmail.com',
    },
    {
      id: 5,
      name: 'Zbor građana mesne zajednice Zemun',
      status: 'nije-sazvan',
      date: '',
      time: '',
      location: 'Glavna ulica 18, Zemun',
      description:
        'Inicijativa za sazivanje zbora građana mesne zajednice Zemun o problemima javnog prevoza. Potrebno je prikupiti još 30 potpisa građana za sazivanje zbora.',
      agenda: [],
      attendees: 0,
      organizer: 'Inicijativni odbor građana',
      contact: 'inicijativa.zemun@gmail.com',
    },
    {
      id: 6,
      name: 'Zbor građana mesne zajednice Novi Beograd',
      status: 'sazvan',
      date: '2023-07-02',
      time: '18:00',
      location: 'Bulevar Mihajla Pupina 167, Novi Beograd',
      description:
        'Zbor građana o problemima održavanja stambenih zgrada i javnih površina na Novom Beogradu. Diskutovaćemo o problemima održavanja fasada, liftova, krovova i drugih zajedničkih delova zgrada, kao i o održavanju javnih površina između zgrada.',
      agenda: [
        'Predstavljanje problema održavanja stambenih zgrada',
        'Diskusija o problemima i mogućim rešenjima',
        'Formiranje radne grupe za izradu predloga',
        'Dogovor o narednim koracima',
      ],
      attendees: 40,
      organizer: 'Savet mesne zajednice Novi Beograd',
      contact: 'mz.novibeograd@gmail.com',
    },
  ]

  const filteredZborovi = zborovi.filter((zbor) => {
    const matchesSearch = zbor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         zbor.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === 'Svi zborovi' || selectedStatus === null ||
                         (selectedStatus === 'Sazvani' && zbor.status === 'sazvan') ||
                         (selectedStatus === 'Nisu sazvani' && zbor.status === 'nije-sazvan')
    
    const matchesDate = !selectedDate || zbor.date === selectedDate
    
    return matchesSearch && matchesStatus && matchesDate
  })

  return (
    <div className="pt-16">
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Zborovi građana</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Zborovi građana su sastanci na kojima građani diskutuju o problemima u svojoj mesnoj
              zajednici i donose odluke o njihovom rešavanju.
            </p>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Pretraži zborove..."
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-input bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <select
                  className="w-full md:w-48 pl-4 pr-10 py-3 rounded-md border border-input bg-background appearance-none"
                  value={selectedStatus || 'Svi zborovi'}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
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
          {filteredZborovi.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                Nema zborova koji odgovaraju vašoj pretrazi. Pokušajte sa drugim kriterijumima.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredZborovi.map((zbor) => (
                <div
                  key={zbor.id}
                  className="bg-card rounded-lg shadow-sm overflow-hidden border border-border"
                >
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() => toggleZborExpand(zbor.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-2">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full mr-3 ${
                              zbor.status === 'sazvan'
                                ? 'bg-primary/10 text-primary'
                                : 'bg-muted-foreground/10 text-muted-foreground'
                            }`}
                          >
                            {zbor.status === 'sazvan' ? 'Sazvan' : 'Nije sazvan'}
                          </span>
                          {zbor.status === 'sazvan' && (
                            <div className="flex items-center text-muted-foreground">
                              <Users className="h-4 w-4 mr-1" />
                              <span className="text-sm">{zbor.attendees} učesnika</span>
                            </div>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{zbor.name}</h3>
                        {zbor.status === 'sazvan' ? (
                          <div className="flex items-center text-muted-foreground mb-2">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>
                              {new Date(zbor.date).toLocaleDateString('sr-RS')} u {zbor.time}
                            </span>
                          </div>
                        ) : (
                          <p className="text-muted-foreground mb-2">
                            Inicijativa za sazivanje zbora u toku
                          </p>
                        )}
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{zbor.location}</span>
                        </div>
                      </div>
                      <ChevronDown
                        className={`h-6 w-6 text-muted-foreground transition-transform ${
                          expandedZbor === zbor.id ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {expandedZbor === zbor.id && (
                    <div className="px-6 pb-6 pt-2 border-t border-border mt-2">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                          <h4 className="text-lg font-medium mb-3">O zboru</h4>
                          <p className="text-muted-foreground mb-6">{zbor.description}</p>

                          {zbor.status === 'sazvan' && zbor.agenda.length > 0 && (
                            <>
                              <h4 className="text-lg font-medium mb-3">Dnevni red</h4>
                              <ol className="list-decimal list-inside text-muted-foreground mb-6">
                                {zbor.agenda.map((item, index) => (
                                  <li key={index} className="mb-1">
                                    {item}
                                  </li>
                                ))}
                              </ol>
                            </>
                          )}
                        </div>

                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="text-lg font-medium mb-3">Informacije</h4>
                          <div className="space-y-3 text-sm">
                            <div>
                              <span className="font-medium">Organizator:</span>
                              <p className="text-muted-foreground">{zbor.organizer}</p>
                            </div>
                            <div>
                              <span className="font-medium">Kontakt:</span>
                              <p className="text-muted-foreground">{zbor.contact}</p>
                            </div>
                            {zbor.status === 'sazvan' && (
                              <div>
                                <span className="font-medium">Broj učesnika:</span>
                                <p className="text-muted-foreground">{zbor.attendees}</p>
                              </div>
                            )}
                          </div>

                          <div className="mt-6">
                            {zbor.status === 'sazvan' ? (
                              <button className="w-full px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center">
                                Prijavi se za učešće
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </button>
                            ) : (
                              <button className="w-full px-4 py-2 bg-secondary text-foreground rounded-md font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center">
                                Podrži inicijativu
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </button>
                            )}
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
            <h2 className="text-2xl font-bold mb-4">Želite da organizujete zbor u vašoj mesnoj zajednici?</h2>
            <p className="text-muted-foreground mb-6">
              Ako želite da pokrenete inicijativu za sazivanje zbora u vašoj mesnoj zajednici,
              možete to učiniti kroz našu platformu.
            </p>
            <button className="px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors inline-flex items-center justify-center">
              Pokreni inicijativu
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ZboroviPage 