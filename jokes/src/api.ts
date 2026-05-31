const BASE = "https://api.freeapi.app/api/v1/public/randomjokes";

export type Joke = {
  id: number;
  content: string;
  categories: string[];
};

export type JokesPage = {
  data: Joke[];
  page: number;
  totalPages: number;
  totalItems: number;
  nextPage: boolean;
  previousPage: boolean;
};

export async function fetchJokes(params: { page?: number; query?: string } = {}): Promise<JokesPage> {
  const url = new URL(BASE);
  url.searchParams.set("page", String(params.page ?? 1));
  url.searchParams.set("limit", "12");
  if (params.query) url.searchParams.set("query", params.query);

  const res = await fetch(url);
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || `Request failed (${res.status})`);
  return json.data as JokesPage;
}
