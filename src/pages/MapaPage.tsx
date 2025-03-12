import { useState, useEffect } from 'react'
import { Search, Filter, Calendar, MapPin, Users, Info, AlertCircle, X } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import BelgradeMap from '../components/map/BelgradeMap'
import FirebaseService, { Assembly, localCommunities, SIGNATURE_THRESHOLD } from '../services/FirebaseService'

// Definisanje custom ikona za markere
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  })
}

// Ikone za različite statuse
const redIcon = createCustomIcon('#a01c1c') // sazvano
const lightRedIcon = createCustomIcon('#ff6b6b') // nije-sazvano

function MapaPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [activeLocation, setActiveLocation] = useState<number | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [assemblies, setAssemblies] = useState<Assembly[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [petitionFormOpen, setPetitionFormOpen] = useState<string | null>(null)
  const [calendarOpen, setCalendarOpen] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [isFromCommunity, setIsFromCommunity] = useState(false)
  const [scheduleDatetime, setScheduleDatetime] = useState({
    date: '',
    time: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Postavite mapLoaded na true kada se komponenta montira
    setMapLoaded(true)
  }, [])

  // Fetch assemblies on component mount
  useEffect(() => {
    const fetchAssemblies = async () => {
      try {
        const data = await FirebaseService.getAssemblies()
        setAssemblies(data)
      } catch (err) {
        setError('Greška prilikom učitavanja podataka o zborovima.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAssemblies()
  }, [])

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

  // Handle marker click on the map
  const handleMarkerClick = (localCommunityId: string) => {
    // TODO: Implement marker click handling
    console.log('Marker clicked:', localCommunityId)
  }

  // Handle opening the petition form 
  const handleRegisterAttendee = async (assemblyId: string) => {
    // Reset form fields
    setUserEmail('')
    setUserName('')
    setUserPhone('')
    setIsFromCommunity(false)
    setFormError(null)
    
    // Open petition form
    setPetitionFormOpen(assemblyId)
  }

  // Handle petition form submission
  const handlePetitionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!petitionFormOpen || isSubmitting) return
    
    // Reset form error
    setFormError(null)
    
    // Validate form
    if (!userEmail || !userName) {
      setFormError('Molimo unesite vaše ime i email adresu.')
      return
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userEmail)) {
      setFormError('Molimo unesite validnu email adresu.')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Get the assembly
      const assembly = assemblies.find(a => a.id === petitionFormOpen)
      if (!assembly) {
        setFormError('Zbor nije pronađen.')
        setIsSubmitting(false)
        return
      }
      
      // Check if email already used for this assembly
      const isEmailRegistered = await FirebaseService.isEmailRegistered(userEmail, assembly.localCommunityName)
      if (isEmailRegistered) {
        setFormError('Već ste potpisali peticiju za ovaj zbor sa ovom email adresom.')
        setIsSubmitting(false)
        return
      }
      
      // Register the attendee with Firebase
      await FirebaseService.registerAttendee(userEmail, userName, petitionFormOpen)
      
      // Refresh assemblies to get updated signature count
      const updatedAssemblies = await FirebaseService.getAssemblies()
      setAssemblies(updatedAssemblies)
      
      // Close the form
      setPetitionFormOpen(null)
      
      // Show success message
      setSuccessMessage('Uspešno ste se prijavili za zbor!')
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Došlo je do greške prilikom registracije.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle opening the calendar form
  const handleOpenScheduleForm = (localCommunityId: string) => {
    // Reset form fields
    setUserEmail('')
    setUserName('')
    setUserPhone('')
    setIsFromCommunity(false)
    setFormError(null)
    setScheduleDatetime({
      date: '',
      time: ''
    })
    
    // Open calendar form
    setCalendarOpen(localCommunityId)
  }

  // Handle scheduling an assembly
  const handleScheduleSubmit = async (
    localCommunityId: string,
    date: string,
    time: string,
    email: string,
    name: string,
    phone: string,
    address: string,
    description: string
  ) => {
    try {
      await FirebaseService.scheduleAssembly(
        localCommunityId,
        date,
        time,
        email,
        name,
        phone,
        address,
        description
      );
      const updatedAssemblies = await FirebaseService.getAssemblies();
      setAssemblies(updatedAssemblies);
      setSuccessMessage('Uspešno ste zakazali zbor!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      throw err;
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!calendarOpen || isSubmitting) return;
    
    setFormError(null);
    
    if (!userEmail || !userName || !scheduleDatetime.date || !scheduleDatetime.time || !userPhone) {
      setFormError('Molimo popunite sva obavezna polja.');
      return;
    }
    
    if (!isFromCommunity) {
      setFormError('Samo stanovnici mesne zajednice mogu zakazati zbor. Molimo potvrdite da ste stanovnik ove mesne zajednice.');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      setFormError('Molimo unesite validnu email adresu.');
      return;
    }
    
    if (userPhone.length < 6) {
      setFormError('Molimo unesite validan broj telefona.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const community = localCommunities.find(c => c.id === calendarOpen);
      if (!community) {
        setFormError('Mesna zajednica nije pronađena.');
        return;
      }
      
      const existingAssembly = assemblies.find(a => a.localCommunityId === calendarOpen);
      if (existingAssembly) {
        setFormError(`Zbor je već zakazan za mesnu zajednicu ${community.name}.`);
        return;
      }
      
      const isEmailUsed = await FirebaseService.isEmailUsedForScheduling(userEmail);
      if (isEmailUsed) {
        setFormError('Već ste zakazali zbor sa ovom email adresom.');
        return;
      }
      
      await handleScheduleSubmit(
        calendarOpen,
        scheduleDatetime.date,
        scheduleDatetime.time,
        userEmail,
        userName,
        userPhone,
        `${community.name}, Beograd`,
        `Zbor građana mesne zajednice ${community.name}`
      );
      
      setCalendarOpen(null);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Došlo je do greške prilikom zakazivanja zbora.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get community name by ID
  const getCommunityName = (communityId: string): string => {
    const community = localCommunities.find(c => c.id === communityId)
    return community ? community.name : 'Nepoznata zajednica'
  }

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
              {mapLoaded ? (
                <MapContainer 
                  center={[44.816667, 20.466667]} 
                  zoom={13} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {filteredLocations.map((location) => (
                    <Marker 
                      key={location.id}
                      position={[location.coordinates.lat, location.coordinates.lng]}
                      icon={location.status === 'sazvano' ? redIcon : lightRedIcon}
                      eventHandlers={{
                        click: () => {
                          setActiveLocation(location.id)
                        }
                      }}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-bold text-lg">{location.name}</h3>
                          <p className="text-sm">{location.address}</p>
                          {location.status === 'sazvano' && (
                            <p className="text-sm mt-1">
                              {new Date(location.date).toLocaleDateString('sr-RS')} u {location.time}
                            </p>
                          )}
                          <p className="text-sm mt-2">{location.description}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-muted-foreground/10">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Učitavanje mape...
                    </p>
                  </div>
                </div>
              )}

              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 bg-background p-4 rounded-md shadow-md z-[1000]">
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

      {/* Petition Form Popup */}
      {petitionFormOpen && (
        <div className="calendar-popup">
          <div className="calendar-popup-content">
            <div className="calendar-popup-header">
              <h3>Potpišite peticiju za zbor</h3>
              <button 
                className="calendar-popup-close"
                onClick={() => setPetitionFormOpen(null)}
                disabled={isSubmitting}
              >
                &times;
              </button>
            </div>
            <div className="calendar-popup-body">
              <form onSubmit={handlePetitionSubmit} className="petition-form">
                <p className="text-sm text-muted-foreground mb-4">
                  Vaš potpis je važan za uspešno održavanje zbora. Kada zbor dostigne {SIGNATURE_THRESHOLD} potpisa, 
                  svi učesnici će dobiti email sa kontakt informacijama.
                </p>
                
                {formError && (
                  <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-md flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm">{formError}</p>
                  </div>
                )}
                <div className="space-y-4 mb-4">
                  <div>
                    <label htmlFor="petition-name" className="block text-sm font-medium mb-1">
                      Ime i prezime <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="petition-name"
                      className="w-full px-3 py-2 rounded-md border border-input bg-background"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="petition-email" className="block text-sm font-medium mb-1">
                      Email adresa <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="petition-email"
                      className="w-full px-3 py-2 rounded-md border border-input bg-background"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Na ovu adresu ćete dobiti obaveštenje kada zbor bude potvrđen.
                    </p>
                  </div>
                </div>

                <div className="calendar-popup-footer">
                  <button
                    type="button"
                    className="px-3 py-2 bg-muted text-foreground text-sm rounded-md"
                    onClick={() => setPetitionFormOpen(null)}
                    disabled={isSubmitting}
                  >
                    Otkaži
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-yellow-500 text-white text-sm rounded-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                        Slanje...
                      </>
                    ) : (
                      'Potpišite peticiju'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Form Popup */}
      {calendarOpen && (
        <div className="calendar-popup">
          <div className="calendar-popup-content">
            <div className="calendar-popup-header">
              <h3>Zakaži zbor u {getCommunityName(calendarOpen)}</h3>
              <button 
                className="calendar-popup-close"
                onClick={() => setCalendarOpen(null)}
                disabled={isSubmitting}
              >
                &times;
              </button>
            </div>
            <div className="calendar-popup-body">
              <form onSubmit={handleFormSubmit}>
                {formError && (
                  <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-md flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{formError}</p>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="schedule-name" className="block text-sm font-medium mb-1">
                      Ime i prezime <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="schedule-name"
                      className="w-full px-3 py-2 rounded-md border border-input bg-background"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="schedule-email" className="block text-sm font-medium mb-1">
                      Email adresa <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="schedule-email"
                      className="w-full px-3 py-2 rounded-md border border-input bg-background"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="schedule-phone" className="block text-sm font-medium mb-1">
                      Kontakt telefon <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="schedule-phone"
                      className="w-full px-3 py-2 rounded-md border border-input bg-background"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Ovaj broj će biti dostupan učesnicima zbora.
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="assembly-date" className="block text-sm font-medium mb-1">
                      Datum zbora <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="assembly-date"
                      className="w-full px-3 py-2 rounded-md border border-input bg-background"
                      value={scheduleDatetime.date}
                      onChange={(e) => setScheduleDatetime({...scheduleDatetime, date: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="assembly-time" className="block text-sm font-medium mb-1">
                      Vreme zbora <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      id="assembly-time"
                      className="w-full px-3 py-2 rounded-md border border-input bg-background"
                      value={scheduleDatetime.time}
                      onChange={(e) => setScheduleDatetime({...scheduleDatetime, time: e.target.value})}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="flex items-start mt-4">
                    <input
                      type="checkbox"
                      id="is-from-community"
                      className="mt-1 mr-2"
                      checked={isFromCommunity}
                      onChange={(e) => setIsFromCommunity(e.target.checked)}
                      disabled={isSubmitting}
                    />
                    <label htmlFor="is-from-community" className="text-sm">
                      <span className="font-medium">Potvrđujem da sam stanovnik mesne zajednice {getCommunityName(calendarOpen)}</span>
                      <span className="text-red-500">*</span>
                      <p className="text-xs text-muted-foreground mt-1">
                        Samo stanovnici mesne zajednice mogu zakazati zbor. Lažno predstavljanje je kažnjivo.
                      </p>
                    </label>
                  </div>
                </div>
                
                <div className="calendar-popup-footer mt-6">
                  <button
                    type="button"
                    className="px-3 py-2 bg-muted text-foreground text-sm rounded-md"
                    onClick={() => setCalendarOpen(null)}
                    disabled={isSubmitting}
                  >
                    Otkaži
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-red-600 text-white text-sm rounded-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                        Slanje...
                      </>
                    ) : (
                      'Zakaži zbor'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MapaPage 