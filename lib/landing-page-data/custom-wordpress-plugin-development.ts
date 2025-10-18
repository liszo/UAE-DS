import { ServiceLandingPageData } from '@/lib/types/landing-page'

export const wordpressPluginData: ServiceLandingPageData = {
  slug: 'custom-wordpress-plugin-development',
  name: 'Custom WordPress Plugin Development',
  servicePageUrl: '/services/custom-wordpress-plugin-development',
  
  headline: 'Get Custom WordPress Functionality Without Breaking Your Budget',
  subtitle: 'Stop paying monthly fees for plugins that almost work. Get exactly what you need, built perfectly for your workflow.',
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  heroStats: { clients: '200', yearsInBusiness: '5', spotsRemaining: 3 },
  cta: {
    primary: 'Get Development Quote',
    secondary: 'See Custom Solutions',
    primaryLink: '#contact',
    secondaryLink: '#results'
  },
  
  problemSectionTitle: 'The WordPress Plugin Problem Costing You',
  painPoints: [
    {
      icon: '🤷',
      title: 'Plugins That Almost Work',
      description: 'Off-shelf plugins get you 80% there. That missing 20% forces workarounds and frustration.',
      cost: 'Hours wasted on workarounds weekly'
    },
    {
      icon: '💸',
      title: 'Paying Monthly Fees Forever',
      description: 'SaaS plugins charge monthly for features you barely use. Those fees add up to thousands yearly.',
      cost: 'AED 5,000+ annual recurring costs'
    },
    {
      icon: '🐌',
      title: 'Plugin Bloat Slowing Site',
      description: 'Installing multiple plugins for different features. Each plugin adds code that slows your site.',
      cost: 'Poor performance and user experience'
    }
  ],
  
  solutionTitle: 'How We Build Your Perfect WordPress Solution',
  solutionSubtitle: 'Custom functionality built specifically for your needs',
  process: [
    {
      number: 1,
      title: 'Requirements & Planning',
      description: 'We deeply understand your needs, workflows, and desired functionality. Plan technical approach.',
      outcome: 'Complete specification and development roadmap',
      duration: '3 days'
    },
    {
      number: 2,
      title: 'Plugin Development',
      description: 'We code your custom plugin following WordPress best practices. Clean, efficient, well-documented code.',
      outcome: 'Working plugin exactly matching your needs',
      duration: '10-21 days'
    },
    {
      number: 3,
      title: 'Testing & Refinement',
      description: 'Thorough testing across devices, browsers, WordPress versions. Refine based on your feedback.',
      outcome: 'Bulletproof, polished plugin ready for production',
      duration: '3-5 days'
    },
    {
      number: 4,
      title: 'Deployment & Training',
      description: 'We install, configure, and train your team. Provide documentation and ongoing support.',
      outcome: 'Team using plugin confidently',
      duration: '1-2 days'
    }
  ],
  
  resultsTitle: 'Custom Plugin Results',
  metrics: [
    {
      value: '50%',
      label: 'Faster Than Off-Shelf',
      icon: '⚡'
    },
    {
      value: 'Zero',
      label: 'Monthly Fees',
      icon: '💰'
    },
    {
      value: '100%',
      label: 'Perfect Workflow Match',
      icon: '🎯'
    },
    {
      value: '21 Days',
      label: 'Average Development Time',
      icon: '⏱️'
    }
  ],
  caseStudies: [
    {
      industry: 'Online Learning Platform - Dubai',
      beforeMetrics: ['Using 5 different plugins', 'AED 450/month in subscriptions', 'Clunky workflow'],
      afterMetrics: ['One custom solution', 'Zero monthly fees', 'Perfect workflow integration'],
      timeframe: 'Built in 18 days',
      testimonial: 'Custom plugin saved us thousands and works exactly how we need. Should have done this from day one.',
      author: 'Khalid Al-Mansoori, Platform Owner'
    }
  ],
  testimonials: [
    {
      quote: 'We were paying AED 6,000/year for plugins that didn\'t quite work. Custom solution paid for itself in one year and is perfect.',
      author: 'Fatima Hassan',
      role: 'Operations Manager',
      company: 'Membership Site',
      location: 'Abu Dhabi',
      results: 'AED 6K saved annually, perfect functionality'
    }
  ],
  
  whyUsTitle: 'Why Choose Our Custom Plugin Development',
  differentiators: [
    {
      title: 'Perfect Match to Workflow',
      description: 'Built exactly for your needs. No compromises, no workarounds. Perfect fit.',
      icon: '🎯',
      highlight: true
    },
    {
      title: 'One-Time Cost',
      description: 'Pay once, own it forever. No monthly subscriptions or recurring fees.',
      icon: '💰',
      highlight: true
    },
    {
      title: 'WordPress Best Practices',
      description: 'Clean code following WordPress standards. Won\'t break with updates.',
      icon: '✅'
    },
    {
      title: '50% Faster Performance',
      description: 'Optimized code vs. bloated off-shelf plugins. Your site stays fast.',
      icon: '⚡'
    },
    {
      title: 'Full Documentation',
      description: 'Complete documentation included. You understand how everything works.',
      icon: '📚'
    },
    {
      title: 'Ongoing Support',
      description: '6 months of free updates and support included. We stand behind our work.',
      icon: '🛟'
    }
  ],
  
  offer: {
    discount: '25% OFF Development Cost',
    bonus: 'FREE 6 Months Support + Documentation (Worth AED 2,500)',
    deadline: 'Next 3 Projects',
    spotsRemaining: 3,
    guarantee: '100% Satisfaction or Money Back'
  },
  
  faqs: [
    {
      question: 'How long does custom plugin development take?',
      answer: 'Simple plugins: 10-14 days. Medium complexity: 14-21 days. Complex plugins: 21-30 days. Exact timeline provided after initial consultation.'
    },
    {
      question: 'How much does custom plugin development cost?',
      answer: 'Depends on complexity. Simple plugins start at AED 5,000. Medium complexity AED 8,000-15,000. Complex AED 15,000+. One-time cost, no recurring fees. (Currently 25% off for new clients)'
    },
    {
      question: 'Do I own the plugin code?',
      answer: 'Yes! You own 100% of the code. We provide full source code and documentation. It\'s yours to keep forever.'
    },
    {
      question: 'What if I need changes later?',
      answer: 'First 6 months of updates/changes included free. After that, we offer maintenance plans or per-update pricing. Most clients need minimal changes.'
    },
    {
      question: 'Will it break with WordPress updates?',
      answer: 'No. We code following WordPress best practices and standards. Plugins stay compatible with WordPress updates. Plus 6 months free support covers any issues.'
    },
    {
      question: 'Can you integrate with other services/APIs?',
      answer: 'Yes! We integrate with payment gateways, CRMs, email services, APIs - anything you need. Full integration capability.'
    },
    {
      question: 'Do you maintain the plugin after launch?',
      answer: 'Yes. 6 months free support included. After that, optional maintenance plans available. Or we can train your team to handle basic updates.'
    }
  ],
  
  trustBadges: [
    { text: '200+ Custom Plugins Built', icon: '🔧' },
    { text: 'WordPress Certified Developers', icon: '✅' },
    { text: 'One-Time Cost', icon: '💰' },
    { text: '6 Months Free Support', icon: '🛟' }
  ]
}

