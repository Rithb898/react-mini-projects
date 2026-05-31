import { useEffect, useRef, useState } from "react";
import { fetchJokes, type Joke, type JokesPage } from "./api";
import JokeCard from "./components/JokeCard";
import SkeletonCard from "./components/SkeletonCard";

function App() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [meta, setMeta] = useState<Pick<JokesPage, "page" | "totalPages" | "totalItems"> | null>(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [featuredIdx, setFeaturedIdx] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    fetchJokes({ page, query })
      .then((res) => {
        if (cancelled) return;
        setJokes(res.data);
        setMeta({ page: res.page, totalPages: res.totalPages, totalItems: res.totalItems });
        setFeaturedIdx(Math.floor(Math.random() * res.data.length));
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

  // Cycle the featured joke; load a fresh page once we run out.
  function nextJoke() {
    if (jokes.length === 0) return;
    if (featuredIdx + 1 < jokes.length) {
      setFeaturedIdx(featuredIdx + 1);
    } else if (meta) {
      setPage(meta.page >= meta.totalPages ? 1 : meta.page + 1);
    }
  }

  const featured = jokes[featuredIdx];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">Daily Jokes</h1>
            <p className="text-sm text-neutral-500">
              {meta ? `${meta.totalItems} jokes and counting` : "Browse and laugh"}
            </p>
          </div>

          {/* Featured joke viewer */}
          <div className="mx-auto w-full max-w-2xl rounded-2xl border border-neutral-900 bg-neutral-900 p-8 text-center text-white">
            {loading ? (
              <div className="mx-auto h-6 w-3/4 animate-pulse rounded bg-neutral-700" />
            ) : featured ? (
              <p className="text-lg leading-relaxed">{featured.content}</p>
            ) : (
              <p className="text-sm text-neutral-400">No joke to show.</p>
            )}
            <button
              onClick={nextJoke}
              disabled={loading || jokes.length === 0}
              className="mt-6 rounded-full bg-white px-5 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-200 disabled:opacity-50"
            >
              Next joke →
            </button>
          </div>

          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search jokes…"
            className="mx-auto w-full max-w-md rounded-full border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-900"
          />
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
            : jokes.map((j) => <JokeCard key={j.id} joke={j} />)}
        </div>

        {!loading && !error && jokes.length === 0 && (
          <p className="py-20 text-center text-sm text-neutral-500">No jokes found.</p>
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
