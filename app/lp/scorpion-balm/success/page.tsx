export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-red-950 via-zinc-900 to-orange-950 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8 inline-block p-6 rounded-full bg-green-500/20 border-4 border-green-500">
          <svg className="w-20 h-20 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Dziękujemy za zakup!
        </h1>

        <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
          Twoje zamówienie zostało przyjęte. Banna Scorpion Thai Balm już wkrótce będzie u Ciebie!
        </p>

        <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Co dalej?</h2>
          <ul className="text-left text-zinc-300 space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✓</span>
              <span>Otrzymasz potwierdzenie zamówienia na email</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✓</span>
              <span>Twój balsam zostanie wysłany w ciągu 1-2 dni roboczych</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✓</span>
              <span>Otrzymasz numer śledzenia przesyłki</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 mb-8">
          <p className="text-white/90 text-sm">
            💝 <strong>Dziękujemy za wsparcie!</strong> Dzięki Tobie możemy tworzyć więcej contentu o azjatyckich dramach i anime na TikToku: 
            <a href="https://www.tiktok.com/@balsamdladuszy" target="_blank" rel="noopener noreferrer" className="underline hover:text-white ml-1 font-semibold">
              @balsamdladuszy
            </a>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/lp/scorpion-balm" 
            className="px-8 py-4 rounded-2xl bg-white/10 border border-white/30 text-white hover:bg-white/20 transition"
          >
            Wróć do strony produktu
          </a>
          <a 
            href="https://www.natrathai.com" 
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold hover:scale-105 transition"
          >
            Zobacz więcej produktów
          </a>
        </div>
      </div>
    </main>
  );
}
