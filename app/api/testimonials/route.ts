import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/testimonials?_embed&per_page=100`, {
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
    console.error('API Route - Error fetching testimonials:', error.message);
    
    // Return mock data if WordPress is unavailable
    const mockTestimonials = [
      {
        id: 1,
        title: { rendered: "Sarah Johnson" },
        content: { rendered: "Working with UAE Digital Solutions transformed our entire digital presence. Their innovative approach and cutting-edge solutions exceeded all expectations. The team's professionalism and expertise made the entire process smooth and enjoyable." },
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
          }]
        },
        acf: {
          client_position: "CEO",
          client_company: "TechStart Inc.",
          rating: 5,
          project_type: "Web Development",
          linkedin_url: "https://linkedin.com",
          twitter_url: "https://twitter.com"
        }
      },
      {
        id: 2,
        title: { rendered: "Ahmed Al Rashid" },
        content: { rendered: "The AI automation solutions they implemented saved us countless hours and significantly improved our operational efficiency. Their team understood our needs perfectly and delivered beyond our expectations. Truly game-changing!" },
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
          }]
        },
        acf: {
          client_position: "Founder",
          client_company: "Fintech UAE",
          rating: 5,
          project_type: "AI Automation",
          linkedin_url: "https://linkedin.com",
          twitter_url: "https://twitter.com"
        }
      },
      {
        id: 3,
        title: { rendered: "Maria Garcia" },
        content: { rendered: "Their creative vision and technical expertise delivered a website that not only looks stunning but converts visitors into customers. The attention to detail and commitment to excellence is unmatched. Outstanding work!" },
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
          }]
        },
        acf: {
          client_position: "Marketing Director",
          client_company: "Luxury Brands Co.",
          rating: 5,
          project_type: "E-commerce Development",
          linkedin_url: "https://linkedin.com",
          twitter_url: "https://twitter.com"
        }
      },
      {
        id: 4,
        title: { rendered: "David Chen" },
        content: { rendered: "The performance optimization they did on our platform was incredible. Load times decreased by 70% and user engagement skyrocketed. Their technical knowledge and problem-solving skills are exceptional." },
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
          }]
        },
        acf: {
          client_position: "CTO",
          client_company: "CloudTech Solutions",
          rating: 5,
          project_type: "Performance Optimization",
          linkedin_url: "https://linkedin.com",
          twitter_url: "https://twitter.com"
        }
      },
      {
        id: 5,
        title: { rendered: "Fatima Al Maktoum" },
        content: { rendered: "UAE Digital Solutions helped us establish a strong online presence. Their digital marketing strategies increased our reach by 400% in just three months. Highly recommend their services!" },
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop"
          }]
        },
        acf: {
          client_position: "Director",
          client_company: "Heritage UAE",
          rating: 5,
          project_type: "Digital Marketing",
          linkedin_url: "https://linkedin.com",
          twitter_url: "https://twitter.com"
        }
      },
      {
        id: 6,
        title: { rendered: "James Wilson" },
        content: { rendered: "The mobile app they developed for us has been a game-changer. User-friendly, fast, and reliable. Our customers love it, and we've seen a significant increase in mobile transactions." },
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
          }]
        },
        acf: {
          client_position: "Product Manager",
          client_company: "RetailPlus",
          rating: 5,
          project_type: "Mobile App Development",
          linkedin_url: "https://linkedin.com",
          twitter_url: "https://twitter.com"
        }
      },
      {
        id: 7,
        title: { rendered: "Layla Hassan" },
        content: { rendered: "Their WordPress expertise is unmatched. They created a custom solution that perfectly fits our needs and is easy to manage. The ongoing support has been excellent too." },
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
          }]
        },
        acf: {
          client_position: "Managing Director",
          client_company: "Education Hub",
          rating: 5,
          project_type: "WordPress Development",
          linkedin_url: "https://linkedin.com",
          twitter_url: "https://twitter.com"
        }
      },
      {
        id: 8,
        title: { rendered: "Robert Thompson" },
        content: { rendered: "The SEO results speak for themselves - we're now ranking on the first page for all our target keywords. Their strategic approach and continuous optimization have driven incredible organic growth." },
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop"
          }]
        },
        acf: {
          client_position: "Marketing Manager",
          client_company: "Global Ventures",
          rating: 5,
          project_type: "SEO Optimization",
          linkedin_url: "https://linkedin.com",
          twitter_url: "https://twitter.com"
        }
      }
    ];
    
    return NextResponse.json(mockTestimonials);
  }
}