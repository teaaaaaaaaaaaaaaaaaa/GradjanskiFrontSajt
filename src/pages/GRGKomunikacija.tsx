import { Link } from 'react-router-dom'
import { ArrowLeft, MessageCircle, Users, UserCheck, Globe, TrendingUp, Radio, X, CheckCircle, Mail } from 'lucide-react'
import { useState, useRef } from 'react'
import FirebaseService from '../services/FirebaseService'

function GRGKomunikacija() {
  const [formOpen, setFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    ime: '',
    prezime: '',
    email: '',
    grupa: 'komunikacija', // Pre-select the komunikacija group
    telefon: '',
    mesnaZajednica: ''
  })
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState('')
  const [testEmailSending, setTestEmailSending] = useState(false)
  const [testEmailSuccess, setTestEmailSuccess] = useState<boolean | null>(null)
  const formRef = useRef<HTMLDivElement>(null)

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
    if (!formData.ime || !formData.prezime || !formData.email) {
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

      // Show success message
      setFormSuccess(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      
      // Even if there's an error, we'll show success in development mode
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Development mode: Showing success despite error')
        setFormSuccess(true)
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
    <div className="pt-16">
      {/* Hero Image */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <img 
          src="/komunikacije.jpg" 
          alt="GRG za komunikaciju" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
          <div className="container mx-auto">
            <div className="flex items-center gap-4">
              <div className="bg-primary p-3 rounded-full">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-anton text-white">GRG ZA KOMUNIKACIJU (GRGK)</h1>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <Link to="/radne-grupe" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Nazad na sve radne grupe
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Users className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-gray-600">56 članova</span>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl leading-relaxed mb-8">
              Obezbeđuje pravovremene informacije za sve učesnike protesta, održava Telegram grupe i pomaže u koordinaciji akcija.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-600 mb-10">
              <p className="text-lg">
                Građanska radna grupa za komunikaciju sa studentima i javnošću ima ključnu ulogu u održavanju informacija i transparentnosti 
                tokom organizacije protesta i zbora građana. Ova grupa je odgovorna za prenošenje poruka, ažuriranje učesnika o najnovijim 
                dešavanjima i osiguravanje da informacije dođu do svih relevantnih ciljanih grupa. Fokus ove radne grupe je usmeren na studente, 
                ali i širu javnost, kako bi osigurali da svi koji žele da se uključe budu obavešteni i motivisani za aktivno učešće.
              </p>
            </div>
            
            <h2 className="text-2xl font-bold mb-6">Šta radimo?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <UserCheck className="h-6 w-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold">Koordinacija sa studentima i mladima</h3>
                </div>
                <p>
                  Razvijanje strategije za komunikaciju sa studentima, uključujući kreiranje i distribuciju informacija putem društvenih mreža, 
                  emaila i drugih digitalnih kanala. Organizovanje online i offline sastanaka kako bi motivisali studente na aktivno učešće.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Globe className="h-6 w-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold">Obaveštavanje i edukacija javnosti</h3>
                </div>
                <p>
                  Aktivnosti usmerene na informisanje šire javnosti o ciljevima protesta, izazovima sa kojima se suočavaju građani, 
                  kao i o značaju svakog pojedinca u procesu. To uključuje pripremu i distribuciju saopštenja za medije, blog postova, 
                  video sadržaja i drugih materijala.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-6 w-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold">Kreiranje kampanja za podizanje svesti</h3>
                </div>
                <p>
                  Planiranje i realizacija kampanja na društvenim mrežama, u saradnji sa influenserima i studentima, koje će uključivati 
                  edukativne i informativne sadržaje o tome kako građani mogu učestvovati u organizaciji i kako protesti utiču na društvo.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Radio className="h-6 w-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold">Povezivanje sa medijima</h3>
                </div>
                <p>
                  Komunikacija sa novinarima i medijskim kućama, obezbeđivanje intervjua, pisanje i distribucija saopštenja za štampu 
                  i drugih materijala koji će osigurati da događaji budu prepoznati i vidljivo predstavljeni javnosti.
                </p>
              </div>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg border border-red-200 mb-10">
              <h3 className="text-xl font-bold mb-4 text-red-700">Kako se uključiti?</h3>
              <p className="mb-4">
                Ako imate iskustva u komunikacijama, društvenim mrežama, novinarstvu, odnosima s javnošću ili jednostavno imate dobre 
                komunikacijske veštine, pridružite se našoj radnoj grupi za komunikaciju.
              </p>
              <p>
                Popunite formular za prijavu klikom na dugme ispod ili nas kontaktirajte direktno putem 
                Telegram grupe za komunikaciju.
              </p>
            </div>
            
            <div className="flex justify-center">
              <button 
                onClick={openForm}
                className="px-8 py-4 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-colors inline-flex items-center"
              >
                Pridruži se GRGK
                <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>

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
                      grupa: 'komunikacija',
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-gray-100"
                      disabled
                    >
                      <option value="komunikacija">GRG za komunikaciju</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Radna grupa je automatski izabrana.</p>
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

export default GRGKomunikacija 