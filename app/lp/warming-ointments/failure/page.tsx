export default function FailurePage({
    searchParams,
}: {
    searchParams: { session_id?: string; tt_account?: string };
}) {
    const { session_id, tt_account } = searchParams;

    return (
        <main className="min-h-screen bg-gradient-to-br from-red-950 via-zinc-900 to-orange-950 flex items-center justify-center px-6">
            <div className="max-w-2xl w-full text-center">
                <div className="mb-8 inline-block p-6 rounded-full bg-red-500/20 border-4 border-red-500">
                    <svg className="w-20 h-20 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    Płatność nie powiodła się
                </h1>

                <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
                    Niestety, nie udało się przetworzyć Twojej płatności. Nie martw się, możesz spróbować ponownie.
                </p>

                <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Możliwe przyczyny:</h2>
                    <ul className="text-left text-zinc-300 space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="text-red-400 mt-1">•</span>
                            <span>Niewystarczające środki na koncie</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-400 mt-1">•</span>
                            <span>Błędne dane karty płatniczej</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-400 mt-1">•</span>
                            <span>Karta została odrzucona przez bank</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-400 mt-1">•</span>
                            <span>Problem z połączeniem internetowym</span>
                        </li>
                    </ul>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 mb-8">
                    <p className="text-white/90 text-sm">
                        💡 <strong>Potrzebujesz pomocy?</strong> Skontaktuj się z nami na TikToku:
                        <a href="https://www.tiktok.com/@balsamdladuszy" target="_blank" rel="noopener noreferrer" className="underline hover:text-white ml-1 font-semibold" data-track="true" data-track-name="tiktok_link">
                            @balsamdladuszy
                        </a>
                    </p>
                </div>

                <div className="flex justify-center">
                    <a
                        href="/lp/warming-ointments"
                        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold hover:scale-105 transition"
                        data-track="true"
                        data-track-name="retry_payment"
                    >
                        Spróbuj ponownie
                    </a>
                </div>

                {/* Hidden data for tracking/analytics */}
                {tt_account && (
                    <div className="hidden" data-tt-account={tt_account}>
                        {/* TikTok tracking parameter available for analytics */}
                    </div>
                )}
            </div>
        </main>
    );
}
