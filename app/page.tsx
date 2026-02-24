import Logo from "./components/logo";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Background media layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-teal-900/30 to-green-900/40 z-10"></div>
        <img
          src="https://static.wixstatic.com/media/11062b_7fa915c4c1a046609e67b44c27c866ba~mv2.jpg/v1/fill/w_1706,h_852,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_7fa915c4c1a046609e67b44c27c866ba~mv2.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content layer */}
      <div className="relative z-20 text-center px-6">
        <div className="mb-8">
          <div className="p-8 mx-auto w-80 h-80 md:w-100 md:h-100 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl">
            <Logo />
          </div>
        </div>

      </div>
    </main>
  );
}
