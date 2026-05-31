const BASE = "https://api.freeapi.app/api/v1/public/cats/cat/random";

type ImageField = string | { url?: string };

export type Cat = {
  id: number;
  name: string;
  origin: string;
  temperament: string;
  life_span: string;
  description: string;
  weight: { metric: string };
  wikipedia_url?: string;
  image: ImageField;
};

export function imageUrl(image: ImageField): string {
  return typeof image === "string" ? image : image?.url ?? "";
}

export async function fetchCat(): Promise<Cat> {
  const res = await fetch(BASE);
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || `Request failed (${res.status})`);
  // API returns either a single object or an array of one.
  const data = json.data;
  return (Array.isArray(data) ? data[0] : data) as Cat;
}
