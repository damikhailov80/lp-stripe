# Landing Pages with Stripe Integration

Next.js project with Stripe checkout and Google Analytics integration.

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── api/stripe/
│   ├── checkout/route.ts      # Stripe checkout session creation
│   └── webhooks/route.ts      # Stripe webhook handler (GA4 integration)
├── lp/
│   ├── banna-tajskie-balsamy/     # Product landing page
│   └── keratin-repair-mask/   # Product landing page
└── components/
    └── analytics.tsx          # Google Analytics component
```

## API Endpoints

### POST /api/stripe/checkout
Creates Stripe checkout session. Requires form data:
- `productId` - Product identifier
- `priceId` - Stripe price ID
- `quantity` - Item quantity
- `successPath` - Redirect path on success
- `failurePath` - Redirect path on cancel

### POST /api/stripe/webhooks
Handles Stripe webhooks and sends purchase events to Google Analytics 4.

## Environment Variables

Create `.env` file:

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
GA_API_SECRET=...
```

## Stripe Setup

1. Get API keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Configure webhook endpoint in Stripe Dashboard:
   - URL: `https://yourdomain.com/api/stripe/webhooks`
   - Events: `checkout.session.completed`
3. For local development:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhooks
   ```

## Testing

Test webhook integration:
```bash
./test-webhook-ga.sh      # Local testing
./test-webhook-prod.sh    # Production testing
```

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Remember to:
1. Add environment variables in Vercel dashboard
2. Update Stripe webhook URL to production domain
