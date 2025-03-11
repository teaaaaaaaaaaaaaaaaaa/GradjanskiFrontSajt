import { useState, useEffect } from 'react'
import { Search, Calendar, AlertCircle } from 'lucide-react'
import BelgradeMap from '../components/map/BelgradeMap'
import FirebaseService, { Assembly, localCommunities, SIGNATURE_THRESHOLD } from '../services/FirebaseService'

function MapaPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null)
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

  // Handle marker click on the map
  const handleMarkerClick = (localCommunityId: string) => {
    setSelectedCommunity(localCommunityId)
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
  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!calendarOpen || isSubmitting) return
    
    // Reset form error
    setFormError(null)
    
    // Validate form
    if (!userEmail || !userName || !scheduleDatetime.date || !scheduleDatetime.time || !userPhone) {
      setFormError('Molimo popunite sva obavezna polja.')
      return
    }
    
    // Check if user is from the community
    if (!isFromCommunity) {
      setFormError('Samo stanovnici mesne zajednice mogu zakazati zbor. Molimo potvrdite da ste stanovnik ove mesne zajednice.')
      return
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userEmail)) {
      setFormError('Molimo unesite validnu email adresu.')
      return
    }
    
    // Phone validation - simple check for now
    if (userPhone.length < 6) {
      setFormError('Molimo unesite validan broj telefona.')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Get community info
      const community = localCommunities.find(c => c.id === calendarOpen)
      if (!community) {
        setFormError('Mesna zajednica nije pronađena.')
        setIsSubmitting(false)
        return
      }
      
      // Check if assembly already exists
      const existingAssembly = assemblies.find(a => a.localCommunityId === calendarOpen)
      if (existingAssembly) {
        setFormError(`Zbor je već zakazan za mesnu zajednicu ${community.name}.`)
        setIsSubmitting(false)
        return
      }
      
      // Check if email already used for scheduling any assembly
      const isEmailUsed = await FirebaseService.isEmailUsedForScheduling(userEmail)
      if (isEmailUsed) {
        setFormError('Već ste zakazali zbor sa ovom email adresom.')
        setIsSubmitting(false)
        return
      }
      
      // Schedule the assembly
      const assembly = await FirebaseService.scheduleAssembly(
        calendarOpen,
        scheduleDatetime.date,
        scheduleDatetime.time,
        userEmail,
        userName,
        userPhone,
        `${community.name}, Beograd`,
        `Zbor građana mesne zajednice ${community.name}`
      )
      
      // Update assemblies list
      setAssemblies(prev => [...prev, assembly])
      
      // Close the form
      setCalendarOpen(null)
      
      // Show success message
      setSuccessMessage('Uspešno ste zakazali zbor!')
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Došlo je do greške prilikom zakazivanja zbora.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Filter communities based on search term
  const filteredCommunities = localCommunities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  // Get community name by ID
  const getCommunityName = (communityId: string): string => {
    const community = localCommunities.find(c => c.id === communityId)
    return community ? community.name : 'Nepoznata zajednica'
  }

  return (
    <div className="pt-16">
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Mapa mesnih zajednica Beograda</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Pronađite najbliže zborove u vašem okruženju ili pokrenite inicijativu za sazivanje zbora u vašoj mesnoj zajednici.
            </p>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Pretraži po mesnoj zajednici..."
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-input bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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
            
            {successMessage && (
              <div className="mt-4 bg-green-100 border border-green-200 text-green-800 rounded-md p-4 animate-fade-in">
                <p className="text-sm">{successMessage}</p>
              </div>
            )}
            
            {error && (
              <div className="mt-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-md p-4 animate-fade-in">
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center h-[600px]">
              <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-muted-foreground">Učitavanje mape...</span>
                </div>
          ) : (
            <div className="bg-muted rounded-lg overflow-hidden h-[700px] relative">
              <BelgradeMap 
                assemblies={assemblies}
                onMarkerClick={handleMarkerClick}
                selectedCommunity={selectedCommunity}
                onScheduleClick={handleOpenScheduleForm}
                onRegisterClick={handleRegisterAttendee}
              />

              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 bg-background p-4 rounded-md shadow-md">
                <h3 className="text-sm font-medium mb-2">Legenda</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full bg-red-600 mr-2"></div>
                    <span className="text-xs">Zbor nije zakazan</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-xs">Zbor je zakazan (manje od {SIGNATURE_THRESHOLD} potpisa)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full bg-green-600 mr-2"></div>
                    <span className="text-xs">Zbor je potvrđen (više od {SIGNATURE_THRESHOLD} potpisa)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
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
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
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
              <form onSubmit={handleScheduleSubmit}>
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