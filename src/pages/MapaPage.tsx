import { useState } from 'react'
import { Search, Filter, Calendar, MapPin, Users, Info } from 'lucide-react'

function MapaPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [activeLocation, setActiveLocation] = useState<number | null>(null)

  const eventTypes = ['Svi događaji', 'Zbor', 'Plenum', 'Radna grupa', 'Akcija']

  const locations = [
    {
      id: 1,
      name: 'Mesna zajednica Centar',
      type: 'Zbor',
      status: 'sazvano', // sazvano or nije-sazvano
      date: '2023-06-15',
      time: '18:00',
      address: 'Ulica Slobode 1, Beograd',
      description: 'Zbor građana mesne zajednice Centar o problemima saobraćaja i parkinga.',
      attendees: 28,
      coordinates: { lat: 44.816667, lng: 20.466667 },
    },
    {
      id: 2,
      name: 'Mesna zajednica Novi Grad',
      type: 'Zbor',
      status: 'nije-sazvano',
      date: '',
      time: '',
      address: 'Bulevar Oslobođenja 15, Beograd',
      description: 'Još uvek nije sazvan zbor za ovu mesnu zajednicu.',
      attendees: 0,
      coordinates: { lat: 44.818333, lng: 20.468333 },
    },
    {
      id: 3,
      name: 'Kulturni centar',
      type: 'Plenum',
      status: 'sazvano',
      date: '2023-06-18',
      time: '19:00',
      address: 'Trg Republike 1, Beograd',
      description: 'Plenum o kulturnoj politici i finansiranju nezavisne scene.',
      attendees: 45,
      coordinates: { lat: 44.815555, lng: 20.465555 },
    },
    {
      id: 4,
      name: 'Park Prijateljstva',
      type: 'Akcija',
      status: 'sazvano',
      date: '2023-06-20',
      time: '10:00',
      address: 'Park Prijateljstva, Novi Beograd',
      description: 'Akcija čišćenja i uređenja parka.',
      attendees: 15,
      coordinates: { lat: 44.820000, lng: 20.470000 },
    },
    {
      id: 5,
      name: 'Opština Vračar',
      type: 'Radna grupa',
      status: 'sazvano',
      date: '2023-06-22',
      time: '17:30',
      address: 'Njegoševa 77, Beograd',
      description: 'Sastanak radne grupe za ekologiju.',
      attendees: 12,
      coordinates: { lat: 44.802222, lng: 20.475555 },
    },
    {
      id: 6,
      name: 'Mesna zajednica Dorćol',
      type: 'Zbor',
      status: 'sazvano',
      date: '2023-06-25',
      time: '18:30',
      address: 'Cara Dušana 35, Beograd',
      description: 'Zbor građana o problemima komunalne infrastrukture.',
      attendees: 32,
      coordinates: { lat: 44.825555, lng: 20.462222 },
    },
  ]

  const filteredLocations = locations.filter((location) => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = selectedType === 'Svi događaji' || selectedType === null || 
                       location.type === selectedType
    
    const matchesDate = !selectedDate || location.date === selectedDate
    
    return matchesSearch && matchesType && matchesDate
  })

  return (
    <div className="pt-16">
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Interaktivna mapa</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Pronađite najbliže zborove, plenume i aktivnosti u vašem okruženju. Filtrirajte po
              datumu, vrsti događaja i lokaciji.
            </p>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Pretraži po lokaciji..."
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-input bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <select
                  className="w-full md:w-48 pl-4 pr-10 py-3 rounded-md border border-input bg-background appearance-none"
                  value={selectedType || 'Svi događaji'}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-muted rounded-lg overflow-hidden h-[600px] relative">
              <div className="absolute inset-0 flex items-center justify-center bg-muted-foreground/10">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Interaktivna mapa će biti učitana ovde
                  </p>
                </div>
              </div>

              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 bg-background p-4 rounded-md shadow-md">
                <h3 className="text-sm font-medium mb-2">Legenda</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full map-status-yellow mr-2"></div>
                    <span className="text-xs">Zbor nije sazvan</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full map-status-blue mr-2"></div>
                    <span className="text-xs">Zbor je sazvan</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
              <div className="p-4 border-b border-border">
                <h2 className="text-lg font-medium">Lokacije ({filteredLocations.length})</h2>
              </div>

              <div className="overflow-y-auto max-h-[520px]">
                {filteredLocations.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-muted-foreground">
                      Nema lokacija koje odgovaraju vašoj pretrazi.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {filteredLocations.map((location) => (
                      <div
                        key={location.id}
                        className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                          activeLocation === location.id ? 'bg-muted/50' : ''
                        }`}
                        onClick={() => setActiveLocation(location.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium">{location.name}</h3>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              location.status === 'sazvano'
                                ? 'bg-primary/10 text-primary'
                                : 'bg-muted-foreground/10 text-muted-foreground'
                            }`}
                          >
                            {location.type}
                          </span>
                        </div>

                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{location.address}</span>
                        </div>

                        {location.status === 'sazvano' ? (
                          <>
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>
                                {new Date(location.date).toLocaleDateString('sr-RS')} u {location.time}
                              </span>
                            </div>

                            <div className="flex items-center text-sm text-muted-foreground">
                              <Users className="h-4 w-4 mr-1" />
                              <span>{location.attendees} učesnika</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Info className="h-4 w-4 mr-1" />
                            <span>Još uvek nije sazvan zbor</span>
                          </div>
                        )}

                        {activeLocation === location.id && (
                          <div className="mt-4 pt-4 border-t border-border">
                            <p className="text-sm text-muted-foreground mb-4">
                              {location.description}
                            </p>
                            {location.status === 'sazvano' ? (
                              <button className="w-full px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                                Prijavi se za učešće
                              </button>
                            ) : (
                              <button className="w-full px-4 py-2 bg-secondary text-foreground rounded-md text-sm font-medium hover:bg-secondary/80 transition-colors">
                                Inicijativa za sazivanje
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
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

export default MapaPage 