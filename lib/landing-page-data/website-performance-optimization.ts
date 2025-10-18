import { ServiceLandingPageData } from '@/lib/types/landing-page'

export const performanceData: ServiceLandingPageData = {
  slug: 'website-performance-optimization',
  name: 'Website Performance Optimization',
  servicePageUrl: '/services/website-performance-optimization',
  
  headline: 'Boost Your Sales by 47% With Lightning-Fast Website Speed',
  subtitle: 'Every second of delay costs you 7% in conversions. Turn your slow site into a speed machine that converts.',
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  heroStats: { clients: '200', yearsInBusiness: '5', spotsRemaining: 5 },
  cta: {
    primary: 'Get Speed Audit',
    secondary: 'See Speed Results',
    primaryLink: '#contact',
    secondaryLink: '#results'
  },
  
  problemSectionTitle: 'The Speed Problem Destroying Your Revenue',
  painPoints: [
    {
      icon: '🐌',
      title: 'Losing 50% of Visitors to Slow Load Times',
      description: '53% of mobile users abandon sites that take over 3 seconds to load. Your slow site is bleeding customers.',
      cost: 'AED 40,000+ monthly revenue lost'
    },
    {
      icon: '📉',
      title: 'Google Penalizing Your Rankings',
      description: 'Core Web Vitals are ranking factors. Slow sites get demoted. Your competition is outranking you because they\'re faster.',
      cost: 'Losing top rankings to faster competitors'
    },
    {
      icon: '💸',
      title: '7% Conversion Drop Per Second',
      description: 'Every second of delay = 7% fewer conversions. A 3-second site converts 21% less than a 1-second site.',
      cost: 'Massive revenue loss per second of slowness'
    }
  ],
  
  solutionTitle: 'How We Make Your Site Lightning Fast in 7 Days',
  solutionSubtitle: 'Proven optimization that gets you to <1 second load time',
  process: [
    {
      number: 1,
      title: 'Comprehensive Speed Audit',
      description: 'We analyze every factor slowing your site: images, code, server, database, third-party scripts.',
      outcome: 'Complete performance report with exact bottlenecks',
      duration: '24 hours'
    },
    {
      number: 2,
      title: 'Image & Asset Optimization',
      description: 'Compress images, implement lazy loading, optimize fonts, minify code, and enable caching.',
      outcome: '60% faster asset loading',
      duration: '2 days'
    },
    {
      number: 3,
      title: 'Server & Database Optimization',
      description: 'CDN setup, database queries optimization, server configuration, and caching implementation.',
      outcome: '70% faster server response time',
      duration: '3 days'
    },
    {
      number: 4,
      title: 'Core Web Vitals Optimization',
      description: 'Fix LCP, FID, CLS issues. Optimize for Google\'s Core Web Vitals standards.',
      outcome: '90+ PageSpeed score, <1s load time',
      duration: '2 days'
    }
  ],
  
  resultsTitle: 'Real Speed Optimization Results',
  metrics: [
    {
      value: '90+',
      label: 'PageSpeed Score',
      icon: '🎯'
    },
    {
      value: '<1s',
      label: 'Average Load Time',
      icon: '⚡'
    },
    {
      value: '47%',
      label: 'Revenue Increase',
      icon: '📈'
    },
    {
      value: '7 Days',
      label: 'Optimization Time',
      icon: '⏱️'
    }
  ],
  caseStudies: [
    {
      industry: 'E-commerce - Dubai',
      beforeMetrics: ['4.8s load time', 'PageSpeed: 32', '68% bounce rate'],
      afterMetrics: ['0.9s load time', 'PageSpeed: 94', '29% bounce rate'],
      timeframe: '7 days',
      testimonial: 'Site went from painfully slow to instant. Conversions jumped 47% in the first month.',
      author: 'Ahmed K., Store Owner'
    }
  ],
  testimonials: [
    {
      quote: 'Our site was losing us money every day. After optimization, speed is incredible and sales are up 50%. Best ROI ever.',
      author: 'Fatima Abdullah',
      role: 'CEO',
      company: 'Online Business',
      location: 'Dubai',
      results: '4.8s to 0.9s, 50% more sales'
    }
  ],
  
  whyUsTitle: 'Why Choose Our Speed Optimization',
  differentiators: [
    {
      title: '90+ PageSpeed Guarantee',
      description: 'We guarantee 90+ PageSpeed score and <1.5s load time or your money back.',
      icon: '🎯',
      highlight: true
    },
    {
      title: '7-Day Turnaround',
      description: 'Fast site in one week. No months of waiting.',
      icon: '⚡'
    },
    {
      title: '47% Average Revenue Increase',
      description: 'Faster sites convert better. Our clients see massive revenue jumps.',
      icon: '📈',
      highlight: true
    },
    {
      title: 'Core Web Vitals Experts',
      description: 'We master LCP, FID, CLS optimization. Google-approved performance.',
      icon: '✅'
    },
    {
      title: 'Zero Functionality Loss',
      description: 'We optimize without breaking features. Everything still works perfectly.',
      icon: '🛠️'
    },
    {
      title: 'Ongoing Monitoring',
      description: '30 days performance monitoring included. We ensure speed stays fast.',
      icon: '📊'
    }
  ],
  
  offer: {
    discount: '40% OFF Optimization Package',
    bonus: 'FREE Monthly Speed Monitoring (Worth AED 1,500)',
    deadline: 'Next 5 Clients',
    spotsRemaining: 5,
    guarantee: '90+ PageSpeed or Money Back'
  },
  
  faqs: [
    {
      question: 'How much faster will my site be?',
      answer: 'Most sites improve from 3-5 seconds to under 1 second. We guarantee <1.5s load time and 90+ PageSpeed score. Exact improvement depends on your starting point.'
    },
    {
      question: 'Will optimization break my site?',
      answer: 'No. We test thoroughly before and after. All features and functionality remain intact. We optimize without breaking anything.'
    },
    {
      question: 'How long does optimization take?',
      answer: 'Complete optimization takes 7 days from start to finish. You\'ll see the fast site live in one week.'
    },
    {
      question: 'Do you guarantee results?',
      answer: 'Yes. We guarantee 90+ PageSpeed score and <1.5s load time. If we don\'t achieve this, you get a full refund.'
    },
    {
      question: 'What\'s included in the optimization?',
      answer: 'Everything: image optimization, code minification, caching, CDN setup, database optimization, server tuning, Core Web Vitals fixes, and 30-day monitoring.'
    },
    {
      question: 'Will speed improvements help my SEO?',
      answer: 'Absolutely. Site speed is a ranking factor. Faster sites rank better. You\'ll see SEO improvements alongside better user experience.'
    },
    {
      question: 'How much does it cost?',
      answer: 'One-time optimization starts at AED 3,500 (currently 40% off at AED 2,100). Includes everything with no recurring costs. Speed stays fast permanently.'
    }
  ],
  
  trustBadges: [
    { text: '90+ PageSpeed Guaranteed', icon: '🎯' },
    { text: '200+ Sites Optimized', icon: '✅' },
    { text: '47% Average Revenue Increase', icon: '📈' },
    { text: '7-Day Delivery', icon: '⚡' }
  ]
}

