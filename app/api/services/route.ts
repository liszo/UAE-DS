import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/services?_embed&per_page=100`, {
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
    console.error('API Route - Error fetching services:', error.message);
    
    // Return mock data if WordPress is unavailable
    const mockServices = [
      {
        id: 1,
        title: { rendered: "Web Development" },
        slug: "web-development",
        excerpt: { rendered: "Custom websites and web applications built with cutting-edge technologies" },
        content: { rendered: "Full content here" },
        acf: {
          service_icon: "FaCode",
          service_description: "Custom websites and web applications built with cutting-edge technologies for optimal performance"
        }
      },
      {
        id: 2,
        title: { rendered: "WordPress Development" },
        slug: "wordpress-development",
        excerpt: { rendered: "Professional WordPress solutions from custom themes to complex multisite installations" },
        content: { rendered: "Full content here" },
        acf: {
          service_icon: "FaWordpress",
          service_description: "Professional WordPress solutions from custom themes to complex multisite installations"
        }
      },
      {
        id: 3,
        title: { rendered: "E-commerce Solutions" },
        slug: "ecommerce-solutions",
        excerpt: { rendered: "Complete online stores with WooCommerce, payment integration, and inventory management" },
        content: { rendered: "Full content here" },
        acf: {
          service_icon: "FaShoppingCart",
          service_description: "Complete online stores with WooCommerce, payment integration, and inventory management"
        }
      },
      {
        id: 4,
        title: { rendered: "AI Automation" },
        slug: "ai-automation",
        excerpt: { rendered: "Intelligent automation solutions powered by AI to streamline your business processes" },
        content: { rendered: "Full content here" },
        acf: {
          service_icon: "FaRobot",
          service_description: "Intelligent automation solutions powered by AI to streamline your business processes"
        }
      },
      {
        id: 5,
        title: { rendered: "Digital Marketing" },
        slug: "digital-marketing",
        excerpt: { rendered: "Data-driven marketing strategies that connect your brand with the right audience" },
        content: { rendered: "Full content here" },
        acf: {
          service_icon: "FaBullhorn",
          service_description: "Data-driven marketing strategies that connect your brand with the right audience"
        }
      },
      {
        id: 6,
        title: { rendered: "SEO Optimization" },
        slug: "seo-optimization",
        excerpt: { rendered: "Improve your search rankings and drive organic traffic with proven SEO strategies" },
        content: { rendered: "Full content here" },
        acf: {
          service_icon: "FaSearch",
          service_description: "Improve your search rankings and drive organic traffic with proven SEO strategies"
        }
      },
      {
        id: 7,
        title: { rendered: "Social Media Marketing" },
        slug: "social-media-marketing",
        excerpt: { rendered: "Engage your audience and build brand awareness across all social platforms" },
        content: { rendered: "Full content here" },
        acf: {
          service_icon: "FaHashtag",
          service_description: "Engage your audience and build brand awareness across all social platforms"
        }
      },
      {
        id: 8,
        title: { rendered: "Email Marketing" },
        slug: "email-marketing",
        excerpt: { rendered: "Targeted email campaigns that convert subscribers into loyal customers" },
        content: { rendered: "Full content here" },
        acf: {
          service_icon: "FaEnvelope",
          service_description: "Targeted email campaigns that convert subscribers into loyal customers"
        }
      },
      {
        id: 9,
        title: { rendered: "Graphic Design" },
        slug: "graphic-design",
        excerpt: { rendered: "Stunning visual designs that capture your brand essence and engage your audience" },
        content: { rendered: "Full content here" },
        acf: {
          service_icon: "FaPaintBrush",
          service_description: "Stunning visual designs that capture your brand essence and engage your audience"
        }
      },
      {
        id: 10,
        title: { rendered: "Video Production" },
        slug: "video-production",
        excerpt: { rendered: "Professional video content from concept to final edit for maximum impact" },
        content: { rendered: "Full content here" },
        acf: {
          service_icon: "FaVideo",
          service_description: "Professional video content from concept to final edit for maximum impact"
        }
      },
      {
        id: 11,
        title: { rendered: "Mobile App Development" },
        slug: "mobile-app-development",
        excerpt: { rendered: "Native and cross-platform mobile applications that deliver exceptional user experiences" },
        content: { rendered: "Full content here" },
        acf: {
          service_icon: "FaMobileAlt",
          service_description: "Native and cross-platform mobile applications that deliver exceptional user experiences"
        }
      },
      {
        id: 12,
        title: { rendered: "UI/UX Design" },
        slug: "ui-ux-design",
        excerpt: { rendered: "User-centered designs that combine aesthetics with functionality for optimal results" },
        content: { rendered: "Full content here" },
        acf: {
          service_icon: "FaPalette",
          service_description: "User-centered designs that combine aesthetics with functionality for optimal results"
        }
      },
      {
        id: 13,
        title: { rendered: "Analytics & Reporting" },
        slug: "analytics-reporting",
        excerpt: { rendered: "Comprehensive analytics to track performance and make data-driven decisions" },
        content: { rendered: "Full content here" },
        acf: {
          service_icon: "FaChartLine",
          service_description: "Comprehensive analytics to track performance and make data-driven decisions"
        }
      },
      {
        id: 14,
        title: { rendered: "24/7 Support" },
        slug: "support",
        excerpt: { rendered: "Round-the-clock technical support to keep your digital assets running smoothly" },
        content: { rendered: "Full content here" },
        acf: {
          service_icon: "FaHeadset",
          service_description: "Round-the-clock technical support to keep your digital assets running smoothly"
        }
      },
      {
        id: 15,
        title: { rendered: "Hosting & Maintenance" },
        slug: "hosting-maintenance",
        excerpt: { rendered: "Reliable hosting solutions with regular maintenance and security updates" },
        content: { rendered: "Full content here" },
        acf: {
          service_icon: "FaServer",
          service_description: "Reliable hosting solutions with regular maintenance and security updates"
        }
      }
    ];
    
    return NextResponse.json(mockServices);
  }
}