'use client'

import { motion } from 'framer-motion'
import { ProcessStep } from '@/lib/types/landing-page'

interface SolutionProcessProps {
  title: string
  subtitle: string
  steps: ProcessStep[]
  className?: string
}

export function SolutionProcess({ title, subtitle, steps, className = '' }: SolutionProcessProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
  }

  return (
    <section className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-neutral-900 dark:to-neutral-950 ${className}`}>
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
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8 max-w-5xl mx-auto"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute left-12 top-24 w-0.5 h-16 bg-gradient-to-b from-blue-400 to-purple-400" />
              )}

              <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* Step Number Badge */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex-shrink-0 flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl"
                >
                  <div className="text-center">
                    <div className="text-sm font-semibold text-white/80">Step</div>
                    <div className="text-3xl font-bold text-white">{step.number}</div>
                  </div>
                </motion.div>

                {/* Content Card */}
                <div className="flex-1 p-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {step.title}
                    </h3>
                    <span className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full text-sm font-semibold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                      ⏱️ {step.duration}
                    </span>
                  </div>

                  <p className="text-base text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Outcome Box */}
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <span className="text-2xl">✅</span>
                    <div>
                      <div className="text-sm font-semibold text-green-700 dark:text-green-300 mb-1">
                        What You Get:
                      </div>
                      <div className="text-base font-bold text-green-900 dark:text-green-100">
                        {step.outcome}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 p-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            Simple, Proven, Results-Driven
          </h3>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            No complicated processes. No endless meetings. Just clear steps that deliver measurable results.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

