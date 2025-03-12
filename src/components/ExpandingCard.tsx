import { ReactNode, useState } from 'react'

interface ExpandingCardProps {
  title: string
  description: string
  image: string
  icon?: ReactNode
  footer?: ReactNode
}

export default function ExpandingCard({ title, description, image, icon, footer }: ExpandingCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="relative overflow-hidden h-[380px] rounded-xl shadow-md group hover:shadow-lg transition-all duration-300">
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
            {icon && <div className="text-primary scale-[3]">{icon}</div>}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-60"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-sm transition-all duration-300 ease-in-out h-[110px] group-hover:h-[70%] overflow-hidden rounded-t-xl">
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            {icon && <div className="text-primary">{icon}</div>}
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
          <div className="transition-all duration-300 ease-in-out max-h-[40px] group-hover:max-h-[calc(100%-100px)] overflow-hidden">
            <p className="text-gray-700">{description}</p>
          </div>
          {footer && (
            <div className="mt-4 pt-3 border-t border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 