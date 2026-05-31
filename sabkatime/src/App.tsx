import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Stopwatch from "./components/Stopwatch";
import Timer from "./components/Timer";

type Tab = "stopwatch" | "timer";

function App() {
  const [tab, setTab] = useState<Tab>("stopwatch");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-neutral-100 px-4 py-10 text-neutral-900">
      <header className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">⏱ SabkaTime</h1>
        <p className="mt-1 text-sm text-neutral-500">Stopwatch &amp; Timer</p>
      </header>

      <div className="relative flex rounded-full border border-neutral-300 bg-white p-1">
        {(["stopwatch", "timer"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative z-10 rounded-full px-6 py-2 text-sm font-medium capitalize transition-colors ${
              tab === t ? "text-white" : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            {tab === t && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 -z-10 rounded-full bg-neutral-900"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            {t}
          </button>
        ))}
      </div>

      <main className="w-full max-w-md overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {tab === "stopwatch" ? <Stopwatch /> : <Timer />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="text-xs text-neutral-400">Built with React + Motion</footer>
    </div>
  );
}

export default App;
