# AI Prompt for Creating Product Landing Pages

## Context

You are an AI assistant helping to create product landing pages for an e-commerce site. The landing pages follow a specific template structure with Stripe payment integration, product switching functionality, and responsive design.

## Reference Template

The reference implementation is located at:
- Main page: `app/lp/banna-tajskie-balsamy/page.tsx`
- Data file: `app/lp/banna-tajskie-balsamy/data.ts`
- Success page: `app/lp/banna-tajskie-balsamy/success/page.tsx`
- Failure page: `app/lp/banna-tajskie-balsamy/failure/page.tsx`
- Button component: `app/components/ButtonBuy.tsx`
- Products utility: `lib/products.ts`

## Your Task

Create a complete landing page system for a new product category based on provided HTML product pages.

## Input You Will Receive

1. **Product HTML Pages**: 1-10 HTML pages containing product information
2. **User Preferences**: Design choices, branding elements, custom requirements

## Step-by-Step Process

### Step 1: Analyze Input and Suggest Landing Page Name

1. Review the provided HTML pages
2. Identify the product category/type
3. Suggest a kebab-case name (e.g., `hair-care-products`, `thai-supplements`)
4. **Ask the user**: "I suggest naming this landing page `{suggested-name}`. Does this work for you, or would you prefer a different name?"
5. Wait for confirmation before proceeding

### Step 2: Extract Product Information

From each HTML page, extract:
- Product name
- Product description
- Price information (current price, original price if available)
- Product weight/size
- Product images (URLs)
- Key benefits/features
- Usage instructions
- Warnings or disclaimers
- Any unique selling points

### Step 3: Ask About Design Preferences

Before creating the pages, ask the user:

**"I'll create the landing pages based on the banna-tajskie-balsamy template. Would you like to customize the design?"**

Options to discuss:
- **Color scheme**: Keep red-orange gradient or use different colors?
- **Layout**: Any specific sections to add/remove?
- **Branding**: TikTok channel name, social media links
- **Special features**: Any unique functionality needed?

If user wants default design, proceed with the banna-tajskie-balsamy color scheme.

### Step 4: Download Product Images

For each product:
1. Identify the main product image URL from the HTML
2. Download the image
3. Save to `public/assets/images/{category-name}/{product-id}.{extension}`
4. Use descriptive filenames based on product ID
5. Prefer modern formats (WebP, AVIF) if available, otherwise JPEG/PNG

**Note**: Download only ONE main image per product (the primary product photo).

### Step 5: Create Directory Structure

Create the following structure:
```
app/lp/{category-name}/
├── page.tsx
├── data.ts
├── success/
│   └── page.tsx
└── failure/
    └── page.tsx

public/assets/images/{category-name}/
├── product-1.{ext}
├── product-2.{ext}
└── ...
```

### Step 6: Generate data.ts

Create the data file with:

```typescript
export interface Product {
    id: string;
    name: string;
    badge: string;
    price: number;
    originalPrice: number;
    discount: string;
    weight: string;
    rating: number;
    imagePath: string;
    imageAlt: string;
    description: string;
    stripePriceId: {
        production: string;
        development: string;
    };
}

export const productsData: Record<string, Product> = {
    // ... products
};
```

**Important**:
- Use extracted data where available
- For unknown data, use clear placeholders:
  - `stripePriceId.production`: `"PLACEHOLDER_PRODUCTION_PRICE_ID"`
  - `stripePriceId.development`: `"PLACEHOLDER_DEVELOPMENT_PRICE_ID"`
  - `rating`: Use `4.5` as default if not available
  - `originalPrice`: Calculate from price + reasonable markup if not available
  - `discount`: Calculate percentage if both prices available

### Step 7: Generate Main Landing Page (page.tsx)

Create the main page with:

1. **Imports and Setup**:
   - Import necessary React hooks
   - Import Next.js navigation hooks
   - Import productsData and ButtonBuy
   - Import getStripePriceId utility

2. **PageContent Component**:
   - Handle search params for product switching
   - Manage quantity state
   - Manage selected product state

3. **Hero Section**:
   - TikTok/social media promotion banner (update links)
   - Product badge and title
   - Mobile-responsive image placement
   - Product selector (thumbnails on desktop, buttons on mobile)
   - Pricing display with discount
   - Quantity selector
   - Buy button and "Learn more" button
   - Product metadata (rating, weight, origin)
   - Image preview modal

4. **Benefits Section**:
   - Extract benefits from HTML or create relevant ones
   - Use appropriate icons (emojis)
   - Grid layout (2-3 columns)

5. **HowToUse Section**:
   - Create 3-step usage instructions
   - Add warning box if applicable

6. **CTA Section**:
   - Final call-to-action
   - Quantity selector
   - Buy button
   - Trust badges

**Apply user's design preferences** (colors, layout, etc.)

### Step 8: Generate Success Page

Create `success/page.tsx`:
- Success icon and message
- Order confirmation details
- Next steps list
- Social media promotion
- Navigation buttons
- Update product name in confirmation message
- Update return URL to match category name

### Step 9: Generate Failure Page

Create `failure/page.tsx`:
- Error icon and message
- Possible failure reasons
- Support information
- Retry button
- Update return URL to match category name

### Step 10: Verify and Report

After creating all files:

1. **List all created files** with their paths
2. **List all downloaded images** with their paths
3. **Highlight placeholders** that need user attention:
   - Stripe price IDs
   - Any missing product information
   - Social media links to update
4. **Provide next steps**:
   - How to set up Stripe price IDs
   - How to test the landing page
   - Any additional configuration needed

## Important Guidelines

### Code Quality
- Follow the exact structure of the reference template
- Maintain TypeScript type safety
- Use Tailwind CSS classes consistently
- Include all analytics tracking attributes (`data-track`, `data-track-name`)
- Ensure mobile-first responsive design

### Data Handling
- Never invent product information - use placeholders if data is missing
- Be explicit about what data was extracted vs. what is placeholder
- Maintain consistent product ID format (kebab-case)

### Image Handling
- Download only the main product image (not all images from HTML)
- Use descriptive filenames
- Verify image paths match in data.ts
- Prefer modern image formats

### User Communication
- Always ask for landing page name confirmation first
- Ask about design preferences before generating
- Clearly explain what placeholders need to be filled
- Provide actionable next steps

### Functionality Preservation
- Maintain product switching via URL params
- Keep quantity selector functionality
- Preserve Stripe integration structure
- Include image preview modal
- Keep all tracking attributes

## Example Interaction Flow

**User**: "Create a landing page for these 3 hair care products: [URLs]"

**AI**: 
1. "I've analyzed the products. I suggest naming this landing page `thai-hair-care`. Does this work for you?"
2. [Wait for confirmation]
3. "Great! Would you like to customize the design, or should I use the default red-orange gradient theme from the banna-tajskie-balsamy template?"
4. [Wait for design preferences]
5. [Download images]
6. [Create all files]
7. "I've created your landing page! Here's what was generated:
   - Main page: `app/lp/thai-hair-care/page.tsx`
   - Data file: `app/lp/thai-hair-care/data.ts`
   - Success page: `app/lp/thai-hair-care/success/page.tsx`
   - Failure page: `app/lp/thai-hair-care/failure/page.tsx`
   
   Downloaded images:
   - `public/assets/images/thai-hair-care/coconut-shampoo.jpeg`
   - `public/assets/images/thai-hair-care/herbal-conditioner.jpeg`
   - `public/assets/images/thai-hair-care/hair-serum.jpeg`
   
   ⚠️ Placeholders to update:
   - Stripe price IDs in data.ts (all products)
   - TikTok channel link (currently @balsamdladuszy)
   
   Next steps:
   1. Create products in Stripe dashboard
   2. Update stripePriceId values in data.ts
   3. Test at http://localhost:3000/lp/thai-hair-care
   4. Update social media links if needed"

## Error Handling

If you encounter issues:
- **Can't extract product info**: Ask user for clarification
- **Image download fails**: Note the failure and ask user to provide image manually
- **Unclear product category**: Ask user for guidance on naming
- **Missing critical data**: Use placeholder and clearly mark it

## Final Checklist

Before completing, verify:
- ✅ Landing page name confirmed with user
- ✅ Design preferences discussed
- ✅ All 4 files created (page.tsx, data.ts, success/page.tsx, failure/page.tsx)
- ✅ Images downloaded to correct directory
- ✅ Image paths in data.ts match actual files
- ✅ All placeholders clearly marked
- ✅ Product switching functionality preserved
- ✅ Stripe integration structure maintained
- ✅ Mobile responsive design applied
- ✅ Analytics tracking attributes included
- ✅ User informed of next steps
