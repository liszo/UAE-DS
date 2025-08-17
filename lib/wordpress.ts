// lib/wordpress.ts

// Enhanced fetch with timeout and retry logic
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 15000) {
 const controller = new AbortController();
 const timeoutId = setTimeout(() => controller.abort(), timeout);
 
 try {
 const response = await fetch(url, {
 ...options,
 signal: controller.signal,
 headers: {
 'Content-Type': 'application/json',
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

// Helper function to fetch all items with pagination using proxy
async function fetchAllItemsViaProxy(endpoint: string): Promise<any[]> {
 let allItems: any[] = [];
 let page = 1;
 let hasMore = true;
 const perPage = 100; // WordPress default max

 while (hasMore) {
 try {
 console.log(`🔄 Fetching ${endpoint} page ${page}...`);
 
 const response = await fetchWithTimeout(`/api/wordpress/${endpoint}?per_page=${perPage}&page=${page}&_embed=1`, {
 method: 'GET',
 headers: {
 'Content-Type': 'application/json',
 },
 next: { revalidate: 300 }
 });

 if (!response.ok) {
 if (response.status === 400 && page > 1) {
 // No more pages
 console.log(`✅ Reached end of ${endpoint} at page ${page - 1}`);
 hasMore = false;
 break;
 }
 throw new Error(`HTTP error! status: ${response.status}`);
 }

 const items = await safeJsonParse(response);
 
 if (!Array.isArray(items) || items.length === 0) {
 console.log(`✅ No more ${endpoint} items found at page ${page}`);
 hasMore = false;
 } else {
 allItems = [...allItems, ...items];
 console.log(`✅ Fetched ${items.length} ${endpoint} items from page ${page}`);
 
 // Check if we got fewer items than requested (last page)
 if (items.length < perPage) {
 console.log(`✅ Last page of ${endpoint} reached (${items.length} < ${perPage})`);
 hasMore = false;
 } else {
 page++;
 }
 }
 } catch (error) {
 console.error(`❌ Error fetching ${endpoint} page ${page}:`, error);
 hasMore = false;
 }
 }

 console.log(`✅ Total ${endpoint} items fetched: ${allItems.length}`);
 return allItems;
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

// Helper function to parse tool features - Updated with better error handling
function parseToolFeatures(featuresString: any): Array<{icon: string, title: string, description: string}> {
 if (!featuresString) return [];
 
 const features: Array<{icon: string, title: string, description: string}> = [];
 
 try {
 let featuresText = '';
 
 // Handle different data types
 if (typeof featuresString === 'string') {
 featuresText = featuresString;
 } else if (Array.isArray(featuresString)) {
 featuresText = featuresString.join('\n');
 } else if (typeof featuresString === 'object' && featuresString !== null) {
 featuresText = JSON.stringify(featuresString);
 } else {
 return [];
 }
 
 // Split by newlines and filter out empty lines
 const lines = featuresText.split(/\r\n|\n|\r/).filter(line => line.trim());
 
 lines.forEach(line => {
 const trimmedLine = line.trim();
 if (!trimmedLine) return;
 
 // Check if line contains | separator for icon format
 if (trimmedLine.includes('|')) {
 const parts = trimmedLine.split('|').map(p => p.trim());
 if (parts.length >= 3) {
 features.push({
 icon: parts[0] || 'fas fa-check',
 title: parts[1] || 'Feature',
 description: parts[2] || ''
 });
 } else if (parts.length === 2) {
 features.push({
 icon: 'fas fa-check',
 title: parts[0] || 'Feature',
 description: parts[1] || ''
 });
 }
 } else {
 // Simple feature without icon
 features.push({
 icon: 'fas fa-check',
 title: trimmedLine,
 description: ''
 });
 }
 });
 } catch (error) {
 console.warn('Error parsing tool features:', error);
 return [];
 }
 
 return features;
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

// Transform solution data - Updated to match your JSON structure
function transformSolution(solution: any) {
 return {
 id: solution.id,
 slug: solution.slug || '',
 title: cleanHtmlContent(solution.title?.rendered || ''),
 excerpt: cleanHtmlContent(solution.excerpt?.rendered || ''),
 content: solution.content?.rendered || '',
 featuredImage: solution.featured_image_url || 
 solution._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
 '/api/placeholder/600/400',
 
 // Solution specific fields - Fixed field names
 pain_point_name: cleanHtmlContent(solution.pain_point_name || solution.title?.rendered || ''),
 pain_point_subtitle: cleanHtmlContent(solution.pain_point_subtitle || ''),
 problem_description: cleanHtmlContent(solution.problem_description || ''),
 solution_overview: cleanHtmlContent(solution.solution_overview || ''),
 key_benefits: solution.key_benefits || '',
 cta_button_text: solution.cta_button_text || 'Learn More',
 
 // ROI Metrics - Fixed field names
 time_saved: solution.time_saved || '',
 revenue_increase: solution.revenue_increase || '',
 cost_reduction: solution.cost_reduction || '',
 
 // Additional fields - Fixed field names
 pricing_range: solution.pricing_range || 'standard',
 implementation_time: solution.implementation_time || '',
 
 // Taxonomies - Fixed field names
 solution_category: solution.solution_category || [],
 target_audience: solution.target_audience || [],
 
 // Legacy fields for backward compatibility
 painPoint: cleanHtmlContent(solution.pain_point_name || solution.title?.rendered || ''),
 painPointSubtitle: cleanHtmlContent(solution.pain_point_subtitle || ''),
 problemDescription: cleanHtmlContent(solution.problem_description || ''),
 solutionOverview: cleanHtmlContent(solution.solution_overview || ''),
 keyBenefits: solution.key_benefits ? parseTextareaField(solution.key_benefits) : [],
 ctaText: solution.cta_button_text || 'Learn More',
 timeSaved: solution.time_saved || '',
 revenueIncrease: solution.revenue_increase || '',
 costReduction: solution.cost_reduction || '',
 pricingRange: solution.pricing_range || 'standard',
 implementationTime: solution.implementation_time || '',
 categories: solution.solution_category || [],
 audiences: solution.target_audience || [],
 
 date: solution.date || new Date().toISOString(),
 link: `/solutions/${solution.slug}`,
 acf: solution.acf || {}
 };
}

// Transform tool data - Fixed technology_stack handling
function transformTool(tool: any) {
 // Helper function to safely handle technology_stack
 const parseTechnologyStack = (techStack: any): string[] => {
 if (!techStack) return [];
 if (Array.isArray(techStack)) return techStack;
 if (typeof techStack === 'string') {
 return techStack.split(',').map((t: string) => t.trim()).filter(Boolean);
 }
 return [];
 };

 return {
 id: tool.id,
 slug: tool.slug || '',
 title: cleanHtmlContent(tool.title?.rendered || ''),
 excerpt: cleanHtmlContent(tool.excerpt?.rendered || ''),
 content: tool.content?.rendered || '',
 featuredImage: tool.featured_image_url || 
 tool._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
 '/api/placeholder/600/400',
 
 // Tool specific fields - Fixed field names with safe parsing
 tool_tagline: cleanHtmlContent(tool.tool_tagline || ''),
 tool_type: tool.tool_type || 'automation',
 technology_stack: parseTechnologyStack(tool.technology_stack),
 demo_available: tool.demo_available === '1' || tool.demo_available === true ? "1" : "0",
 demo_link: tool.demo_link || '',
 support_included: cleanHtmlContent(tool.support_included || ''),
 
 // Features - keep original field name
 tool_features: tool.tool_features || '',
 
 // Pricing - Fixed field names
 pricing_model: tool.pricing_model || 'monthly',
 base_price: tool.base_price || tool.monthly_fee || '0',
 setup_fee: tool.setup_fee || '',
 monthly_fee: tool.monthly_fee || '',
 
 // Metrics
 setup_time: tool.setup_time || '',
 
 // Taxonomies - Fixed field names
 tool_category: tool.tool_category || [],
 target_audience: tool.target_audience || [],
 
 // Legacy fields for backward compatibility
 tagline: cleanHtmlContent(tool.tool_tagline || ''),
 toolType: tool.tool_type || 'automation',
 technologyStack: parseTechnologyStack(tool.technology_stack),
 demoAvailable: tool.demo_available === '1' || tool.demo_available === true,
 demoUrl: tool.demo_link || '',
 supportIncluded: cleanHtmlContent(tool.support_included || ''),
 keyFeatures: tool.tool_features ? parseToolFeatures(tool.tool_features) : [],
 pricingModel: tool.pricing_model || 'monthly',
 price: tool.base_price || tool.monthly_fee || '0',
 setupFee: tool.setup_fee || '',
 monthlyFee: tool.monthly_fee || '',
 setupTime: tool.setup_time || '',
 averageRoi: '300%',
 activeUsers: '1k+',
 categories: tool.tool_category || [],
 audiences: tool.target_audience || [],
 compatibleWith: parseTechnologyStack(tool.technology_stack).slice(0, 3),
 
 date: tool.date || new Date().toISOString(),
 link: `/tools/${tool.slug}`,
 acf: tool.acf || {}
 };
}

// Fetch Services from WordPress using proxy - Updated to fetch ALL
export async function getServices(limit?: number) {
 try {
 console.log('🔄 Fetching all services...');
 
 const services = await fetchAllItemsViaProxy('services');
 
 if (!Array.isArray(services)) {
 console.error('❌ Services response is not an array:', services);
 return [];
 }
 
 console.log('✅ Services fetched successfully:', services.length, 'items');
 
 const transformedServices = services.map(transformService);
 return limit ? transformedServices.slice(0, limit) : transformedServices;
 } catch (error) {
 console.error('💥 Error fetching services:', error);
 return [];
 }
}

// Fetch Cases from WordPress using proxy - Updated to fetch ALL
export async function getCases(limit?: number) {
 try {
 console.log('🔄 Fetching all cases...');
 
 const cases = await fetchAllItemsViaProxy('cases');
 
 if (!Array.isArray(cases)) {
 console.error('❌ Cases response is not an array:', cases);
 return [];
 }
 
 console.log('✅ Cases fetched successfully:', cases.length, 'items');
 
 const transformedCases = cases.map(transformCase);
 return limit ? transformedCases.slice(0, limit) : transformedCases;
 } catch (error) {
 console.error('💥 Error fetching cases:', error);
 return [];
 }
}

// Fetch Solutions from WordPress using proxy - Updated to fetch ALL
export async function getSolutions(limit?: number) {
 try {
 console.log('🔄 Fetching all solutions...');
 
 const solutions = await fetchAllItemsViaProxy('solutions');
 
 if (!Array.isArray(solutions)) {
 console.error('❌ Solutions response is not an array:', solutions);
 return [];
 }
 
 console.log('✅ Solutions fetched successfully:', solutions.length, 'items');
 
 const transformedSolutions = solutions.map(transformSolution);
 return limit ? transformedSolutions.slice(0, limit) : transformedSolutions;
 } catch (error) {
 console.error('💥 Error fetching solutions:', error);
 return [];
 }
}

// Fetch Tools from WordPress using proxy - Updated to fetch ALL
export async function getTools(limit?: number) {
 try {
 console.log('🔄 Fetching all tools...');
 
 const tools = await fetchAllItemsViaProxy('tools');
 
 if (!Array.isArray(tools)) {
 console.error('❌ Tools response is not an array:', tools);
 return [];
 }
 
 console.log('✅ Tools fetched successfully:', tools.length, 'items');
 
 const transformedTools = tools.map(transformTool);
 return limit ? transformedTools.slice(0, limit) : transformedTools;
 } catch (error) {
 console.error('💥 Error fetching tools:', error);
 return [];
 }
}

// Fetch Testimonials from WordPress using proxy
export async function getTestimonials(limit?: number) {
 try {
 console.log('🔄 Fetching testimonials...');
 
 const testimonials = await fetchAllItemsViaProxy('testimonials');
 
 if (!Array.isArray(testimonials)) {
 console.error('❌ Testimonials response is not an array:', testimonials);
 return [];
 }
 
 console.log('✅ Testimonials fetched successfully:', testimonials.length, 'items');
 
 const transformedTestimonials = testimonials.map((testimonial: any) => ({
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
 
 return limit ? transformedTestimonials.slice(0, limit) : transformedTestimonials;
 } catch (error) {
 console.error('💥 Error fetching testimonials:', error);
 return [];
 }
}

// Fetch Team Members from WordPress using proxy
export async function getTeamMembers(limit?: number) {
 try {
 console.log('🔄 Fetching team members...');
 
 const team = await fetchAllItemsViaProxy('team');
 
 if (!Array.isArray(team)) {
 console.error('❌ Team response is not an array:', team);
 return [];
 }
 
 console.log('✅ Team members fetched successfully:', team.length, 'items');
 
 const transformedTeam = team.map((member: any) => ({
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
 
 return limit ? transformedTeam.slice(0, limit) : transformedTeam;
 } catch (error) {
 console.error('💥 Error fetching team members:', error);
 return [];
 }
}

// Fetch single service by slug using proxy
export async function getServiceBySlug(slug: string) {
 try {
 console.log('🔄 Fetching service by slug:', slug);
 
 if (!slug || typeof slug !== 'string') {
 throw new Error('Invalid slug provided');
 }
 
 const cleanSlug = slug.trim().toLowerCase();
 
 // Use proxy endpoint
 const response = await fetchWithTimeout(`/api/wordpress/services?slug=${encodeURIComponent(cleanSlug)}&_embed=1&status=publish`, {
 method: 'GET',
 headers: {
 'Content-Type': 'application/json',
 },
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

// Fetch single case study by slug using proxy
export async function getCaseBySlug(slug: string) {
 try {
 console.log('🔄 Fetching case by slug:', slug);
 
 if (!slug || typeof slug !== 'string') {
 throw new Error('Invalid slug provided');
 }
 
 const cleanSlug = slug.trim().toLowerCase();
 
 // Use proxy endpoint
 const response = await fetchWithTimeout(`/api/wordpress/cases?slug=${encodeURIComponent(cleanSlug)}&_embed=1&status=publish`, {
 method: 'GET',
 headers: {
 'Content-Type': 'application/json',
 },
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

// Fetch single solution by slug using proxy
export async function getSolutionBySlug(slug: string) {
 try {
 console.log('🔄 Fetching solution by slug:', slug);
 
 if (!slug || typeof slug !== 'string') {
 throw new Error('Invalid slug provided');
 }
 
 const cleanSlug = slug.trim().toLowerCase();
 
 // Use proxy endpoint
 const response = await fetchWithTimeout(`/api/wordpress/solutions?slug=${encodeURIComponent(cleanSlug)}&_embed=1&status=publish`, {
 method: 'GET',
 headers: {
 'Content-Type': 'application/json',
 },
 next: { revalidate: 300 },
 });
 
 if (!response.ok) {
 console.error('❌ Solution by slug API error:', response.status, response.statusText);
 throw new Error(`Failed to fetch solution: ${response.status} ${response.statusText}`);
 }
 
 const data = await safeJsonParse(response);
 
 if (!Array.isArray(data) || data.length === 0) {
 console.log('❌ No solution found with slug:', cleanSlug);
 return null;
 }
 
 const solution = data[0];
 console.log('✅ Solution found:', cleanHtmlContent(solution.title?.rendered || ''));
 
 return transformSolution(solution);
 } catch (error) {
 console.error('💥 Error fetching solution by slug:', error);
 return null;
 }
}

// Fetch single tool by slug using proxy
export async function getToolBySlug(slug: string) {
 try {
 console.log('🔄 Fetching tool by slug:', slug);
 
 if (!slug || typeof slug !== 'string') {
 throw new Error('Invalid slug provided');
 }
 
 const cleanSlug = slug.trim().toLowerCase();
 
 // Use proxy endpoint
 const response = await fetchWithTimeout(`/api/wordpress/tools?slug=${encodeURIComponent(cleanSlug)}&_embed=1&status=publish`, {
 method: 'GET',
 headers: {
 'Content-Type': 'application/json',
 },
 next: { revalidate: 300 },
 });
 
 if (!response.ok) {
 console.error('❌ Tool by slug API error:', response.status, response.statusText);
 throw new Error(`Failed to fetch tool: ${response.status} ${response.statusText}`);
 }
 
 const data = await safeJsonParse(response);
 
 if (!Array.isArray(data) || data.length === 0) {
 console.log('❌ No tool found with slug:', cleanSlug);
 return null;
 }
 
 const tool = data[0];
 console.log('✅ Tool found:', cleanHtmlContent(tool.title?.rendered || ''));
 
 return transformTool(tool);
 } catch (error) {
 console.error('💥 Error fetching tool by slug:', error);
 return null;
 }
}

// Get related tools based on target audience or category
export async function getRelatedTools(currentToolId: number, categoryId?: number): Promise<any[]> {
 try {
 console.log('🔄 Fetching related tools for ID:', currentToolId, 'Category:', categoryId);
 
 // Use proxy endpoint to get all tools
 const response = await fetchWithTimeout(`/api/wordpress/tools?per_page=20&status=publish&_embed=1`, {
 method: 'GET',
 headers: {
 'Content-Type': 'application/json',
 },
 next: { revalidate: 300 },
 });
 
 if (!response.ok) {
 console.error('❌ Related tools API error:', response.status);
 return [];
 }
 
 const data = await safeJsonParse(response);
 
 if (!Array.isArray(data)) {
 console.log('❌ No related tools data found');
 return [];
 }
 
 // Filter out current tool and find related ones
 const relatedTools = data
 .filter((tool: any) => tool.id !== currentToolId)
 .map((tool: any) => transformTool(tool));
 
 console.log('✅ Found related tools:', relatedTools.length);
 return relatedTools;
 
 } catch (error) {
 console.error('💥 Error fetching related tools:', error);
 return [];
 }
}

// Get related solutions based on target audience or category
export async function getRelatedSolutions(currentSolutionId: number, categoryId?: number): Promise<any[]> {
 try {
 console.log('🔄 Fetching related solutions for ID:', currentSolutionId, 'Category:', categoryId);
 
 // Use proxy endpoint to get all solutions
 const response = await fetchWithTimeout(`/api/wordpress/solutions?per_page=20&status=publish&_embed=1`, {
 method: 'GET',
 headers: {
 'Content-Type': 'application/json',
 },
 next: { revalidate: 300 },
 });
 
 if (!response.ok) {
 console.error('❌ Related solutions API error:', response.status);
 return [];
 }
 
 const data = await safeJsonParse(response);
 
 if (!Array.isArray(data)) {
 console.log('❌ No related solutions data found');
 return [];
 }
 
 // Filter out current solution and find related ones
 const relatedSolutions = data
 .filter((solution: any) => solution.id !== currentSolutionId)
 .map((solution: any) => transformSolution(solution));
 
 console.log('✅ Found related solutions:', relatedSolutions.length);
 return relatedSolutions;
 
 } catch (error) {
 console.error('💥 Error fetching related solutions:', error);
 return [];
 }
}

// Get target audience name by ID
export async function getTargetAudienceName(id: number): Promise<string> {
 try {
 const response = await fetchWithTimeout(`/api/wordpress/taxonomy/target_audience/${id}`, {
 method: 'GET',
 headers: {
 'Content-Type': 'application/json',
 },
 next: { revalidate: 3600 },
 });
 
 if (!response.ok) {
 console.error('❌ Target audience API error:', response.status);
 return `Audience #${id}`;
 }
 
 const data = await safeJsonParse(response);
 return cleanHtmlContent(data.name || `Audience #${id}`);
 
 } catch (error) {
 console.error('💥 Error fetching target audience name:', error);
 return `Audience #${id}`;
 }
}

// Get category name by ID and taxonomy
export async function getCategoryName(id: number, taxonomy: string): Promise<string> {
 try {
 const response = await fetchWithTimeout(`/api/wordpress/taxonomy/${taxonomy}/${id}`, {
 method: 'GET',
 headers: {
 'Content-Type': 'application/json',
 },
 next: { revalidate: 3600 },
 });
 
 if (!response.ok) {
 console.error('❌ Category API error:', response.status);
 return `Category #${id}`;
 }
 
 const data = await safeJsonParse(response);
 return cleanHtmlContent(data.name || `Category #${id}`);
 
 } catch (error) {
 console.error('💥 Error fetching category name:', error);
 return `Category #${id}`;
 }
}

// Fetch blog posts using proxy
export async function getBlogPosts(limit?: number) {
 try {
 console.log('🔄 Fetching blog posts...');
 
 const posts = await fetchAllItemsViaProxy('posts');
 
 if (!Array.isArray(posts)) {
 console.error('❌ Posts response is not an array:', posts);
 return [];
 }
 
 console.log('✅ Blog posts fetched successfully:', posts.length, 'items');
 
 const transformedPosts = posts.map((post: any) => ({
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
 
 return limit ? transformedPosts.slice(0, limit) : transformedPosts;
 } catch (error) {
 console.error('💥 Error fetching blog posts:', error);
 return [];
 }
}

// Fetch single blog post by slug using proxy
export async function getPostBySlug(slug: string) {
 try {
 console.log('🔄 Fetching post by slug:', slug);
 
 // Use proxy endpoint
 const response = await fetchWithTimeout(`/api/wordpress/posts?slug=${encodeURIComponent(slug)}&_embed=1&status=publish`, {
 method: 'GET',
 headers: {
 'Content-Type': 'application/json',
 },
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

// Fetch service categories using proxy - Updated to fetch ALL
export async function getServiceCategories(limit?: number) {
 try {
 console.log('🔄 Fetching all service categories...');
 
 const categories = await fetchAllItemsViaProxy('service_category');
 console.log('✅ Service categories fetched:', categories?.length || 0, 'items');
 
 return limit ? categories.slice(0, limit) : categories;
 } catch (error) {
 console.error('💥 Error fetching service categories:', error);
 return [];
 }
}

// Fetch case industries/categories using proxy - Updated to fetch ALL
export async function getCaseIndustries(limit?: number) {
 try {
 console.log('🔄 Fetching all case industries...');
 
 const industries = await fetchAllItemsViaProxy('case_category');
 console.log('✅ Case industries fetched:', industries?.length || 0, 'items');
 
 return limit ? industries.slice(0, limit) : industries;
 } catch (error) {
 console.error('💥 Error fetching case industries:', error);
 return [];
 }
}

// Fetch solution categories using proxy - Updated to fetch ALL
export async function getSolutionCategories(limit?: number) {
 try {
 console.log('🔄 Fetching all solution categories...');
 
 const categories = await fetchAllItemsViaProxy('solution_category');
 console.log('✅ Solution categories fetched:', categories?.length || 0, 'items');
 
 return limit ? categories.slice(0, limit) : categories;
 } catch (error) {
 console.error('💥 Error fetching solution categories:', error);
 return [];
 }
}

// Fetch tool categories using proxy - Updated to fetch ALL
export async function getToolCategories(limit?: number) {
 try {
 console.log('🔄 Fetching all tool categories...');
 
 const categories = await fetchAllItemsViaProxy('tool_category');
 console.log('✅ Tool categories fetched:', categories?.length || 0, 'items');
 
 return limit ? categories.slice(0, limit) : categories;
 } catch (error) {
 console.error('💥 Error fetching tool categories:', error);
 return [];
 }
}

// Fetch tool types using proxy - Updated to fetch ALL
export async function getToolTypes(limit?: number) {
 try {
 console.log('🔄 Fetching all tool types...');
 
 const types = await fetchAllItemsViaProxy('tool_type');
 console.log('✅ Tool types fetched:', types?.length || 0, 'items');
 
 return limit ? types.slice(0, limit) : types;
 } catch (error) {
 console.error('💥 Error fetching tool types:', error);
 return [];
 }
}


// Fetch target audiences using proxy - Updated to fetch ALL
export async function getTargetAudiences(limit?: number) {
 try {
 console.log('🔄 Fetching all target audiences...');
 
 const audiences = await fetchAllItemsViaProxy('target_audience');
 console.log('✅ Target audiences fetched:', audiences?.length || 0, 'items');
 
 return limit ? audiences.slice(0, limit) : audiences;
 } catch (error) {
 console.error('💥 Error fetching target audiences:', error);
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

// API Health check using proxy
export async function checkApiHealth() {
 try {
 console.log('🏥 Checking API health...');
 
 // Use proxy endpoint
 const response = await fetchWithTimeout('/api/wordpress/', {
 method: 'GET',
 headers: {
 'Content-Type': 'application/json',
 },
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

export interface Solution {
 id: number;
 slug: string;
 title: string;
 excerpt: string;
 content: string;
 featuredImage: string;
 painPoint: string;
 painPointSubtitle: string;
 problemDescription: string;
 solutionOverview: string;
 keyBenefits: string[];
 ctaText: string;
 timeSaved: string;
 revenueIncrease: string;
 costReduction: string;
 pricingRange: string;
 implementationTime: string;
 categories: number[];
 audiences: number[];
 date: string;
 link: string;
 acf: any;
}

export interface Tool {
 id: number;
 slug: string;
 title: string;
 excerpt: string;
 content: string;
 featuredImage: string;
 tagline: string;
 toolType: string;
 technologyStack: string[];
 demoAvailable: boolean;
 demoUrl: string;
 supportIncluded: string;
 keyFeatures: string[];
 pricingModel: string;
 price: string;
 setupFee: string;
 monthlyFee: string;
 setupTime: string;
 averageRoi: string;
 activeUsers: string;
 categories: number[];
 audiences: number[];
 compatibleWith: string[];
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