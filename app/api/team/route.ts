import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/team?_embed&per_page=100`, {
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
    console.error('API Route - Error fetching team:', error.message);
    
    // Return mock data if WordPress is unavailable
    const mockTeam = [
      {
        id: 1,
        title: { rendered: "John Smith" },
        slug: "john-smith",
        content: { rendered: "Experienced developer with 10+ years in web technologies" },
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
          }]
        },
        acf: {
          position: "Chief Technology Officer",
          expertise: ["React", "Node.js", "Cloud Architecture"],
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
          github: "https://github.com",
          email: "john@uaedigital.ae"
        }
      },
      {
        id: 2,
        title: { rendered: "Sarah Johnson" },
        slug: "sarah-johnson",
        content: { rendered: "Creative director with a passion for innovative design" },
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
          }]
        },
        acf: {
          position: "Creative Director",
          expertise: ["UI/UX Design", "Branding", "Motion Graphics"],
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
          email: "sarah@uaedigital.ae"
        }
      },
      {
        id: 3,
        title: { rendered: "Ahmed Al Rashid" },
        slug: "ahmed-al-rashid",
        content: { rendered: "Marketing strategist specializing in digital growth" },
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
          }]
        },
        acf: {
          position: "Head of Marketing",
          expertise: ["SEO", "Content Strategy", "Analytics"],
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
          email: "ahmed@uaedigital.ae"
        }
      },
      {
        id: 4,
        title: { rendered: "Maria Garcia" },
        slug: "maria-garcia",
        content: { rendered: "Full-stack developer with expertise in modern frameworks" },
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
          }]
        },
        acf: {
          position: "Senior Developer",
          expertise: ["Vue.js", "Laravel", "DevOps"],
          linkedin: "https://linkedin.com",
          github: "https://github.com",
          email: "maria@uaedigital.ae"
        }
      },
      {
        id: 5,
        title: { rendered: "David Chen" },
        slug: "david-chen",
        content: { rendered: "AI specialist focused on automation solutions" },
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
          }]
        },
        acf: {
          position: "AI Engineer",
          expertise: ["Machine Learning", "Python", "TensorFlow"],
          linkedin: "https://linkedin.com",
          github: "https://github.com",
          email: "david@uaedigital.ae"
        }
      },
      {
        id: 6,
        title: { rendered: "Fatima Al Maktoum" },
        slug: "fatima-al-maktoum",
        content: { rendered: "Project manager ensuring smooth delivery of all projects" },
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop"
          }]
        },
        acf: {
          position: "Project Manager",
          expertise: ["Agile", "Scrum", "Client Relations"],
          linkedin: "https://linkedin.com",
          email: "fatima@uaedigital.ae"
        }
      },
      {
        id: 7,
        title: { rendered: "Robert Thompson" },
        slug: "robert-thompson",
        content: { rendered: "Mobile app developer creating seamless experiences" },
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop"
          }]
        },
        acf: {
          position: "Mobile Developer",
          expertise: ["React Native", "iOS", "Android"],
          linkedin: "https://linkedin.com",
          github: "https://github.com",
          email: "robert@uaedigital.ae"
        }
      },
      {
        id: 8,
        title: { rendered: "Layla Hassan" },
        slug: "layla-hassan",
        content: { rendered: "Content strategist crafting compelling narratives" },
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
          }]
        },
        acf: {
          position: "Content Strategist",
          expertise: ["Copywriting", "Social Media", "Brand Voice"],
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
          email: "layla@uaedigital.ae"
        }
      }
    ];
    
    return NextResponse.json(mockTeam);
  }
}