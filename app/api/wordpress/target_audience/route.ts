import { NextRequest, NextResponse } from 'next/server';

const WORDPRESS_API_URL = 'https://api.uaedigitalsolution.agency/wp-json/wp/v2';

export async function GET(request: NextRequest) {
 try {
 const { searchParams } = new URL(request.url);
 const queryString = searchParams.toString();
 
 const response = await fetch(`${WORDPRESS_API_URL}/target_audience?${queryString}`, {
 headers: {
 'Content-Type': 'application/json',
 },
 next: { revalidate: 600 }
 });
 
 if (!response.ok) {
 throw new Error(`WordPress API error: ${response.status}`);
 }
 
 const data = await response.json();
 return NextResponse.json(data);
 } catch (error) {
 console.error('Target audiences API error:', error);
 return NextResponse.json(
 { error: 'Failed to fetch target audiences' },
 { status: 500 }
 );
 }
}