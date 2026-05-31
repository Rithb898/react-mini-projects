import { type Quote } from "../api";

export default function QuoteCard({ quote }: { quote: Quote }) {
  function copy() {
    navigator.clipboard?.writeText(`"${quote.content}" — ${quote.author}`);
  }

  return (
    <figure className="flex flex-col justify-between gap-4 rounded-xl border border-neutral-200 bg-white p-5 transition hover:shadow-md">
      <div>
        <span className="text-3xl leading-none text-neutral-300">“</span>
        <blockquote className="mt-1 text-sm leading-relaxed text-neutral-800">
          {quote.content}
        </blockquote>
      </div>

      <div>
        {quote.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {quote.tags.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500">
                {t}
              </span>
            ))}
          </div>
        )}
        <figcaption className="flex items-center justify-between border-t border-neutral-100 pt-3">
          <span className="text-sm font-semibold text-neutral-900">— {quote.author}</span>
          <button
            onClick={copy}
            title="Copy quote"
            className="text-xs text-neutral-400 transition hover:text-neutral-900"
          >
            Copy
          </button>
        </figcaption>
      </div>
    </figure>
  );
}
