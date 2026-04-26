const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

export async function apiClient(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
  });

  if (res.status !== 401) {
    return res;
  }

  if (path.startsWith("/auth")) {
    return res;
  }

  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = refreshToken();
  }

  try {
    const newToken = await refreshPromise!;
    isRefreshing = false;

    return fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
        Authorization: `Bearer ${newToken}`,
      },
      credentials: "include",
    });

  } catch (e) {
    isRefreshing = false;
    localStorage.removeItem("token");
    throw e;
  }
}

async function refreshToken(): Promise<string> {
  
  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (res.status === 200) {
    const data = await res.json();
    localStorage.setItem("token", data.accessToken);
    return data.accessToken;
  }

  localStorage.removeItem("token");
  notifyAuthExpired();
  
  throw new Error("Refresh failed");
}

function notifyAuthExpired() {
  window.dispatchEvent(new Event("auth:logout"));
}