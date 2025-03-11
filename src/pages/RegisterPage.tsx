import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, MapPin, Check } from 'lucide-react'

function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    interests: [] as string[],
    agreeTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1)

  const interestOptions = [
    { id: 'ekologija', label: 'Ekologija' },
    { id: 'obrazovanje', label: 'Obrazovanje' },
    { id: 'zdravstvo', label: 'Zdravstvo' },
    { id: 'infrastruktura', label: 'Infrastruktura' },
    { id: 'kultura', label: 'Kultura' },
    { id: 'socijalna-pitanja', label: 'Socijalna pitanja' },
    { id: 'ekonomija', label: 'Ekonomija' },
    { id: 'mediji', label: 'Mediji' },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox') {
      if (name === 'agreeTerms') {
        setFormData({ ...formData, [name]: checked })
      } else {
        // Handle interests checkboxes
        const interestId = name.replace('interest-', '')
        const updatedInterests = checked
          ? [...formData.interests, interestId]
          : formData.interests.filter((id) => id !== interestId)
        
        setFormData({ ...formData, interests: updatedInterests })
      }
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    if (step === 1) {
      // Validate first step
      if (formData.password !== formData.confirmPassword) {
        setError('Lozinke se ne podudaraju.')
        return
      }
      
      if (formData.password.length < 8) {
        setError('Lozinka mora imati najmanje 8 karaktera.')
        return
      }
      
      setStep(2)
      return
    }
    
    // Submit form
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // For demo purposes, always show error
      setError('Funkcionalnost registracije još uvek nije implementirana.')
    }, 1500)
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const goBack = () => {
    setStep(1)
  }

  return (
    <div className="pt-16">
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Registracija</h1>
              <p className="text-muted-foreground">
                Kreirajte vaš Građanski front nalog
              </p>
            </div>

            <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
              <div className="p-6">
                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-md p-3 mb-6">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {step === 1 ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                            Ime
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              className="w-full pl-10 pr-4 py-3 rounded-md border border-input bg-background"
                              placeholder="Ime"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                            Prezime
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="w-full px-4 py-3 rounded-md border border-input bg-background"
                            placeholder="Prezime"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email adresa
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full pl-10 pr-4 py-3 rounded-md border border-input bg-background"
                            placeholder="vasa.adresa@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-2">
                          Lozinka
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            className="w-full pl-10 pr-10 py-3 rounded-md border border-input bg-background"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={8}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                            onClick={toggleShowPassword}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Lozinka mora imati najmanje 8 karaktera.
                        </p>
                      </div>

                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                          Potvrdite lozinku
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-full pl-10 pr-10 py-3 rounded-md border border-input bg-background"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                            onClick={toggleShowConfirmPassword}
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full px-4 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
                      >
                        Nastavi
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium mb-2">
                          Lokacija (opština)
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="text"
                            id="location"
                            name="location"
                            className="w-full pl-10 pr-4 py-3 rounded-md border border-input bg-background"
                            placeholder="Npr. Vračar, Novi Beograd, itd."
                            value={formData.location}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-3">
                          Oblasti interesovanja
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {interestOptions.map((interest) => (
                            <div
                              key={interest.id}
                              className={`flex items-center p-3 rounded-md border cursor-pointer transition-colors ${
                                formData.interests.includes(interest.id)
                                  ? 'border-primary bg-primary/5'
                                  : 'border-input hover:border-primary/50'
                              }`}
                              onClick={() => {
                                const isSelected = formData.interests.includes(interest.id)
                                const updatedInterests = isSelected
                                  ? formData.interests.filter((id) => id !== interest.id)
                                  : [...formData.interests, interest.id]
                                
                                setFormData({ ...formData, interests: updatedInterests })
                              }}
                            >
                              <div
                                className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${
                                  formData.interests.includes(interest.id)
                                    ? 'bg-primary border-primary'
                                    : 'border-input'
                                }`}
                              >
                                {formData.interests.includes(interest.id) && (
                                  <Check className="h-3 w-3 text-white" />
                                )}
                              </div>
                              <span>{interest.label}</span>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Izaberite oblasti koje vas interesuju. Na osnovu toga ćemo vam preporučiti radne grupe.
                        </p>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="agreeTerms"
                          name="agreeTerms"
                          className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="agreeTerms" className="ml-2 block text-sm text-muted-foreground">
                          Slažem se sa{' '}
                          <Link to="/uslovi" className="text-primary hover:underline">
                            uslovima korišćenja
                          </Link>{' '}
                          i{' '}
                          <Link to="/privatnost" className="text-primary hover:underline">
                            politikom privatnosti
                          </Link>
                        </label>
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="button"
                          className="w-1/2 px-4 py-3 bg-secondary text-foreground rounded-md font-medium hover:bg-secondary/80 transition-colors"
                          onClick={goBack}
                        >
                          Nazad
                        </button>
                        <button
                          type="submit"
                          className="w-1/2 px-4 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center"
                          disabled={isLoading || !formData.agreeTerms}
                        >
                          {isLoading ? (
                            <>
                              <span className="mr-2">Registracija...</span>
                              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </>
                          ) : (
                            'Registruj se'
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Već imate nalog?{' '}
                    <Link to="/login" className="text-primary hover:underline">
                      Prijavite se
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage 