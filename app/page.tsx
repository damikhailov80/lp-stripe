export default function Page() {
  return (
    <main className="min-h-screen bg-white text-zinc-900" >
      <Hero />
      <Benefits />
      <CTA />
    </main >
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-100">
      <div className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <span className="inline-block mb-4 text-xs font-semibold tracking-wider uppercase bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
            Thai premium hair care
          </span>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Keratin Repair Mask
            <span className="block text-pink-600">
              with Hyaluronic Acid
            </span>
          </h1>

          <p className="mt-6 text-lg text-zinc-600 max-w-lg">
            Intensive repair and hydration for dry and damaged hair.
            Smooth, shiny and healthy after first use.
          </p>

          <div className="mt-10 flex gap-4">
            <form action="/api/checkout_sessions" method="POST">
              <button type="submit" className="px-8 py-4 rounded-2xl bg-pink-600 text-white font-semibold shadow-lg hover:bg-pink-700 active:scale-95 transition">
                Buy now
              </button>
            </form>

            <button className="px-8 py-4 rounded-2xl border border-zinc-300 hover:bg-zinc-100 transition">
              Details
            </button>
          </div>

          <div className="mt-6 text-sm text-zinc-500">
            ★ 4.9 rating · 200g · All hair types
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-pink-200 blur-3xl opacity-30 rounded-full"></div>
          <img
            src="https://static.wixstatic.com/media/c2c919_3b317899a12a41d7a68eaa8de16fe7c6~mv2.jpg/v1/fill/w_1730,h_1730,q_90,enc_avif,quality_auto/c2c919_3b317899a12a41d7a68eaa8de16fe7c6~mv2.jpg"
            alt="Lolane mask"
            className="relative w-full max-w-md mx-auto drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    {
      t: "Deep hydration",
      d: "Hyaluronic acid locks moisture and restores softness.",
    },
    {
      t: "Keratin repair",
      d: "Strengthens damaged structure and protects hair.",
    },
    {
      t: "Shine & smooth",
      d: "Silky finish without heavy feeling.",
    },
    {
      t: "Salon effect",
      d: "Professional Thai treatment at home.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Why customers love it
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {items.map((x, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl bg-zinc-50 hover:bg-pink-50 transition shadow-sm hover:shadow-xl"
            >
              <div className="text-pink-600 text-2xl mb-3">✦</div>
              <h3 className="font-semibold text-lg">{x.t}</h3>
              <p className="text-sm text-zinc-600 mt-2">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-center">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-3xl md:text-5xl font-bold">
          Restore your hair today
        </h2>

        <p className="mt-6 text-lg text-white/90">
          Professional keratin + hyaluron repair. Smooth and hydrated hair from first use.
        </p>

        <form action="/api/checkout_sessions" method="POST">
          <button type="submit" className="mt-10 px-12 py-5 rounded-2xl bg-white text-pink-600 font-semibold shadow-xl hover:scale-105 active:scale-95 transition">
            Order now
          </button>
        </form>
      </div>
    </section>
  );
}
