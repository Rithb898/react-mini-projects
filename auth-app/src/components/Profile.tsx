import { useState } from "react";
import Message from "./Message";
import { logout, type User } from "../api";

export default function Profile({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");
    setLoading(true);
    try {
      await logout();
      onLogout();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed");
    } finally {
      setLoading(false);
    }
  }

  const rows: [string, string][] = [
    ["Username", user.username],
    ["Email", user.email],
    ["Role", user.role],
    ["ID", user._id],
  ];
  if (user.createdAt) rows.push(["Joined", new Date(user.createdAt).toLocaleDateString()]);

  return (
    <div className="w-full max-w-sm border border-black bg-white p-6">
      <div className="mb-6 flex items-center gap-3 border-b border-black pb-4">
        <div className="flex h-12 w-12 items-center justify-center bg-black text-lg font-bold text-white">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-semibold text-black">{user.username}</p>
          <p className="text-xs text-neutral-500">Logged in</p>
        </div>
      </div>

      <dl className="space-y-3">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 text-sm">
            <dt className="text-neutral-500">{k}</dt>
            <dd className="truncate text-right font-medium text-black">{v}</dd>
          </div>
        ))}
      </dl>

      {error && (
        <div className="mt-4">
          <Message kind="error" text={error} />
        </div>
      )}

      <button
        onClick={handleLogout}
        disabled={loading}
        className="mt-6 w-full border border-black bg-white py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white disabled:opacity-50"
      >
        {loading ? "Logging out…" : "Log out"}
      </button>
    </div>
  );
}
