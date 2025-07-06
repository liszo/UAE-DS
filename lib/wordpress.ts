// WordPress API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://uaedigitalsolution.agency/wp-json';
const API_TIMEOUT = 15000; // 15 seconds timeout

// Enhanced fetch with timeout and retry logic
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = API_TIMEOUT) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'NextJS-UAE-Digital',
        ...options.headers,
      }
    });
    
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error(`Request timeout after ${timeout}ms`);
      }
      throw new Error(`Network error: ${error.message}`);
    }
    
    throw new Error('Unknown network error');
  }
}

// Safe JSON parsing with error handling
async function safeJsonParse(response: Response) {
  try {
    const text = await response.text();
    if (!text.trim()) {
      throw new Error('Empty response from server');
    }
    return JSON.parse(text);
  } catch (error) {
    console.error('JSON Parse Error:', error);
    throw new Error('Invalid JSON response from server');
  }
}

// Enhanced utility function to clean HTML entities and tags
export function cleanHtmlContent(content: string): string {
  if (!content || typeof content !== 'string') return '';
  
  return content
    // Fix common HTML entities
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '...')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    .trim();
}

// Utility function to get excerpt
export function getExcerpt(content: string, maxLength: number = 150): string {
  if (!content) return '';
  const cleanContent = cleanHtmlContent(content);
  return cleanContent.length > maxLength 
    ? cleanContent.substring(0, maxLength).trim() + '...'
    : cleanContent;
}

// Parse textarea field (one item per line) - for free ACF version
function parseTextareaField(text: string): string[] {
  if (!text) return [];
  return text.split(/\r\n|\n|\r/).filter(item => item.trim() !== '');
}

// Parse process field (format: "Title | Description") - for free ACF version
function parseProcessField(text: string): Array<{title: string, description: string}> {
  if (!text) return [];
  return text.split(/\r\n|\n|\r/)
    .filter(item => item.trim() !== '')
    .map(item => {
      const [title, description] = item.split(' | ');
      return {
        title: title?.trim() || '',
        description: description?.trim() || ''
      };
    });
}

// Parse FAQ field (format: "Question | Answer") - for free ACF version
function parseFAQField(text: string): Array<{question: string, answer: string}> {
  if (!text) return [];
  return text.split(/\r\n|\n|\r/)
    .filter(item => item.trim() !== '')
    .map(item => {
      const [question, answer] = item.split(' | ');
      return {
        question: question?.trim() || '',
        answer: answer?.trim() || ''
      };
    });
}

// Transform service data based on your actual API structure
function transformService(service: any) {
  return {
    id: service.id,
    title: cleanHtmlContent(service.title?.rendered || ''),
    slug: service.slug || '',
    excerpt: cleanHtmlContent(service.excerpt?.rendered || ''),
    content: service.content?.rendered || '',
    
    // Featured image from your actual data structure
    featuredImage: service.featured_image_url || 
                  service._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
                  '/api/placeholder/600/400',
    
    // ACF fields
    icon: service.acf?.service_icon || 'fas fa-cog',
    description: cleanHtmlContent(service.excerpt?.rendered || ''),
    
    // Parse textarea fields from custom_fields (free ACF version)
    features: parseTextareaField(service.custom_fields?._service_features_text?.[0] || ''),
    process: parseProcessField(service.custom_fields?._service_process_text?.[0] || ''),
    faqs: parseFAQField(service.custom_fields?._service_faqs?.[0] || ''),
    
    // Service categories from WordPress taxonomy
    categories: service._embedded?.['wp:term']?.[0] || [],
    serviceCategories: service.service_category || [],
    
    pricing: service.acf?.pricing || null,
    technologies: service.acf?.technologies || [],
    link: `/services/${service.slug}`,
    date: service.date || new Date().toISOString(),
    acf: service.acf || {},
    
    // CTA text from ACF
    cta: service.acf?.service_cta || 'Learn More'
  };
}

// Transform case study data based on your actual API structure
function transformCase(caseStudy: any) {
  return {
    id: caseStudy.id,
    title: cleanHtmlContent(caseStudy.title?.rendered || ''),
    slug: caseStudy.slug || '',
    excerpt: cleanHtmlContent(caseStudy.excerpt?.rendered || ''),
    content: caseStudy.content?.rendered || '',
    
    // Featured image
    featuredImage: caseStudy.featured_image_url || 
                  caseStudy._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
                  '/api/placeholder/600/800',
    
    // ACF fields for case studies - based on your actual data structure
    client: cleanHtmlContent(caseStudy.acf?.client_name || ''),
    industry: cleanHtmlContent(caseStudy.acf?.industry || ''),
    servicesProvided: Array.isArray(caseStudy.acf?.services_provided) ? caseStudy.acf.services_provided : [],
    projectUrl: caseStudy.acf?.project_url || '',
    challenge: caseStudy.acf?.challenge || '',
    solution: caseStudy.acf?.solution || '',
    impact: caseStudy.acf?.impact || '',
    results: caseStudy.acf?.impact || caseStudy.acf?.results || '', // Use impact as results
    process: caseStudy.acf?.process || '',
    gallery: Array.isArray(caseStudy.acf?.project_gallery) ? caseStudy.acf.project_gallery : [],
    
    // Categories and taxonomy
    categories: caseStudy._embedded?.['wp:term']?.[0] || [],
    caseCategories: caseStudy.case_category || [],
    
    // Additional fields with fallbacks
    category: cleanHtmlContent(caseStudy.acf?.industry || 'Business'),
    tags: caseStudy.acf?.services_provided?.join(', ') || '',
    duration: caseStudy.acf?.project_duration || '3-6 months',
    teamSize: caseStudy.acf?.team_size || '5-8 people',
    technologies: caseStudy.acf?.technologies || caseStudy.acf?.services_provided || [],
    year: caseStudy.date ? new Date(caseStudy.date).getFullYear().toString() : new Date().getFullYear().toString(),
    date: caseStudy.date || new Date().toISOString(),
    link: `/cases/${caseStudy.slug}`,
    acf: caseStudy.acf || {}
  };
}

// Fetch Services from WordPress
export async function getServices() {
  try {
    console.log('🔄 Fetching services...');
    
    // Direct WordPress API call with embed
    const apiUrl = `${API_BASE_URL}/wp/v2/services?_embed=1&per_page=100&status=publish`;
    const response = await fetchWithTimeout(apiUrl, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });
    
    if (!response.ok) {
      console.error('❌ Services API error:', response.status, response.statusText);
      throw new Error(`Failed to fetch services: ${response.status} ${response.statusText}`);
    }
    
    const services = await safeJsonParse(response);
    
    if (!Array.isArray(services)) {
      console.error('❌ Services response is not an array:', services);
      return [];
    }
    
    console.log('✅ Services fetched successfully:', services.length, 'items');
    
    return services.map(transformService);
  } catch (error) {
    console.error('💥 Error fetching services:', error);
    return [];
  }
}

// Fetch Cases from WordPress
export async function getCases() {
  try {
    console.log('🔄 Fetching cases...');
    
    // Direct WordPress API call with embed
    const apiUrl = `${API_BASE_URL}/wp/v2/cases?_embed=1&per_page=100&status=publish`;
    const response = await fetchWithTimeout(apiUrl, {
      next: { revalidate: 300 },
    });
    
    if (!response.ok) {
      console.error('❌ Cases API error:', response.status, response.statusText);
      throw new Error(`Failed to fetch cases: ${response.status} ${response.statusText}`);
    }
    
    const cases = await safeJsonParse(response);
    
    if (!Array.isArray(cases)) {
      console.error('❌ Cases response is not an array:', cases);
      return [];
    }
    
    console.log('✅ Cases fetched successfully:', cases.length, 'items');
    
    return cases.map(transformCase);
  } catch (error) {
    console.error('💥 Error fetching cases:', error);
    return [];
  }
}

// Fetch Testimonials from WordPress
export async function getTestimonials() {
  try {
    console.log('🔄 Fetching testimonials...');
    
    const apiUrl = `${API_BASE_URL}/wp/v2/testimonials?_embed=1&per_page=100&status=publish`;
    const response = await fetchWithTimeout(apiUrl, {
      next: { revalidate: 600 }, // Cache for 10 minutes
    });
    
    if (!response.ok) {
      console.error('❌ Testimonials API error:', response.status, response.statusText);
      throw new Error(`Failed to fetch testimonials: ${response.status} ${response.statusText}`);
    }
    
    const testimonials = await safeJsonParse(response);
    
    if (!Array.isArray(testimonials)) {
      console.error('❌ Testimonials response is not an array:', testimonials);
      return [];
    }
    
    console.log('✅ Testimonials fetched successfully:', testimonials.length, 'items');
    
    return testimonials.map((testimonial: any) => ({
      id: testimonial.id,
      name: cleanHtmlContent(testimonial.title?.rendered || ''),
      content: cleanHtmlContent(testimonial.content?.rendered || ''),
      role: testimonial.acf?.client_position || '',
      company: testimonial.acf?.client_company || '',
      image: testimonial.featured_image_url || 
             testimonial._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
             '/api/placeholder/100/100',
      rating: parseInt(testimonial.acf?.rating || '5'),
      projectType: testimonial.acf?.project_type || '',
      linkedin: testimonial.acf?.linkedin_url || '',
      twitter: testimonial.acf?.twitter_url || '',
      date: testimonial.date || new Date().toISOString(),
      featured: testimonial.acf?.featured || false,
      acf: testimonial.acf || {}
    }));
  } catch (error) {
    console.error('💥 Error fetching testimonials:', error);
    return [];
  }
}

// Fetch Team Members from WordPress
export async function getTeamMembers() {
  try {
    console.log('🔄 Fetching team members...');
    
    const apiUrl = `${API_BASE_URL}/wp/v2/team?_embed=1&per_page=100&status=publish`;
    const response = await fetchWithTimeout(apiUrl, {
      next: { revalidate: 600 },
    });
    
    if (!response.ok) {
      console.error('❌ Team API error:', response.status, response.statusText);
      throw new Error(`Failed to fetch team members: ${response.status} ${response.statusText}`);
    }
    
    const team = await safeJsonParse(response);
    
    if (!Array.isArray(team)) {
      console.error('❌ Team response is not an array:', team);
      return [];
    }
    
    console.log('✅ Team members fetched successfully:', team.length, 'items');
    
    return team.map((member: any) => ({
      id: member.id,
      title: cleanHtmlContent(member.title?.rendered || ''),
      name: cleanHtmlContent(member.title?.rendered || ''),
      slug: member.slug || '',
      role: member.acf?.position || '',
      bio: cleanHtmlContent(member.acf?.bio || member.content?.rendered || ''),
      image: member.featured_image_url || 
            member._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
            '/api/placeholder/400/400',
      expertise: Array.isArray(member.acf?.expertise) ? member.acf.expertise : [],
      experience: member.acf?.experience || '',
      location: member.acf?.location || '',
      languages: member.acf?.languages || [],
      socialLinks: {
        linkedin: member.acf?.social_links?.linkedin || member.acf?.linkedin || '',
        twitter: member.acf?.social_links?.twitter || member.acf?.twitter || '',
        github: member.acf?.social_links?.github || member.acf?.github || '',
        email: member.acf?.social_links?.email || member.acf?.email || '',
        website: member.acf?.social_links?.website || member.acf?.website || ''
      },
      featured: member.acf?.featured || false,
      order: member.acf?.display_order || 0,
      content: cleanHtmlContent(member.content?.rendered || ''),
      acf: member.acf || {}
    }));
  } catch (error) {
    console.error('💥 Error fetching team members:', error);
    return [];
  }
}

// Fetch single service by slug
export async function getServiceBySlug(slug: string) {
  try {
    console.log('🔄 Fetching service by slug:', slug);
    
    if (!slug || typeof slug !== 'string') {
      throw new Error('Invalid slug provided');
    }
    
    const cleanSlug = slug.trim().toLowerCase();
    const apiUrl = `${API_BASE_URL}/wp/v2/services?slug=${encodeURIComponent(cleanSlug)}&_embed=1&status=publish`;
    
    console.log('🌐 Service API URL:', apiUrl);
    
    const response = await fetchWithTimeout(apiUrl, {
      next: { revalidate: 300 },
    });
    
    if (!response.ok) {
      console.error('❌ Service by slug API error:', response.status, response.statusText);
      throw new Error(`Failed to fetch service: ${response.status} ${response.statusText}`);
    }
    
    const data = await safeJsonParse(response);
    
    if (!Array.isArray(data) || data.length === 0) {
      console.log('❌ No service found with slug:', cleanSlug);
      return null;
    }
    
    const service = data[0];
    console.log('✅ Service found:', cleanHtmlContent(service.title?.rendered || ''));
    
    return transformService(service);
  } catch (error) {
    console.error('💥 Error fetching service by slug:', error);
    return null;
  }
}

// Fetch single case study by slug
export async function getCaseBySlug(slug: string) {
  try {
    console.log('🔄 Fetching case by slug:', slug);
    
    if (!slug || typeof slug !== 'string') {
      throw new Error('Invalid slug provided');
    }
    
    const cleanSlug = slug.trim().toLowerCase();
    const apiUrl = `${API_BASE_URL}/wp/v2/cases?slug=${encodeURIComponent(cleanSlug)}&_embed=1&status=publish`;
    
    console.log('🌐 Case API URL:', apiUrl);
    
    const response = await fetchWithTimeout(apiUrl, {
      next: { revalidate: 300 },
    });
    
    if (!response.ok) {
      console.error('❌ Case by slug API error:', response.status, response.statusText);
      throw new Error(`Failed to fetch case: ${response.status} ${response.statusText}`);
    }
    
    const data = await safeJsonParse(response);
    
    if (!Array.isArray(data) || data.length === 0) {
      console.log('❌ No case found with slug:', cleanSlug);
      return null;
    }
    
    const caseItem = data[0];
    console.log('✅ Case found:', cleanHtmlContent(caseItem.title?.rendered || ''));
    
    return transformCase(caseItem);
  } catch (error) {
    console.error('💥 Error fetching case by slug:', error);
    return null;
  }
}

// Fetch blog posts
export async function getBlogPosts() {
  try {
    console.log('🔄 Fetching blog posts...');
    
    const apiUrl = `${API_BASE_URL}/wp/v2/posts?_embed=1&per_page=100&status=publish`;
    const response = await fetchWithTimeout(apiUrl, {
      next: { revalidate: 300 },
    });
    
    if (!response.ok) {
      console.error('❌ Posts API error:', response.status, response.statusText);
      throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
    }
    
    const posts = await safeJsonParse(response);
    
    if (!Array.isArray(posts)) {
      console.error('❌ Posts response is not an array:', posts);
      return [];
    }
    
    console.log('✅ Blog posts fetched successfully:', posts.length, 'items');
    
    return posts.map((post: any) => ({
      id: post.id,
      title: cleanHtmlContent(post.title?.rendered || ''),
      slug: post.slug || '',
      excerpt: cleanHtmlContent(post.excerpt?.rendered || ''),
      content: post.content?.rendered || '',
      date: post.date || new Date().toISOString(),
      featuredImage: post.featured_image_url || 
                    post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
                    '/api/placeholder/800/600',
      author: post._embedded?.['author']?.[0]?.name || 'UAE Digital',
      categories: post._embedded?.['wp:term']?.[0] || [],
      tags: post._embedded?.['wp:term']?.[1] || [],
      link: `/blog/${post.slug}`,
      readTime: calculateReadTime(post.content?.rendered || ''),
      acf: post.acf || {}
    }));
  } catch (error) {
    console.error('💥 Error fetching blog posts:', error);
    return [];
  }
}

// Fetch single blog post by slug
export async function getPostBySlug(slug: string) {
  try {
    console.log('🔄 Fetching post by slug:', slug);
    
    const apiUrl = `${API_BASE_URL}/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=1&status=publish`;
    const response = await fetchWithTimeout(apiUrl, {
      next: { revalidate: 300 },
    });
    
    if (!response.ok) {
      console.error('❌ Post by slug API error:', response.status, response.statusText);
      throw new Error(`Failed to fetch post: ${response.status} ${response.statusText}`);
    }
    
    const posts = await safeJsonParse(response);
    const post = Array.isArray(posts) ? posts[0] : null;
    
    if (!post) {
      console.log('❌ No post found with slug:', slug);
      return null;
    }
    
    console.log('✅ Post found:', cleanHtmlContent(post.title?.rendered || ''));
    
    return {
      id: post.id,
      title: cleanHtmlContent(post.title?.rendered || ''),
      slug: post.slug || '',
      content: post.content?.rendered || '',
      excerpt: cleanHtmlContent(post.excerpt?.rendered || ''),
      date: post.date || new Date().toISOString(),
      featuredImage: post.featured_image_url || 
                    post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
                    '/api/placeholder/800/600',
      author: post._embedded?.['author']?.[0]?.name || 'UAE Digital',
      categories: post._embedded?.['wp:term']?.[0] || [],
      tags: post._embedded?.['wp:term']?.[1] || [],
      readTime: calculateReadTime(post.content?.rendered || ''),
      acf: post.acf || {}
    };
  } catch (error) {
    console.error('💥 Error fetching post by slug:', error);
    return null;
  }
}

// Fetch service categories
export async function getServiceCategories() {
  try {
    console.log('🔄 Fetching service categories...');
    
    const apiUrl = `${API_BASE_URL}/wp/v2/service_category?per_page=100`;
    const response = await fetchWithTimeout(apiUrl, {
      next: { revalidate: 600 },
    });
    
    if (!response.ok) {
      console.error('❌ Service categories API error:', response.status);
      return [];
    }
    
    const categories = await safeJsonParse(response);
    console.log('✅ Service categories fetched:', categories?.length || 0, 'items');
    
    return Array.isArray(categories) ? categories : [];
  } catch (error) {
    console.error('💥 Error fetching service categories:', error);
    return [];
  }
}

// Fetch case industries/categories
export async function getCaseIndustries() {
  try {
    console.log('🔄 Fetching case industries...');
    
    const apiUrl = `${API_BASE_URL}/wp/v2/case_category?per_page=100`;
    const response = await fetchWithTimeout(apiUrl, {
      next: { revalidate: 600 },
    });
    
    if (!response.ok) {
      console.error('❌ Case industries API error:', response.status);
      return [];
    }
    
    const industries = await safeJsonParse(response);
    console.log('✅ Case industries fetched:', industries?.length || 0, 'items');
    
    return Array.isArray(industries) ? industries : [];
  } catch (error) {
    console.error('💥 Error fetching case industries:', error);
    return [];
  }
}

// Calculate reading time for blog posts
function calculateReadTime(content: string): string {
  if (!content) return '1 min read';
  
  const wordsPerMinute = 200;
  const words = cleanHtmlContent(content).split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  
  return `${minutes} min read`;
}

// API Health check
export async function checkApiHealth() {
  try {
    console.log('🏥 Checking API health...');
    
    const response = await fetchWithTimeout(`${API_BASE_URL}/wp/v2`, {
      method: 'GET',
      cache: 'no-store'
    });
    
    const isHealthy = response.ok;
    const message = isHealthy ? 'API is working correctly' : `API returned status ${response.status}`;
    
    console.log(isHealthy ? '✅ API is healthy' : '❌ API is not responding properly');
    
    return {
      healthy: isHealthy,
      status: response.status,
      message
    };
  } catch (error) {
    console.error('💥 API health check failed:', error);
    return {
      healthy: false,
      status: 0,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Contact form submission
export async function submitContactForm(formData: {
  name: string;
  email: string;
  company?: string;
  message: string;
  service?: string;
  budget?: string;
}) {
  try {
    console.log('📧 Submitting contact form...');
    
    const response = await fetchWithTimeout('/api/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to submit form: ${response.status} ${response.statusText}`);
    }
    
    const result = await safeJsonParse(response);
    console.log('✅ Contact form submitted successfully');
    
    return {
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
      data: result
    };
  } catch (error) {
    console.error('💥 Error submitting contact form:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit form',
      data: null
    };
  }
}

// Newsletter subscription
export async function subscribeNewsletter(email: string) {
  try {
    console.log('📬 Subscribing to newsletter...');
    
    const response = await fetchWithTimeout('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to subscribe: ${response.status} ${response.statusText}`);
    }
    
    const result = await safeJsonParse(response);
    console.log('✅ Newsletter subscription successful');
    
    return {
      success: true,
      message: 'Thank you for subscribing to our newsletter!',
      data: result
    };
  } catch (error) {
    console.error('💥 Error subscribing to newsletter:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to subscribe',
      data: null
    };
  }
}

// Export configuration for debugging
export const config = {
  API_BASE_URL,
  API_TIMEOUT
};

// Export types for TypeScript
export interface Service {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  icon: string;
  description: string;
  features: string[];
  process: Array<{title: string, description: string}>;
  faqs: Array<{question: string, answer: string}>;
  categories: any[];
  serviceCategories: number[];
  pricing: any;
  technologies: string[];
  link: string;
  date: string;
  acf: any;
  cta: string;
}

export interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  client: string;
  industry: string;
  servicesProvided: string[];
  projectUrl: string;
  challenge: string;
  solution: string;
  impact: string;
  results: string;
  process: string;
  gallery: string[];
  categories: any[];
  caseCategories: number[];
  category: string;
  tags: string;
  duration: string;
  teamSize: string;
  technologies: string[];
  year: string;
  date: string;
  link: string;
  acf: any;
}

export interface TeamMember {
  id: number;
  title: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  image: string;
  expertise: string[];
  experience: string;
  location: string;
  languages: string[];
  socialLinks: {
    linkedin: string;
    twitter: string;
    github: string;
    email: string;
    website: string;
  };
  featured: boolean;
  order: number;
  content: string;
  acf: any;
}

export interface Testimonial {
  id: number;
  name: string;
  content: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  projectType: string;
  linkedin: string;
  twitter: string;
  date: string;
  featured: boolean;
  acf: any;
}