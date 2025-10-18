'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ContactFormData } from '@/lib/types/landing-page'

interface ContactFormProps {
  serviceName: string
  className?: string
}

export function ContactForm({ serviceName, className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: serviceName,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simple email submission using mailto (can be replaced with actual API)
      const mailtoLink = `mailto:info@uaedigitalsolution.agency?subject=Landing Page Inquiry: ${serviceName}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}%0D%0ACompany: ${formData.company}%0D%0AMessage: ${formData.message}`
      
      window.location.href = mailtoLink
      
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        service: serviceName,
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neutral-900 to-neutral-950 ${className}`}>
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Ready to Get Started?
            </h2>
            <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto">
              Stop losing to your competitors. Fill out the form below and we'll create a custom strategy for your business.
            </p>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 sm:p-12 bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl"
          >
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
              >
                <p className="text-green-700 dark:text-green-300 font-semibold text-center">
                  ✓ Thank you! We'll contact you within 2 hours.
                </p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
              >
                <p className="text-red-700 dark:text-red-300 font-semibold text-center">
                  Something went wrong. Please try again or email us directly.
                </p>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-neutral-900 dark:text-white"
                  placeholder="Ahmed Al-Mansoori"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-neutral-900 dark:text-white"
                  placeholder="ahmed@company.ae"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-neutral-900 dark:text-white"
                  placeholder="+971 50 123 4567"
                />
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-neutral-900 dark:text-white"
                  placeholder="Your Company LLC"
                />
              </div>
            </div>

            {/* Message */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Tell Us About Your Needs
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-neutral-900 dark:text-white resize-none"
                placeholder="Tell us about your business goals and challenges..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>Get My Custom Strategy</span>
                  <span className="text-xl">→</span>
                </span>
              )}
            </motion.button>

            {/* Trust Indicators */}
            <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-700">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔒</span>
                  <span>100% Secure & Confidential</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚡</span>
                  <span>2-Hour Response Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">💯</span>
                  <span>No Credit Card Required</span>
                </div>
              </div>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}

