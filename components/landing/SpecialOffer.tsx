'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { SpecialOffer as SpecialOfferType } from '@/lib/types/landing-page'
import { CountdownTimer } from './CountdownTimer'

interface SpecialOfferProps {
  offer: SpecialOfferType
  ctaLink: string
  className?: string
}

export function SpecialOffer({ offer, ctaLink, className = '' }: SpecialOfferProps) {
  return (
    <section className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 p-1"
        >
          {/* Animated background glow */}
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: [0, 0, 1, 1] as const }}
            className="absolute inset-0"
          />

          <div className="relative bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12">
            {/* Badge */}
            <motion.div
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-full mb-6"
            >
              <span className="text-2xl">🔥</span>
              <span className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                Limited Time Offer
              </span>
            </motion.div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Special Introductory Offer
              </span>
            </h2>

            {/* Offer Details */}
            <div className="space-y-6 mb-8">
              {/* Discount */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-4"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex-shrink-0">
                  <span className="text-2xl">💰</span>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                    {offer.discount}
                  </div>
                  <div className="text-base text-neutral-600 dark:text-neutral-400">
                    Save thousands on your first month
                  </div>
                </div>
              </motion.div>

              {/* Bonus */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-4"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex-shrink-0">
                  <span className="text-2xl">🎁</span>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                    {offer.bonus}
                  </div>
                  <div className="text-base text-neutral-600 dark:text-neutral-400">
                    Included absolutely free
                  </div>
                </div>
              </motion.div>

              {/* Priority Onboarding */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-start gap-4"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex-shrink-0">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                    Priority Onboarding
                  </div>
                  <div className="text-base text-neutral-600 dark:text-neutral-400">
                    Skip the queue - start immediately
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Countdown Timer */}
            <div className="mb-8">
              <div className="text-center mb-4">
                <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">
                  Offer Expires In:
                </p>
              </div>
              <CountdownTimer className="justify-center" />
            </div>

            {/* Guarantee */}
            {offer.guarantee && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-3 p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl border-2 border-green-200 dark:border-green-800 mb-8"
              >
                <span className="text-3xl">🛡️</span>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-700 dark:text-green-300">
                    {offer.guarantee}
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    Zero risk - full refund if not satisfied
                  </div>
                </div>
              </motion.div>
            )}

            {/* CTA Button */}
            <Link href={ctaLink}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-6 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all"
              >
                <span className="flex items-center justify-center gap-3">
                  <span>Claim Your Spot Now</span>
                  <span className="text-2xl">→</span>
                </span>
              </motion.button>
            </Link>

            {/* Scarcity Text */}
            <motion.p
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center text-sm font-semibold text-red-600 dark:text-red-400 mt-4"
            >
              ⚠️ Only {offer.spotsRemaining} spots remaining at this rate
            </motion.p>

            {/* Trust Indicators */}
            <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-700">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔒</span>
                  <span>100% Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚡</span>
                  <span>Instant Confirmation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">💯</span>
                  <span>No Credit Card Required</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

