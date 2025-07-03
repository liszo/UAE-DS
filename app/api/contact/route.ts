import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Quote request received:', body);
    
    // Save to WordPress using your existing endpoint
    try {
      const wpResponse = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/custom/v1/create-contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...body,
          timestamp: new Date().toISOString()
        })
      });

      if (wpResponse.ok) {
        console.log('Successfully saved to WordPress');
      } else {
        console.error('WordPress submission failed:', await wpResponse.text());
      }
    } catch (wpError) {
      console.error('WordPress integration error:', wpError);
    }
    
    return NextResponse.json(
      { 
        message: 'Quote request received successfully',
        data: body
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing quote request:', error);
    return NextResponse.json(
      { 
        message: 'Failed to process quote request',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}