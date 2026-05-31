import { useEffect, useRef, useState } from "react";
import { fetchUsers, type RandomUser, type UsersPage } from "./api";
import UserCard from "./components/UserCard";
import UserModal from "./components/UserModal";
import SkeletonCard from "./components/SkeletonCard";

function App() {
  const [users, setUsers] = useState<RandomUser[]>([]);
  const [meta, setMeta] = useState<Pick<UsersPage, "page" | "totalPages" | "totalItems"> | null>(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<RandomUser | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    fetchUsers({ page, query })
      .then((res) => {
        if (cancelled) return;
        setUsers(res.data);
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

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-lg font-bold">👥 People</h1>
            <p className="text-xs text-neutral-500">
              {meta ? `${meta.totalItems} users` : "Browse random users"}
            </p>
          </div>
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search users…"
            className="w-full rounded-full border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-900 sm:max-w-sm"
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

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
            : users.map((u) => (
                <UserCard key={u.login.username} user={u} onClick={() => setSelected(u)} />
              ))}
        </div>

        {!loading && !error && users.length === 0 && (
          <p className="py-20 text-center text-sm text-neutral-500">No users found.</p>
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

      {selected && <UserModal user={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

export default App;
