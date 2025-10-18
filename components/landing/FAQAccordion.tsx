'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FAQ } from '@/lib/types/landing-page'

interface FAQAccordionProps {
  faqs: FAQ[]
  className?: string
}

export function FAQAccordion({ faqs, className = '' }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Got questions? We've got answers.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
              >
                <span className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 text-2xl text-blue-600 dark:text-blue-400"
                >
                  ⌄
                </motion.span>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2">
                      <div className="p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl">
                        <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-800"
        >
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
            Still Have Questions?
          </h3>
          <p className="text-base text-neutral-600 dark:text-neutral-400 mb-6">
            Our team is here to help. Get in touch and we'll answer everything.
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            <span>Contact Us</span>
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

