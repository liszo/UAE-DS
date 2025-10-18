'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Section {
  id: string
  label: string
  icon: string
}

const sections: Section[] = [
  { id: 'hero', label: 'Home', icon: '🏠' },
  { id: 'problem', label: 'Problem', icon: '⚠️' },
  { id: 'solution', label: 'Solution', icon: '✨' },
  { id: 'results', label: 'Results', icon: '📊' },
  { id: 'why-us', label: 'Why Us', icon: '🏆' },
  { id: 'offer', label: 'Offer', icon: '🎁' },
  { id: 'faq', label: 'FAQ', icon: '❓' },
  { id: 'contact', label: 'Contact', icon: '📞' }
]

export function SectionNavigator() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isExpanded, setIsExpanded] = useState(false)

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const yOffset = -80 // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      })
    }
    setIsExpanded(false)
  }

  return (
    <>
      {/* Desktop Version - Left Side */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3"
      >
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Dot/Circle */}
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 scale-150'
                  : 'bg-neutral-400 hover:bg-neutral-600'
              }`}
            />

            {/* Tooltip on Hover */}
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg shadow-xl whitespace-nowrap">
                  <span>{section.icon}</span>
                  <span className="text-sm font-semibold">{section.label}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.button>
        ))}
      </motion.nav>

      {/* Mobile Version - Bottom Bar */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-t border-neutral-200 shadow-2xl"
      >
        {/* Expand Button - Shows active section */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-3 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              {sections.find(s => s.id === activeSection)?.icon}
            </span>
            <div className="text-left">
              <div className="text-xs text-neutral-500 font-medium">Navigate to</div>
              <div className="text-sm font-bold text-neutral-900">
                {sections.find(s => s.id === activeSection)?.label}
              </div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              className="w-5 h-5 text-neutral-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.button>

        {/* Expanded Menu */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-neutral-200"
            >
              <div className="grid grid-cols-4 gap-2 p-3">
                {sections.map((section) => (
                  <motion.button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    whileTap={{ scale: 0.95 }}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                      activeSection === section.id
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    <span className="text-xl">{section.icon}</span>
                    <span className="text-xs font-semibold text-center leading-tight">
                      {section.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Spacer - Prevents content from being hidden behind bottom bar */}
      <div className="lg:hidden h-16" />
    </>
  )
}

