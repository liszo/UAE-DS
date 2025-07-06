import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ path: string[] }>;
}

export async function GET(
  request: NextRequest,
  context: RouteParams
) {
  const { path } = await context.params;
  const searchParams = request.nextUrl.searchParams.toString();
  const url = `https://uaedigitalsolution.agency/wp-json/wp/v2/${path.join('/')}${searchParams ? `?${searchParams}` : ''}`;
  
  console.log('Proxying request to:', url);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // Don't forward cookies or auth headers
      credentials: 'omit',
    });
    
    if (!response.ok) {
      console.error('WordPress API error:', response.status, response.statusText);
      const text = await response.text();
      console.error('Response body:', text);
      
      return NextResponse.json(
        { error: `WordPress API error: ${response.status}`, details: text },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    // Add CORS headers to the response
    const res = NextResponse.json(data);
    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return res;
  } catch (error: any) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data', details: error.message },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}