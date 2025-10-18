import { ServiceLandingPageData } from '@/lib/types/landing-page'

export const maintenanceData: ServiceLandingPageData = {
  slug: 'website-maintenance-support',
  name: 'Website Maintenance & Support',
  servicePageUrl: '/services/website-maintenance-support',
  
  headline: 'Never Worry About Website Disasters Again - 24/7 Protection',
  subtitle: 'Sleep soundly knowing experts are maintaining, monitoring, and protecting your website around the clock.',
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  heroStats: { clients: '200', yearsInBusiness: '5', spotsRemaining: 6 },
  cta: {
    primary: 'Get Maintenance Plan',
    secondary: 'See What\'s Included',
    primaryLink: '#contact',
    secondaryLink: '#solution'
  },
  
  problemSectionTitle: 'The Maintenance Nightmares Threatening Your Business',
  painPoints: [
    {
      icon: '💥',
      title: 'Site Crashes During Peak Hours',
      description: 'Website breaks during your busiest times. Every minute offline = lost sales and damaged reputation.',
      cost: 'AED 5,000+ per hour of downtime'
    },
    {
      icon: '🐛',
      title: 'Outdated Plugins Creating Security Risks',
      description: 'Outdated software = security vulnerabilities. Hackers exploit old plugins to compromise sites.',
      cost: 'One breach costs AED 180,000+'
    },
    {
      icon: '🆘',
      title: 'No Backup When Disaster Strikes',
      description: 'Something breaks and you have no backup. Years of content and customer data gone instantly.',
      cost: 'Permanent data and business loss'
    }
  ],
  
  solutionTitle: 'How We Keep Your Site Running Perfectly 24/7',
  solutionSubtitle: 'Comprehensive maintenance so you can focus on business',
  process: [
    {
      number: 1,
      title: 'Initial Site Audit & Optimization',
      description: 'We audit your entire site, fix existing issues, optimize performance, and establish baseline.',
      outcome: 'Clean, optimized, fully functional site',
      duration: '3 days'
    },
    {
      number: 2,
      title: 'Daily Automated Monitoring',
      description: 'Automated systems monitor uptime, performance, security threats, and broken elements 24/7.',
      outcome: 'Issues caught and fixed before you notice',
      duration: 'Ongoing'
    },
    {
      number: 3,
      title: 'Weekly Updates & Maintenance',
      description: 'We update plugins, themes, and core software. Test everything to ensure compatibility.',
      outcome: 'Always up-to-date, always secure',
      duration: 'Weekly'
    },
    {
      number: 4,
      title: '24/7 Emergency Support',
      description: 'Something breaks? We fix it immediately. Average response time: under 30 minutes.',
      outcome: '99.99% uptime guarantee',
      duration: 'Always available'
    }
  ],
  
  resultsTitle: 'Our Maintenance Track Record',
  metrics: [
    {
      value: '99.99%',
      label: 'Uptime Guarantee',
      icon: '✅'
    },
    {
      value: '<30 Min',
      label: 'Response Time',
      icon: '⚡'
    },
    {
      value: 'Daily',
      label: 'Automated Backups',
      icon: '💾'
    },
    {
      value: '24/7',
      label: 'Always Watching',
      icon: '👁️'
    }
  ],
  caseStudies: [
    {
      industry: 'Professional Services - Dubai',
      beforeMetrics: ['3-4 outages monthly', 'No backups', 'Slow support response'],
      afterMetrics: ['Zero outages in 12 months', 'Daily backups', '<30 min response time'],
      timeframe: '12 months of protection',
      testimonial: 'Finally found reliable maintenance. Haven\'t worried about our website in a year. Worth every dirham.',
      author: 'Mohammed Al-Hashimi, Managing Director'
    }
  ],
  testimonials: [
    {
      quote: 'Peace of mind is priceless. Knowing experts are watching 24/7 lets us sleep soundly. No more 3am website panic calls.',
      author: 'Layla Hassan',
      role: 'CEO',
      company: 'Online Business',
      location: 'Dubai',
      results: '12 months zero downtime'
    }
  ],
  
  whyUsTitle: 'Why Trust Your Site to Our Care',
  differentiators: [
    {
      title: '99.99% Uptime Guarantee',
      description: 'Your site stays online. We guarantee it or you don\'t pay that month.',
      icon: '✅',
      highlight: true
    },
    {
      title: '<30 Min Response Time',
      description: 'Real humans available 24/7. Issues fixed fast, not tomorrow.',
      icon: '⚡',
      highlight: true
    },
    {
      title: 'Daily Automated Backups',
      description: 'Complete site backed up every day. Instant restore if needed.',
      icon: '💾'
    },
    {
      title: 'Proactive Monitoring',
      description: 'We catch issues before they become problems. Preventive, not reactive.',
      icon: '🔍'
    },
    {
      title: 'Security Included',
      description: 'Malware scanning, firewall, updates, and threat monitoring included.',
      icon: '🛡️'
    },
    {
      title: 'Unlimited Support Requests',
      description: 'Need changes? We handle it. No hourly charges, no ticket limits.',
      icon: '♾️'
    }
  ],
  
  offer: {
    discount: '3 Months FREE',
    bonus: 'FREE Initial Optimization + Speed Boost (Worth AED 2,000)',
    deadline: 'Annual Plan - Next 6 Clients',
    spotsRemaining: 6,
    guarantee: '99.99% Uptime or Money Back'
  },
  
  faqs: [
    {
      question: 'What\'s included in maintenance?',
      answer: 'Everything: 24/7 monitoring, daily backups, weekly updates, security scans, uptime monitoring, performance optimization, unlimited support requests, and emergency fixes. Complete peace of mind.'
    },
    {
      question: 'How fast do you respond to issues?',
      answer: 'Average response time is under 30 minutes, 24/7/365. Critical issues get immediate attention. Non-urgent requests handled within 4 hours.'
    },
    {
      question: 'Do I need a contract?',
      answer: 'Monthly plans available with no long-term commitment. Cancel anytime. Annual plans get 3 months free and save significantly.'
    },
    {
      question: 'What if my site breaks?',
      answer: 'We fix it immediately, usually within an hour. If it\'s covered by daily backup, we restore instantly. Your downtime is minimized.'
    },
    {
      question: 'Can you handle custom changes and updates?',
      answer: 'Yes! Unlimited support requests included. Content updates, design tweaks, new features - we handle everything within scope.'
    },
    {
      question: 'How much does maintenance cost?',
      answer: 'Plans start at AED 500/month. Annual plans get 3 months free (AED 4,500/year vs. AED 6,000). All features included regardless of plan level.'
    },
    {
      question: 'Do you support all website types?',
      answer: 'Yes. WordPress, Shopify, custom builds, any platform. We maintain and support all types of websites.'
    }
  ],
  
  trustBadges: [
    { text: '200+ Sites Maintained', icon: '✅' },
    { text: '99.99% Uptime', icon: '🎯' },
    { text: '24/7 Support', icon: '⚡' },
    { text: 'Daily Backups', icon: '💾' }
  ]
}

