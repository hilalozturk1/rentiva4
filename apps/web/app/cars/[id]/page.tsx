import Link from "next/link";
import { apiFetch } from "../../../api";

type Props = {
  params: {
    id: string;
  };
};

export default async function CarDetailPage({ params }: Props) {
  let car: any = null;
  let errorMessage = "";

  try {
    car = await apiFetch(`/cars/${params.id}`);
  } catch (error: any) {
    errorMessage = error?.message || "Araç bilgileri alınamadı.";
  }

  if (!car) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-[32px] border border-zinc-200 bg-white p-10 shadow-xl">
          <h1 className="text-3xl font-black">Araç Bulunamadı</h1>
          <p className="mt-4 text-zinc-500">{errorMessage}</p>
          <Link href="/cars" className="mt-8 inline-flex rounded-full border border-black px-6 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white">
            Araç Listesine Dön
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6 rounded-[32px] border border-zinc-200 bg-white p-10 shadow-xl">
          <div className="h-72 rounded-[28px] bg-zinc-200" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-600">Araç Detayı</p>
            <h1 className="mt-4 text-4xl font-black">{car.brand} {car.model}</h1>
            <p className="mt-3 text-zinc-500">{car.city} / {car.district} içinde kiralanabilir. KYC, sigorta ve dijital teslimat desteğiyle güvenli rezervasyon.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
              <p className="text-sm text-zinc-500">Günlük Ücret</p>
              <p className="mt-3 text-3xl font-black text-black">{car.dailyPrice} TL</p>
            </div>
            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
              <p className="text-sm text-zinc-500">Depozito</p>
              <p className="mt-3 text-3xl font-black text-black">{car.deposit} TL</p>
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
            <p className="text-sm font-semibold text-zinc-700">Detaylar</p>
            <ul className="mt-4 space-y-3 text-zinc-600">
              <li>Yıl: {car.year}</li>
              <li>Şehir: {car.city}</li>
              <li>Plaka: {car.plate}</li>
              <li>Durum: {car.isActive ? "Aktif" : "Pasif"}</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-zinc-200 bg-white p-10 shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">Rezervasyon</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl bg-zinc-50 p-5">
                <p className="text-sm text-zinc-500">Kayıtlı misafir olarak rezervasyon oluşturabilirsiniz.</p>
              </div>
              <Link href="/cars" className="block rounded-3xl bg-black px-6 py-4 text-center text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-zinc-900">
                Rezervasyon Başlat
              </Link>
            </div>
          </div>

          <div className="rounded-[32px] border border-zinc-200 bg-white p-10 shadow-xl">
            <h2 className="text-2xl font-black">Güvenlik & Paketler</h2>
            <div className="mt-6 space-y-4 text-zinc-600">
              <p>• KYC doğrulaması</p>
              <p>• Sigorta desteği</p>
              <p>• Dijital teslimat ve hasar raporu</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
