export function getStripePriceId(
    priceIds: { production: string; development: string }
): string {
    const isProduction = process.env.NODE_ENV === 'production';
    return isProduction ? priceIds.production : priceIds.development;
}
