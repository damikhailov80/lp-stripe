'use client';
interface ProductProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  price: number;
}

import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [quantity, setQuantity] = useState(1);
  const price = 61.00; // Zaktualizowana cena

  return (
    <main className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-pink-200">
      <StickyHeader />
      <Hero quantity={quantity} setQuantity={setQuantity} price={price} />
      <Marquee />
      <BeforeAfter />
      <VideoSection />
      <Benefits />
      <HowToUse />
      <CTA quantity={quantity} setQuantity={setQuantity} price={price} />
    </main>
  );
}

// 1. Липкая шапка (Sticky Header)
function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="mx-auto max-w-6xl px-6 flex justify-between items-center">
        <div className="font-extrabold text-2xl tracking-tight text-zinc-800">
          NATRA<span className="text-pink-600">THAI</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-semibold text-zinc-600">
          <a href="#benefits" className="hover:text-pink-600 transition">Korzyści</a>
          <a href="#how-to-use" className="hover:text-pink-600 transition">Jak stosować</a>
          <a href="#video" className="hover:text-pink-600 transition">Obejrzyj wideo</a>
        </nav>
        {/* Usunięto przycisk Cart (Koszyk) */}
        <div className="hidden md:block w-[88px]"></div> {/* Pusty div dla balansu w flexboxie, jeśli potrzebny */}
      </div>
    </header>
  );
}

// 2. Главный экран (Hero)
function Hero({ quantity, setQuantity, price }: ProductProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50 pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Блок TikTok */}
        <div className="w-full max-w-xl mb-8 md:mb-12">
          <div className="p-4 md:p-5 rounded-3xl bg-white/70 backdrop-blur-lg border border-pink-100 shadow-xl shadow-pink-100/50">
            <a href="https://www.tiktok.com/@balsamdladuszy" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-4 hover:opacity-80 transition group">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-pink-400 shadow-md group-hover:scale-105 transition-transform bg-zinc-200 flex-shrink-0 overflow-hidden">
                <img src="/assets/images/balsamdladuszy.jpeg" alt="TikTok" className="w-full h-full object-cover" />
              </div>
              <div className="text-left flex-1">
                <p className="text-zinc-900 text-base md:text-lg font-bold mb-0.5 flex items-center gap-2">
                  💝 Wspieraj nasz TikTok!
                </p>
                <p className="text-zinc-600 text-xs md:text-sm leading-snug">
                  Kupując, pomagasz nam tworzyć content: <span className="text-pink-600 font-bold whitespace-nowrap">@balsamdladuszy</span>
                </p>
              </div>
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          
          <div className="flex flex-col items-start z-10">
            <span className="inline-block mb-4 text-xs font-bold tracking-widest uppercase bg-pink-100 text-pink-700 px-4 py-1.5 rounded-full">
              Tajska Pielęgnacja Premium
            </span>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-zinc-900">
              Regenerująca <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                Maska Keratynowa
              </span>
            </h1>

            {/* Картинка продукта ДЛЯ МОБИЛЬНЫХ */}
            <div className="block lg:hidden w-full max-w-xs mx-auto mt-8 mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-300 to-purple-300 blur-[60px] opacity-40 rounded-full scale-105"></div>
              <img
                src="https://static.wixstatic.com/media/c2c919_3b317899a12a41d7a68eaa8de16fe7c6~mv2.jpg/v1/fill/w_1730,h_1730,q_90,enc_avif,quality_auto/c2c919_3b317899a12a41d7a68eaa8de16fe7c6~mv2.jpg"
                alt="Maska Lolane"
                className="relative w-full rounded-[2rem] shadow-xl border border-white/60 object-cover aspect-square"
              />
            </div>

            <p className="mt-6 md:mt-8 text-base md:text-lg text-zinc-600 max-w-md leading-relaxed font-medium">
              Intensywna regeneracja i nawilżenie dla suchych, zniszczonych włosów. Gładkie, lśniące i zdrowe już po pierwszym użyciu.
            </p>

            {/* Блок покупки (Счетчик + Кнопка) */}
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto items-center sm:items-stretch border-t border-pink-100 pt-8 sm:border-0 sm:pt-0">
              
              {/* Уменьшенный счетчик для мобильных */}
              <div className="flex items-center gap-2 md:gap-3 bg-white rounded-2xl p-1.5 md:p-2 border border-zinc-200 shadow-sm w-full sm:w-auto justify-center">
                <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-600 font-bold text-lg md:text-xl transition flex items-center justify-center">−</button>
                <span className="w-8 text-center text-zinc-900 font-bold text-lg md:text-xl">{quantity}</span>
                <button type="button" onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-600 font-bold text-lg md:text-xl transition flex items-center justify-center">+</button>
              </div>

              <form action="/api/checkout_sessions" method="POST" className="w-full sm:w-auto flex-1">
                <input type="hidden" name="quantity" value={quantity} />
                <button type="submit" className="w-full h-full px-6 md:px-8 py-3.5 md:py-4 rounded-2xl bg-pink-600 text-white font-bold text-base md:text-lg shadow-xl shadow-pink-200 hover:bg-pink-700 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2">
                  Kup teraz 
                  <span className="bg-white/20 px-2 py-1 rounded-md text-xs md:text-sm ml-1 md:ml-2">{(price * quantity).toFixed(2).replace('.', ',')} zł</span>
                </button>
              </form>
            </div>
            
            {/* Выделенная оценка и характеристики */}
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-3 text-xs md:text-sm text-zinc-500 font-medium justify-center sm:justify-start">
              <span className="flex items-center gap-1.5 bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-full font-bold shadow-sm border border-yellow-100">
                <span className="text-yellow-500 text-base leading-none">★</span> 4.9 / 5.0
              </span>
              <span className="hidden sm:inline text-zinc-300">|</span>
              <span className="bg-zinc-100 px-3 py-1.5 rounded-full">200g</span>
              <span className="hidden sm:inline text-zinc-300">|</span>
              <span className="bg-zinc-100 px-3 py-1.5 rounded-full">Do każdego rodzaju włosów</span>
            </div>
          </div>

          {/* Картинка продукта ДЛЯ ДЕСКТОПА */}
          <div className="hidden lg:block relative w-full max-w-lg mx-auto lg:ml-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-300 to-purple-300 blur-[80px] opacity-50 rounded-full scale-110"></div>
            <img
              src="https://static.wixstatic.com/media/c2c919_3b317899a12a41d7a68eaa8de16fe7c6~mv2.jpg/v1/fill/w_1730,h_1730,q_90,enc_avif,quality_auto/c2c919_3b317899a12a41d7a68eaa8de16fe7c6~mv2.jpg"
              alt="Maska Lolane"
              className="relative w-full rounded-[2.5rem] shadow-2xl border border-white/60 object-cover aspect-square hover:-translate-y-2 transition-transform duration-700"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

// 3. Бегущая строка (Marquee)
function Marquee() {
  return (
    <div className="bg-zinc-900 py-4 overflow-hidden flex whitespace-nowrap relative">
      {/* Изменили 20s на 40s для замедления анимации */}
      <div className="animate-[marquee_40s_linear_infinite] flex gap-8 items-center text-pink-300 font-bold text-sm tracking-widest uppercase">
        {[...Array(6)].map((_, i) => (
          <span key={i} className="flex items-center gap-8">
            <span>✧ 100% Oryginalne Tajskie Kosmetyki</span>
            <span>✧ Głębokie Nawilżenie</span>
            <span>✧ Odbudowa Keratynowa</span>
            <span>✧ Gładkie i Lśniące</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// 4. Интерактивный слайдер До/После
function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Zobacz Różnicę</h2>
        <p className="text-zinc-600 mb-12 max-w-xl mx-auto">Poczuj magię keratyny i kwasu hialuronowego już po pierwszym użyciu.</p>
        
        <div className="relative w-full max-w-3xl mx-auto aspect-video rounded-3xl overflow-hidden shadow-2xl bg-zinc-100 group">
          {/* Фото "После" */}
          <img src="/assets/images/after1.png" alt="Po" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
          
          {/* Фото "До" */}
          <img 
            src="/assets/images/before.png" 
            alt="Przed" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          />

          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.3)]"
            style={{ left: `calc(${sliderPosition}% - 2px)` }}
          >
            <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
              <span className="text-pink-600 text-xs">↔</span>
            </div>
          </div>

          <input 
            type="range" min="0" max="100" value={sliderPosition} 
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
          />

          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold pointer-events-none">Przed</div>
          <div className="absolute top-4 right-4 bg-pink-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold pointer-events-none">Po</div>
        </div>
      </div>
    </section>
  );
}

// 5. Видео секция (TikTok Style)
function VideoSection() {
  return (
    <section id="video" className="py-24 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 flex justify-center">
          <div className="relative w-full max-w-[300px] aspect-[9/16] bg-zinc-900 rounded-[3rem] border-[10px] border-zinc-900 shadow-2xl overflow-hidden ring-4 ring-zinc-200">
            <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
              <div className="w-24 h-5 bg-zinc-900 rounded-b-xl"></div>
            </div>
            <video 
              autoPlay loop muted playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            >
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            </video>
            
            <div className="absolute bottom-4 left-4 right-16 text-white z-10 text-left">
              <p className="font-bold text-sm">@balsamdladuszy</p>
              <p className="text-xs mt-1 opacity-90">Tajski sekret idealnych włosów 🌸 ✨ #haircare #thailand</p>
            </div>
          </div>
        </div>
        
        <div className="order-1 md:order-2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Zobacz w akcji</h2>
          <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
            Zobacz, dlaczego tysiące dziewczyn przechodzi na tajską pielęgnację premium. Gęsta konsystencja głęboko odżywia każde pasmo, pozostawiając włosy niezwykle miękkie i podatne na układanie.
          </p>
          <a href="https://www.tiktok.com/@balsamdladuszy" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-pink-600 hover:text-pink-700 transition">
            Zaobserwuj nas na TikToku <span className="text-xl">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// 6. Преимущества (Benefits)
function Benefits() {
  const items = [
    { t: "Głębokie Nawilżenie", d: "Kwas hialuronowy zatrzymuje wilgoć i przywraca naturalną miękkość.", icon: "💧" },
    { t: "Odbudowa Keratynowa", d: "Wzmacnia zniszczoną strukturę i chroni włosy.", icon: "✨" },
    { t: "Blask i Wygładzenie", d: "Jedwabiste wykończenie bez obciążania włosów.", icon: "🌟" },
    { t: "Efekt jak z Salonu", d: "Profesjonalny tajski zabieg w domowym zaciszu.", icon: "💆‍♀️" },
  ];

  return (
    <section id="benefits" className="py-24 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Dlaczego klientki ją uwielbiają</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((x, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-zinc-50 hover:bg-pink-50 transition-colors shadow-sm hover:shadow-xl border border-zinc-100">
              <div className="text-3xl mb-4 bg-white w-14 h-14 flex items-center justify-center rounded-2xl shadow-sm group-hover:scale-110 transition-transform">{x.icon}</div>
              <h3 className="font-bold text-xl text-zinc-900">{x.t}</h3>
              <p className="text-sm text-zinc-600 mt-3">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 7. Инструкция (How to Use)
function HowToUse() {
  return (
    <section id="how-to-use" className="py-24 bg-pink-50">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Jak stosować</h2>
        <div className="space-y-4">
          {[
            { step: 1, t: "Umyj włosy", d: "Umyj włosy swoim ulubionym szamponem." },
            { step: 2, t: "Nałóż maskę", d: "Rozprowadź równomiernie na wilgotnych włosach, skupiając się na końcówkach." },
            { step: 3, t: "Poczekaj i Spłucz", d: "Pozostaw na 3-5 minut, a następnie dokładnie spłucz ciepłą wodą." }
          ].map((item, i) => (
            <div key={i} className="flex gap-6 items-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-xl">
                {item.step}
              </div>
              <div>
                <h3 className="font-bold text-lg">{item.t}</h3>
                <p className="text-zinc-600 text-sm">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 8. Финальный призыв к действию (CTA)
function CTA({ quantity, setQuantity, price }: ProductProps) {
  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="mx-auto max-w-5xl px-6">
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-[2rem] py-8 px-6 md:py-10 md:px-12 text-center shadow-2xl relative overflow-hidden flex flex-col items-center">
          
          {/* Фоновые цветовые пятна для объема */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-pink-600 opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-purple-600 opacity-20 rounded-full blur-3xl"></div>

          {/* Рейтинг */}
          <div className="relative flex gap-1 text-yellow-400 mb-3 text-lg md:text-xl">
            ★★★★★
          </div>

          <h2 className="relative text-2xl md:text-4xl font-black text-white tracking-tight">
            Zregeneruj swoje włosy już dziś
          </h2>
          <p className="relative mt-3 text-sm md:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Dołącz do tysięcy zadowolonych klientek. Gładkie, lśniące i nawilżone włosy od pierwszego użycia.
          </p>

          {/* Кнопка покупки со свечением */}
          <form action="/api/checkout_sessions" method="POST" className="relative mt-6 w-full max-w-sm">
            <input type="hidden" name="quantity" value={quantity} />
            <button type="submit" className="w-full py-4 rounded-xl bg-pink-600 text-white font-bold text-lg shadow-[0_0_20px_rgba(219,39,119,0.3)] hover:shadow-[0_0_30px_rgba(219,39,119,0.5)] hover:bg-pink-500 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-3">
              Zamów teraz — {(price * quantity).toFixed(2).replace('.', ',')} zł
            </button>
          </form>

          {/* Триггеры доверия (Иконки) */}
          <div className="relative mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl border-t border-zinc-700/50 pt-6 text-xs sm:text-sm text-zinc-400 font-medium">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              Bezpieczna płatność
            </div>
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              100% Oryginał
            </div>
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
              </svg>
              Szybka wysyłka
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}