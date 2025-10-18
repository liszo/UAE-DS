'use client'

import { motion } from 'framer-motion'
import { Metric } from '@/lib/types/landing-page'

interface MetricsDisplayProps {
  metrics: Metric[]
  className?: string
}

export function MetricsDisplay({ metrics, className = '' }: MetricsDisplayProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(metrics.length, 4)} gap-8 ${className}`}
    >
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-lg"
        >
          {metric.icon && (
            <span className="text-4xl mb-4" role="img" aria-hidden="true">
              {metric.icon}
            </span>
          )}
          
          <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {metric.value}
          </div>
          
          <div className="text-base lg:text-lg font-semibold text-neutral-900 dark:text-white mb-1">
            {metric.label}
          </div>
          
          {metric.description && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {metric.description}
            </p>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}

