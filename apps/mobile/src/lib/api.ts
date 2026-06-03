const DEFAULT_API_URL = 'https://api.gesrent.com/api';
const API_URL = process.env.EXPO_PUBLIC_API_URL || DEFAULT_API_URL;

function joinPath(base: string, path: string) {
  return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}

export async function apiFetch(path: string, options?: RequestInit) {
  if (!API_URL) {
    throw new Error('API URL is not configured. Set EXPO_PUBLIC_API_URL or use the default backend URL.');
  }

  const url = joinPath(API_URL, path);
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `API hatası: ${res.status}`);
  }

  return data;
}
