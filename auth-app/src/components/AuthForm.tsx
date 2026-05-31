import { useState } from "react";
import Field from "./Field";
import Message from "./Message";
import { login, register, type User } from "../api";

type Mode = "login" | "register";

export default function AuthForm({ onAuth }: { onAuth: (u: User) => void }) {
  const [mode, setMode] = useState<Mode>("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function reset() {
    setError("");
    setSuccess("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    reset();
    setLoading(true);
    try {
      if (mode === "register") {
        await register({ username, email, password, role });
        setSuccess("Account created. You can log in now.");
        setMode("login");
        setPassword("");
      } else {
        const user = await login({ username, password });
        onAuth(user);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm border border-black bg-white p-6">
      <div className="mb-6 flex border border-black">
        {(["login", "register"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              reset();
            }}
            className={`flex-1 py-2 text-sm font-medium capitalize transition ${
              mode === m ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Username" value={username} onChange={setUsername} placeholder="doejohn" />

        {mode === "register" && (
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="user@domain.com"
          />
        )}

        <Field
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
        />

        {mode === "register" && (
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-neutral-500">
              Role
            </span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-neutral-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-black"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </label>
        )}

        {error && <Message kind="error" text={error} />}
        {success && <Message kind="success" text={success} />}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black py-2 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-50"
        >
          {loading ? "Please wait…" : mode === "login" ? "Log in" : "Register"}
        </button>
      </form>
    </div>
  );
}
