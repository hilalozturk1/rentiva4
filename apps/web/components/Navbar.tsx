import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <Link href="/" className="text-2xl font-black">
          Rentiva
        </Link>

        <nav className="flex flex-wrap items-center gap-4 text-sm font-semibold">
          <Link href="/cars">Araçlar</Link>
          <Link href="/host/cars/new">Araç Listele</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/login" className="rounded-full bg-black px-4 py-2 text-white">
            Giriş
          </Link>
          <Link href="/register" className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50">
            Kayıt Ol
          </Link>
        </nav>
      </div>
    </header>
  );
}
