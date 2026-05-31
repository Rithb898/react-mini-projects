const BASE = "https://api.freeapi.app/api/v1/users";

const TOKEN_KEY = "auth_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export type User = {
  _id: string;
  username: string;
  email: string;
  role: string;
  avatar?: { url?: string };
  createdAt?: string;
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.message || `Request failed (${res.status})`);
  }
  return json.data as T;
}

export function register(body: {
  email: string;
  password: string;
  username: string;
  role: string;
}) {
  return request<unknown>("/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function login(body: { username: string; password: string }) {
  const data = await request<{ user: User; accessToken: string }>("/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (data.accessToken) setToken(data.accessToken);
  return data.user;
}

export function logout() {
  return request<unknown>("/logout", { method: "POST" }).finally(clearToken);
}

export function getCurrentUser() {
  return request<User>("/current-user");
}
