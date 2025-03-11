import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function NotFoundPage() {
  return (
    <div className="pt-16">
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-bold mb-4">Stranica nije pronađena</h2>
            <p className="text-muted-foreground mb-8">
              Stranica koju tražite ne postoji ili je premeštena.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Nazad na početnu
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage 