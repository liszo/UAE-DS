import { NextRequest, NextResponse } from 'next/server';

const WORDPRESS_API_URL = 'https://api.uaedigitalsolution.agency/wp-json/wp/v2';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const path = searchParams.get('path') || '';
    
    const url = `${WORDPRESS_API_URL}/${path}`;
    const finalUrl = new URL(url);
    
    searchParams.forEach((value, key) => {
      if (key !== 'path') finalUrl.searchParams.append(key, value);
    });
    
    if (!finalUrl.searchParams.has('_embed')) finalUrl.searchParams.append('_embed', '1');
    if (!finalUrl.searchParams.has('per_page')) finalUrl.searchParams.append('per_page', '100');
    if (!finalUrl.searchParams.has('status')) finalUrl.searchParams.append('status', 'publish');
    
    const response = await fetch(finalUrl.toString(), {
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ error: `API error: ${response.status}` }, { status: response.status });
    }

    return NextResponse.json(await response.json(), {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, ...data } = body;
    
    const response = await fetch(`${WORDPRESS_API_URL}/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return NextResponse.json({ error: `API error: ${response.status}` }, { status: response.status });
    }

    return NextResponse.json(await response.json());
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send data' }, { status: 500 });
  }
}