const BASE = "https://api.freeapi.app/api/v1/public/quotes";

export type Quote = {
  id: number;
  content: string;
  author: string;
  authorSlug: string;
  tags: string[];
};

export type QuotesPage = {
  data: Quote[];
  page: number;
  totalPages: number;
  totalItems: number;
  nextPage: boolean;
  previousPage: boolean;
};

export async function fetchQuotes(params: { page?: number; query?: string } = {}): Promise<QuotesPage> {
  const url = new URL(BASE);
  url.searchParams.set("page", String(params.page ?? 1));
  url.searchParams.set("limit", "12");
  if (params.query) url.searchParams.set("query", params.query);

  const res = await fetch(url);
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || `Request failed (${res.status})`);
  return json.data as QuotesPage;
}
