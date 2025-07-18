// app/api/wordpress/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const WORDPRESS_API_URL = 'https://api.uaedigitalsolution.agency/wp-json/wp/v2';

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const params = await context.params;
    const path = params.path.join('/');
    const searchParams = request.nextUrl.searchParams.toString();
    
    // Build the full URL with query parameters
    const url = `${WORDPRESS_API_URL}/${path}${searchParams ? `?${searchParams}` : ''}`;
    
    console.log('Proxying request to:', url);
    
    // Add default query parameters if not present
    const finalUrl = new URL(url);
    if (!finalUrl.searchParams.has('_embed')) {
      finalUrl.searchParams.append('_embed', '1');
    }
    if (!finalUrl.searchParams.has('per_page')) {
      finalUrl.searchParams.append('per_page', '100');
    }
    if (!finalUrl.searchParams.has('status')) {
      finalUrl.searchParams.append('status', 'publish');
    }
    
    const response = await fetch(finalUrl.toString(), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(`WordPress API error: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: `WordPress API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from WordPress' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const params = await context.params;
    const path = params.path.join('/');
    const body = await request.json();
    const url = `${WORDPRESS_API_URL}/${path}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `WordPress API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to send data to WordPress' },
      { status: 500 }
    );
  }
}