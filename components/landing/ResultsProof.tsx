'use client'

import { motion } from 'framer-motion'
import { Metric, CaseStudy, Testimonial } from '@/lib/types/landing-page'
import { MetricsDisplay } from './MetricsDisplay'

interface ResultsProofProps {
  title: string
  metrics: Metric[]
  caseStudies: CaseStudy[]
  testimonials: Testimonial[]
  className?: string
}

export function ResultsProof({ 
  title, 
  metrics, 
  caseStudies, 
  testimonials, 
  className = '' 
}: ResultsProofProps) {
  return (
    <section className={`py-12 sm:py-20 px-3 sm:px-6 lg:px-8 ${className}`}>
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
            <span className="bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Data doesn't lie. Here's what we've achieved for businesses like yours.
          </p>
        </motion.div>

        {/* Metrics Display */}
        <MetricsDisplay metrics={metrics} className="mb-20" />

        {/* Case Studies */}
        {caseStudies.length > 0 && (
          <div className="mb-20">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12">
              Real Transformations
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="p-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700"
                >
                  {/* Industry Badge */}
                  <div className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full text-sm font-semibold text-blue-600 dark:text-blue-400 mb-6">
                    {study.industry}
                  </div>

                  {/* Before/After Grid */}
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    {/* Before */}
                    <div>
                      <div className="text-sm font-semibold text-red-600 dark:text-red-400 mb-3">
                        ❌ Before
                      </div>
                      <ul className="space-y-2">
                        {study.beforeMetrics.map((metric, i) => (
                          <li key={i} className="text-sm text-neutral-600 dark:text-neutral-400">
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* After */}
                    <div>
                      <div className="text-sm font-semibold text-green-600 dark:text-green-400 mb-3">
                        ✅ After
                      </div>
                      <ul className="space-y-2">
                        {study.afterMetrics.map((metric, i) => (
                          <li key={i} className="text-sm font-bold text-neutral-900 dark:text-white">
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Timeframe */}
                  <div className="flex items-center gap-2 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                    <span className="text-lg">⏱️</span>
                    <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                      Timeframe: <span className="text-neutral-900 dark:text-white">{study.timeframe}</span>
                    </span>
                  </div>

                  {/* Testimonial */}
                  {study.testimonial && (
                    <div className="mt-6 p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl">
                      <p className="text-sm italic text-neutral-700 dark:text-neutral-300 mb-2">
                        "{study.testimonial}"
                      </p>
                      {study.author && (
                        <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                          — {study.author}
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12">
              What Our Clients Say
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative p-6 bg-white rounded-2xl shadow-lg border border-neutral-200"
                >
                  {/* Quote Mark - Moved to inside */}
                  <div className="mb-4">
                    <span className="text-5xl text-blue-600 font-serif leading-none">&ldquo;</span>
                  </div>

                  {/* Quote */}
                  <p className="text-base text-neutral-700 mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>

                  {/* Results Badge */}
                  {testimonial.results && (
                    <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-sm font-bold text-green-700 dark:text-green-300">
                        📈 {testimonial.results}
                      </div>
                    </div>
                  )}

                  {/* Author */}
                  <div className="pt-4 border-t border-neutral-200">
                    <div className="font-bold text-neutral-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-neutral-600">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-neutral-500">
                      {testimonial.company}
                      {testimonial.location && ` • ${testimonial.location}`}
                    </div>
                  </div>

                  {/* 5 Stars */}
                  <div className="flex gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

