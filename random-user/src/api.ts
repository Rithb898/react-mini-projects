const BASE = "https://api.freeapi.app/api/v1/public/randomusers";

export type RandomUser = {
  gender: string;
  name: { title: string; first: string; last: string };
  location: {
    street: { number: number; name: string };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
  };
  email: string;
  login: { username: string };
  dob: { date: string; age: number };
  phone: string;
  cell: string;
  id: { name: string; value: string | null };
  picture: { large: string; medium: string; thumbnail: string };
  nat: string;
};

export type UsersPage = {
  data: RandomUser[];
  page: number;
  totalPages: number;
  totalItems: number;
  nextPage: boolean;
  previousPage: boolean;
};

export const fullName = (u: RandomUser) => `${u.name.first} ${u.name.last}`;

export async function fetchUsers(params: { page?: number; query?: string } = {}): Promise<UsersPage> {
  const url = new URL(BASE);
  url.searchParams.set("page", String(params.page ?? 1));
  url.searchParams.set("limit", "12");
  if (params.query) url.searchParams.set("query", params.query);

  const res = await fetch(url);
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || `Request failed (${res.status})`);
  return json.data as UsersPage;
}
