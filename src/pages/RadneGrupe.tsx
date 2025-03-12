import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, Shield, MessageCircle, Briefcase, Search, Filter, ChevronRight, Bell, X, CheckCircle, Mail } from 'lucide-react'
import ExpandingCard from '../components/ExpandingCard'
// Import Firebase service
import FirebaseService from '../services/FirebaseService'

function RadneGrupe() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showNotification, setShowNotification] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    ime: '',
    prezime: '',
    email: '',
    grupa: '',
    telefon: '',
    mesnaZajednica: ''
  })
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState('')
  const [testEmailSending, setTestEmailSending] = useState(false)
  const [testEmailSuccess, setTestEmailSuccess] = useState<boolean | null>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const radneGrupe = [
    {
      id: 1,
      name: 'GRG za logistiku i donacije (GRGL)',
      description: 'Brine o nabavci hrane, vode, medicinske pomoći i ostalih resursa potrebnih za proteste i blokade.',
      longDescription: 'Građanska radna grupa za logistiku i donacije (GRGL) organizuje prikupljanje i distribuciju neophodnih resursa za proteste i blokade. Naši članovi koordiniraju nabavku hrane, vode, medicinske opreme, i drugih potrepština. Takođe organizujemo i transport, skladištenje i efikasnu raspodelu resursa na terenu. Kroz naš rad obezbeđujemo da svi učesnici protesta imaju pristup osnovnim potrebama tokom akcija.',
      category: 'logistika',
      members: 42,
      icon: <Briefcase className="h-10 w-10 text-red-600" />,
      image: '/logistika.jpg',
      path: '/radne-grupe/logistika'
    },
    {
      id: 2,
      name: 'GRG za bezbednost (GRGB)',
      description: 'Organizuje redarske službe, pruža podršku učesnicima protesta i sprečava provokacije.',
      longDescription: 'Građanska radna grupa za bezbednost (GRGB) ima ključnu ulogu u održavanju mirnog karaktera naših protesta. Naši članovi su obučeni za deeskalaciju napetih situacija, prepoznavanje potencijalnih provokacija i zaštitu učesnika. Redari su raspoređeni strateški tokom protesta, nose prepoznatljive prsluke i u stalnoj su komunikaciji. Naš cilj je da obezbedimo sigurno okruženje za sve učesnike i sprečimo bilo kakve incidente koji bi mogli ugroziti protest.',
      category: 'bezbednost',
      members: 38,
      icon: <Shield className="h-10 w-10 text-red-600" />,
      image: '/bezbednost.jpg',
      path: '/radne-grupe/bezbednost'
    },
    {
      id: 3,
      name: 'GRG za komunikaciju (GRGK)',
      description: 'Obezbeđuje pravovremene informacije za sve učesnike protesta, održava Telegram grupe i pomaže u koordinaciji akcija.',
      longDescription: 'Građanska radna grupa za komunikaciju (GRGK) predstavlja informacioni centar našeg pokreta. Odgovorni smo za pravovremeno širenje tačnih informacija, koordinaciju između različitih grupa i održavanje komunikacionih kanala. Naši članovi administriraju Telegram grupe, kreiraju i distribuiraju važna obaveštenja, i osiguravaju da svi učesnici budu dobro informisani. Takođe radimo na strategijama za efikasnu komunikaciju tokom protesta i blokada kada je to najvažnije.',
      category: 'komunikacija',
      members: 56,
      icon: <MessageCircle className="h-10 w-10 text-red-600" />,
      image: '/komunikacije.jpg',
      path: '/radne-grupe/komunikacija'
    }
  ]

  const categories = [
    { id: 'sve', name: 'Sve grupe' },
    { id: 'logistika', name: 'Logistika' },
    { id: 'bezbednost', name: 'Bezbednost' },
    { id: 'komunikacija', name: 'Komunikacija' }
  ]

  const filteredGrupe = radneGrupe.filter((grupa) => {
    const matchesSearch = grupa.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          grupa.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === null || selectedCategory === 'sve' || grupa.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Show notification after scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !showNotification && !chatOpen) {
        setShowNotification(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [showNotification, chatOpen])

  // Handle click outside chat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node) && chatOpen) {
        setChatOpen(false)
      }
      if (formRef.current && !formRef.current.contains(event.target as Node) && formOpen) {
        setFormOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [chatOpen, formOpen])

  const openChat = () => {
    setShowNotification(false)
    setChatOpen(true)
  }

  const openForm = () => {
    setFormOpen(true)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.ime || !formData.prezime || !formData.email || !formData.grupa) {
      setFormError('Molimo popunite sva obavezna polja.')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setFormError('Molimo unesite validnu email adresu.')
      return
    }

    setFormSubmitting(true)
    setFormError('')

    try {
      // Create data object for Firebase
      const memberData = {
        firstName: formData.ime,
        lastName: formData.prezime,
        email: formData.email,
        workingGroup: formData.grupa,
        phone: formData.telefon || 'Nije unet',
        localCommunity: formData.mesnaZajednica || 'Nije uneta',
        joinedAt: new Date().toISOString(),
      }

      // Save to Firebase
      await FirebaseService.addNewMember(memberData)

      // Send welcome email with template
      const emailData = {
        to: formData.email,
        subject: 'Dobrodošli u Građanski Front',
        template: 'welcome-member',
        templateData: {
          firstName: formData.ime,
          lastName: formData.prezime,
          workingGroup: formData.grupa,
          localCommunity: formData.mesnaZajednica || 'Nije uneta',
          telegramLink: getTelegramLinkForGroup(formData.grupa),
        }
      }

      await FirebaseService.sendEmail(emailData)

      // Show success message but don't reset form data yet
      // so we can still access the selected group for the Telegram link
      setFormSuccess(true)
      
      // We're not automatically closing the form anymore
      // so users have time to click on the Telegram link
      
      // Reset form data but keep the form open
      // setFormData({
      //   ime: '',
      //   prezime: '',
      //   email: '',
      //   grupa: '',
      //   telefon: '',
      //   mesnaZajednica: ''
      // });

      // Don't automatically close the form
      // setTimeout(() => {
      //   setFormSuccess(false);
      //   setFormOpen(false);
      // }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error)
      
      // Even if there's an error, we'll show success in development mode
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Development mode: Showing success despite error')
        setFormSuccess(true)
        
        // Don't automatically close the form
        // setFormData({
        //   ime: '',
        //   prezime: '',
        //   email: '',
        //   grupa: '',
        //   telefon: '',
        //   mesnaZajednica: ''
        // });
        
        // setTimeout(() => {
        //   setFormSuccess(false);
        //   setFormOpen(false);
        // }, 5000);
      } else {
        setFormError('Došlo je do greške prilikom slanja forme. Molimo pokušajte ponovo.')
      }
    } finally {
      setFormSubmitting(false)
    }
  }

  // Add a method to test email sending
  const handleTestEmailSend = async () => {
    if (!formData.email) {
      setFormError('Unesite email adresu za testiranje.')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setFormError('Molimo unesite validnu email adresu.')
      return
    }

    setTestEmailSending(true)
    setFormError('')
    setTestEmailSuccess(null)

    try {
      const result = await FirebaseService.sendTestEmail(formData.email)
      setTestEmailSuccess(result)
      
      if (result) {
        // Show a temporary success message
        setTimeout(() => {
          setTestEmailSuccess(null)
        }, 5000)
      }
    } catch (error) {
      console.error('Error sending test email:', error)
      setFormError('Došlo je do greške prilikom slanja test emaila.')
      setTestEmailSuccess(false)
    } finally {
      setTestEmailSending(false)
    }
  }

  // Helper function to get the appropriate Telegram link based on the selected group
  const getTelegramLinkForGroup = (group: string): string => {
    // Return specific Telegram links for each group
    switch (group) {
      case 'logistika':
        return "https://t.me/+_1VERPtKD4JlMmY8";
      case 'bezbednost':
        return "https://t.me/+U8zxzY4N7r0yYTU8";
      case 'komunikacija':
        return "https://t.me/+FjHt_TzTDns2MjY0";
      default:
        // Fallback to a general link if somehow an invalid group is selected
        return "https://t.me/+xVyPlEJOyX4xODY0";
    }
  };

  return (
    <div className="bg-primary pt-32">
      {/* How to Join Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-anton mb-8">
              ŽELIŠ DA SE PRIKLJUČIŠ? POSTUPAK JE JEDNOSTAVAN!
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 p-6 rounded-lg border border-white/20">
                <div className="text-4xl font-bold mb-4">1</div>
                <h3 className="text-xl font-bold mb-4">Klikni na dugme "Pridruži se"</h3>
                <p>Odaberi radnu grupu koja odgovara tvojim interesima i veštinama</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg border border-white/20">
                <div className="text-4xl font-bold mb-4">2</div>
                <h3 className="text-xl font-bold mb-4">Uđi u Telegram grupu izabrane GRG</h3>
                <p>Dobićeš link za pristup Telegram grupi gde se odvija komunikacija</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg border border-white/20">
                <div className="text-4xl font-bold mb-4">3</div>
                <h3 className="text-xl font-bold mb-4">Prati uputstva i preuzmi ulogu u organizaciji</h3>
                <p>Uključi se u aktivnosti i doprinesi na svoj način</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Working Groups List Section - Using ExpandingCard component with animations */}
      <section id="grupe-lista" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Građanske radne grupe - Srce zajedničkog pokreta</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Građanske radne grupe (GRG) predstavljaju organizacioni temelj pokreta koji pripada svima nama. Svaka grupa ima specifičnu ulogu i odgovornost, 
                a zajedno čine snažnu mrežu koja omogućava efikasno delovanje i ostvarivanje zajedničkih ciljeva. 
                Kroz rad u ovim grupama, svaki građanin može dati svoj doprinos na način koji najbolje odgovara ličnim veštinama i interesima.
              </p>
              <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
                Izaberite grupu koja vas najviše inspiriše, saznajte više o njenom radu i postanite deo kolektiva koji menja društvo. Vaš angažman je ključan za zajednički uspeh!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {radneGrupe.map((grupa, index) => (
                <div 
                  key={grupa.id} 
                  className="animate-fadeIn" 
                  style={{ 
                    animationDelay: `${index * 0.2}s`,
                    opacity: 0,
                    animation: `fadeIn 0.8s ease-out ${index * 0.2}s forwards`
                  }}
                >
                  <ExpandingCard
                    title={grupa.name}
                    description={grupa.description}
                    longDescription={grupa.longDescription}
                    image={grupa.image}
                    icon={grupa.icon}
                    linkPath={grupa.path}
                    footer={
                      <div className="flex justify-between items-center w-full">
                        <span className="text-sm text-gray-500 flex items-center">
                          <Users className="mr-1 h-4 w-4" />
                          {grupa.members} članova
                        </span>
                      </div>
                    }
                    className="min-h-[600px] transform transition-all duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Add keyframes for fadeIn animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `
      }} />

      {/* Final Call to Action - KEPT AT BOTTOM */}
      <section id="cta-section" className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-secondary p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-white-600">samo zajedno mozemo pobediti.</h3>
              <h1 className="text-2xl font-bold mb-4 text-red-600">PRIDRUŽI SE GRAĐANSKIM RADNIM GRUPAMA!</h1>
              <p className="text-lg mb-6 text-white-600">
                Ne čekaj da neko drugi pokrene promene. <strong>Budi deo rešenja!</strong>
              </p>
              <button
                onClick={openForm}
                className="px-8 py-4 bg-white text-primary font-bold text-lg uppercase tracking-wider rounded-md hover:bg-white/90 transition-colors inline-flex items-center justify-center"
              >
                Pridruži se
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Notification */}
      {showNotification && (
        <div 
          className="fixed bottom-6 right-6 bg-secondary text-white p-4 rounded-lg shadow-lg animate-bounce cursor-pointer z-50 flex items-center"
          onClick={openChat}
        >
          <Bell className="mr-2 h-5 w-5" />
          <span>Nova poruka za tebe!</span>
        </div>
      )}

      {/* Chat Window */}
      {chatOpen && (
        <div 
          ref={chatRef}
          className="fixed bottom-6 right-6 bg-white rounded-lg shadow-2xl z-50 w-80 md:w-96 overflow-hidden"
          style={{ maxHeight: '80vh' }}
        >
          {/* Chat Header */}
          <div className="bg-secondary text-white p-4 flex justify-between items-center">
            <h3 className="font-bold">Građanski Front</h3>
            <button onClick={() => setChatOpen(false)} className="text-white hover:text-gray-200">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="p-4 bg-gray-50 h-80 overflow-y-auto">
            <div className="flex justify-start mb-4">
              <div className="bg-secondary text-white rounded-lg p-3 max-w-[80%]">
                <p className="text-sm font-bold">POZIV GRAĐANIMA</p>
                <p className="text-sm mt-2">
                  Borba za ispunjenje naših zahteva zahteva organizovano i odlučno delovanje svih građana. Svaki pojedinac može doprineti na svoj način - bilo kroz učešće u protestima, širenje informacija, logističku podršku ili druge aktivnosti.
                </p>
                <p className="text-sm mt-2">
                  <strong>Naši zahtevi su jasni:</strong> transparentnost, odgovornost, vladavina prava i zaštita javnog interesa. Samo zajedno, organizovani u radne grupe, možemo ostvariti ove ciljeve.
                </p>
                <p className="text-sm mt-2 font-bold">
                  Ne čekajte da neko drugi reši probleme - uključite se i postanite deo rešenja!
                </p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button className="bg-primary text-white rounded-lg p-3 text-sm font-bold hover:bg-primary/90 transition-colors">
                Želim da se uključim!
              </button>
            </div>
          </div>
          
          {/* Chat Input */}
          <div className="p-3 border-t border-gray-200 flex">
            <input 
              type="text" 
              placeholder="Napiši poruku..." 
              className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary text-white p-2 rounded-r-lg">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Registration Form Modal */}
      {formOpen && (
        <div ref={formRef} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <button 
              onClick={() => setFormOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
                  <X className="h-5 w-5" />
            </button>
            
            <h3 className="text-xl font-bold mb-4">Pridruži se radnoj grupi</h3>
            
            {formSuccess ? (
              <div className="text-center py-6">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-green-700 mb-2">Uspešno ste se prijavili!</h4>
                <p className="text-gray-600 mb-6">
                  Poslali smo vam email sa detaljima i uputstvima za dalje korake.
                </p>
                
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-6">
                  <h5 className="font-bold text-gray-700 mb-2">Pridružite se Telegram grupi:</h5>
                  <a 
                    href={getTelegramLinkForGroup(formData.grupa)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-blue-50 border border-blue-200 rounded-md p-3 text-blue-600 hover:bg-blue-100 transition-colors font-medium flex items-center justify-center"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Telegram grupa
                  </a>
                  <p className="text-xs text-gray-500 mt-2">
                    Telegram grupa služi za svakodnevno komuniciranje i dogovor između građana.
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    setFormSuccess(false);
                    setFormOpen(false);
                    // Reset form data when manually closing
                    setFormData({
                      ime: '',
                      prezime: '',
                      email: '',
                      grupa: '',
                      telefon: '',
                      mesnaZajednica: ''
                    });
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors"
                >
                  Zatvori
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
              <div className="space-y-4">
                <div>
                    <label htmlFor="ime" className="block text-sm font-medium text-gray-700 mb-1">Ime *</label>
                  <input
                    type="text"
                    id="ime"
                    name="ime"
                    value={formData.ime}
                    onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                    <label htmlFor="prezime" className="block text-sm font-medium text-gray-700 mb-1">Prezime *</label>
                  <input
                    type="text"
                    id="prezime"
                    name="prezime"
                    value={formData.prezime}
                    onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <div className="flex">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                      />
                      <button
                        type="button"
                        onClick={handleTestEmailSend}
                        disabled={testEmailSending || !formData.email}
                        className="px-3 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 transition-colors disabled:opacity-50 flex items-center"
                        title="Pošalji test email"
                      >
                        {testEmailSending ? (
                          <div className="h-4 w-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Mail className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {testEmailSuccess === true && (
                      <p className="text-green-600 text-xs mt-1">Test email je uspešno poslat!</p>
                    )}
                    {testEmailSuccess === false && (
                      <p className="text-red-600 text-xs mt-1">Neuspešno slanje test emaila.</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                    <input
                      type="tel"
                      id="telefon"
                      name="telefon"
                      value={formData.telefon}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="mesnaZajednica" className="block text-sm font-medium text-gray-700 mb-1">Mesna zajednica</label>
                    <input
                      type="text"
                      id="mesnaZajednica"
                      name="mesnaZajednica"
                      value={formData.mesnaZajednica}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                    <label htmlFor="grupa" className="block text-sm font-medium text-gray-700 mb-1">Radna grupa *</label>
                  <select
                    id="grupa"
                    name="grupa"
                    value={formData.grupa}
                    onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    >
                      <option value="">Izaberite radnu grupu</option>
                      <option value="logistika">GRG za logistiku i donacije</option>
                      <option value="bezbednost">GRG za bezbednost</option>
                      <option value="komunikacija">GRG za komunikaciju</option>
                  </select>
                </div>
                
                  {formError && (
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3">
                      <p>{formError}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                  <button
                    type="submit"
                      disabled={formSubmitting}
                      className="px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                    >
                      {formSubmitting ? (
                        <>
                          <span className="mr-2">Slanje...</span>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </>
                      ) : (
                        'Pridruži se'
                      )}
                  </button>
                  </div>
              </div>
            </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default RadneGrupe 