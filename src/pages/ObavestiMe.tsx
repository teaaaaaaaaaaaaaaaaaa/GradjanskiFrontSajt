import { useState } from 'react'
import { Bell, Check, MapPin, Users, Calendar, AlertCircle } from 'lucide-react'

function ObavestiMe() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const categories = [
    { id: 'zborovi', name: 'Zborovi' },
    { id: 'plenumi', name: 'Plenumi' },
    { id: 'radne-grupe', name: 'Radne grupe' },
    { id: 'akcije', name: 'Akcije' },
    { id: 'vesti', name: 'Vesti i obaveštenja' },
  ]

  const regions = [
    { id: 'centar', name: 'Centar' },
    { id: 'novi-beograd', name: 'Novi Beograd' },
    { id: 'vracar', name: 'Vračar' },
    { id: 'zemun', name: 'Zemun' },
    { id: 'zvezdara', name: 'Zvezdara' },
    { id: 'palilula', name: 'Palilula' },
    { id: 'savski-venac', name: 'Savski Venac' },
    { id: 'stari-grad', name: 'Stari Grad' },
  ]

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const toggleRegion = (regionId: string) => {
    setSelectedRegions((prev) =>
      prev.includes(regionId)
        ? prev.filter((id) => id !== regionId)
        : [...prev, regionId]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
        setEmail('')
        setName('')
        setSelectedCategories([])
        setSelectedRegions([])
      }, 3000)
    }, 1500)
  }

  const upcomingEvents = [
    {
      id: 1,
      title: 'Zbor građana MZ Centar',
      type: 'Zbor',
      date: '15. jun 2023.',
      time: '18:00',
      location: 'Ulica Slobode 1, Beograd',
    },
    {
      id: 2,
      title: 'Plenum o kulturnoj politici',
      type: 'Plenum',
      date: '18. jun 2023.',
      time: '19:00',
      location: 'Trg Republike 1, Beograd',
    },
    {
      id: 3,
      title: 'Akcija čišćenja parka',
      type: 'Akcija',
      date: '20. jun 2023.',
      time: '10:00',
      location: 'Park Prijateljstva, Novi Beograd',
    },
  ]

  return (
    <div className="pt-16">
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Obavesti me</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Prijavite se za obaveštenja o događajima, plenumima, radnim grupama i drugim
              aktivnostima Građanskog fronta.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Prijava za obaveštenja</h2>

                  {isSuccess ? (
                    <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="text-green-800 font-medium">Uspešno ste se prijavili!</h3>
                        <p className="text-green-700 mt-1">
                          Obaveštenja će biti poslata na vašu email adresu prema izabranim
                          kategorijama i regionima.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Ime i prezime
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-3 rounded-md border border-input bg-background"
                            placeholder="Unesite vaše ime i prezime"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email adresa
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-3 rounded-md border border-input bg-background"
                            placeholder="vasa.adresa@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-3">
                            Kategorije obaveštenja
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {categories.map((category) => (
                              <div
                                key={category.id}
                                className={`flex items-center p-3 rounded-md border cursor-pointer transition-colors ${
                                  selectedCategories.includes(category.id)
                                    ? 'border-primary bg-primary/5'
                                    : 'border-input hover:border-primary/50'
                                }`}
                                onClick={() => toggleCategory(category.id)}
                              >
                                <div
                                  className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${
                                    selectedCategories.includes(category.id)
                                      ? 'bg-primary border-primary'
                                      : 'border-input'
                                  }`}
                                >
                                  {selectedCategories.includes(category.id) && (
                                    <Check className="h-3 w-3 text-white" />
                                  )}
                                </div>
                                <span>{category.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-3">
                            Regioni (opciono)
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {regions.map((region) => (
                              <div
                                key={region.id}
                                className={`flex items-center p-3 rounded-md border cursor-pointer transition-colors ${
                                  selectedRegions.includes(region.id)
                                    ? 'border-primary bg-primary/5'
                                    : 'border-input hover:border-primary/50'
                                }`}
                                onClick={() => toggleRegion(region.id)}
                              >
                                <div
                                  className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${
                                    selectedRegions.includes(region.id)
                                      ? 'bg-primary border-primary'
                                      : 'border-input'
                                  }`}
                                >
                                  {selectedRegions.includes(region.id) && (
                                    <Check className="h-3 w-3 text-white" />
                                  )}
                                </div>
                                <span>{region.name}</span>
                              </div>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Ako ne izaberete nijedan region, dobićete obaveštenja za sve regione.
                          </p>
                        </div>

                        <div className="bg-muted/50 p-4 rounded-md border border-border">
                          <div className="flex items-start">
                            <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 mr-3 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">
                              Vaša email adresa će biti korišćena isključivo za slanje obaveštenja
                              koja ste izabrali. Možete se odjaviti u bilo kom trenutku klikom na
                              link u email poruci.
                            </p>
                          </div>
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="w-full px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <span className="mr-2">Slanje...</span>
                                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              </>
                            ) : (
                              <>
                                <Bell className="mr-2 h-5 w-5" />
                                Prijavi me za obaveštenja
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden sticky top-20">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium">Predstojeći događaji</h3>
                </div>
                <div className="divide-y divide-border">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="p-4">
                      <h4 className="font-medium mb-2">{event.title}</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>
                            {event.date} u {event.time}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{event.type}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-muted/50">
                  <a
                    href="/zborovi"
                    className="text-primary font-medium text-sm hover:underline flex items-center justify-center"
                  >
                    Pogledaj sve događaje
                  </a>
                </div>
              </div>

              <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden mt-6">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium">Telegram grupe</h3>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Pridružite se našim Telegram grupama za brzu komunikaciju i obaveštenja:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a
                        href="https://t.me/gradjanskifront"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Građanski front - Glavni kanal
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://t.me/gf_radnegrupe"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Radne grupe - Koordinacija
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://t.me/gf_zborovi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Zborovi i plenumi - Obaveštenja
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ObavestiMe 