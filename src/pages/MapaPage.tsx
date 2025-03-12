import { useState, useEffect } from 'react'
import { Search, Filter, Calendar, MapPin, Users, Info, AlertCircle, X, Check, CheckCircle } from 'lucide-react'
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
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    contactPhone: '',
    description: '',
    isResident: false,
  })

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
      <div className="container mx-auto px-6 pb-24">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Mapa beogradskih mesnih zajednica</h2>
          <p className="text-lg mb-4">
            Pronađite svoju mesnu zajednicu na mapi i saznajte status održavanja zbora građana.
            Možete se registrovati za učešće na zboru ili zakazati novi zbor.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-md p-4 mb-8">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          </div>
        ) : (
          <>
            {formSuccess && (
              <div className="bg-green-100 border border-green-200 text-green-800 rounded-md p-4 mb-8 flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-green-600" />
                <p>{formSuccess}</p>
              </div>
            )}
            
            <div className="h-[600px] md:h-[800px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <BelgradeMap 
                assemblies={assemblies}
                onMarkerClick={handleMarkerClick}
                selectedCommunity={selectedCommunity}
                onScheduleAssembly={handleScheduleSubmit}
                onRegisterAttendee={handleRegisterAttendee}
              />
            </div>
          </>
        )}

        {/* Info Section */}
        {!loading && !error && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white mr-4">
                  <span className="font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold">Pronađite svoju mesnu zajednicu</h3>
              </div>
              <p className="text-gray-600">
                Koristite mapu da pronađete vašu mesnu zajednicu i saznate da li se u njoj organizuje zbor građana.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white mr-4">
                  <span className="font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold">Iniciranje zbora građana</h3>
              </div>
              <p className="text-gray-600">
                Ako u vašoj zajednici još uvek nije zakazan zbor, možete biti prvi koji će ga inicirati klikom na marker na mapi.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white mr-4">
                  <span className="font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold">Učestvovanje na zboru</h3>
              </div>
              <p className="text-gray-600">
                Ako je zbor već zakazan, možete se registrovati za učešće i dobijati obaveštenja o njemu.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MapaPage 