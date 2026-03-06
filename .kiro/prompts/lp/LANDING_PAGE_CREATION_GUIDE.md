# Landing Page Creation Guide

## Overview

This guide provides instructions for creating product landing pages based on the warming-ointments template. The system supports multiple products with product switching, mobile preview, Stripe integration, and responsive design.

## File Structure

For each landing page category (e.g., `warming-ointments`), you need to create:

```
app/lp/{category-name}/
├── page.tsx           # Main landing page with Hero, Benefits, HowToUse, CTA sections
├── data.ts            # Product data configuration
├── success/
│   └── page.tsx       # Success page after payment
└── failure/
    └── page.tsx       # Failure page if payment fails
```

## Core Components

### 1. Main Landing Page (`page.tsx`)

The main page consists of:

- **PageContent Component**: Wrapper with Suspense for search params handling
- **Hero Section**: Product showcase with image, pricing, quantity selector, product switcher
- **Benefits Section**: Grid of product benefits with icons
- **HowToUse Section**: Step-by-step usage instructions
- **CTA Section**: Final call-to-action with purchase button

#### Key Features:

- **Product Switching**: URL-based product selection via `?product={productId}` query parameter
- **Quantity Management**: State-managed quantity selector (min: 1)
- **Image Preview Modal**: Click-to-enlarge product images
- **Responsive Design**: Mobile-first with desktop enhancements
- **Stripe Integration**: Via ButtonBuy component
- **Analytics Tracking**: `data-track` attributes on interactive elements

### 2. Product Data (`data.ts`)

Defines the `Product` interface and `productsData` object:

```typescript
export interface Product {
    id: string;                    // Unique product identifier (kebab-case)
    name: string;                  // Display name
    badge: string;                 // Badge text with emoji
    price: number;                 // Current price
    originalPrice: number;         // Original price (for discount display)
    discount: string;              // Discount percentage (e.g., "-38%")
    weight: string;                // Product weight/size
    rating: number;                // Star rating (0-5)
    imagePath: string;             // Path to product image
    imageAlt: string;              // Image alt text
    description: string;           // Product description
    stripePriceId: {
        production: string;        // Stripe price ID for production
        development: string;       // Stripe price ID for development
    };
}
```

### 3. Success Page (`success/page.tsx`)

Displays after successful payment with:
- Success icon and confirmation message
- Order next steps
- TikTok channel promotion
- Navigation buttons
- Optional tracking parameters (`session_id`, `tt_account`)

### 4. Failure Page (`failure/page.tsx`)

Displays after failed payment with:
- Error icon and message
- Possible failure reasons
- Support contact information
- Retry button
- Optional tracking parameters

## ButtonBuy Component

Located at `app/components/ButtonBuy.tsx`, handles Stripe checkout:

```typescript
type ButtonBuyProps = {
    productId: string;      // Product identifier
    priceId: string;        // Stripe price ID
    quantity: number;       // Purchase quantity
    weight: string;         // Display weight
    variant: 'primary' | 'secondary';  // Button style
    trackingName: string;   // Analytics tracking name
};
```

Submits to `/api/stripe/checkout` with hidden form fields.

## Stripe Integration

### Environment Variables

Set in `.env` file:

```bash
# Option 1: Product-specific override (highest priority)
SCORPION_BALM_STRIPE_PRICE_ID=price_xxxxx

# Option 2: Use data.ts configuration based on NODE_ENV
NODE_ENV=production  # Uses stripePriceId.production
NODE_ENV=development # Uses stripePriceId.development
```

### Price ID Resolution

The `getStripePriceId()` function in `lib/products.ts`:
1. Checks for product-specific env variable (e.g., `SCORPION_BALM_STRIPE_PRICE_ID`)
2. Falls back to `stripePriceId.production` or `stripePriceId.development` based on `NODE_ENV`

## Design Customization

### Color Scheme

The warming-ointments template uses:
- Primary: Red-Orange gradient (`from-red-600 to-orange-600`)
- Background: Dark gradient (`from-red-950 via-zinc-900 to-orange-950`)
- Accents: Red/Orange with opacity variations

### Responsive Breakpoints

- Mobile: Default (< 768px)
- Desktop: `md:` prefix (≥ 768px)
- Large: `lg:` prefix (≥ 1024px)

### Key Design Elements

1. **Hero Section**:
   - TikTok promotion banner at top
   - Product badge and title
   - Mobile: Image right of title, product selector below
   - Desktop: Image on right side, thumbnails below
   - Pricing with strikethrough original price
   - Quantity selector and CTA buttons

2. **Benefits Grid**:
   - 2 columns on tablet, 3 on desktop
   - Icon, title, description per card
   - Hover effects with gradient background

3. **How To Use**:
   - Numbered steps (1, 2, 3)
   - Warning box at bottom

4. **CTA Section**:
   - Full-width gradient background
   - Centered content with quantity selector
   - Trust badges at bottom

## Analytics Tracking

All interactive elements include tracking attributes:

```html
<button
  data-track="true"
  data-track-name="unique_action_name"
>
```

Common tracking names:
- `tiktok_link`
- `switch_to_{productId}_mobile`
- `switch_to_{productId}_thumbnail`
- `quantity_increase_top/bottom`
- `quantity_decrease_top/bottom`
- `buy_now_top/bottom`
- `learn_more`
- `back_to_product`
- `retry_payment`

## Creating a New Landing Page

### Step 0: Determine Landing Page Name

Before starting, decide on the landing page category name:
- Use kebab-case (e.g., `warming-ointments`, `hair-care`, `skin-products`)
- Keep it descriptive and URL-friendly
- This will be used for:
  - Directory name: `app/lp/{category-name}/`
  - Image directory: `public/assets/images/{category-name}/`
  - URL path: `/lp/{category-name}`

**AI Assistant should:**
1. Analyze the product HTML pages provided
2. Suggest a category name based on product type
3. Ask user: "I suggest naming this landing page `{suggested-name}`. Does this work for you, or would you prefer a different name?"
4. Wait for confirmation before proceeding

### Step 1: Prepare Product Data

Gather for each product:
- Product name and description
- Images (high quality, transparent background preferred)
- Pricing information
- Weight/size
- Stripe price IDs (create in Stripe dashboard)
- Benefits/features
- Usage instructions
- Any warnings or disclaimers

### Step 2: Create Directory Structure

```bash
mkdir -p app/lp/{category-name}/{success,failure}
```

### Step 3: Create data.ts

Define all products in the category with complete Product interface data.

### Step 4: Create page.tsx

Copy and customize the warming-ointments template:
- Update color scheme if needed
- Modify Hero section content
- Customize Benefits items
- Update HowToUse steps
- Adjust CTA messaging
- Update TikTok links and branding

### Step 5: Create Success/Failure Pages

Copy templates and update:
- Product-specific messaging
- Return URLs
- Branding elements

### Step 6: Download and Add Product Images

1. Download one product image per product from the provided HTML pages
2. Save images to `public/assets/images/{category-name}/`
3. Use descriptive filenames (e.g., `product-name.jpeg`, `product-name.avif`)
4. Update `imagePath` in data.ts to match the saved location
5. Optimize images if needed (compress, convert to WebP/AVIF)

### Step 7: Configure Stripe

1. Create products in Stripe dashboard
2. Create price IDs for development and production
3. Add to data.ts or environment variables

### Step 8: Test

- Product switching functionality
- Quantity selectors
- Mobile responsiveness
- Image preview modal
- Stripe checkout flow
- Success/failure redirects

## Best Practices

1. **Images**: Use optimized formats (WebP, AVIF) for better performance
2. **Placeholders**: Use clear placeholder text for unknown data (e.g., "PLACEHOLDER_PRODUCTION_PRICE_ID")
3. **Accessibility**: Include proper alt text, ARIA labels, and keyboard navigation
4. **SEO**: Add meta tags, structured data, and semantic HTML
5. **Performance**: Lazy load images, minimize bundle size
6. **Testing**: Test on multiple devices and browsers
7. **Analytics**: Ensure all CTAs have tracking attributes
8. **Error Handling**: Graceful fallbacks for missing data

## Common Customization Points

### Changing Color Scheme

Replace gradient classes throughout:
- `from-red-600 to-orange-600` → Your primary gradient
- `from-red-950 via-zinc-900 to-orange-950` → Your dark gradient
- `text-red-400`, `border-red-500` → Your accent colors

### Modifying Benefits

Update the `items` array in the `Benefits` component with your product's specific benefits.

### Adjusting Layout

- Hero grid: `grid md:grid-cols-2` (change column ratio)
- Benefits grid: `grid md:grid-cols-2 lg:grid-cols-3` (adjust columns)
- Max width: `max-w-6xl` (change container width)

### Adding Sections

Insert new sections between existing ones in the main component return statement.

## Troubleshooting

### Product not switching
- Check URL parameter format: `?product={productId}`
- Verify productId exists in productsData
- Check browser console for errors

### Stripe checkout failing
- Verify price IDs are correct
- Check environment variables
- Ensure API route is working
- Check Stripe dashboard for errors

### Images not loading
- Verify image paths are correct
- Check public directory structure
- Ensure images are optimized and not too large

### Mobile layout issues
- Test responsive breakpoints
- Check Tailwind classes for mobile-first design
- Verify touch interactions work properly
