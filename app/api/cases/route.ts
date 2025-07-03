import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/cases?_embed&per_page=100`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('API Route - Error fetching cases:', error.message);
    
    // Return mock data if WordPress is unavailable
    const mockCases = [
      {
        id: 1,
        title: { rendered: "E-commerce Platform Redesign" },
        slug: "ecommerce-platform-redesign",
        excerpt: { rendered: "Complete redesign of a major e-commerce platform resulting in 150% increase in conversions" },
        content: { rendered: "Full case study content" },
        date: "2024-01-15",
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
          }]
        },
        acf: {
          client_name: "TechMart Global",
          industry: "E-commerce",
          services_provided: ["Web Development", "UI/UX Design", "SEO Optimization"],
          project_url: "https://techmart.com",
          challenge: "Low conversion rates and poor user experience",
          solution: "Complete redesign with modern UI/UX principles",
          results: "150% increase in conversions, 80% faster load times"
        }
      },
      {
        id: 2,
        title: { rendered: "AI-Powered Customer Service" },
        slug: "ai-powered-customer-service",
        excerpt: { rendered: "Implementation of AI chatbot reducing support tickets by 70%" },
        content: { rendered: "Full case study content" },
        date: "2024-02-20",
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop"
          }]
        },
        acf: {
          client_name: "FinanceHub UAE",
          industry: "Finance",
          services_provided: ["AI Automation", "Web Development"],
          project_url: "https://financehub.ae",
          challenge: "High volume of repetitive customer inquiries",
          solution: "AI-powered chatbot with natural language processing",
          results: "70% reduction in support tickets"
        }
      },
      {
        id: 3,
        title: { rendered: "Digital Marketing Campaign" },
        slug: "digital-marketing-campaign",
        excerpt: { rendered: "Multi-channel marketing campaign generating 500% ROI" },
        content: { rendered: "Full case study content" },
        date: "2024-03-10",
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"
          }]
        },
        acf: {
          client_name: "Luxury Brands Co.",
          industry: "Retail",
          services_provided: ["Digital Marketing", "Social Media Marketing", "Email Marketing"],
          project_url: "https://luxurybrands.com",
          challenge: "Low brand awareness in target market",
          solution: "Integrated digital marketing campaign",
          results: "500% ROI, 200% increase in brand awareness"
        }
      },
      {
        id: 4,
        title: { rendered: "Mobile App Development" },
        slug: "mobile-app-development",
        excerpt: { rendered: "Cross-platform mobile app with 50,000+ downloads in first month" },
        content: { rendered: "Full case study content" },
        date: "2024-04-05",
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop"
          }]
        },
        acf: {
          client_name: "FoodDelivery Pro",
          industry: "Food & Beverage",
          services_provided: ["Mobile App Development", "UI/UX Design"],
          project_url: "https://fooddeliverypro.com",
          challenge: "Need for seamless mobile ordering experience",
          solution: "Native mobile apps for iOS and Android",
          results: "50,000+ downloads in first month"
        }
      },
      {
        id: 5,
        title: { rendered: "WordPress Enterprise Solution" },
        slug: "wordpress-enterprise-solution",
        excerpt: { rendered: "Enterprise WordPress platform handling millions of visitors" },
        content: { rendered: "Full case study content" },
        date: "2024-05-12",
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop"
          }]
        },
        acf: {
          client_name: "News Portal ME",
          industry: "Media",
          services_provided: ["WordPress Development", "Hosting & Maintenance"],
          project_url: "https://newsportal.me",
          challenge: "Scaling WordPress for high traffic",
          solution: "Custom WordPress architecture with CDN",
          results: "Handles 5M+ monthly visitors"
        }
      },
      {
        id: 6,
        title: { rendered: "Complete Brand Transformation" },
        slug: "complete-brand-transformation",
        excerpt: { rendered: "Full rebrand including website, marketing materials, and digital presence" },
        content: { rendered: "Full case study content" },
        date: "2024-06-01",
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop"
          }]
        },
        acf: {
          client_name: "StartUp Innovate",
          industry: "Technology",
          services_provided: ["Graphic Design", "Web Development", "Digital Marketing"],
          project_url: "https://startupinnovate.com",
          challenge: "Outdated brand identity",
          solution: "Complete rebrand and digital transformation",
          results: "300% increase in lead generation"
        }
      }
    ];
    
    return NextResponse.json(mockCases);
  }
}