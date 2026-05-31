const BASE = "https://api.freeapi.app/api/v1/public/meals";

export type Meal = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strSource: string | null;
} & Record<string, string | null>;

export type MealsPage = {
  data: Meal[];
  page: number;
  totalPages: number;
  totalItems: number;
  nextPage: boolean;
  previousPage: boolean;
};

// Flatten strIngredient1..20 + strMeasure1..20 into a clean list.
export function getIngredients(meal: Meal): { name: string; measure: string }[] {
  const out: { name: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim() ?? "";
    if (name) out.push({ name, measure });
  }
  return out;
}

export function getTags(meal: Meal): string[] {
  return meal.strTags ? meal.strTags.split(",").map((t) => t.trim()).filter(Boolean) : [];
}

export async function fetchMeals(params: { page?: number; query?: string } = {}): Promise<MealsPage> {
  const url = new URL(BASE);
  url.searchParams.set("page", String(params.page ?? 1));
  url.searchParams.set("limit", "12");
  if (params.query) url.searchParams.set("query", params.query);

  const res = await fetch(url);
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || `Request failed (${res.status})`);
  return json.data as MealsPage;
}
