import { useState, useEffect, useRef } from 'react'

interface TypewriterEffectProps {
  text: string
  speed?: number // karaktera po sekundi
  className?: string
  onComplete?: () => void
}

function TypewriterEffect({
  text,
  speed = 5,
  className = '',
  onComplete
}: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState('')
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const charIndexRef = useRef(0)

  // Izračunaj interval u ms na osnovu karaktera po sekundi
  const intervalMs = Math.floor(1000 / speed)

  useEffect(() => {
    // Resetuj tekst kada se promeni ulazni tekst
    setDisplayedText('')
    charIndexRef.current = 0

    // Očisti postojeći interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Postavi interval za kucanje
    intervalRef.current = setInterval(() => {
      if (charIndexRef.current < text.length) {
        setDisplayedText(text.substring(0, charIndexRef.current + 1))
        charIndexRef.current += 1
      } else {
        // Kucanje je završeno
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          if (onComplete) onComplete()
        }
      }
    }, intervalMs)

    // Očisti intervale pri demontiranju
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [text, speed, intervalMs, onComplete])

  return (
    <div className={className}>
      <span>{displayedText}</span>
      <span className="inline-block w-[2px] h-[1em] bg-current ml-[1px] animate-blink" />
    </div>
  )
}

export default TypewriterEffect 