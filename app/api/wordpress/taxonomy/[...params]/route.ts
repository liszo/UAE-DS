import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'https://api.uaedigitalsolution.agency/wp-json/wp/v2';

export async function GET(
 request: NextRequest,
 { params }: { params: { params: string[] } }
) {
 try {
 const [taxonomy, id] = params.params;
 
 if (!taxonomy || !id) {
 return NextResponse.json(
 { error: 'Taxonomy and ID are required' },
 { status: 400 }
 );
 }
 
 const response = await fetch(`${API_BASE_URL}/${taxonomy}/${id}`, {
 headers: {
 'Content-Type': 'application/json',
 },
 next: { revalidate: 3600 }
 });
 
 if (!response.ok) {
 console.error(`Failed to fetch ${taxonomy}:`, response.status);
 return NextResponse.json(
 { error: `Failed to fetch ${taxonomy}` },
 { status: response.status }
 );
 }
 
 const data = await response.json();
 
 return NextResponse.json(data, {
 headers: {
 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
 },
 });
 
 } catch (error) {
 console.error('Taxonomy API error:', error);
 return NextResponse.json(
 { error: 'Failed to fetch taxonomy data' },
 { status: 500 }
 );
 }
}