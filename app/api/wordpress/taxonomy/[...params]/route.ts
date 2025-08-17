import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'https://api.uaedigitalsolution.agency/wp-json/wp/v2';

// Define the proper interface for Next.js 15 route params
interface RouteContext {
 params: Promise<{ params: string[] }>;
}

export async function GET(
 request: NextRequest,
 context: RouteContext
) {
 try {
 // Await the params as required by Next.js 15
 const { params } = await context.params;
 const [taxonomy, id] = params;
 
 if (!taxonomy || !id) {
 return NextResponse.json(
 { error: 'Taxonomy and ID are required' },
 { status: 400 }
 );
 }

 console.log(`🔄 Fetching taxonomy: ${taxonomy}/${id}`);
 
 const response = await fetch(`${API_BASE_URL}/${taxonomy}/${id}`, {
 headers: {
 'Content-Type': 'application/json',
 },
 next: { revalidate: 3600 }
 });
 
 if (!response.ok) {
 console.error(`❌ Failed to fetch ${taxonomy}/${id}:`, response.status, response.statusText);
 return NextResponse.json(
 { error: `Failed to fetch ${taxonomy}` },
 { status: response.status }
 );
 }
 
 const data = await response.json();
 console.log(`✅ Successfully fetched ${taxonomy}/${id}:`, data.name || data.id);
 
 return NextResponse.json(data, {
 headers: {
 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
 'Access-Control-Allow-Origin': '*',
 'Access-Control-Allow-Methods': 'GET, OPTIONS',
 'Access-Control-Allow-Headers': 'Content-Type',
 },
 });
 
 } catch (error) {
 console.error('💥 Taxonomy API error:', error);
 return NextResponse.json(
 { error: 'Failed to fetch taxonomy data' },
 { status: 500 }
 );
 }
}

// Handle CORS preflight requests
export async function OPTIONS(request: NextRequest) {
 return new NextResponse(null, {
 status: 200,
 headers: {
 'Access-Control-Allow-Origin': '*',
 'Access-Control-Allow-Methods': 'GET, OPTIONS',
 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
 'Access-Control-Max-Age': '86400',
 },
 });
}

// Handle HEAD requests (optional but good practice)
export async function HEAD(
 request: NextRequest,
 context: RouteContext
) {
 try {
 const { params } = await context.params;
 const [taxonomy, id] = params;
 
 if (!taxonomy || !id) {
 return new NextResponse(null, { status: 400 });
 }
 
 const response = await fetch(`${API_BASE_URL}/${taxonomy}/${id}`, {
 method: 'HEAD',
 headers: {
 'Content-Type': 'application/json',
 },
 });
 
 return new NextResponse(null, {
 status: response.status,
 headers: {
 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
 'Access-Control-Allow-Origin': '*',
 },
 });
 
 } catch (error) {
 console.error('HEAD request error:', error);
 return new NextResponse(null, { status: 500 });
 }
}