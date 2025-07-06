import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!;
const restApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://uaedigitalsolution.agency';

const graphQLClient = new GraphQLClient(endpoint);

// GraphQL fetch function
export async function fetchAPI(query: string, variables = {}) {
  try {
    const data = await graphQLClient.request(query, variables);
    return data;
  } catch (error) {
    console.error('GraphQL Error:', error);
    throw error;
  }
}

// REST API fetch function - FIXED: No double wp/v2
export async function fetchRestAPI(endpoint: string, options: RequestInit = {}) {
  // Don't add /wp/v2 here since endpoint already contains it
  const url = `${restApiUrl}/wp-json/wp/v2/${endpoint}`;
  
  try {
    console.log(`Fetching from REST API: ${url}`);
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`REST API Error for ${endpoint}:`, response.status, errorText);
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

// Test function to verify connection
export async function testConnection() {
  const query = `
    query TestQuery {
      generalSettings {
        title
        description
      }
    }
  `;
  
  try {
    const data = await fetchAPI(query);
    console.log('WordPress connection successful:', data);
    return data;
  } catch (error) {
    console.error('WordPress connection failed:', error);
    return null;
  }
}

// REST API functions - Using proxy for client-side requests
export async function getServices() {
  console.log('🔄 Fetching services...');
  try {
    // Always use proxy to avoid CORS
    const response = await fetch('/api/wordpress/services');
    if (!response.ok) {
      throw new Error(`Failed to fetch services: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('💥 Error fetching services:', error);
    return [];
  }
}

export async function getCases() {
  console.log('🔄 Fetching cases...');
  try {
    // Always use proxy to avoid CORS
    const response = await fetch('/api/wordpress/cases');
    if (!response.ok) {
      throw new Error(`Failed to fetch cases: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('💥 Error fetching cases:', error);
    return [];
  }
}

export async function getTestimonials() {
  console.log('🔄 Fetching testimonials...');
  try {
    // Always use proxy to avoid CORS
    const response = await fetch('/api/wordpress/testimonials');
    if (!response.ok) {
      throw new Error(`Failed to fetch testimonials: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('💥 Error fetching testimonials:', error);
    return [];
  }
}

export async function getTeamMembers() {
  console.log('🔄 Fetching team members...');
  try {
    // Always use proxy to avoid CORS
    const response = await fetch('/api/wordpress/team');
    if (!response.ok) {
      throw new Error(`Failed to fetch team: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('💥 Error fetching team members:', error);
    return [];
  }
}

// GraphQL queries for the same data (alternative approach)
export async function getServicesGraphQL() {
  const query = `
    query GetServices {
      services(first: 100) {
        nodes {
          id
          title
          content
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          serviceFields {
            icon
            shortDescription
            features
          }
        }
      }
    }
  `;
  
  try {
    const data = await fetchAPI(query) as any;
    return data?.services?.nodes || [];
  } catch (error) {
    console.error('Error fetching services via GraphQL:', error);
    return [];
  }
}

export async function getCasesGraphQL() {
  const query = `
    query GetCases {
      cases(first: 100) {
        nodes {
          id
          title
          content
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          caseFields {
            client
            industry
            technologies
            results
          }
        }
      }
    }
  `;
  
  try {
    const data = await fetchAPI(query) as any;
    return data?.cases?.nodes || [];
  } catch (error) {
    console.error('Error fetching cases via GraphQL:', error);
    return [];
  }
}

// Create a proxy function that tries GraphQL first, then falls back to REST
export async function fetchWordPressData(dataType: 'services' | 'cases' | 'testimonials' | 'team') {
  // Try REST API first since that's what your components are expecting
  const restFunctions = {
    services: getServices,
    cases: getCases,
    testimonials: getTestimonials,
    team: getTeamMembers,
  };
  
  try {
    return await restFunctions[dataType]();
  } catch (error) {
    console.error(`REST API failed for ${dataType}, trying GraphQL...`);
    
    // You can implement GraphQL fallbacks here if needed
    // For now, return empty array
    return [];
  }
}

// Helper function to handle CORS errors
export async function fetchWithCORS(url: string, options: RequestInit = {}) {
  // If we're in the browser and encountering CORS issues, use the API proxy
  if (typeof window !== 'undefined' && url.includes('uaedigitalsolution.agency')) {
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
    return fetch(proxyUrl, options);
  }
  
  return fetch(url, options);
}