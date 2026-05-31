import { useEffect, useRef, useState } from "react";
import { fetchVideos, type Video, type VideosPage } from "./api";
import VideoCard from "./components/VideoCard";
import SkeletonCard from "./components/SkeletonCard";

function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [meta, setMeta] = useState<Pick<VideosPage, "page" | "totalPages"> | null>(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    fetchVideos({ page, query })
      .then((res) => {
        if (cancelled) return;
        setVideos(res.data.map((d) => d.items));
        setMeta({ page: res.page, totalPages: res.totalPages });
      })
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [page, query]);

  // Debounce the search box -> query.
  const timer = useRef<number | undefined>(undefined);
  function onSearchChange(value: string) {
    setSearch(value);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setPage(1);
      setQuery(value.trim());
    }, 400);
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="flex items-center gap-2 text-lg font-bold">
            <span className="rounded bg-red-600 px-1.5 py-0.5 text-sm text-white">▶</span>
            VideoTube
          </h1>
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search videos…"
            className="w-full rounded-full border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-900 sm:max-w-md"
          />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}{" "}
            <button onClick={() => setPage((p) => p)} className="font-medium underline">
              retry
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
            : videos.map((v) => <VideoCard key={v.id} video={v} />)}
        </div>

        {!loading && !error && videos.length === 0 && (
          <p className="py-20 text-center text-sm text-neutral-500">No videos found.</p>
        )}

        {meta && meta.totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-neutral-600">
              Page {meta.page} of {meta.totalPages}
            </span>
            <button
              disabled={page >= meta.totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium disabled:opacity-40"
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
