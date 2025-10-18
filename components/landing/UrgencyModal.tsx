'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface UrgencyModalProps {
  message: string
  ctaText: string
  ctaLink: string
  spotsRemaining?: number
}

export function UrgencyModal({ 
  message, 
  ctaText, 
  ctaLink,
  spotsRemaining
}: UrgencyModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasBeenClosed, setHasBeenClosed] = useState(false)

  useEffect(() => {
    // Show modal after 3 seconds if not closed before
    const timer = setTimeout(() => {
      if (!hasBeenClosed) {
        setIsOpen(true)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [hasBeenClosed])

  const handleClose = () => {
    setIsOpen(false)
    setHasBeenClosed(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-20 left-3 lg:bottom-6 lg:left-6 z-40 max-w-[280px] sm:max-w-sm"
        >
          <div className="relative bg-gradient-to-r from-red-600 to-orange-600 rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full shadow-lg hover:bg-neutral-100 transition-colors"
              aria-label="Close"
            >
              <span className="text-neutral-600 text-lg sm:text-xl font-bold">×</span>
            </button>

            {/* Pulse Indicator */}
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: [0.4, 0, 0.6, 1] as const }}
                className="relative flex items-center justify-center w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"
              >
                <span className="absolute w-4 h-4 sm:w-6 sm:h-6 bg-white rounded-full opacity-75 animate-ping" />
              </motion.div>
              <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide">
                Limited Time Offer
              </span>
            </div>

            {/* Message */}
            <p className="text-white font-bold text-sm sm:text-base mb-3 sm:mb-4 leading-snug sm:leading-relaxed">
              {message}
            </p>

            {/* Spots Remaining */}
            {spotsRemaining && (
              <div className="mb-3 sm:mb-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                <p className="text-white text-xs sm:text-sm font-semibold text-center">
                  Only {spotsRemaining} Spots Left!
                </p>
              </div>
            )}

            {/* CTA Button */}
            <Link href={ctaLink}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-4 py-2 sm:px-6 sm:py-3 bg-white text-red-600 rounded-lg font-bold text-sm sm:text-base hover:bg-neutral-50 transition-colors shadow-lg"
              >
                {ctaText}
              </motion.button>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

