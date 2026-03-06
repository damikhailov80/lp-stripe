'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { productsData } from './data';
import ButtonBuy from '../../components/ButtonBuy';
import { getStripePriceId } from '../../../lib/products';

type ProductId = keyof typeof productsData;

const productIds = Object.keys(productsData) as ProductId[];
const defaultProductId = productIds[0];

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState<ProductId>(() => {
    const productParam = searchParams.get('product');
    if (productParam && productIds.includes(productParam as ProductId)) {
      return productParam as ProductId;
    }
    return defaultProductId;
  });

  const product = productsData[selectedProductId];
  const priceId = getStripePriceId(product.id, product.stripePriceId);

  const updateProductInUrl = (productId: ProductId) => {
    setSelectedProductId(productId);
    const params = new URLSearchParams(searchParams.toString());
    params.set('product', productId);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <Hero
        quantity={quantity}
        setQuantity={setQuantity}
        product={product}
        priceId={priceId}
        selectedProductId={selectedProductId}
        setSelectedProductId={updateProductInUrl}
      />
      <Benefits />
      <HowToUse />
      <CTA quantity={quantity} setQuantity={setQuantity} product={product} priceId={priceId} />
    </main>
  );
}

import type { Product } from './data';

function Hero({ quantity, setQuantity, product, priceId, selectedProductId, setSelectedProductId }: {
  quantity: number;
  setQuantity: (q: number) => void;
  product: Product;
  priceId: string;
  selectedProductId: ProductId;
  setSelectedProductId: (id: ProductId) => void;
}) {
  const [isImageOpen, setIsImageOpen] = useState(false);

  const allProducts = Object.entries(productsData).map(([id, data]) => ({ id, data }));

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-950 via-zinc-900 to-orange-950">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnpNNiAzNGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

      {/* Image Preview Modal */}
      {isImageOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsImageOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-red-400 transition z-10"
            onClick={() => setIsImageOpen(false)}
          >
            ×
          </button>
          <div className="relative max-w-2xl w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 to-orange-600/30 blur-3xl rounded-full"></div>
            <div className="relative bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 rounded-3xl shadow-2xl border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-orange-600/10 rounded-3xl"></div>
              <img
                src={product.imagePath}
                alt={product.imageAlt}
                className="relative w-full drop-shadow-2xl rounded-2xl"
              />
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-6 py-6 md:py-8 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <div className="p-3 md:p-6 rounded-2xl md:rounded-3xl bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-sm border-2 border-red-500/50 shadow-xl">
            <a
              href="https://www.tiktok.com/@balsamdladuszy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 md:gap-6 hover:opacity-90 transition group"
              data-track="true"
              data-track-name="tiktok_link"
            >
              <img
                src="/assets/images/balsamdladuszy.jpeg"
                alt="Balsam dla duszy TikTok"
                className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 md:border-4 border-red-500 shadow-lg group-hover:scale-110 transition-transform"
              />
              <div className="text-left flex-1">
                <p className="text-white text-sm md:text-xl font-bold mb-1 md:mb-2 flex items-center gap-1 md:gap-2">
                  💝 Wspieraj nasz kanał TikTok!
                </p>
                <p className="text-white/90 text-xs md:text-base leading-relaxed">
                  Dzięki zakupom publikujemy nowy content o azjatyckich dramach i anime: <span className="text-red-300 font-bold text-sm md:text-lg">@balsamdladuszy</span>
                </p>
              </div>
            </a>
          </div>

          <span className="inline-block mb-4 mt-8 text-xs font-semibold tracking-wider uppercase bg-red-600/20 text-red-400 px-3 py-1 rounded-full border border-red-500/30">
            {product.badge}
          </span>

          <div className="flex items-start gap-4 md:block">
            <div className="flex-1">
              <h1 className="text-3xl md:text-6xl font-bold leading-tight text-white">
                {product.name.split(' ').slice(0, 2).join(' ')}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                  {product.name.split(' ').slice(2).join(' ')}
                </span>
              </h1>
            </div>

            {/* Mobile Image - Right of Title */}
            <div className="md:hidden flex-shrink-0">
              <div className="w-32 h-32 flex items-center justify-center">
                <img
                  src={product.imagePath}
                  alt={product.imageAlt}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setIsImageOpen(true)}
                />
              </div>
            </div>
          </div>

          {/* Mobile Product Selector - Below Title */}
          <div className="md:hidden mt-6 flex gap-2">
            {allProducts.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProductId(p.id)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${selectedProductId === p.id
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white/10 text-white/70 border border-white/20'
                  }`}
                data-track="true"
                data-track-name={`switch_to_${p.id}_mobile`}
              >
                <span className="text-base mr-1">{p.data.badge.split(' ')[0]}</span>
                <span className="hidden xs:inline">{p.data.name.split(' ').pop()}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 flex items-baseline gap-4">
            <div className="text-5xl md:text-6xl font-bold text-white">
              {product.price.toFixed(2)} zł
            </div>
            <div className="text-2xl md:text-3xl text-zinc-400 line-through">
              {product.originalPrice} zł
            </div>
            <div className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-full">
              {product.discount}
            </div>
          </div>

          <p className="mt-6 text-lg text-zinc-300 max-w-lg leading-relaxed h-24 overflow-hidden">
            {product.description}
          </p>

          <div className="mt-10 flex flex-col gap-4">
            <div className="flex items-center gap-3 bg-white/10 rounded-xl p-2 border border-zinc-600 w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white font-bold transition"
                data-track="true"
                data-track-name="quantity_decrease_top"
              >
                −
              </button>
              <span className="w-12 text-center text-white font-semibold text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white font-bold transition"
                data-track="true"
                data-track-name="quantity_increase_top"
              >
                +
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <ButtonBuy
                productId={product.id}
                priceId={priceId}
                quantity={quantity}
                weight={product.weight}
                variant="primary"
                trackingName="buy_now_top"
              />

              <button
                onClick={() => {
                  document.getElementById('benefits')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-zinc-600 text-white hover:bg-white/10 transition text-center"
                data-track="true"
                data-track-name="learn_more"
              >
                Dowiedz się więcej
              </button>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-zinc-400">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">{'★'.repeat(Math.floor(product.rating))}</span>
              <span className="ml-1">{product.rating}/5</span>
            </div>
            <div>{product.weight}</div>
            <div>🇹🇭 Tajlandia</div>
          </div>
        </div>

        {/* Desktop Image */}
        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 to-orange-600/30 blur-3xl rounded-full"></div>
          <div className="relative bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 rounded-3xl shadow-2xl border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-orange-600/10 rounded-3xl"></div>
            <div className="relative w-full h-[500px] flex items-center justify-center">
              <img
                src={product.imagePath}
                alt={product.imageAlt}
                className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-2xl transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => setIsImageOpen(true)}
              />
            </div>
          </div>

          {/* Product Thumbnails */}
          <div className="mt-6 flex gap-4 justify-center">
            {allProducts.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProductId(p.id)}
                className={`relative rounded-xl overflow-hidden transition-all ${selectedProductId === p.id
                  ? 'ring-4 ring-red-500 scale-110'
                  : 'ring-2 ring-white/20 hover:ring-white/40 opacity-60 hover:opacity-100'
                  }`}
                data-track="true"
                data-track-name={`switch_to_${p.id}_thumbnail`}
              >
                <img
                  src={p.data.imagePath}
                  alt={p.data.imageAlt}
                  className="w-20 h-20 object-cover"
                />
              </button>
            ))}
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

function CTA({ quantity, setQuantity, product, priceId }: { quantity: number; setQuantity: (q: number) => void; product: Product; priceId: string }) {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-600 to-red-700"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMTRjMy4zMSAwIDYgMi42OSA2IDZzLTIuNjkgNi02IDYtNi0yLjY5LTYtNiAyLjY5LTYgNi02ek02IDM0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Pożegnaj się z bólem już dziś!
        </h2>

        <p className="mt-6 text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          Dołącz do tysięcy zadowolonych klientów, którzy odkryli moc tajskiego balsamu ze skorpionem.
          Naturalna ulga w bólu bez chemii.
        </p>

        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="flex items-center gap-3 bg-white/20 rounded-xl p-2 border border-white/30">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 h-12 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold transition"
              data-track="true"
              data-track-name="quantity_decrease_bottom"
            >
              −
            </button>
            <span className="w-16 text-center text-white font-semibold text-xl">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 h-12 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold transition"
              data-track="true"
              data-track-name="quantity_increase_bottom"
            >
              +
            </button>
          </div>

          <ButtonBuy
            productId={product.id}
            priceId={priceId}
            quantity={quantity}
            weight={product.weight}
            variant="secondary"
            trackingName="buy_now_bottom"
          />
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Bezpieczna płatność
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Oryginalny produkt z Tajlandii
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Szybka dostawa
          </div>
        </div>
      </div>
    </section>
  );
}
