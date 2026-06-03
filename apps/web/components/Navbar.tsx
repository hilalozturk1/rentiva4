import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-black">
          Rentiva
        </Link>

        <nav className="flex items-center gap-5 text-sm font-semibold">
          <Link href="/cars">Araçlar</Link>
          <Link href="/host/cars/new">Araç Listele</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/login" className="rounded-xl bg-black px-4 py-2 text-white">
            Giriş
          </Link>
        </nav>
      </div>
    </header>
  );
}