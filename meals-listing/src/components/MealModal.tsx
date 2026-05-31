import { getIngredients, getTags, type Meal } from "../api";

export default function MealModal({ meal, onClose }: { meal: Meal; onClose: () => void }) {
  const ingredients = getIngredients(meal);
  const tags = getTags(meal);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="my-8 w-full max-w-2xl overflow-hidden rounded-2xl bg-white"
      >
        <div className="relative">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="h-56 w-full object-cover" />
          <button
            onClick={onClose}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-900 hover:bg-white"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-bold text-neutral-900">{meal.strMeal}</h2>
          <p className="mt-1 text-sm text-neutral-500">
            {meal.strCategory} · {meal.strArea}
          </p>

          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span key={t} className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">
                  {t}
                </span>
              ))}
            </div>
          )}

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Ingredients
          </h3>
          <ul className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
            {ingredients.map((ing, i) => (
              <li key={i} className="flex justify-between gap-2 border-b border-neutral-100 py-1 text-sm">
                <span className="text-neutral-800">{ing.name}</span>
                <span className="text-neutral-400">{ing.measure}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Instructions
          </h3>
          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-neutral-700">
            {meal.strInstructions}
          </p>

          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-700"
            >
              Watch on YouTube
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
