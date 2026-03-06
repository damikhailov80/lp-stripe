'use client';

import { useState } from 'react';

// === МАССИВ ВСЕХ БАЛЬЗАМОВ ===
const BALM_VARIANTS = [
  {
    id: 'scorpion',
    badge: '🦂 Skorpion',
    tag: 'Oryginalny tajski balsam',
    title: 'Czarny Balsam',
    highlight: 'z Jadem Skorpiona',
    gradient: 'from-red-400 to-orange-400',
    bgGradient: 'from-red-950 via-zinc-900 to-orange-950',
    btnGradient: 'from-red-600 to-orange-600',
    desc: 'Natychmiastowa ulga w bólach mięśni i stawów. Ponad 100 tajskich ziół leczniczych + ekstrakt z jadu skorpiona dla maksymalnej skuteczności.',
    image: '/assets/images/scorpion-balm.avif',
  },
  {
    id: 'cobra',
    badge: '🐍 Kobra',
    tag: 'Czarna Kobra',
    title: 'Czarny Balsam',
    highlight: 'z Ekstraktem z Kobry',
    gradient: 'from-zinc-300 to-zinc-500',
    bgGradient: 'from-zinc-950 via-zinc-900 to-zinc-800',
    btnGradient: 'from-zinc-700 to-zinc-900',
    desc: 'Silna maść rozgrzewająca z ekstraktem z czarnej kobry. Przynosi szybką ulgę przy bólach stawów, napięciu mięśniowym i kontuzjach.',
    image: '/assets/images/kobra.jpg', 
  },
  {
    id: 'tiger',
    badge: '🐅 Tygrys',
    tag: 'Klasyczna receptura',
    title: 'Tradycyjny Balsam',
    highlight: 'Tygrysi',
    gradient: 'from-orange-400 to-yellow-500',
    bgGradient: 'from-orange-950 via-zinc-900 to-amber-950',
    btnGradient: 'from-orange-600 to-amber-600',
    desc: 'Legendarna maść rozgrzewająca. Niezawodna przy przeziębieniach, bólach głowy, bólach mięśni i ukąszeniach owadów.',
    image: '/assets/images/tiger.jpg', 
  },
  {
    id: 'yellow',
    badge: '💛 Żółty',
    tag: 'Pobudza krążenie',
    title: 'Żółta Maść',
    highlight: 'Ziołowa',
    gradient: 'from-yellow-300 to-amber-400',
    bgGradient: 'from-yellow-950 via-zinc-900 to-orange-950',
    btnGradient: 'from-yellow-500 to-amber-600',
    desc: 'Doskonale pobudza krążenie i łagodzi zmęczenie. Idealna do rozluźniającego masażu oraz przy bólach reumatycznych.',
    image: '/assets/images/yellow.jpg', 
  },
  {
    id: 'green',
    badge: '🌿 Zielony',
    tag: 'Chłodząco-kojąca',
    title: 'Zielona Maść',
    highlight: 'Ziołowa',
    gradient: 'from-green-400 to-emerald-400',
    bgGradient: 'from-green-950 via-zinc-900 to-emerald-950',
    btnGradient: 'from-green-600 to-emerald-600',
    desc: 'Działa odświeżająco. Doskonale radzi sobie z napięciem karku, bólami mięśni po treningu i ukąszeniami komarów.',
    image: '/assets/images/green.jpeg', 
  },
  {
    id: 'red',
    badge: '🔴 Czerwony',
    tag: 'Mocno rozgrzewająca',
    title: 'Czerwona Maść',
    highlight: 'Ziołowa',
    gradient: 'from-red-500 to-rose-500',
    bgGradient: 'from-red-950 via-zinc-900 to-rose-950',
    btnGradient: 'from-red-600 to-rose-700',
    desc: 'Penetruje głęboko w tkanki, najmocniej rozgrzewa. Pomaga przy przewlekłych bólach stawów, rwie kulszowej i nerwobólach.',
    image: '/assets/images/red.jpg', 
  }
];

export default function Page() {
  const [quantity, setQuantity] = useState(1);
  const [activeVariant, setActiveVariant] = useState(BALM_VARIANTS[0]);

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <Hero quantity={quantity} setQuantity={setQuantity} variant={activeVariant} setVariant={setActiveVariant} />
      <Benefits />
      <HowToUse />
      <CTA quantity={quantity} setQuantity={setQuantity} variant={activeVariant} />
    </main>
  );
}

// === ОБНОВЛЕННЫЙ КОМПОНЕНТ HERO (Ультра-компактный для десктопа) ===
function Hero({ quantity, setQuantity, variant, setVariant }: any) {
  const [isImageOpen, setIsImageOpen] = useState(false);

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${variant.bgGradient} transition-colors duration-700 pt-8 pb-10 lg:pt-10 lg:pb-12`}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnpNNiAzNGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

      {/* Модальное окно при клике на фото */}
      {isImageOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setIsImageOpen(false)}>
          <button className="absolute top-4 right-4 text-white text-4xl hover:text-red-400 transition z-10" onClick={() => setIsImageOpen(false)}>×</button>
          <div className="relative max-w-2xl w-full">
            <div className={`absolute inset-0 bg-gradient-to-br ${variant.gradient} blur-3xl rounded-full opacity-20 transition-colors duration-500`}></div>
            <div className="relative bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 rounded-3xl shadow-2xl border border-white/10">
              <div className={`absolute inset-0 bg-gradient-to-br ${variant.gradient} opacity-10 rounded-3xl transition-colors duration-500`}></div>
              <img src={variant.image} alt={variant.title} className="relative w-full drop-shadow-2xl rounded-2xl" />
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-6 lg:gap-10 items-center relative z-10">
        
        {/* ЛЕВАЯ КОЛОНКА (Текст + Кнопки) */}
        <div className="flex flex-col items-start w-full">
          
          {/* Блок TikTok */}
          <div className="w-full max-w-sm lg:max-w-md mb-4 p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
            <a href="https://www.tiktok.com/@balsamdladuszy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:opacity-90 transition group">
              <img src="/assets/images/balsamdladuszy.jpeg" alt="TikTok" className="w-12 h-12 rounded-full border-2 border-white/20 shadow-lg group-hover:scale-105 transition-transform object-cover flex-shrink-0" />
              <div className="text-left flex-1">
                <p className="text-white text-sm md:text-base font-bold mb-0.5">💝 Wspieraj TikTok!</p>
                <p className="text-white/80 text-xs leading-snug">
                  Kupując, wspierasz <span className="font-bold" style={{ color: 'var(--tw-gradient-from)' }}>@balsamdladuszy</span>
                </p>
              </div>
            </a>
          </div>

          <span className="inline-block mb-2 text-[10px] md:text-xs font-semibold tracking-wider uppercase bg-white/10 text-white/80 px-3 py-1 rounded-full border border-white/20">
            {variant.tag}
          </span>

          {/* Заголовок */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-white transition-all duration-300">
            {variant.title}
            <span className={`block mt-1 text-transparent bg-clip-text bg-gradient-to-r ${variant.gradient}`}>
              {variant.highlight}
            </span>
          </h1>

          {/* КРУПНАЯ КАРТИНКА ТОЛЬКО ДЛЯ МОБИЛЬНЫХ */}
          <div className="block md:hidden w-full max-w-[240px] mx-auto mt-5 mb-2 relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${variant.gradient} blur-[50px] opacity-40 rounded-full scale-105 transition-colors duration-500`}></div>
            <img 
              src={variant.image} 
              alt={variant.title} 
              className="relative w-full rounded-[2rem] shadow-2xl border border-white/10 object-cover aspect-square cursor-pointer" 
              onClick={() => setIsImageOpen(true)} 
            />
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <div className="text-4xl font-bold text-white">33,91 zł</div>
            <div className="text-lg text-zinc-400 line-through">55 zł</div>
            <div className={`px-2.5 py-0.5 bg-gradient-to-r ${variant.btnGradient} text-white text-xs font-bold rounded-full transition-colors duration-500`}>-38%</div>
          </div>

          <p className="mt-3 text-sm md:text-base text-zinc-300 max-w-lg leading-relaxed h-[60px] md:h-auto overflow-hidden">
            {variant.desc}
          </p>

          {/* ВЫБОР БАЛЬЗАМА */}
          <div className="mt-4 w-full border-t border-white/10 pt-4">
            <p className="text-xs text-zinc-400 font-semibold mb-2 uppercase tracking-wider">Wybierz rodzaj:</p>
            <div className="flex flex-wrap gap-2">
              {BALM_VARIANTS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setVariant(item)}
                  className={`px-3 py-1.5 md:py-2 rounded-xl border font-bold text-xs md:text-sm transition-all duration-300 ${
                    variant.id === item.id 
                      ? 'bg-white text-zinc-900 border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105' 
                      : 'bg-zinc-900/50 text-zinc-400 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.badge}
                </button>
              ))}
            </div>
          </div>

          {/* Блок покупки (в ряд) */}
          <div className="mt-5 w-full border-t border-white/10 pt-5">
            <div className="flex flex-row gap-3 w-full sm:w-auto items-center">
              
              <div className="flex items-center gap-2 bg-white/10 rounded-[1rem] p-1 border border-white/10 shadow-sm shrink-0">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 md:w-11 md:h-11 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-lg transition flex items-center justify-center">−</button>
                <span className="w-6 md:w-8 text-center text-white font-bold text-lg">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 md:w-11 md:h-11 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-lg transition flex items-center justify-center">+</button>
              </div>

              <form action="/api/checkout_sessions" method="POST" className="flex-1 sm:w-auto h-full">
                <input type="hidden" name="quantity" value={quantity} />
                <input type="hidden" name="variantId" value={variant.id} />
                <button type="submit" className={`w-full h-full min-h-[44px] md:min-h-[52px] px-4 md:px-6 py-2 rounded-[1rem] bg-gradient-to-r ${variant.btnGradient} text-white font-bold text-sm md:text-base shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5`}>
                  <span className="whitespace-nowrap">Kup teraz</span>
                  <span className="bg-white/20 px-1.5 py-0.5 rounded-md text-xs ml-1 whitespace-nowrap">50g × {quantity}</span>
                </button>
              </form>

            </div>
          </div>

          <div className="mt-4 flex items-center justify-center sm:justify-start gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-1"><span className="text-yellow-400">★★★★★</span><span className="ml-1 text-zinc-300 font-medium">4.8/5</span></div>
            <div>50g</div>
            <div>🇹🇭 Tajlandia</div>
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА: Картинка для Десктопа */}
        <div className="relative hidden md:block w-full max-w-sm mx-auto lg:ml-auto lg:mr-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${variant.gradient} blur-[80px] opacity-20 rounded-full transition-colors duration-700`}></div>
          <div className="relative bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 lg:p-8 rounded-[2.5rem] shadow-2xl border border-white/10">
            <div className={`absolute inset-0 bg-gradient-to-br ${variant.gradient} opacity-5 rounded-[2.5rem] transition-colors duration-700`}></div>
            <img src={variant.image} alt={variant.title} className="relative w-full drop-shadow-2xl rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-500" onClick={() => setIsImageOpen(true)} />
          </div>
        </div>

      </div>
    </section>
  );
}


function Benefits() {
  const items = [
    {
      icon: "⚡",
      t: "Szybka ulga w bólu",
      d: "Jad skorpiona przyspiesza wchłanianie składników aktywnych, natychmiastowo łagodząc ból.",
    },
    {
      icon: "🌿",
      t: "100+ ziół leczniczych",
      d: "Tradycyjna tajska formuła z naturalnych ekstraktów roślinnych i oleju kokosowego.",
    },
    {
      icon: "💪",
      t: "Przeciwzapalne działanie",
      d: "Skuteczny przy artretyzmie, artrozie, reumatyzmie i osteochondrozie.",
    },
    {
      icon: "🔥",
      t: "Efekt rozgrzewający",
      d: "Poprawia krążenie krwi, pomaga przy żylakach i ostrogach piętowych.",
    },
    {
      icon: "🦴",
      t: "Wzmacnia kości",
      d: "Przyspiesza gojenie złamań i wzmacnia kości w osteoporozie.",
    },
    {
      icon: "✨",
      t: "Uniwersalne zastosowanie",
      d: "Siniaki, skręcenia, zwichnięcia, ukąszenia owadów - jeden balsam na wszystko.",
    },
  ];

  return (
    <section id="benefits" className="py-24 bg-gradient-to-b from-white to-zinc-50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900">
            Dlaczego warto wybrać ten balsam?
          </h2>
          <p className="mt-4 text-lg text-zinc-600 max-w-2xl mx-auto">
            Sprawdzona tajska receptura, która pomogła tysiącom osób pozbyć się bólu
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((x, i) => (
            <div
              key={i}
              className="group p-8 rounded-3xl bg-white hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all shadow-sm hover:shadow-2xl border border-zinc-100"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{x.icon}</div>
              <h3 className="font-bold text-xl text-zinc-900 mb-2">{x.t}</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowToUse() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Jak stosować?
        </h2>

        <div className="space-y-6">
          <div className="flex gap-6 items-start p-6 rounded-2xl bg-zinc-50 hover:bg-red-50 transition">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xl">
              1
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Nałóż niewielką ilość</h3>
              <p className="text-zinc-600">Weź odrobinę balsamu na dłoń</p>
            </div>
          </div>

          <div className="flex gap-6 items-start p-6 rounded-2xl bg-zinc-50 hover:bg-red-50 transition">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xl">
              2
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Wcieraj delikatnie</h3>
              <p className="text-zinc-600">Masuj bolesny obszar aż do całkowitego wchłonięcia</p>
            </div>
          </div>

          <div className="flex gap-6 items-start p-6 rounded-2xl bg-zinc-50 hover:bg-red-50 transition">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xl">
              3
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Stosuj regularnie</h3>
              <p className="text-zinc-600">2-3 razy dziennie dla najlepszych rezultatów</p>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-yellow-50 border-2 border-yellow-200">
          <p className="text-sm text-zinc-700">
            <strong className="text-red-600">⚠️ Ważne:</strong> Nie stosować u dzieci poniżej 8 roku życia.
            Unikać kontaktu z oczami i błonami śluzowymi. Nie nakładać na uszkodzoną skórę i rany.
            Tylko do użytku zewnętrznego.
          </p>
        </div>
      </div>
    </section>
  );
}

// === ОБНОВЛЕННЫЙ КОМПОНЕНТ CTA (для смены динамической ссылки на оплату) ===

function CTA({ quantity, setQuantity, variant }: any) {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${variant.bgGradient} transition-colors duration-700`}></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMTRjMy4zMSAwIDYgMi42OSA2IDZzLTIuNjkgNi02IDYtNi0yLjY5LTYtNiAyLjY5LTYgNi02ek02IDM0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">Pożegnaj się z bólem już dziś!</h2>
        <p className="mt-6 text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          Dołącz do tysięcy zadowolonych klientów, którzy odkryli moc tajskiego balsamu. Naturalna ulga w bólu bez chemii.
        </p>

        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="flex items-center gap-3 bg-white/10 rounded-xl p-2 border border-white/20">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition">−</button>
            <span className="w-16 text-center text-white font-semibold text-xl">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition">+</button>
          </div>

          <form action="/api/checkout_sessions" method="POST" className="w-full max-w-md px-4">
            <input type="hidden" name="quantity" value={quantity} />
            <input type="hidden" name="variantId" value={variant.id} />
            <button type="submit" className={`w-full px-8 py-6 rounded-2xl bg-gradient-to-r ${variant.btnGradient} text-white font-bold text-base sm:text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all`}>
              Zamów teraz - 50g × {quantity}
            </button>
          </form>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80 text-sm">
          <div className="flex items-center gap-2">Bezpieczna płatność</div>
          <div className="flex items-center gap-2">Oryginalny produkt z Tajlandii</div>
          <div className="flex items-center gap-2">Szybka dostawa</div>
        </div>
      </div>
    </section>
  );
}




