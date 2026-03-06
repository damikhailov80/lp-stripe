export function getStripePriceId(
    productId: string,
    priceIds: { production: string; development: string }
): string {
    console.log('🌍 All available env variables:', process.env);

    const envVarName = `NEXT_PUBLIC_${productId.toUpperCase().replace(/-/g, '_')}_STRIPE_PRICE_ID`;

    if (process.env[envVarName]) {
        return process.env[envVarName]!;
    }

    return process.env.NODE_ENV === 'production'
        ? priceIds.production
        : priceIds.development;
}
