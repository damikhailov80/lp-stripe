export function getStripePriceId(
    productId: string,
    priceIds: { production: string; development: string }
): string {
    // Convert product ID to env variable name (e.g., "scorpion-balm" -> "NEXT_PUBLIC_SCORPION_BALM_STRIPE_PRICE_ID")
    const envVarName = `NEXT_PUBLIC_${productId.toUpperCase().replace(/-/g, '_')}_STRIPE_PRICE_ID`;

    // If env variable is set, use it (allows overriding in any environment)
    if (process.env[envVarName]) {
        return process.env[envVarName]!;
    }

    // Otherwise, use the appropriate price ID based on NODE_ENV
    return process.env.NODE_ENV === 'production'
        ? priceIds.production
        : priceIds.development;
}
