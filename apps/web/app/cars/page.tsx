import Link from "next/link";
import { apiFetch } from "../src/lib/api"; // Ensure this path is correct based on your project structure

export default async function CarsPage() {
  const cars = await apiFetch("/cars");

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-6 text-4xl font-black">Araçlar</h1>

      {cars.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 shadow">
          <h2 className="text-2xl font-bold">Araç bulunamadı</h2>
          <p className="mt-2 text-zinc-500">
            API kapalı olabilir veya henüz araç eklenmemiş olabilir.
          </p>
          <Link href="/host/cars/new" className="mt-6 inline-block rounded-xl bg-black px-5 py-3 text-white">
            İlk Aracı Ekle
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {cars.map((car :any) => (
            <Link key={car.id} href={`/cars/${car.id}`} className="card">
              <div className="mb-4 h-48 rounded-3xl bg-zinc-200" />
              <h2 className="text-2xl font-black">
                {car.brand} {car.model}
              </h2>
              <p>{car.city} / {car.district}</p>
              <p className="mt-4 text-xl font-black">{car.dailyPrice} TL / gün</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}