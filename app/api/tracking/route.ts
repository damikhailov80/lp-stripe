import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {

  try {
    // Check origin - allow only requests from the same domain
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');

    // If origin doesn't match host, return 401
    if (origin && host && !origin.includes(host)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get parameters from request
    const { event, payload } = await request.json();

    // Validate parameters
    if (!event || typeof event !== 'string') {
      return NextResponse.json(
        { error: 'Invalid event parameter' },
        { status: 400 }
      );
    }

    // Payload can be an empty object
    const validPayload = payload && typeof payload === 'object' ? payload : {};

    // Extract user separately to avoid duplication
    const { user: clientUser, ...restPayload } = validPayload;

    // Automatic collection of user data
    const userAgent = request.headers.get('user-agent') || '';

    // Try different ways to get IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') || // Cloudflare
      request.headers.get('true-client-ip') || // Cloudflare Enterprise
      request.headers.get('x-client-ip') ||
      '';

    // Get URL from headers
    const referer = request.headers.get('referer');
    const pageUrl = referer || `${origin || `https://${host}`}`;

    // Prepare data for TikTok API
    const tiktokData = {
      event_source: "web",
      event_source_id: process.env.TIKTOK_EVENT_SOURCE_ID,
      data: [
        {
          event: event,
          event_time: Math.floor(Date.now() / 1000),
          ...restPayload,
          page: {
            url: pageUrl,
            referrer: request.headers.get('referer') || pageUrl
          },
          user: {
            // Session ID and other data come from client
            ...(clientUser || {}),
            // Server data is added last and not overwritten
            user_agent: userAgent,
            ip: ip
          }
        }
      ]
    };

    // Send to TikTok API
    const tiktokResponse = await fetch(
      'https://business-api.tiktok.com/open_api/v1.3/event/track/',
      {
        method: 'POST',
        headers: {
          'Access-Token': process.env.TIKTOK_ACCESS_TOKEN || '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tiktokData)
      }
    );

    const tiktokResult = await tiktokResponse.json();


    return NextResponse.json({
      success: true,
      tiktok_response: tiktokResult
    });

  } catch (error) {
    console.error('[Tracking API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
