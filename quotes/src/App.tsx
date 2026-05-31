import { useEffect, useRef, useState } from "react";
import { fetchQuotes, type Quote, type QuotesPage } from "./api";
import QuoteCard from "./components/QuoteCard";
import SkeletonCard from "./components/SkeletonCard";

function App() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [meta, setMeta] = useState<Pick<QuotesPage, "page" | "totalPages" | "totalItems"> | null>(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    fetchQuotes({ page, query })
      .then((res) => {
        if (cancelled) return;
        setQuotes(res.data);
        setMeta({ page: res.page, totalPages: res.totalPages, totalItems: res.totalItems });
      })
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [page, query]);

  const timer = useRef<number | undefined>(undefined);
  function onSearchChange(value: string) {
    setSearch(value);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setPage(1);
      setQuery(value.trim());
    }, 400);
  }

  // "Generator" feel: jump to a random page of quotes.
  function shuffle() {
    if (!meta) return;
    setSearch("");
    setQuery("");
    setPage(Math.floor(Math.random() * meta.totalPages) + 1);
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Quote Gallery</h1>
          <p className="text-sm text-neutral-500">
            {meta ? `${meta.totalItems} quotes to browse` : "Words worth remembering"}
          </p>
          <div className="mx-auto flex w-full max-w-md gap-2">
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by author or word…"
              className="flex-1 rounded-full border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-900"
            />
            <button
              onClick={shuffle}
              className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
            >
              Shuffle
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}{" "}
            <button onClick={() => setPage((p) => p)} className="font-medium underline">
              retry
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
            : quotes.map((q) => <QuoteCard key={q.id} quote={q} />)}
        </div>

        {!loading && !error && quotes.length === 0 && (
          <p className="py-20 text-center text-sm text-neutral-500">No quotes found.</p>
        )}

        {meta && meta.totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-neutral-600">
              Page {meta.page} of {meta.totalPages}
            </span>
            <button
              disabled={page >= meta.totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
