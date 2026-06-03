"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { apiFetch } from "../src/lib/api"; // Ensure this path is correct based on your project structure

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, phone, password, role: "GUEST" }),
      });
      router.push("/cars");
    } catch (err: any) {
      setError(err.message || "Kayıt sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <div className="rounded-[32px] border border-zinc-200 bg-white p-10 shadow-xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-600">Rentiva</p>
          <h1 className="mt-4 text-4xl font-black">Kayıt Ol</h1>
          <p className="mt-3 text-zinc-500">Hemen başlayın, aracınızı listeleyin ya da kiralık araç keşfedin.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-semibold text-zinc-700">Ad Soyad</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="mt-2 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-5 py-4 focus:border-black focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-zinc-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-2 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-5 py-4 focus:border-black focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-zinc-700">Telefon</span>
            <input
              type="text"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="mt-2 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-5 py-4 focus:border-black focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-zinc-700">Şifre</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="mt-2 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-5 py-4 focus:border-black focus:outline-none"
            />
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-3xl bg-black px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Bekleniyor..." : "Kayıt Ol"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Zaten hesabın var mı?{' '}
          <Link href="/login" className="font-semibold text-black hover:underline">
            Giriş Yap
          </Link>
        </p>
      </div>
    </main>
  );
}
