import { useCallback, useEffect, useState } from "react";
import { fetchCat, imageUrl, type Cat } from "./api";

function App() {
  const [cat, setCat] = useState<Cat | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    setImgLoaded(false);
    setError("");
    fetchCat()
      .then(setCat)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const facts = cat
    ? ([
        ["Origin", cat.origin],
        ["Life span", `${cat.life_span} yrs`],
        ["Weight", `${cat.weight?.metric} kg`],
      ] as [string, string][])
    : [];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-neutral-100 px-4 py-10 text-neutral-900">
      <header className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">🐱 Random Cat</h1>
        <p className="mt-1 text-sm text-neutral-500">Meet a new cat breed every click.</p>
      </header>

      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <div className="relative aspect-square w-full bg-neutral-200">
          {(loading || !imgLoaded) && !error && (
            <div className="absolute inset-0 animate-pulse bg-neutral-200" />
          )}
          {cat && !error && (
            <img
              src={imageUrl(cat.image)}
              alt={cat.name}
              onLoad={() => setImgLoaded(true)}
              className={`h-full w-full object-cover transition-opacity duration-300 ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>

        <div className="p-5">
          {error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : (
            <>
              <h2 className="text-lg font-bold">{loading ? "Loading…" : cat?.name}</h2>
              {cat && (
                <>
                  <p className="mt-1 text-xs italic text-neutral-500">{cat.temperament}</p>
                  <p className="mt-3 line-clamp-3 text-sm text-neutral-600">{cat.description}</p>
                  <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-neutral-100 pt-4 text-center">
                    {facts.map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-[10px] uppercase tracking-wide text-neutral-400">{k}</dt>
                        <dd className="text-xs font-semibold">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </>
              )}
            </>
          )}
        </div>
      </div>

      <button
        onClick={load}
        disabled={loading}
        className="rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:opacity-50"
      >
        {loading ? "Fetching…" : "New cat 🐾"}
      </button>
    </div>
  );
}

export default App;
