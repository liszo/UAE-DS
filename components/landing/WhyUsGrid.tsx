'use client'

import { motion } from 'framer-motion'
import { Differentiator } from '@/lib/types/landing-page'

interface WhyUsGridProps {
  title: string
  differentiators: Differentiator[]
  className?: string
}

export function WhyUsGrid({ title, differentiators, className = '' }: WhyUsGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  return (
    <section className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950 ${className}`}>
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            We're not just another agency. Here's what sets us apart.
          </p>
        </motion.div>

        {/* Comparison Table - Mobile Friendly */}
        <div className="mb-16 overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
              {/* Us Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative p-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl border-4 border-white dark:border-neutral-800"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-green-500 rounded-full">
                  <span className="text-sm font-bold text-white">✓ BEST CHOICE</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white text-center mt-4 mb-6">
                  UAE Digital Solution
                </h3>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-xl">✅</span>
                    <span className="text-white">UAE market expertise</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">✅</span>
                    <span className="text-white">Results in 7-14 days</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">✅</span>
                    <span className="text-white">Transparent pricing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">✅</span>
                    <span className="text-white">Money-back guarantee</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">✅</span>
                    <span className="text-white">24/7 support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">✅</span>
                    <span className="text-white">Latest AI technology</span>
                  </li>
                </ul>
              </motion.div>

              {/* Typical Agency Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700"
              >
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white text-center mb-6">
                  Typical Agency
                </h3>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-xl">⚠️</span>
                    <span className="text-neutral-600 dark:text-neutral-400">Generic strategies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">⚠️</span>
                    <span className="text-neutral-600 dark:text-neutral-400">3-6 months to results</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">⚠️</span>
                    <span className="text-neutral-600 dark:text-neutral-400">Hidden fees</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">❌</span>
                    <span className="text-neutral-600 dark:text-neutral-400">No guarantees</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">⚠️</span>
                    <span className="text-neutral-600 dark:text-neutral-400">Business hours only</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">⚠️</span>
                    <span className="text-neutral-600 dark:text-neutral-400">Outdated methods</span>
                  </li>
                </ul>
              </motion.div>

              {/* DIY Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700"
              >
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white text-center mb-6">
                  Do It Yourself
                </h3>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-xl">❌</span>
                    <span className="text-neutral-600 dark:text-neutral-400">Trial and error</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">❌</span>
                    <span className="text-neutral-600 dark:text-neutral-400">6-12+ months learning</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">❌</span>
                    <span className="text-neutral-600 dark:text-neutral-400">Wasted ad spend</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">❌</span>
                    <span className="text-neutral-600 dark:text-neutral-400">No expertise</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">❌</span>
                    <span className="text-neutral-600 dark:text-neutral-400">Time consuming</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">❌</span>
                    <span className="text-neutral-600 dark:text-neutral-400">Costly mistakes</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Differentiator Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {differentiators.map((diff, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className={`p-6 rounded-2xl shadow-lg border-2 transition-all ${
                diff.highlight 
                  ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-300 dark:border-blue-700' 
                  : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'
              }`}
            >
              {/* Icon */}
              <div className={`flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${
                diff.highlight 
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600' 
                  : 'bg-neutral-100 dark:bg-neutral-700'
              }`}>
                <span className="text-3xl" role="img" aria-hidden="true">
                  {diff.icon}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {diff.title}
              </h3>
              <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {diff.description}
              </p>

              {diff.highlight && (
                <div className="mt-4 inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    ⭐ KEY ADVANTAGE
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

