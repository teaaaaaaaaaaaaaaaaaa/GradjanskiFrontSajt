import { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'

interface ExpandingCardProps {
  title: string
  description: string
  image: string
  icon?: ReactNode
  footer?: ReactNode
  className?: string
  longDescription?: string
  linkPath?: string
  linkText?: string
}

export default function ExpandingCard({ 
  title, 
  description, 
  longDescription,
  image, 
  icon, 
  footer, 
  className,
  linkPath,
  linkText = "Saznaj više"
}: ExpandingCardProps) {
  const [imageError, setImageError] = useState(false)

  // Wrap the card content in a Link if linkPath is provided
  const CardContent = () => (
    <>
      <div className="relative h-full">
        {!imageError ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover" 
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
            {icon && <div className="text-red-600 scale-[3]">{icon}</div>}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-60"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-sm transition-all duration-500 ease-in-out h-[110px] group-hover:h-[75%] overflow-hidden rounded-t-xl">
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            {icon && <div className="text-red-600">{icon}</div>}
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
          <div className="transition-all duration-500 ease-in-out max-h-[40px] group-hover:max-h-[calc(100%-100px)] overflow-hidden">
            <p className="text-gray-700 mb-4">{description}</p>
            
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
              {longDescription ? (
                <p className="text-gray-700 mt-4 border-t border-gray-100 pt-4">{longDescription}</p>
              ) : null}
              
              <div className="mt-4 bg-gray-50 p-3 rounded-lg border-l-4 border-red-600">
                <p className="text-sm text-gray-600">
                  <strong>Kako se uključiti:</strong> Pridruži se Telegram grupi, upoznaj članove i pronađi način da doprineseš svojim veštinama i znanjem.
                </p>
              </div>
            </div>
          </div>
          {footer && (
            <div className="mt-4 pt-3 border-t border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  )

  return (
    <div className={`relative overflow-hidden h-[380px] rounded-xl shadow-md group hover:shadow-lg transition-all duration-300 ${className || ''} ${linkPath ? 'cursor-pointer' : ''}`}>
      {linkPath ? (
        <Link to={linkPath} className="block h-full">
          <CardContent />
        </Link>
      ) : (
        <CardContent />
      )}
    </div>
  )
} 