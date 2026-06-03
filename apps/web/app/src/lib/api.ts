const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      cache: "no-store",
      ...options,
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || `API hata: ${res.status}`);
    }

    return data;
  } catch (error) {
    console.log("API fetch failed:", {
      url: `${API_URL}${path}`,
      error,
    });

    return [] as T;
  }
}