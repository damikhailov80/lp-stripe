export function getStripePriceId(
    productId: string,
    priceIds: { production: string; development: string }
): string {
    // On client side, process.env is empty except for NEXT_PUBLIC_ vars
    // So we need to check both server-side and client-side env vars

    // Try NEXT_PUBLIC_ prefixed version (available on client)
    const publicEnvVarName = `NEXT_PUBLIC_${productId.toUpperCase().replace(/-/g, '_')}_STRIPE_PRICE_ID`;
    const publicEnvValue = process.env[publicEnvVarName];

    console.log('🔍 Checking env:', {
        publicEnvVarName,
        publicEnvValue,
        allEnv: process.env
    });

    if (publicEnvValue) {
        console.log('✅ Using NEXT_PUBLIC env var:', publicEnvValue);
        return publicEnvValue;
    }

    // Fallback to data.ts based on NODE_ENV
    const isProduction = process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_ENV === 'production';
    const selectedPriceId = isProduction ? priceIds.production : priceIds.development;

    console.log('✅ Using data.ts priceId:', {
        isProduction,
        selectedPriceId
    });

    return selectedPriceId;
}
