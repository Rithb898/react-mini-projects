import { type Meal } from "../api";

export default function MealCard({ meal, onClick }: { meal: Meal; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white text-left transition hover:shadow-md"
    >
      <div className="relative aspect-video overflow-hidden bg-neutral-100">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          loading="lazy"
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 rounded bg-neutral-900/80 px-2 py-0.5 text-xs font-medium text-white">
          {meal.strArea}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-1 text-sm font-semibold text-neutral-900">{meal.strMeal}</h3>
        <p className="text-xs text-neutral-500">{meal.strCategory}</p>
      </div>
    </button>
  );
}
