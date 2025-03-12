import { useState } from 'react'
import { Bell, Check, MapPin, Users, Calendar, AlertCircle, BarChart, Leaf } from 'lucide-react'
import { Link } from 'react-router-dom'

function ObavestiMe() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedRegion, setSelectedRegion] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')

  const categories = [
    { id: 'zborovi', name: 'Zborovi' },
    { id: 'plenumi', name: 'Plenumi' },
    { id: 'radne-grupe', name: 'Radne grupe' },
    { id: 'akcije', name: 'Akcije' },
    { id: 'vesti', name: 'Vesti i obaveštenja' },
  ]

  const mesneZajednice = [
    "Mesna zajednica 4. juli - Milenka Vesnića 3, 11040 Beograd (Savski Venac)",
    "Mesna zajednica Akademija - Bulevar umetnosti 27, 11070 Beograd (Novi Beograd)",
    "Mesna zajednica Autokomanda - Limska 15, 11010 Beograd (Voždovac)",
    "Mesna zajednica Avala grad - Milene Pavlović Barili 6V, 11231 Beograd (Rakovica)",
    "Mesna zajednica Banjica - Bulevar oslobođenja 96, 11042 Beograd (Voždovac)",
    "Mesna zajednica Bara Reva - Pančevački put 91, 11210 Beograd (Palilula)",
    "Mesna zajednica Bele vode - Belo vrelo 1, 11147 Beograd (Čukarica)",
    "Mesna zajednica Beli Potok - Vase Čarapića 48, 11223 Beli Potok",
    "Mesna zajednica Bežanija - Pere Segedinca 13, 11073 Beograd (Novi Beograd)",
    "Mesna zajednica Bežanijska kosa - Partizanske avijacije 25, 11077 Beograd (Novi Beograd)",
    "Mesna zajednica Borča Greda - Milana Toplice 31, 11211 Borča",
    "Mesna zajednica Braća Veličković - Pilota Mihaila Petrovića 12, 11090 Beograd (Rakovica)",
    "Mesna zajednica Braće Jerković - Meštrovićeva 34, 11010 Beograd (Voždovac)",
    "Mesna zajednica Bulbulder - Dimitrija Tucovića 83, 11120 Beograd (Zvezdara)",
    "Mesna zajednica Cerak - Kosmajska 56A, 11032 Beograd (Čukarica)",
    "Mesna zajednica Činovnička kolonija - Jove Ilića 89, 11042 Beograd (Voždovac)",
    "Mesna zajednica Ćirilo i Metodije - Učiteljska 60, 11050 Beograd (Zvezdara)",
    "Mesna zajednica Čukarička padina - Obalskih radnika 39, 11030 Beograd (Čukarica)",
    "Mesna zajednica Dedinje - Bulevar kneza Aleksandra Karađorđevića 29, 11040 Beograd (Savski Venac)",
    "Mesna zajednica Despot Stefan Lazarević - Garsije Lorke 11A, 11060 Beograd (Palilula)",
    "Mesna zajednica Donji Voždovac - Bože Jankovića 1, 11010 Beograd (Voždovac)",
    "Mesna zajednica Dr Ivan Ribar - Mileve Marić Ajnštajn 28, 11073 Beograd (Novi Beograd)",
    "Mesna zajednica Dunavski kej - Bulevar Zorana Đinđića 64, 11070 Beograd (Novi Beograd)",
    "Mesna zajednica Dunavski venac - Zrenjaninski put 44, 11210 Beograd (Palilula)",
    "Mesna zajednica Dušanovac - Ozrenska 39, 11107 Beograd (Voždovac)",
    "Mesna zajednica Duško Radović - Petra Konjovića 12Đ, 11090 Beograd (Rakovica)",
    "Mesna zajednica Filip Višnjić - Salvadora Aljendea 18, 11060 Beograd (Palilula)",
    "Mesna zajednica Fontana - Pariske komune 13, 11070 Beograd (Novi Beograd)",
    "Mesna zajednica Gavrilo Princip - Pop Lukina 17, 11000 Beograd (Savski Venac)",
    "Mesna zajednica Gazela - Bulevar Milutina Milankovića 34, 11073 Beograd (Novi Beograd)",
    "Mesna zajednica Gornji Voždovac - Isidore Sekulić 9, 11010 Beograd (Voždovac)",
    "Mesna zajednica Hadžipopovac - Ruzveltova 43, 11120 Beograd (Palilula)",
    "Mesna zajednica Ikarus - Aleksinačkih rudara 37, 11070 Beograd (Novi Beograd)",
    "Mesna zajednica Jajinci - Bulevar JNA 86, 11222 Beograd (Voždovac)",
    "Mesna zajednica Jovan Cvijić - Cvijićeva 63, 11108 Beograd (Palilula)",
    "Mesna zajednica Kanarevo brdo - Kanarevo brdo 40, 11090 Beograd (Rakovica)",
    "Mesna zajednica Karaburma Dunav - Stevana Dukića 15, 11060 Beograd (Palilula)",
    "Mesna zajednica Kijevo - Milorada Draškovića 24A, 11090 Beograd (Rakovica)",
    "Mesna zajednica Kneževac - 17. oktobra 16, 11090 Beograd (Rakovica)",
    "Mesna zajednica Košutnjak - Pere Velimirovića 48, 11090 Beograd (Rakovica)",
    "Mesna zajednica Kotež - Trajka Grkovića 5, 11210 Beograd (Palilula)",
    "Mesna zajednica Kumodraž - Vojvode Stepe 571, 11221 Beograd (Voždovac)",
    "Mesna zajednica Kumodraž I - Stara 1, 11221 Beograd (Voždovac)",
    "Mesna zajednica Kumodraž II - Bulevar Peka Dapčevića 376, 11221 Beograd (Voždovac)",
    "Mesna zajednica Labudovo brdo - Serdara Janka Vukotića 2, 11090 Beograd (Rakovica)",
    "Mesna zajednica Lipov lad - Bulevar kralja Aleksandra 298, 11050 Beograd (Zvezdara)",
    "Mesna zajednica Mali Mokri Lug - Bulevar kralja Aleksandra 532, 11050 Beograd (Zvezdara)",
    "Mesna zajednica Medaković III - Borivoja Stevanovića 41, 11050 Beograd (Voždovac)",
    "Mesna zajednica Miljakovac - Bogdana Žerajića 24A, 11090 Beograd (Rakovica)",
    "Mesna zajednica Miljakovački izvori - Velizara Stankovića 1, 11090 Beograd (Rakovica)",
    "Mesna zajednica Milorad Medaković - Milorada Umjenovića 18, 11050 Beograd (Voždovac)",
    "Mesna zajednica Milunka Savić - Vanđela Tome 5, 11010 Beograd (Voždovac)",
    "Mesna zajednica Mirijevo - Školski trg 2, 11160 Beograd (Zvezdara)",
    "Mesna zajednica Mitar Bakić - Pilota Mihaila Petrovića 12, 11090 Beograd (Rakovica)",
    "Mesna zajednica Mitrovo brdo - Zaplanjska 86, 11010 Beograd (Voždovac)",
    "Mesna zajednica Mladost - Gandijeva 114, 11073 Beograd (Novi Beograd)",
    "Mesna zajednica Nadežda Petrović - Čarlija Čaplina 14, 11108 Beograd (Palilula)",
    "Mesna zajednica Nova Borča - Bele Bartoka 36, 11211 Borča",
    "Mesna zajednica Novo Mirijevo - Mirijevski venac 20, 11160 Beograd (Zvezdara)",
    "Mesna zajednica Ovča - Mihaja Emineskua 79, 11212 Ovča",
    "Mesna zajednica Pariske komune - Otona Župančiča 14, 11070 Beograd (Novi Beograd)",
    "Mesna zajednica Pašino brdo - Mijačka 5, 11107 Beograd (Voždovac)",
    "Mesna zajednica Paviljoni - Bulevar maršala Tolbuhina 46, 11070 Beograd (Novi Beograd)",
    "Mesna zajednica Petlovo brdo - Milorada Draškovića 24A, 11090 Beograd (Rakovica)",
    "Mesna zajednica Pinosava - Radisava Stojanovića 37, 11226 Pinosava",
    "Mesna zajednica Rakovica - Bulevar JNA (Rakovica selo) 30, 11222 Beograd (Voždovac)",
    "Mesna zajednica Resnik - 13. oktobra 23, 11231 Beograd (Rakovica)",
    "Mesna zajednica Ripanj - Erčanska 10, 11232 Ripanj",
    "Mesna zajednica Rospi Ćuprija - Višnjička 110V, 11060 Beograd (Palilula)",
    "Mesna zajednica Rušanj - 13. septembra 27, 11194 Rušanj",
    "Mesna zajednica Sava - Jurija Gagarina 221, 11197 Beograd (Novi Beograd)",
    "Mesna zajednica Savski kej - Jurija Gagarina 81, 11197 Beograd (Novi Beograd)",
    "Mesna zajednica Severni bulevar - Pante Srećkovića 3, 11060 Beograd (Zvezdara)",
    "Mesna zajednica Skojevska - Luke Vojvodića 93, 11090 Beograd (Rakovica)",
    "Mesna zajednica Slanci - Maršala Tita 50, 11215 Slanci",
    "Mesna zajednica Slavujev potok - Bulevar kralja Aleksandra 243, 11160 Beograd (Zvezdara)",
    "Mesna zajednica Slobodan Penezić Krcun - Dr Aleksandra Kostića 15, 11000 Beograd (Savski Venac)",
    "Mesna zajednica Smederevski đeram - Zahumska 23A, 11120 Beograd (Zvezdara)",
    "Mesna zajednica Stara Borča - Ivana Milutinovića 12G, 11211 Borča",
    "Mesna zajednica Stara Karaburma - Sime Šolaje 43A, 11060 Beograd (Palilula)",
    "Mesna zajednica Stara Palilula - Dalmatinska 25, 11120 Beograd (Palilula)",
    "Mesna zajednica Stari Aerodrom - Narodnih heroja 42, 11077 Beograd (Novi Beograd)",
    "Mesna zajednica Starina Novak - Kraljice Marije 3A, 11120 Beograd (Palilula)",
    "Mesna zajednica Staro Sajmište - Brodarska 1, 11070 Beograd (Novi Beograd)",
    "Mesna zajednica Staro Žarkovo - Mihajla Valtrovića 36A, 11147 Beograd (Čukarica)",
    "Mesna zajednica Stevan Filipović - Dinarska 14, 11040 Beograd (Savski Venac)",
    "Mesna zajednica Stevan Hristić - Patrisa Lumumbe 70, 11060 Beograd (Palilula)",
    "Mesna zajednica Stevan Sinđelić - Ustanička 194, 11050 Beograd (Zvezdara)",
    "Mesna zajednica Studentski grad - Narodnih heroja 30, 11070 Beograd (Novi Beograd)",
    "Mesna zajednica Šumice - Ustanička 125C, 11050 Beograd (Voždovac)",
    "Mesna zajednica Tašmajdan - Ilije Garašanina 20, 11120 Beograd (Palilula)",
    "Mesna zajednica Tešića kupatilo - Rade Končara 1A, 11107 Beograd (Voždovac)",
    "Mesna zajednica Topčidersko brdo – Senjak - Vase Pelagića 54, 11040 Beograd (Savski Venac)",
    "Mesna zajednica Ušće - Bulevar Zorana Đinđića 44, 11070 Beograd (Novi Beograd)",
    "Mesna zajednica Veliki Mokri Lug - Nikole Grulovića 14, 11126 Beograd (Zvezdara)",
    "Mesna zajednica Vidikovac 1 - Vidikovački venac 1A, 11090 Beograd (Rakovica)",
    "Mesna zajednica Vinogradi - Đorđa Kratovca 50, 11107 Beograd (Voždovac)",
    "Mesna zajednica Višnjica - Maršala Tita 103, 11060 Beograd (Palilula)",
    "Mesna zajednica Višnjička banja - Lepe Stamenković 87, 11060 Beograd (Palilula)",
    "Mesna zajednica Vojvoda Mišić - Dinarska 14, 11040 Beograd (Savski Venac)",
    "Mesna zajednica Vojvoda Mišić - Braće Srnić 35, 11050 Beograd (Zvezdara)",
    "Mesna zajednica Vojvoda Putnik - Ustanička 194, 11050 Beograd (Zvezdara)",
    "Mesna zajednica Vračarsko polje - Bulevar kralja Aleksandra 298, 11050 Beograd (Zvezdara)",
    "Mesna zajednica Vukov spomenik - Zahumska 23A, 11120 Beograd (Zvezdara)",
    "Mesna zajednica Zapadni Vračar - Svetozara Markovića 79, 11000 Beograd (Savski Venac)",
    "Mesna zajednica Zeleni venac - Pop Lukina 17, 11000 Beograd (Savski Venac)",
    "Mesna zajednica Zeleno brdo - Bulevar kralja Aleksandra 395, 11000 Beograd (Zvezdara)",
    "Mesna zajednica Železnička stanica - 13. oktobra 23, 11231 Beograd (Rakovica)",
    "Mesna zajednica Železnik - Darinke Radović 35, 11250 Beograd (Čukarica)",
    "Mesna zajednica Zuce - 2. posebne divizije 5A, 11225 Zuce",
    "Mesna zajednica Zvezdara - Bulevar kralja Aleksandra 243, 11160 Beograd (Zvezdara)"
  ];

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setSuccessMessage('Uspešno ste se prijavili! Obaveštenja će biti poslata na vašu email adresu prema izabranim kategorijama i regionima.')
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
        setEmail('')
        setName('')
        setSelectedCategories([])
        setSelectedRegion('')
        setSuccessMessage('')
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
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Obavesti me</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Prijavite se za obaveštenja o događajima i aktivnostima u vašem okruženju ili oblastima koje vas interesuju.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Column - Scrollable */}
              <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
                <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Podešavanja obaveštenja</h2>
                
                {successMessage && (
                  <div className="bg-green-100 border border-green-200 text-green-800 rounded-md p-4 mb-6 animate-fade-in">
                    <p className="text-sm">{successMessage}</p>
                      </div>
                )}
                
                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-md p-4 mb-6 animate-fade-in">
                    <p className="text-sm">{error}</p>
                    </div>
                )}
                
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email adresa <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                        className="w-full px-3 py-2 rounded-md border border-input bg-background"
                            placeholder="vasa.adresa@email.com"
                            required
                          />
                        </div>
                    
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4">Izaberite vašu mesnu zajednicu</h3>
                      <div className="relative">
                        <select 
                          className="w-full p-3 border border-gray-300 rounded-md bg-white focus:border-primary focus:ring-1 focus:ring-primary"
                          value={selectedRegion}
                          onChange={(e) => setSelectedRegion(e.target.value)}
                        >
                          <option value="">Izaberite mesnu zajednicu</option>
                          {mesneZajednice.map((mz, index) => (
                            <option key={index} value={mz}>
                              {mz}
                            </option>
                          ))}
                        </select>
                      </div>
                        </div>

                        <div>
                      <label className="block text-sm font-medium mb-2">
                        Kategorije koje vas interesuju
                          </label>
                      <div className="space-y-3">
                            {categories.map((category) => (
                          <div key={category.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`category-${category.id}`}
                              className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                              checked={selectedCategories.includes(category.id)}
                              onChange={() => toggleCategory(category.id)}
                            />
                            <label
                              htmlFor={`category-${category.id}`}
                              className="ml-2 block text-sm text-foreground"
                            >
                              {category.name}
                            </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                      <label className="block text-sm font-medium mb-2">
                        Učestalost obaveštenja
                      </label>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="frequency-immediately"
                            name="frequency"
                            value="immediately"
                            className="h-4 w-4 border-input text-primary focus:ring-primary"
                            defaultChecked
                          />
                          <label
                            htmlFor="frequency-immediately"
                            className="ml-2 block text-sm text-foreground"
                          >
                            Odmah (za hitne događaje)
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="frequency-daily"
                            name="frequency"
                            value="daily"
                            className="h-4 w-4 border-input text-primary focus:ring-primary"
                          />
                          <label
                            htmlFor="frequency-daily"
                            className="ml-2 block text-sm text-foreground"
                          >
                            Dnevni pregled
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="frequency-weekly"
                            name="frequency"
                            value="weekly"
                            className="h-4 w-4 border-input text-primary focus:ring-primary"
                          />
                          <label
                            htmlFor="frequency-weekly"
                            className="ml-2 block text-sm text-foreground"
                          >
                            Nedeljni pregled
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="terms"
                        className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                        required
                      />
                      <label
                        htmlFor="terms"
                        className="ml-2 block text-sm text-muted-foreground"
                      >
                        Prihvatam <a href="#" className="text-primary hover:underline">uslove korišćenja</a> i politiku privatnosti
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full px-4 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
                    >
                      Prijavi me za obaveštenja
                    </button>
                      </div>
                    </form>
              </div>
            </div>

            {/* Events Column - Fixed */}
            <div className="relative">
              <div className="sticky top-28 bg-card rounded-lg shadow-sm border border-border overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6">Predstojeći događaji</h2>
                  
                  <div className="space-y-6">
                    <div className="group">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                          <Users className="h-6 w-6" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium group-hover:text-primary transition-colors">Zbor građana MZ Centar</h3>
                          <p className="text-sm text-muted-foreground">15. jun 2023. u 18:00</p>
                          <p className="text-sm text-muted-foreground">Ulica Slobode 1, Beograd</p>
                          <span className="inline-block px-2 py-1 mt-2 text-xs bg-secondary/10 text-secondary rounded">Zbor</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="group">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <BarChart className="h-6 w-6" />
                </div>
                        <div className="flex-grow">
                          <h3 className="font-medium group-hover:text-blue-600 transition-colors">Plenum o kulturnoj politici</h3>
                          <p className="text-sm text-muted-foreground">18. jun 2023. u 19:00</p>
                          <p className="text-sm text-muted-foreground">Trg Republike 1, Beograd</p>
                          <span className="inline-block px-2 py-1 mt-2 text-xs bg-blue-50 text-blue-600 rounded">Plenum</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="group">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                          <Leaf className="h-6 w-6" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium group-hover:text-green-600 transition-colors">Akcija čišćenja parka</h3>
                          <p className="text-sm text-muted-foreground">20. jun 2023. u 10:00</p>
                          <p className="text-sm text-muted-foreground">Park Prijateljstva, Novi Beograd</p>
                          <span className="inline-block px-2 py-1 mt-2 text-xs bg-green-50 text-green-600 rounded">Akcija</span>
                        </div>
                      </div>
                    </div>
                </div>
                  
                  <Link
                    to="/mapa"
                    className="block w-full text-center mt-6 px-4 py-2 bg-background hover:bg-muted border border-input rounded-md text-sm font-medium transition-colors"
                  >
                    Pogledaj sve događaje
                  </Link>
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