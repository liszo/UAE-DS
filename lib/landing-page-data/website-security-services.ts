import { ServiceLandingPageData } from '@/lib/types/landing-page'

export const websiteSecurityData: ServiceLandingPageData = {
  slug: 'website-security-services',
  name: 'Website Security Services',
  servicePageUrl: '/services/website-security-services',
  
  headline: 'One Hack Could Destroy Your Business Overnight - Protect It Now',
  subtitle: 'Don\'t wait for disaster. Get enterprise-grade security that stops hackers, prevents data breaches, and keeps your business running 24/7.',
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  heroStats: {
    clients: '200',
    yearsInBusiness: '5',
    spotsRemaining: 3
  },
  cta: {
    primary: 'Get Security Audit',
    secondary: 'See Security Features',
    primaryLink: '#contact',
    secondaryLink: '#results'
  },
  
  problemSectionTitle: 'The Security Nightmare Threatening Your Business',
  painPoints: [
    {
      icon: '🚨',
      title: '43% of Cyber Attacks Target Small Businesses',
      description: 'Hackers don\'t just target big companies. Small and medium businesses are prime targets because they have weak security.',
      cost: 'Average hack costs AED 180,000+ in damages',
      highlight: '60% of small businesses close within 6 months of a major hack'
    },
    {
      icon: '💔',
      title: 'Customer Trust Destroyed Permanently',
      description: 'One data breach exposes customer information and destroys years of reputation building. Customers never come back.',
      cost: 'Permanent brand damage and customer loss',
      highlight: 'You never fully recover from a public security breach'
    },
    {
      icon: '⏰',
      title: 'Downtime Killing Revenue',
      description: 'When hackers take your site down, every minute costs money. E-commerce sites lose thousands per hour of downtime.',
      cost: 'AED 5,000+ per hour of downtime'
    }
  ],
  
  solutionTitle: 'How We Protect Your Business 24/7',
  solutionSubtitle: 'Military-grade security that stops threats before they reach you',
  process: [
    {
      number: 1,
      title: 'Security Vulnerability Assessment',
      description: 'We scan your entire website and server infrastructure for security holes that hackers could exploit.',
      outcome: 'Complete security report with all vulnerabilities identified',
      duration: '48 hours'
    },
    {
      number: 2,
      title: 'Immediate Threat Elimination',
      description: 'We patch critical vulnerabilities, remove malware if present, and implement firewall protection immediately.',
      outcome: 'All immediate threats neutralized and blocked',
      duration: '3-5 days'
    },
    {
      number: 3,
      title: 'Complete Security Hardening',
      description: 'Install SSL certificates, enable two-factor authentication, implement malware scanning, and set up automated backups.',
      outcome: 'Enterprise-grade security protecting every entry point',
      duration: '7 days'
    },
    {
      number: 4,
      title: '24/7 Monitoring & Protection',
      description: 'Continuous threat monitoring, automatic malware removal, DDoS protection, and instant response to any security events.',
      outcome: '99.99% uptime with zero successful breaches',
      duration: 'Ongoing'
    }
  ],
  
  resultsTitle: 'Our Website Security Track Record',
  metrics: [
    {
      value: '99.99%',
      label: 'Uptime Protection',
      icon: '🛡️',
      description: 'Sites stay online and secure'
    },
    {
      value: '0',
      label: 'Successful Breaches',
      icon: '✅',
      description: 'Across 200+ protected sites'
    },
    {
      value: '24/7',
      label: 'Threat Monitoring',
      icon: '👁️',
      description: 'Always watching for attacks'
    },
    {
      value: '<30 Min',
      label: 'Response Time',
      icon: '⚡',
      description: 'Instant threat neutralization'
    }
  ],
  caseStudies: [
    {
      industry: 'E-commerce - Dubai',
      beforeMetrics: [
        'Hacked 3 times in 6 months',
        'AED 40K lost to downtime',
        'Customer data at risk'
      ],
      afterMetrics: [
        'Zero breaches in 18 months',
        '99.99% uptime maintained',
        'All data fully protected'
      ],
      timeframe: '18 months of protection',
      testimonial: 'After getting hacked three times, we were desperate. UAE Digital Solution locked everything down and we haven\'t had a single issue since.',
      author: 'Ahmed S., Online Store Owner'
    }
  ],
  testimonials: [
    {
      quote: 'We were hacked and lost customer data. Never again. These guys built Fort Knox around our website. Sleep so much better now.',
      author: 'Sarah Mitchell',
      role: 'CEO',
      company: 'Online Retailer',
      location: 'Dubai',
      results: '18 months breach-free'
    },
    {
      quote: 'The peace of mind is worth every dirham. Knowing professionals are watching 24/7 lets us focus on business, not security nightmares.',
      author: 'Hassan Al-Maktoum',
      role: 'IT Director',
      company: 'Financial Services',
      location: 'Abu Dhabi',
      results: 'Zero downtime, zero breaches'
    }
  ],
  
  whyUsTitle: 'Why Trust Us With Your Website Security',
  differentiators: [
    {
      title: 'Zero Breaches Guarantee',
      description: 'Not one successful hack across 200+ protected sites. We stop threats before they reach you.',
      icon: '🛡️',
      highlight: true
    },
    {
      title: '24/7 Active Monitoring',
      description: 'Real humans watching your site around the clock. Not just automated tools - actual experts.',
      icon: '👁️',
      highlight: true
    },
    {
      title: 'Military-Grade Protection',
      description: 'Same security standards used by banks and government sites. Enterprise-level protection for your business.',
      icon: '🔒'
    },
    {
      title: 'Instant Threat Response',
      description: 'Average response time under 30 minutes. Threats neutralized before they cause damage.',
      icon: '⚡'
    },
    {
      title: 'Daily Automated Backups',
      description: 'Complete site backups every 24 hours. If disaster strikes, we restore everything in minutes.',
      icon: '💾'
    },
    {
      title: 'DDoS Attack Protection',
      description: 'Advanced protection against denial-of-service attacks that take sites offline.',
      icon: '🚫'
    }
  ],
  
  offer: {
    discount: '40% OFF First Year',
    bonus: 'FREE Security Audit + Malware Removal (Worth AED 3,000)',
    deadline: 'Next 3 Clients Only',
    spotsRemaining: 3,
    guarantee: 'Zero Breach Guarantee or Money Back'
  },
  
  faqs: [
    {
      question: 'How quickly can you protect my website?',
      answer: 'We begin protection immediately upon signup. Initial security hardening takes 3-5 days. 24/7 monitoring starts on day 1. If your site is currently compromised, we can clean it and secure it within 24-48 hours as an emergency service.'
    },
    {
      question: 'What happens if my site gets hacked while under your protection?',
      answer: 'This has never happened to our clients, but we guarantee: if a breach occurs, we immediately restore your site from backup, fix the vulnerability, and refund your fees. Your risk is zero.'
    },
    {
      question: 'Do I need technical knowledge to use your security service?',
      answer: 'Not at all. We handle everything. You just get email notifications if we detect and stop threats. We manage all technical aspects 24/7 so you can focus on your business.'
    },
    {
      question: 'What\'s included in your security service?',
      answer: 'Everything: firewall protection, malware scanning & removal, DDoS protection, SSL certificate, daily backups, 24/7 monitoring, automatic updates, two-factor authentication, and emergency response. Complete peace of mind.'
    },
    {
      question: 'How much does website security cost?',
      answer: 'Plans start at AED 500/month (currently 40% off at AED 300/month for new clients). Price depends on website complexity and traffic level. All features included - no hidden costs or surprise charges.'
    },
    {
      question: 'Can you secure WordPress, Shopify, and custom websites?',
      answer: 'Yes! We protect all types of websites: WordPress, Shopify, WooCommerce, custom builds, and more. Our security works with any platform.'
    },
    {
      question: 'What if my site is already hacked?',
      answer: 'We offer emergency hack cleanup and security hardening. Most sites can be cleaned and secured within 24-48 hours. Contact us immediately if you\'re currently compromised.'
    }
  ],
  
  trustBadges: [
    { text: 'Zero Breaches Ever', icon: '🛡️' },
    { text: '24/7 Expert Monitoring', icon: '👁️' },
    { text: '99.99% Uptime', icon: '✅' },
    { text: 'Bank-Level Security', icon: '🔒' }
  ]
}

