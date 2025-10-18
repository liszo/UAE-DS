'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CTAConfig } from '@/lib/types/landing-page'
import { TrustBadges } from './TrustBadges'

interface LandingHeroProps {
  headline: string
  subtitle: string
  videoUrl: string
  videoPosterImage?: string
  cta: CTAConfig
  heroStats: {
    clients: string
    yearsInBusiness: string
    spotsRemaining: number
  }
  trustBadges: Array<{ text: string; icon?: string }>
}

export function LandingHero({
  headline,
  subtitle,
  videoUrl,
  videoPosterImage,
  cta,
  heroStats,
  trustBadges
}: LandingHeroProps) {
  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/)
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url
  }

  const embedUrl = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') 
    ? getYouTubeEmbedUrl(videoUrl) 
    : videoUrl

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            {/* Urgency Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-full mb-6"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-2 h-2 bg-red-600 rounded-full"
              />
              <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                Limited Spots: Only {heroStats.spotsRemaining} Available This Month
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
                {headline}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
              {subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link href={cta.primaryLink}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  {cta.primary}
                </motion.button>
              </Link>
              
              <Link href={cta.secondaryLink}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white border-2 border-neutral-200 dark:border-neutral-700 rounded-lg font-bold text-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                >
                  {cta.secondary}
                </motion.button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span className="font-semibold">{heroStats.clients}+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <span className="font-semibold">{heroStats.yearsInBusiness} Years in UAE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔒</span>
                <span className="font-semibold">Money-Back Guarantee</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-neutral-200 dark:ring-neutral-800">
              {/* Video Embed */}
              <iframe
                src={embedUrl}
                title="Service Explainer Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                loading="lazy"
              />
              
              {/* Fallback poster if needed */}
              {videoPosterImage && (
                <div className="absolute inset-0 bg-neutral-900">
                  <img 
                    src={videoPosterImage} 
                    alt="Video thumbnail"
                    className="w-full h-full object-cover opacity-75"
                  />
                </div>
              )}
            </div>

            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white dark:bg-neutral-800 rounded-xl shadow-xl p-4 border border-neutral-200 dark:border-neutral-700"
            >
              <div className="text-3xl font-bold text-blue-600">
                {heroStats.spotsRemaining}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                Spots Left
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16"
        >
          <TrustBadges badges={trustBadges} />
        </motion.div>
      </div>
    </section>
  )
}

