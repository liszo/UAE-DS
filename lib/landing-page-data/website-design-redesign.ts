import { ServiceLandingPageData } from '@/lib/types/landing-page'

export const websiteDesignData: ServiceLandingPageData = {
  slug: 'website-design-redesign',
  name: 'Website Design & Redesign',
  servicePageUrl: '/services/website-design-redesign',
  
  headline: 'Transform Your Outdated Website Into a Modern Lead-Generating Asset',
  subtitle: 'Stop losing credibility with 2015-era design. Get a modern, mobile-first website that converts visitors into customers.',
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  heroStats: { clients: '200', yearsInBusiness: '5', spotsRemaining: 5 },
  cta: {
    primary: 'Get Design Quote',
    secondary: 'View Portfolio',
    primaryLink: '#contact',
    secondaryLink: '#results'
  },
  
  problemSectionTitle: 'The Website Design Problem Killing Your Business',
  painPoints: [
    {
      icon: '🙈',
      title: 'Embarrassing 2015-Era Design',
      description: 'Your website looks ancient. Outdated design screams unprofessional and drives customers away instantly.',
      cost: '75% of visitors judge credibility by design alone'
    },
    {
      icon: '📱',
      title: 'Not Mobile-Friendly',
      description: '60% of traffic is mobile but your site doesn\'t work on phones. Half your potential customers bouncing immediately.',
      cost: 'Losing 60% of traffic to poor mobile experience'
    },
    {
      icon: '🎯',
      title: 'Competitors Look More Professional',
      description: 'Your competitors\' modern sites make yours look amateur. You\'re losing customers before they even read your content.',
      cost: 'Losing deals to better-designed competitors'
    }
  ],
  
  solutionTitle: 'How We Build Your Modern Website in 2-3 Weeks',
  solutionSubtitle: 'Professional design that reflects your quality and converts visitors',
  process: [
    {
      number: 1,
      title: 'Discovery & Strategy',
      description: 'We understand your business, audience, goals, and competitors. Create comprehensive design strategy.',
      outcome: 'Complete sitemap and user experience plan',
      duration: '3 days'
    },
    {
      number: 2,
      title: 'Design & Feedback',
      description: 'We design modern, conversion-optimized layouts. You provide feedback, we refine until perfect.',
      outcome: 'Approved designs for all key pages',
      duration: '7-10 days'
    },
    {
      number: 3,
      title: 'Development & Content',
      description: 'We build the site with clean code, optimize for speed, and migrate/create content.',
      outcome: 'Fully functional modern website',
      duration: '7-10 days'
    },
    {
      number: 4,
      title: 'Launch & Optimization',
      description: 'Thorough testing, SEO setup, analytics integration, and smooth launch. Monitor and refine.',
      outcome: 'Live website generating 3x more leads',
      duration: '2-3 days'
    }
  ],
  
  resultsTitle: 'Real Website Design Results',
  metrics: [
    {
      value: '3x',
      label: 'More Leads Generated',
      icon: '📈'
    },
    {
      value: '68%',
      label: 'Lower Bounce Rate',
      icon: '✅'
    },
    {
      value: '2-3 Weeks',
      label: 'Launch Timeline',
      icon: '⚡'
    },
    {
      value: '240%',
      label: 'ROI Average',
      icon: '💰'
    }
  ],
  caseStudies: [
    {
      industry: 'Professional Services - Dubai',
      beforeMetrics: ['Outdated 2017 design', '88% bounce rate', '3-5 inquiries monthly'],
      afterMetrics: ['Modern, mobile-first design', '34% bounce rate', '42 inquiries monthly'],
      timeframe: 'Launched in 16 days',
      testimonial: 'New website transformed our business. Clients say we finally look as professional as we are. Inquiries up 8x.',
      author: 'Dr. Ahmed Al-Sayed, Practice Owner'
    }
  ],
  testimonials: [
    {
      quote: 'Old site was losing us business. New design is beautiful and actually converts. Best investment we made this year.',
      author: 'Marina Lopez',
      role: 'CEO',
      company: 'Service Business',
      location: 'Dubai',
      results: '3x more leads, 68% lower bounce rate'
    }
  ],
  
  whyUsTitle: 'Why Choose Our Website Design',
  differentiators: [
    {
      title: 'Conversion-Focused Design',
      description: 'Beautiful AND functional. Every element optimized to turn visitors into customers.',
      icon: '🎯',
      highlight: true
    },
    {
      title: '2-3 Week Launch',
      description: 'Fast turnaround without sacrificing quality. Your new site live in weeks, not months.',
      icon: '⚡'
    },
    {
      title: 'Mobile-First Approach',
      description: 'Designed for mobile first, perfect on all devices. 60% of your traffic deserves great experience.',
      icon: '📱',
      highlight: true
    },
    {
      title: 'SEO Built-In',
      description: 'SEO-optimized from day one. Technical SEO, speed, structure - all handled.',
      icon: '📈'
    },
    {
      title: 'Unlimited Revisions',
      description: 'We refine until you\'re 100% satisfied. Your happiness is our success metric.',
      icon: '♾️'
    },
    {
      title: 'Training & Support',
      description: 'We train your team to manage content. Plus 30 days of priority support included.',
      icon: '🎓'
    }
  ],
  
  offer: {
    discount: '35% OFF Website Package',
    bonus: 'FREE Logo Refresh + 3 Months Hosting (Worth AED 3,500)',
    deadline: 'Next 5 Clients',
    spotsRemaining: 5,
    guarantee: '100% Satisfaction or Money Back'
  },
  
  faqs: [
    {
      question: 'How long does website design take?',
      answer: 'Complete process takes 2-3 weeks from kickoff to launch. Simple sites: 14 days. Complex sites: 21 days. We work fast without compromising quality.'
    },
    {
      question: 'What\'s included in website design?',
      answer: 'Everything: strategy, design, development, mobile optimization, SEO setup, content migration, testing, training, and 30 days support. Complete solution.'
    },
    {
      question: 'Can you redesign my existing site?',
      answer: 'Yes! We specialize in redesigns. We preserve what works, modernize everything else, and ensure smooth transition with zero downtime.'
    },
    {
      question: 'Will my content be migrated?',
      answer: 'Yes. We migrate all existing content, optimize it for new design, and add new content as needed. Everything transfers seamlessly.'
    },
    {
      question: 'Do you provide hosting?',
      answer: 'Yes. We offer fast, reliable hosting or can deploy on your preferred host. First 3 months free with new design package.'
    },
    {
      question: 'How much does website design cost?',
      answer: 'Complete website packages start at AED 8,000 (currently 35% off at AED 5,200). Price depends on pages and complexity. All-inclusive pricing, no hidden fees.'
    },
    {
      question: 'What if I need changes after launch?',
      answer: '30 days of free changes/tweaks included. After that, we offer maintenance plans or per-update pricing. Most clients need minimal changes because we get it right the first time.'
    }
  ],
  
  trustBadges: [
    { text: '200+ Websites Designed', icon: '🎨' },
    { text: '3x Lead Generation', icon: '📈' },
    { text: '2-3 Week Launch', icon: '⚡' },
    { text: 'Unlimited Revisions', icon: '♾️' }
  ]
}

