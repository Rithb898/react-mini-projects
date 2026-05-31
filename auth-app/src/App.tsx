import { useEffect, useState } from "react";
import AuthForm from "./components/AuthForm";
import Profile from "./components/Profile";
import { getCurrentUser, getToken, clearToken, type User } from "./api";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [booting, setBooting] = useState(true);

  // Restore session on load if a token exists.
  useEffect(() => {
    if (!getToken()) {
      setBooting(false);
      return;
    }
    getCurrentUser()
      .then(setUser)
      .catch(() => clearToken())
      .finally(() => setBooting(false));
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-neutral-100 px-4">
      <header className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-black">FreeAPI Auth</h1>
        <p className="mt-1 text-sm text-neutral-500">Register, log in, view your profile.</p>
      </header>

      {booting ? (
        <p className="text-sm text-neutral-500">Loading…</p>
      ) : user ? (
        <Profile user={user} onLogout={() => setUser(null)} />
      ) : (
        <AuthForm onAuth={setUser} />
      )}

      <footer className="text-xs text-neutral-400">Built with React + FreeAPI</footer>
    </div>
  );
}

export default App;
