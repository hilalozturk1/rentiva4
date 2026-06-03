"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { apiFetch } from "../src/lib/api"; // Ensure this path is correct based on your project structure

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      router.push("/cars");
    } catch (err: any) {
      setError(err.message || "Giriş sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <div className="rounded-[32px] border border-zinc-200 bg-white p-10 shadow-xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-600">Rentiva</p>
          <h1 className="mt-4 text-4xl font-black">Giriş Yap</h1>
          <p className="mt-3 text-zinc-500">Hesabına erişmek için email ve şifrenle giriş yap.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
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
            {loading ? "Bekleniyor..." : "Giriş Yap"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Henüz hesabın yok mu?{' '}
          <Link href="/register" className="font-semibold text-black hover:underline">
            Kayıt Ol
          </Link>
        </p>
      </div>
    </main>
  );
}
