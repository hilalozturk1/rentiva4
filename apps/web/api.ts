const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE ||
  process.env.EXPO_PUBLIC_API_URL ||
  "http://localhost:8080/api";

const API_BASE = API_URL.replace(/\/$/, "");

export async function apiFetch(path: string, options?: RequestInit) {
  const endpoint = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_BASE}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'API hatası');
  }

  return data;
}