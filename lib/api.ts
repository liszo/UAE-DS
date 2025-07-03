import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!;

const graphQLClient = new GraphQLClient(endpoint);

export async function fetchAPI(query: string, variables = {}) {
  try {
    const data = await graphQLClient.request(query, variables);
    return data;
  } catch (error) {
    console.error('GraphQL Error:', error);
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