'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface UrgencyBarProps {
  message: string
  ctaText: string
  ctaLink: string
  spotsRemaining?: number
  className?: string
}

export function UrgencyBar({ 
  message, 
  ctaText, 
  ctaLink,
  spotsRemaining,
  className = '' 
}: UrgencyBarProps) {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 to-orange-600 ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3">
          {/* Urgency Message */}
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="flex items-center justify-center w-2 h-2 bg-white rounded-full"
            >
              <span className="absolute w-4 h-4 bg-white rounded-full opacity-75 animate-ping" />
            </motion.div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <p className="text-sm sm:text-base font-bold text-white">
                {message}
              </p>
              {spotsRemaining && (
                <span className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                  Only {spotsRemaining} Spots Left!
                </span>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <Link href={ctaLink}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="whitespace-nowrap px-6 py-2 bg-white text-red-600 rounded-lg font-bold text-sm hover:bg-neutral-50 transition-colors shadow-lg"
            >
              {ctaText}
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

