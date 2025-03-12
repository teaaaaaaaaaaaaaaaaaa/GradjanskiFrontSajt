import { useState, useEffect } from 'react'
import { Search, Calendar } from 'lucide-react'
import BelgradeMap from '../components/map/BelgradeMap'
import FirebaseService, { Assembly, localCommunities } from '../services/FirebaseService'

function ZboroviPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null)
  const [assemblies, setAssemblies] = useState<Assembly[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

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

  const handleMarkerClick = (localCommunityId: string) => {
    setSelectedCommunity(localCommunityId)
  }

  const handleRegisterAttendee = async (email: string, name: string, assemblyId: string) => {
    try {
      await FirebaseService.registerAttendee(email, name, assemblyId)
      const updatedAssemblies = await FirebaseService.getAssemblies()
      setAssemblies(updatedAssemblies)
      setSuccessMessage('Uspešno ste se registrovali za zbor!')
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err) {
      throw err
    }
  }

  const handleScheduleAssembly = async (
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
      const assembly = await FirebaseService.scheduleAssembly(
        localCommunityId,
        date,
        time,
        email,
        name,
        phone,
        address,
        description
      )
      setAssemblies(prev => [...prev, assembly])
      setSuccessMessage('Uspešno ste zakazali zbor!')
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err) {
      throw err
    }
  }

  return (
    <div className="pt-16">
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Zborovi građana</h1>
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

            <div className="flex justify-center gap-6 mb-4">
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm">Zbor nije zakazan</span>
              </div>
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm">Zbor je zakazan (1-9 potpisa)</span>
              </div>
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm">Zbor je potvrđen (10+ potpisa)</span>
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
            <div className="h-[700px] relative bg-muted rounded-lg overflow-hidden">
              <BelgradeMap 
                assemblies={assemblies}
                onMarkerClick={handleMarkerClick}
                selectedCommunity={selectedCommunity}
                onScheduleAssembly={handleScheduleAssembly}
                onRegisterAttendee={handleRegisterAttendee}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ZboroviPage 