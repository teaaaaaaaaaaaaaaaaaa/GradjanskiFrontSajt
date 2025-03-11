import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

function LoginPage() {
  const { login, error: authError, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    try {
      await login(email, password)
      navigate('/mapa') // Redirect to map page after successful login
    } catch (err) {
      setError('Greška prilikom prijave. Proverite vaše podatke i pokušajte ponovo.')
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="pt-16">
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Prijava</h1>
              <p className="text-muted-foreground">
                Prijavite se na vaš Građanski front nalog
              </p>
            </div>

            <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
              <div className="p-6">
                {(error || authError) && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-md p-3 mb-6">
                    {error || authError}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email adresa
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="email"
                          id="email"
                          className="w-full pl-10 pr-4 py-3 rounded-md border border-input bg-background"
                          placeholder="vasa.adresa@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label htmlFor="password" className="block text-sm font-medium">
                          Lozinka
                        </label>
                        <Link
                          to="/reset-password"
                          className="text-sm text-primary hover:underline"
                        >
                          Zaboravili ste lozinku?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          className="w-full pl-10 pr-10 py-3 rounded-md border border-input bg-background"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                          onClick={toggleShowPassword}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                      />
                      <label htmlFor="remember" className="ml-2 block text-sm text-muted-foreground">
                        Zapamti me
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full px-4 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="mr-2">Prijavljivanje...</span>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </>
                      ) : (
                        'Prijavi se'
                      )}
                    </button>
                  </div>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Nemate nalog?{' '}
                    <Link to="/register" className="text-primary hover:underline">
                      Registrujte se
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

export default LoginPage 