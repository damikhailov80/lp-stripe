type ButtonBuyProps = {
    productId: string;
    priceId: string;
    quantity: number;
    weight: string;
    variant: 'primary' | 'secondary';
    trackingName: string;
};

export default function ButtonBuy({
    productId,
    priceId,
    quantity,
    weight,
    variant,
    trackingName
}: ButtonBuyProps) {
    const isPrimary = variant === 'primary';

    return (
        <form
            action="/api/stripe/checkout"
            method="POST"
            className={isPrimary ? "w-full sm:w-auto" : "w-full max-w-md px-4"}
        >
            <input type="hidden" name="quantity" value={quantity} />
            <input type="hidden" name="productId" value={productId} />
            <input type="hidden" name="priceId" value={priceId} />
            <input type="hidden" name="successPath" value="/lp/warming-ointments/success" />
            <input type="hidden" name="failurePath" value="/lp/warming-ointments/failure" />
            <button
                type="submit"
                className={
                    isPrimary
                        ? "w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold shadow-2xl hover:shadow-red-500/50 hover:scale-105 active:scale-95 transition-all"
                        : "w-full px-8 py-6 rounded-2xl bg-white text-red-600 font-bold text-base sm:text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all hover:shadow-white/50"
                }
                data-track="true"
                data-track-name={trackingName}
            >
                {isPrimary ? `Kup teraz - ${weight} × ${quantity}` : `Zamów teraz - ${weight} × ${quantity}`}
            </button>
        </form>
    );
}
