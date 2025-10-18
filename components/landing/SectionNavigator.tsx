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
  const [showSectionTooltip, setShowSectionTooltip] = useState(false)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

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
            if (section.id !== activeSection) {
              setActiveSection(section.id)
              // Show tooltip briefly when section changes
              setShowSectionTooltip(true)
              setTimeout(() => setShowSectionTooltip(false), 2000)
            }
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeSection])

  // Adjust WhatsApp widget position based on expanded state
  useEffect(() => {
    // Only run on mobile
    if (window.innerWidth >= 1024) return

    // Find WhatsApp widget button with multiple attempts
    const findWhatsAppButton = () => {
      return document.querySelector(
        'button.fixed.bottom-6.right-6.z-50, button.fixed[class*="right-6"][class*="z-50"], main ~ button.fixed'
      ) as HTMLElement
    }

    const whatsappButton = findWhatsAppButton()
    
    if (whatsappButton) {
      if (isExpanded) {
        // Move up when expanded (add space for expanded menu ~220px)
        whatsappButton.style.setProperty('bottom', '220px', 'important')
      } else {
        // Move to above collapsed bar
        whatsappButton.style.setProperty('bottom', '80px', 'important')
      }
    }

    return () => {
      // Cleanup - return to default collapsed state
      const btn = findWhatsAppButton()
      if (btn && window.innerWidth < 1024) {
        btn.style.setProperty('bottom', '80px', 'important')
      }
    }
  }, [isExpanded])

  const scrollToSection = (sectionId: string) => {
    // Close menu immediately for better UX
    setIsExpanded(false)
    
    // Small delay to ensure menu closes before scrolling
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        const yOffset = -100 // Offset for fixed header (increased for mobile)
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset

        window.scrollTo({
          top: y,
          behavior: 'smooth'
        })
      }
    }, 100)
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
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
            className="group relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Dot/Circle */}
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 scale-150 shadow-lg'
                  : 'bg-neutral-400 hover:bg-neutral-600'
              }`}
            />

            {/* Enhanced Tooltip on Hover */}
            <AnimatePresence>
              {hoveredSection === section.id && (
                <motion.div
                  initial={{ opacity: 0, x: -10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -10, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none z-50"
                >
                  <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-2xl whitespace-nowrap border-2 border-white/20">
                    <motion.span 
                      className="text-2xl"
                      animate={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {section.icon}
                    </motion.span>
                    <span className="text-sm font-bold tracking-wide">{section.label}</span>
                  </div>
                  {/* Arrow pointer */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-blue-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
        
        {/* Auto-show Tooltip on Section Change */}
        <AnimatePresence>
          {showSectionTooltip && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="fixed left-24 top-1/2 -translate-y-1/2 pointer-events-none z-50"
            >
              <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl shadow-2xl border-2 border-white/30">
                <motion.span 
                  className="text-4xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, -15, 15, -15, 0]
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {sections.find(s => s.id === activeSection)?.icon}
                </motion.span>
                <div>
                  <div className="text-xs font-medium text-white/80 uppercase tracking-wider">Now Viewing</div>
                  <div className="text-xl font-bold">{sections.find(s => s.id === activeSection)?.label}</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
