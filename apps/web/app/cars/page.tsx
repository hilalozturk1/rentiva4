import Link from "next/link";
import { apiFetch } from "../../api";

export default async function CarsPage() {
  const cars = await apiFetch("/cars");

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-black">Araçlar</h1>
          <p className="mt-2 text-zinc-500">Yakındaki uygun araçları keşfet.</p>
        </div>

        <div className="card flex gap-3 p-3">
          <input className="input" placeholder="Şehir ara: İstanbul" />
          <button className="btn-primary">Ara</button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {cars.map((car : { id: string; brand: string; model: string; city: string; district: string; year: number; dailyPrice: number; deposit: number }) => (
          <Link key={car.id} href={`/cars/${car.id}`} className="card transition hover:-translate-y-1">
            <div className="mb-4 flex h-48 items-center justify-center rounded-3xl bg-zinc-200 text-zinc-400">
              Araç Fotoğrafı
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-black">
                  {car.brand} {car.model}
                </h2>
                <p className="text-zinc-500">{car.city} / {car.district}</p>
              </div>

              <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold">
                {car.year}
              </span>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <p className="text-2xl font-black">{car.dailyPrice} TL</p>
              <p className="text-sm text-zinc-500">/ gün</p>
            </div>

            <p className="mt-2 text-sm text-zinc-500">
              Depozito: {car.deposit} TL
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}