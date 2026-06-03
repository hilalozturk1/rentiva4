import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="bg-zinc-950 text-white">
        <div className="mx-auto grid min-h-[86vh] max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-yellow-400">
              P2P Araç Paylaşımı
            </p>

            <h1 className="text-5xl font-black leading-tight md:text-6xl">
              Aracını kiraya ver, yakınındaki aracı güvenle kirala.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-zinc-300">
              Rentiva; KYC, dijital teslimat, depozito provizyonu ve araç hasar kayıtlarıyla güvenli araç paylaşımı sağlar.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/cars" className="btn-yellow">
                Araç Kirala
              </Link>
              <Link href="/host/cars/new" className="rounded-2xl border border-white/20 px-6 py-4 font-bold">
                Aracımı Listele
              </Link>
            </div>
          </div>

          <div className="rounded-[36px] bg-gradient-to-br from-yellow-400 to-orange-500 p-6 shadow-2xl">
            <div className="rounded-[28px] bg-white p-6 text-black">
              <div className="mb-5 h-56 rounded-3xl bg-zinc-200" />
              <h2 className="text-2xl font-black">BMW 3.20i</h2>
              <p className="text-zinc-500">İstanbul / Kadıköy</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-2xl font-black">2.450 TL/gün</span>
                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                  KYC Onaylı
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-16 md:grid-cols-4">
        {[
          ["KYC", "Kimlik ve ehliyet doğrulama"],
          ["Sigorta", "Kiralama süresi boyunca güvence"],
          ["Provizyon", "Segment bazlı depozito blokesi"],
          ["Teslimat", "Mobil fotoğraflı dijital tutanak"],
        ].map(([title, desc]) => (
          <div key={title} className="card">
            <h3 className="text-xl font-black">{title}</h3>
            <p className="mt-2 text-zinc-500">{desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}