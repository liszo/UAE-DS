import { ServiceLandingPageData } from '@/lib/types/landing-page'

export const uiUxData: ServiceLandingPageData = {
  slug: 'ui-ux-design-branding',
  name: 'UI/UX Design & Branding',
  servicePageUrl: '/services/ui-ux-design-branding',
  
  headline: 'Turn Your Website Into a Converting Machine With Proven UX',
  subtitle: 'Stop losing visitors in 5 seconds. Get professional design that builds trust and drives action.',
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  heroStats: { clients: '200', yearsInBusiness: '5', spotsRemaining: 4 },
  cta: {
    primary: 'Get Design Proposal',
    secondary: 'View Portfolio',
    primaryLink: '#contact',
    secondaryLink: '#results'
  },
  
  problemSectionTitle: 'The Design Problem Destroying Your Credibility',
  painPoints: [
    {
      icon: '😬',
      title: 'Amateur Design Screaming "Unprofessional"',
      description: 'Outdated design makes visitors question your credibility. First impressions matter - yours is killing trust.',
      cost: '94% bounce rate from poor design'
    },
    {
      icon: '⏱️',
      title: 'Visitors Leaving in 5 Seconds',
      description: 'Confusing navigation, cluttered layouts, poor mobile experience. Users can\'t find what they need.',
      cost: 'AED 30,000+ monthly in lost opportunities'
    },
    {
      icon: '🎯',
      title: 'No Brand Identity',
      description: 'You look like everyone else in a crowded UAE market. Nothing memorable or distinguishing.',
      cost: 'Losing customers to better-branded competitors'
    }
  ],
  
  solutionTitle: 'How We Transform Your Digital Presence in 14 Days',
  solutionSubtitle: 'Modern, conversion-focused design that your customers will love',
  process: [
    {
      number: 1,
      title: 'Brand & UX Discovery',
      description: 'Deep dive into your brand, audience, competitors, and goals. We create comprehensive brand strategy.',
      outcome: 'Complete brand guidelines and UX strategy',
      duration: '3 days'
    },
    {
      number: 2,
      title: 'Design Concept Creation',
      description: 'We create 2-3 design concepts showcasing different directions. You choose the one that fits your vision.',
      outcome: 'Approved design direction and style guide',
      duration: '5 days'
    },
    {
      number: 3,
      title: 'Full Design Implementation',
      description: 'Complete UI/UX design for all pages, mobile optimization, and brand assets creation.',
      outcome: 'Beautiful, conversion-optimized website design',
      duration: '7 days'
    },
    {
      number: 4,
      title: 'Development & Launch',
      description: 'We build the design in code, test thoroughly, and launch your new presence.',
      outcome: 'Live website that converts 3x better',
      duration: '7-14 days'
    }
  ],
  
  resultsTitle: 'Real Design Impact on Business Results',
  metrics: [
    {
      value: '156%',
      label: 'Increase in User Engagement',
      icon: '📊'
    },
    {
      value: '47%',
      label: 'Longer Session Duration',
      icon: '⏱️'
    },
    {
      value: '3.5x',
      label: 'More Form Submissions',
      icon: '📈'
    },
    {
      value: '14 Days',
      label: 'Design to Delivery',
      icon: '⚡'
    }
  ],
  caseStudies: [
    {
      industry: 'Professional Services - Abu Dhabi',
      beforeMetrics: ['8-second average visit', '92% bounce rate', '2 inquiries/month'],
      afterMetrics: ['3.5-minute average visit', '41% bounce rate', '34 inquiries/month'],
      timeframe: '14 days design + implementation',
      testimonial: 'The new design completely changed how clients perceive us. We look like the premium service we are.',
      author: 'Dr. Khaled Mansour, Managing Partner'
    }
  ],
  testimonials: [
    {
      quote: 'Finally a website that matches the quality of our work. Clients constantly compliment the design. Conversions up 280%.',
      author: 'Sarah Al-Maktoum',
      role: 'CEO',
      company: 'Luxury Brand',
      location: 'Dubai',
      results: '280% more conversions'
    }
  ],
  
  whyUsTitle: 'Why Choose Our Design Services',
  differentiators: [
    {
      title: 'Conversion-Focused Design',
      description: 'Beautiful AND functional. Every design decision optimized for conversions, not just aesthetics.',
      icon: '🎯',
      highlight: true
    },
    {
      title: 'UAE Market Understanding',
      description: 'Designs that resonate with UAE audience preferences and cultural nuances.',
      icon: '🇦🇪'
    },
    {
      title: '14-Day Delivery',
      description: 'From concept to final design in 2 weeks. No months of waiting.',
      icon: '⚡',
      highlight: true
    },
    {
      title: 'Mobile-First Approach',
      description: 'Designed for mobile first, perfect on all devices. 60% of traffic is mobile.',
      icon: '📱'
    },
    {
      title: 'Complete Brand Package',
      description: 'Logo, colors, typography, brand guidelines, assets - complete brand identity.',
      icon: '🎨'
    },
    {
      title: 'Unlimited Revisions',
      description: 'We refine until you\'re 100% happy. Your satisfaction guaranteed.',
      icon: '♾️'
    }
  ],
  
  offer: {
    discount: '35% OFF Design Package',
    bonus: 'FREE Brand Guidelines + Logo Refresh (Worth AED 3,000)',
    deadline: 'Next 4 Clients',
    spotsRemaining: 4,
    guarantee: '100% Satisfaction or Money Back'
  },
  
  faqs: [
    {
      question: 'How long does the design process take?',
      answer: 'Complete design process takes 14 days from start to approved designs. Implementation (development) adds another 7-14 days depending on complexity. Total: 3-4 weeks from start to launch.'
    },
    {
      question: 'Do you offer revisions?',
      answer: 'Yes, unlimited revisions during the design phase. We refine until you\'re completely satisfied. Your happiness is our priority.'
    },
    {
      question: 'Can you match our existing brand?',
      answer: 'Absolutely. We can work within your existing brand guidelines or help evolve your brand to better compete in today\'s market. Your choice.'
    },
    {
      question: 'What\'s included in the design package?',
      answer: 'Complete website design (all pages), mobile optimization, brand guidelines, color palette, typography, logo refinement, all design assets, and source files. Everything you need.'
    },
    {
      question: 'Do you handle development too?',
      answer: 'Yes! We design AND develop. You get a complete solution, not just pretty pictures. We build what we design.'
    },
    {
      question: 'How much does UI/UX design cost?',
      answer: 'Packages start at AED 8,000 for complete website redesign (currently 35% off at AED 5,200). Includes everything - design, development, revisions, brand assets. No hidden costs.'
    },
    {
      question: 'Can you redesign just parts of my site?',
      answer: 'Yes. We can redesign specific sections (homepage, checkout, etc.) or complete overhaul. We tailor solutions to your needs and budget.'
    }
  ],
  
  trustBadges: [
    { text: 'Award-Winning Designs', icon: '🏆' },
    { text: '200+ Brands Designed', icon: '✅' },
    { text: '14-Day Delivery', icon: '⚡' },
    { text: 'Unlimited Revisions', icon: '♾️' }
  ]
}

