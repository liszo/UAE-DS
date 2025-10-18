import { ServiceLandingPageData } from '@/lib/types/landing-page'

export const websiteMigrationData: ServiceLandingPageData = {
  slug: 'website-migration-services',
  name: 'Website Migration Services',
  servicePageUrl: '/services/website-migration-services',
  
  headline: 'Migrate to Modern Hosting Without Losing Traffic or Rankings',
  subtitle: 'Switch to faster, more reliable hosting with zero downtime. We handle everything while you keep making sales.',
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  heroStats: {
    clients: '200',
    yearsInBusiness: '5',
    spotsRemaining: 6
  },
  cta: {
    primary: 'Get Migration Quote',
    secondary: 'See Migration Process',
    primaryLink: '#contact',
    secondaryLink: '#solution'
  },
  
  problemSectionTitle: 'The Hosting Problem Costing You Sales Daily',
  painPoints: [
    {
      icon: '⏱️',
      title: 'Slow Site Killing Conversions',
      description: 'Current host is too slow. Every second of delay costs you 7% in conversions. That\'s AED 1,000s monthly.',
      cost: '53% of visitors abandon if load time >3 seconds'
    },
    {
      icon: '🔥',
      title: 'Downtime Disasters',
      description: 'Site goes down during peak hours. Every minute of downtime = lost revenue and damaged reputation.',
      cost: 'AED 5,000+ per hour of downtime'
    },
    {
      icon: '💸',
      title: 'Paying Too Much for Bad Service',
      description: 'Locked into expensive, outdated hosting with terrible support. You deserve better for your money.',
      cost: 'Overpaying by 300% for subpar service'
    }
  ],
  
  solutionTitle: 'How We Migrate Your Site in 48 Hours (Zero Downtime)',
  solutionSubtitle: 'Our proven migration process that has successfully moved 200+ sites',
  process: [
    {
      number: 1,
      title: 'Complete Site Backup',
      description: 'We create multiple backups of your entire website, database, and files. Safety first.',
      outcome: 'Complete safety net - nothing can go wrong',
      duration: '2 hours'
    },
    {
      number: 2,
      title: 'New Server Setup & Testing',
      description: 'Configure your new hosting environment, migrate all files, and test everything thoroughly before going live.',
      outcome: 'Fully functional site on new server, ready to switch',
      duration: '24 hours'
    },
    {
      number: 3,
      title: 'Zero-Downtime DNS Switch',
      description: 'Strategic DNS migration that keeps your site online throughout. Visitors never notice a thing.',
      outcome: 'Seamless transition with zero downtime',
      duration: '4 hours'
    },
    {
      number: 4,
      title: 'Post-Migration Monitoring',
      description: '48-hour intensive monitoring to ensure everything runs perfectly. We catch and fix any issues immediately.',
      outcome: 'Site running 3x faster on reliable hosting',
      duration: '48 hours'
    }
  ],
  
  resultsTitle: 'Our Website Migration Results',
  metrics: [
    {
      value: '0',
      label: 'Downtime Migrations',
      icon: '✅',
      description: 'Every migration successful'
    },
    {
      value: '3x',
      label: 'Faster Load Times',
      icon: '⚡',
      description: 'Average speed improvement'
    },
    {
      value: '48 Hours',
      label: 'Average Migration Time',
      icon: '⏱️',
      description: 'From start to finish'
    },
    {
      value: '99.99%',
      label: 'Uptime Post-Migration',
      icon: '🎯',
      description: 'Rock-solid reliability'
    }
  ],
  caseStudies: [
    {
      industry: 'E-commerce - Dubai',
      beforeMetrics: [
        '5.2s average load time',
        '2-3 downtime incidents monthly',
        'Poor customer experience'
      ],
      afterMetrics: [
        '1.3s average load time',
        'Zero downtime in 6 months',
        '40% increase in conversions'
      ],
      timeframe: 'Migrated in 36 hours',
      testimonial: 'Flawless migration. Site is 4x faster and we haven\'t had a single outage. Should have done this years ago.',
      author: 'Rashid K., Store Owner'
    }
  ],
  testimonials: [
    {
      quote: 'Was terrified of migration breaking something. These guys made it seamless. Zero downtime, zero issues, 3x faster site.',
      author: 'Marina Lopez',
      role: 'CEO',
      company: 'Online Business',
      location: 'Dubai',
      results: 'Zero downtime, 3x speed increase'
    }
  ],
  
  whyUsTitle: 'Why Trust Us With Your Migration',
  differentiators: [
    {
      title: 'Zero Downtime Guarantee',
      description: 'Your site stays online during entire migration. Customers never notice. We\'ve never had downtime.',
      icon: '✅',
      highlight: true
    },
    {
      title: '48-Hour Migration',
      description: 'Most migrations complete in 24-48 hours. No weeks of waiting. Fast and efficient.',
      icon: '⚡'
    },
    {
      title: 'SEO Rankings Protected',
      description: 'We preserve all SEO signals. No ranking drops, no lost traffic. Technical SEO stays intact.',
      icon: '📈',
      highlight: true
    },
    {
      title: 'Complete Data Safety',
      description: 'Multiple backups before we start. Your data is 100% safe throughout the process.',
      icon: '🔒'
    },
    {
      title: 'Post-Migration Support',
      description: '48 hours of intensive monitoring plus 30 days of priority support included.',
      icon: '🛟'
    },
    {
      title: 'Any Platform to Any Platform',
      description: 'WordPress, Shopify, custom builds - we migrate anything to anywhere.',
      icon: '🔄'
    }
  ],
  
  offer: {
    discount: '35% OFF Migration Fee',
    bonus: 'FREE 3 Months Hosting + Speed Optimization (Worth AED 2,000)',
    deadline: 'Next 6 Clients',
    spotsRemaining: 6,
    guarantee: 'Zero Downtime or Full Refund'
  },
  
  faqs: [
    {
      question: 'Will my site go down during migration?',
      answer: 'No. We guarantee zero downtime. Your site stays online and functional throughout the entire process. We use strategic DNS switching that keeps everything running seamlessly.'
    },
    {
      question: 'How long does migration take?',
      answer: 'Most migrations complete in 24-48 hours from start to finish. Complex sites may take up to 72 hours. We give you exact timeline after initial assessment.'
    },
    {
      question: 'Will I lose my SEO rankings?',
      answer: 'No. We preserve all SEO signals during migration. Your rankings stay intact. We\'ve never caused ranking drops from migration.'
    },
    {
      question: 'What if something goes wrong?',
      answer: 'We have multiple backups and can instantly restore your site if any issue occurs. That said, we\'ve successfully completed 200+ migrations without problems.'
    },
    {
      question: 'Can you migrate from any platform?',
      answer: 'Yes! We migrate from any platform to any platform: WordPress to WordPress, Shopify to WordPress, custom to WordPress, etc. We handle all technical complexities.'
    },
    {
      question: 'What\'s included in migration cost?',
      answer: 'Everything: initial backup, new server setup, file & database migration, DNS switching, SSL certificate setup, testing, and 48 hours post-migration monitoring. No hidden fees.'
    },
    {
      question: 'Do you help choose the right hosting?',
      answer: 'Yes! We recommend hosting based on your needs, traffic, and budget. We work with all major hosts and can set up on any provider you prefer.'
    }
  ],
  
  trustBadges: [
    { text: '200+ Successful Migrations', icon: '✅' },
    { text: 'Zero Downtime Guarantee', icon: '🎯' },
    { text: 'SEO Rankings Protected', icon: '📈' },
    { text: '48-Hour Turnaround', icon: '⚡' }
  ]
}

