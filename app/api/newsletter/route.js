import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const apiSecret = process.env.KIT_API_SECRET;
    const formId = process.env.KIT_FORM_ID;

    if (!apiSecret || !formId) {
      console.error('Missing Kit API configuration');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // API V3 Endpoint
    const url = `https://api.kit.com/v3/forms/${formId}/subscribe`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_secret: apiSecret,
        email: email,
        first_name: name
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Kit API Error (V3):', data);
      return NextResponse.json(
        { error: data.message || 'Failed to subscribe' },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: 'Successfully subscribed', subscription: data.subscription },
      { status: 200 }
    );

  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}