import { useState, useEffect } from 'react'
import TypewriterEffect from './TypewriterEffect'

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [animationStage, setAnimationStage] = useState<'initial' | 'hand-visible' | 'text-visible' | 'complete'>('initial')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Hand animation starts quickly
    const handTimer = setTimeout(() => {
      setAnimationStage('hand-visible')
    }, 300)

    // Text starts typing
    const textTimer = setTimeout(() => {
      setAnimationStage('text-visible')
    }, 1200)

    // Progress bar animation - faster now (40ms instead of 50ms)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1.5 // Faster increment
      })
    }, 40) // 4 seconds to reach 100%

    // Complete animation after progress reaches 100%
    const completeTimer = setTimeout(() => {
      setAnimationStage('complete')
      setTimeout(() => onComplete(), 800) // Fade out time before calling onComplete
    }, 4500) // Reduced from 6000ms to 4500ms

    return () => {
      clearTimeout(handTimer)
      clearTimeout(textTimer)
      clearTimeout(completeTimer)
      clearInterval(progressInterval)
    }
  }, [onComplete])

  return (
    <div 
      className={`fixed inset-0 flex flex-col items-center justify-center bg-white z-50 transition-all duration-800 ${
        animationStage === 'complete' ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Hand animation - removed the logo above it */}
        <div 
          className={`relative transition-all duration-1000 ease-out transform ${
            animationStage === 'initial'
              ? 'translate-y-[80px] opacity-0' 
              : animationStage === 'complete' 
                ? 'translate-y-[-80px] opacity-0 scale-105' 
                : 'translate-y-0 opacity-100'
          }`}
        >
          <img 
            src="/ruka.png" 
            alt="Ruka" 
            className="w-auto h-[280px] object-contain"
          />
        </div>

        {/* Typewriter text */}
        <div 
          className={`mt-8 transition-all duration-500 transform ${
            animationStage === 'text-visible' || animationStage === 'complete' 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          } ${
            animationStage === 'complete' ? 'scale-110 text-primary-dark' : ''
          }`}
        >
          {(animationStage === 'text-visible' || animationStage === 'complete') && (
            <TypewriterEffect 
              text="BUDI I TI NA FRONTU." 
              className="text-3xl md:text-4xl font-anton text-primary "
              speed={10} // Faster typing
            />
          )}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-[-80px] w-[280px] mt-12">
          <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Učitavanje...</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen 