"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { url } from "inspector/promises";
// Lightweight apiFetch fallback to avoid missing import when ../../../api is unavailable
async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const base =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE ||
    "http://localhost:8080/api";
  const res = await fetch(base, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    let message = text;
    try {
      const data = JSON.parse(text);
      message = data.message || JSON.stringify(data);
    } catch {}
    throw new Error(message || res.statusText);
  }
  return res.json();
}

export default function NewCarPage() {
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [dailyPrice, setDailyPrice] = useState("");
  const [deposit, setDeposit] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiFetch("/cars", {
        method: "POST",
        body: JSON.stringify({
          brand,
          model,
          city,
          district,
          dailyPrice: Number(dailyPrice),
          deposit: Number(deposit),
          isActive: true,
        }),
      });
      router.push("/cars");
    } catch (err: any) {
      setError(err.message || "Araç eklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="rounded-[32px] border border-zinc-200 bg-white p-10 shadow-xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-600">Rentiva Host</p>
          <h1 className="mt-4 text-4xl font-black">Aracını Listele</h1>
          <p className="mt-3 text-zinc-500">Kiraya verilecek aracın bilgilerini girerek anında listelenmesini sağla.</p>
        </div>

        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-zinc-700">Marka</span>
              <input
                type="text"
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
                required
                className="mt-2 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-5 py-4 focus:border-black focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-zinc-700">Model</span>
              <input
                type="text"
                value={model}
                onChange={(event) => setModel(event.target.value)}
                required
                className="mt-2 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-5 py-4 focus:border-black focus:outline-none"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-zinc-700">Şehir</span>
              <input
                type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                required
                className="mt-2 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-5 py-4 focus:border-black focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-zinc-700">İlçe</span>
              <input
                type="text"
                value={district}
                onChange={(event) => setDistrict(event.target.value)}
                required
                className="mt-2 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-5 py-4 focus:border-black focus:outline-none"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-zinc-700">Günlük Fiyat (TL)</span>
              <input
                type="number"
                value={dailyPrice}
                onChange={(event) => setDailyPrice(event.target.value)}
                required
                className="mt-2 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-5 py-4 focus:border-black focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-zinc-700">Depozito (TL)</span>
              <input
                type="number"
                value={deposit}
                onChange={(event) => setDeposit(event.target.value)}
                required
                className="mt-2 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-5 py-4 focus:border-black focus:outline-none"
              />
            </label>
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="rounded-3xl bg-black px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Kaydediliyor..." : "Aracı Listele"}
          </button>
        </form>

        <p className="mt-8 text-sm text-zinc-500">
          Aracını daha sonra yönetmek için hesabına giriş yapmayı unutma.
        </p>

        <Link href="/cars" className="mt-6 inline-flex rounded-full border border-black px-6 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white">
          Araç Listesine Dön
        </Link>
      </div>
    </main>
  );
}
