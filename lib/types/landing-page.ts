// Landing Page TypeScript Types
// Created for UAE Digital Solution Agency outreach campaigns

export interface PainPoint {
  icon: string
  title: string
  description: string
  cost: string
  highlight?: string
}

export interface ProcessStep {
  number: number
  title: string
  description: string
  outcome: string
  duration: string
}

export interface Metric {
  value: string
  label: string
  icon?: string
  description?: string
}

export interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
  location?: string
  results?: string
  image?: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface SpecialOffer {
  discount: string
  bonus: string
  deadline: string
  spotsRemaining: number
  guarantee?: string
}

export interface CTAConfig {
  primary: string
  secondary: string
  primaryLink: string
  secondaryLink: string
}

export interface ServiceLandingPageData {
  // Basic Info
  slug: string
  name: string
  servicePageUrl: string
  
  // Hero Section
  headline: string
  subtitle: string
  videoUrl: string // YouTube embed or NotebookLM video
  videoPosterImage?: string
  heroStats: {
    clients: string
    yearsInBusiness: string
    spotsRemaining: number
  }
  cta: CTAConfig
  
  // Problem Section
  problemSectionTitle: string
  painPoints: PainPoint[]
  
  // Solution Section
  solutionTitle: string
  solutionSubtitle: string
  process: ProcessStep[]
  
  // Results Section
  resultsTitle: string
  metrics: Metric[]
  caseStudies: CaseStudy[]
  testimonials: Testimonial[]
  
  // Why Us Section
  whyUsTitle: string
  differentiators: Differentiator[]
  
  // Special Offer
  offer: SpecialOffer
  
  // FAQ
  faqs: FAQ[]
  
  // Trust Elements
  trustBadges: TrustBadge[]
}

export interface CaseStudy {
  industry: string
  beforeMetrics: string[]
  afterMetrics: string[]
  timeframe: string
  testimonial?: string
  author?: string
}

export interface Differentiator {
  title: string
  description: string
  icon: string
  highlight?: boolean
}

export interface TrustBadge {
  text: string
  icon?: string
}

// Animation Variants
export interface AnimationVariants {
  hidden: {
    opacity: number
    y?: number
    x?: number
    scale?: number
  }
  visible: {
    opacity: number
    y?: number
    x?: number
    scale?: number
    transition?: {
      duration?: number
      ease?: string
      delay?: number
      staggerChildren?: number
    }
  }
}

// Form Data
export interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  message: string
  service: string
  utmSource?: string
  utmCampaign?: string
}

