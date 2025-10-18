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
    
    // Calculate end of current week (Sunday at 23:59:59)
    const getEndOfWeek = () => {
      const now = new Date()
      const currentDay = now.getDay() // 0 = Sunday, 1 = Monday, etc.
      
      // Calculate days until Sunday
      // If it's Sunday (0), target next Sunday (7 days)
      // Otherwise, calculate days remaining in the week
      const daysUntilSunday = currentDay === 0 ? 7 : 7 - currentDay
      
      // Create target date for end of week (Sunday 23:59:59)
      const endOfWeek = new Date(now)
      endOfWeek.setDate(now.getDate() + daysUntilSunday)
      endOfWeek.setHours(23, 59, 59, 999)
      
      return endOfWeek
    }
    
    const target = targetDate || getEndOfWeek()
    
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
        // When countdown reaches zero, reset to next week
        const newTarget = getEndOfWeek()
        const newDifference = newTarget.getTime() - now
        
        setTimeLeft({
          days: Math.floor(newDifference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((newDifference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((newDifference / 1000 / 60) % 60),
          seconds: Math.floor((newDifference / 1000) % 60)
        })
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

