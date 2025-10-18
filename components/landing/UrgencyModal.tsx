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
          className="fixed bottom-6 left-6 z-50 max-w-sm"
        >
          <div className="relative bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl shadow-2xl p-6">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-lg hover:bg-neutral-100 transition-colors"
              aria-label="Close"
            >
              <span className="text-neutral-600 text-xl font-bold">×</span>
            </button>

            {/* Pulse Indicator */}
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: [0.4, 0, 0.6, 1] as const }}
                className="relative flex items-center justify-center w-3 h-3 bg-white rounded-full"
              >
                <span className="absolute w-6 h-6 bg-white rounded-full opacity-75 animate-ping" />
              </motion.div>
              <span className="text-sm font-bold text-white uppercase tracking-wide">
                Limited Time Offer
              </span>
            </div>

            {/* Message */}
            <p className="text-white font-bold text-base mb-4 leading-relaxed">
              {message}
            </p>

            {/* Spots Remaining */}
            {spotsRemaining && (
              <div className="mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                <p className="text-white text-sm font-semibold text-center">
                  Only {spotsRemaining} Spots Left!
                </p>
              </div>
            )}

            {/* CTA Button */}
            <Link href={ctaLink}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-3 bg-white text-red-600 rounded-lg font-bold text-base hover:bg-neutral-50 transition-colors shadow-lg"
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

