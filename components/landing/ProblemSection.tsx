'use client'

import { motion } from 'framer-motion'
import { PainPoint } from '@/lib/types/landing-page'

interface ProblemSectionProps {
  title: string
  painPoints: PainPoint[]
  className?: string
}

export function ProblemSection({ title, painPoints, className = '' }: ProblemSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  return (
    <section className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
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
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            These costly problems are holding your business back right now
          </p>
        </motion.div>

        {/* Pain Points Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {painPoints.map((painPoint, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative group"
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl bg-white dark:bg-neutral-800 border-2 border-red-100 dark:border-red-900/30 shadow-lg hover:shadow-2xl transition-all">
                {/* Problem Number Badge */}
                <div className="absolute -top-4 -left-4 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl shadow-lg">
                  <span className="text-white font-bold text-lg">
                    {index + 1}
                  </span>
                </div>

                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 mb-6 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  <span className="text-4xl" role="img" aria-hidden="true">
                    {painPoint.icon}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                  {painPoint.title}
                </h3>

                <p className="text-base text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                  {painPoint.description}
                </p>

                {/* Cost Highlight */}
                <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">💸</span>
                    <div>
                      <div className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-1">
                        Cost to Your Business:
                      </div>
                      <div className="text-lg font-bold text-red-600 dark:text-red-400">
                        {painPoint.cost}
                      </div>
                    </div>
                  </div>
                  
                  {painPoint.highlight && (
                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <p className="text-sm font-medium text-red-700 dark:text-red-300">
                        ⚠️ {painPoint.highlight}
                      </p>
                    </div>
                  )}
                </div>

                {/* Hover effect glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-600/0 to-orange-600/0 group-hover:from-red-600/5 group-hover:to-orange-600/5 transition-all pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
            Sound familiar? You're not alone.
          </p>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            But there's a better way... ⬇️
          </p>
        </motion.div>
      </div>
    </section>
  )
}

