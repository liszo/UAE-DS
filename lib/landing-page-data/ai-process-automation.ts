import { ServiceLandingPageData } from '@/lib/types/landing-page'

export const aiAutomationData: ServiceLandingPageData = {
  slug: 'ai-process-automation',
  name: 'AI Process Automation',
  servicePageUrl: '/services/ai-process-automation',
  
  headline: 'Automate Repetitive Tasks & Free Your Team for Growth',
  subtitle: 'Stop wasting 40% of staff time on manual work. Deploy AI automation that works 24/7 without breaks or errors.',
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  heroStats: { clients: '200', yearsInBusiness: '5', spotsRemaining: 4 },
  cta: {
    primary: 'Get Automation Audit',
    secondary: 'See AI In Action',
    primaryLink: '#contact',
    secondaryLink: '#results'
  },
  
  problemSectionTitle: 'The Manual Process Problem Holding You Back',
  painPoints: [
    {
      icon: '⏰',
      title: 'Team Wasting 40% Time on Repetitive Tasks',
      description: 'Staff spending hours on data entry, report generation, email responses, and other tasks AI could handle instantly.',
      cost: 'AED 20,000+ monthly in wasted productivity'
    },
    {
      icon: '😫',
      title: 'Human Errors Costing Thousands',
      description: 'Manual processes = mistakes. Data entry errors, missed follow-ups, delayed responses cost you money and customers.',
      cost: '94% error reduction possible with automation'
    },
    {
      icon: '📈',
      title: 'Can\'t Scale While Manual',
      description: 'Competitors using automation scale effortlessly. You\'re stuck hiring more people for same manual tasks.',
      cost: 'Missing growth opportunities competitors capture'
    }
  ],
  
  solutionTitle: 'How We Automate Your Business in 14 Days',
  solutionSubtitle: 'AI-powered automation that works while you sleep',
  process: [
    {
      number: 1,
      title: 'Process Audit & Mapping',
      description: 'We identify all manual processes that can be automated. Calculate ROI and prioritize quick wins.',
      outcome: 'Complete automation roadmap with ROI projections',
      duration: '3 days'
    },
    {
      number: 2,
      title: 'AI Solution Design',
      description: 'We design custom automation workflows using AI, integrations, and smart logic.',
      outcome: 'Approved automation architecture',
      duration: '3 days'
    },
    {
      number: 3,
      title: 'Build & Integration',
      description: 'We build automation workflows, integrate with your tools, and test thoroughly.',
      outcome: 'Working AI automation saving 25+ hours weekly',
      duration: '7 days'
    },
    {
      number: 4,
      title: 'Launch & Optimization',
      description: 'Deploy automation, train team, monitor performance, and continuously optimize.',
      outcome: '94% fewer errors, 60% faster processes',
      duration: '1 day + ongoing'
    }
  ],
  
  resultsTitle: 'Real AI Automation Results',
  metrics: [
    {
      value: '25+ Hours',
      label: 'Staff Time Saved Weekly',
      icon: '⏰'
    },
    {
      value: '94%',
      label: 'Fewer Human Errors',
      icon: '✅'
    },
    {
      value: '3 Months',
      label: 'Average ROI Timeframe',
      icon: '💰'
    },
    {
      value: '60%',
      label: 'Faster Processes',
      icon: '⚡'
    }
  ],
  caseStudies: [
    {
      industry: 'Real Estate - Dubai',
      beforeMetrics: ['Manual lead data entry', '2-day response times', '30% leads slipping through'],
      afterMetrics: ['Automated lead capture', 'Instant responses', '95% lead capture rate'],
      timeframe: 'Automated in 12 days',
      testimonial: 'AI automation saved us 30 hours weekly and we\'re capturing 95% of leads now vs. 70% before. ROI in 2 months.',
      author: 'Khalid Al-Maktoum, Broker Owner'
    }
  ],
  testimonials: [
    {
      quote: 'Automating our processes freed our team to focus on growth. We\'re scaling 3x faster than competitors still doing manual work.',
      author: 'Sarah Al-Rashid',
      role: 'Operations Director',
      company: 'Service Company',
      location: 'Abu Dhabi',
      results: '30 hours saved weekly, 3x faster scaling'
    }
  ],
  
  whyUsTitle: 'Why Choose Our AI Automation',
  differentiators: [
    {
      title: 'Custom for Your Workflows',
      description: 'Not generic templates. We build automation exactly for your processes and tools.',
      icon: '🎯',
      highlight: true
    },
    {
      title: '3-Month ROI Guarantee',
      description: 'Automation pays for itself within 3 months or we refund the difference.',
      icon: '💰',
      highlight: true
    },
    {
      title: 'AI-Powered Intelligence',
      description: 'Not just simple automation. We use AI for smart decisions, learning, and optimization.',
      icon: '🤖'
    },
    {
      title: 'Integration Experts',
      description: 'We connect all your tools: CRM, email, databases, spreadsheets, APIs. Everything talks.',
      icon: '🔗'
    },
    {
      title: '25+ Hours Saved Weekly',
      description: 'Average client saves 25 hours of staff time per week. That\'s one full-time employee.',
      icon: '⏰'
    },
    {
      title: 'Ongoing Optimization',
      description: 'We monitor, refine, and add new automations. Continuous improvement included.',
      icon: '📈'
    }
  ],
  
  offer: {
    discount: '30% OFF First Automation Project',
    bonus: 'FREE Process Audit + ROI Analysis (Worth AED 3,000)',
    deadline: 'Next 4 Clients',
    spotsRemaining: 4,
    guarantee: '3-Month ROI or Money Back'
  },
  
  faqs: [
    {
      question: 'What processes can be automated?',
      answer: 'Almost anything repetitive: data entry, email responses, report generation, lead routing, follow-ups, invoice creation, appointment reminders, social media posting, and much more. We audit and recommend.'
    },
    {
      question: 'How long does implementation take?',
      answer: 'Initial automation project: 14 days. Simple automations: 7 days. Complex multi-system integrations: 21 days. You see time savings immediately upon launch.'
    },
    {
      question: 'Will this replace my team?',
      answer: 'No. Automation handles repetitive tasks so your team can focus on high-value work: customer relationships, strategy, growth. It makes your team more effective, not redundant.'
    },
    {
      question: 'What if my tools don\'t integrate?',
      answer: 'We\'re integration experts. We connect virtually any tools/systems. If direct integration doesn\'t exist, we build custom connectors.'
    },
    {
      question: 'Do you guarantee ROI?',
      answer: 'Yes. We guarantee automation pays for itself within 3 months through time savings and error reduction. If not, we refund the difference.'
    },
    {
      question: 'How much does AI automation cost?',
      answer: 'Projects start at AED 8,000 (currently 30% off at AED 5,600). Price depends on complexity and number of processes. ROI typically 3-5x in first year.'
    },
    {
      question: 'What happens after initial automation?',
      answer: 'We offer ongoing optimization plans to add new automations and refine existing ones. Many clients continue adding automations as they see ROI.'
    }
  ],
  
  trustBadges: [
    { text: '200+ Processes Automated', icon: '🤖' },
    { text: '25+ Hours Saved Weekly', icon: '⏰' },
    { text: '94% Error Reduction', icon: '✅' },
    { text: '3-Month ROI', icon: '💰' }
  ]
}

