/**
 * Tracking utility for automatic event sending
 * Usage: add data-track="true" and data-track-event="EventName" to element
 */

// Generate or get session ID
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('tracking_session_id');
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    sessionStorage.setItem('tracking_session_id', sessionId);
  }
  return sessionId;
}

// Function to send tracking event
async function sendTrackingEvent(event: string, payload: Record<string, any>) {
  try {
    // Add session_id automatically
    const enrichedPayload = {
      ...payload,
      user: {
        external_id: getSessionId(),
        ...(payload.user || {})
      }
    };

    const response = await fetch('/api/tracking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ event, payload: enrichedPayload })
    });

    if (!response.ok) {
      console.error('Tracking error:', response.status);
    }
  } catch (error) {
    console.error('Tracking request failed:', error);
  }
}

// Click handler
function handleClick(e: MouseEvent) {
  const target = e.target as HTMLElement | null;
  if (!target) return;

  const element = target.closest('[data-track="true"]') as HTMLElement | null;
  if (!element) return;

  const event = element.getAttribute('data-track-event');
  if (!event) {
    console.warn('data-track-event not found on element:', element);
    return;
  }

  // Collect all data-track-* attributes into payload
  const payload: Record<string, string> = {};
  const attributes = element.attributes;

  for (let i = 0; i < attributes.length; i++) {
    const attr = attributes[i];
    if (attr.name.startsWith('data-track-') && attr.name !== 'data-track-event') {
      // Transform data-track-name to track_name
      const key = attr.name
        .replace('data-track-', '')
        .replace(/-/g, '_');
      payload[key] = attr.value;
    }
  }

  sendTrackingEvent(event, payload);
}

export function initTracking() {
  document.addEventListener('click', handleClick);

  return () => {
    document.removeEventListener('click', handleClick);
  };
}

export { sendTrackingEvent as track };
