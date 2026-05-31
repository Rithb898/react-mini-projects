import { type Joke } from "../api";

export default function JokeCard({ joke }: { joke: Joke }) {
  function copy() {
    navigator.clipboard?.writeText(joke.content);
  }

  return (
    <article className="flex flex-col justify-between gap-4 rounded-xl border border-neutral-200 bg-white p-5 transition hover:shadow-md">
      <p className="text-sm leading-relaxed text-neutral-800">{joke.content}</p>
      <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
        <div className="flex flex-wrap gap-1.5">
          {joke.categories.length > 0 ? (
            joke.categories.slice(0, 3).map((c) => (
              <span key={c} className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500">
                {c}
              </span>
            ))
          ) : (
            <span className="text-xs text-neutral-400">#{joke.id}</span>
          )}
        </div>
        <button
          onClick={copy}
          title="Copy joke"
          className="text-xs text-neutral-400 transition hover:text-neutral-900"
        >
          Copy
        </button>
      </div>
    </article>
  );
}
