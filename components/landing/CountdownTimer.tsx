'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  targetDate?: Date
  showDays?: boolean
  className?: string
}

export function CountdownTimer({ 
  targetDate,
  showDays = true,
  className = ''
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Set target to 7 days from current time
    const target = targetDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    
    const calculateTimeLeft = () => {
      const now = Date.now()
      const difference = target.getTime() - now
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    // Initial calculation
    calculateTimeLeft()
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  // Don't render on server to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className={`flex items-center justify-center gap-2 sm:gap-4 ${className}`}>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white dark:bg-neutral-800 rounded-lg shadow-md">
            <span className="text-xl sm:text-3xl font-bold text-neutral-900 dark:text-white">00</span>
          </div>
          <span className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 mt-2">Days</span>
        </div>
      </div>
    )
  }

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white dark:bg-neutral-800 rounded-lg shadow-md">
        <span className="text-xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 mt-2">
        {label}
      </span>
    </div>
  )

  return (
    <div className={`flex items-center justify-center gap-2 sm:gap-4 ${className}`}>
      {showDays && <TimeUnit value={timeLeft.days} label="Days" />}
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-2xl sm:text-4xl font-bold text-neutral-600 dark:text-neutral-400">:</span>
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <span className="text-2xl sm:text-4xl font-bold text-neutral-600 dark:text-neutral-400">:</span>
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  )
}

