import { apiFetch } from "../src/lib/api";

export default async function AdminPage() {
  const bookings = await apiFetch("/bookings");

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-4xl font-black">Admin Panel</h1>
      <p className="mt-2 text-zinc-500">Rezervasyon, araç ve kullanıcı durumlarını takip et.</p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="card">
          <p className="text-zinc-500">Toplam Rezervasyon</p>
          <h2 className="text-4xl font-black">{bookings.length}</h2>
        </div>
        <div className="card">
          <p className="text-zinc-500">Bekleyen KYC</p>
          <h2 className="text-4xl font-black">0</h2>
        </div>
        <div className="card">
          <p className="text-zinc-500">Aktif Araç</p>
          <h2 className="text-4xl font-black">-</h2>
        </div>
      </div>

      <div className="card mt-8">
        <h2 className="mb-4 text-2xl font-black">Rezervasyonlar</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-3">Araç</th>
                <th>Kiracı</th>
                <th>Tutar</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b : { id: string; car?: { brand: string; model: string }; guest?: { name: string }; totalPrice: number; status: string }) => (
                <tr key={b.id} className="border-b">
                  <td className="py-3">{b.car?.brand} {b.car?.model}</td>
                  <td>{b.guest?.name}</td>
                  <td>{b.totalPrice} TL</td>
                  <td>
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold">
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}