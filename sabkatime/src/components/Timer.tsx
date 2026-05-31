import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { formatClock, pad2 } from "../format";

const tap = { whileTap: { scale: 0.94 } } as const;

function beep() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  } catch {
    /* audio not available */
  }
}

export default function Timer() {
  // Input values (string for free typing).
  const [h, setH] = useState("0");
  const [m, setM] = useState("5");
  const [s, setS] = useState("0");

  const [remaining, setRemaining] = useState(0); // ms
  const [duration, setDuration] = useState(0); // ms (for progress)
  const [running, setRunning] = useState(false);
  const endRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);

  const inputMs =
    ((Number(h) || 0) * 3600 + (Number(m) || 0) * 60 + (Number(s) || 0)) * 1000;

  useEffect(() => {
    if (!running) return;
    endRef.current = Date.now() + remaining;
    const tick = () => {
      const left = endRef.current - Date.now();
      if (left <= 0) {
        setRemaining(0);
        setRunning(false);
        beep();
        return;
      }
      setRemaining(left);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  function start() {
    const ms = remaining > 0 ? remaining : inputMs;
    if (ms <= 0) return;
    setRemaining(ms);
    if (remaining <= 0) setDuration(ms);
    setRunning(true);
  }

  function reset() {
    setRunning(false);
    setRemaining(0);
    setDuration(0);
  }

  const active = remaining > 0 || running;
  const { h: dh, m: dm, s: ds } = formatClock(active ? remaining : inputMs);
  const progress = duration > 0 ? (remaining / duration) * 100 : 100;

  const fields: [string, string, (v: string) => void][] = [
    ["Hours", h, setH],
    ["Min", m, setM],
    ["Sec", s, setS],
  ];

  return (
    <div className="flex flex-col items-center gap-8">
      <AnimatePresence mode="wait">
      {active ? (
        <motion.div
          key="ring"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative flex h-56 w-56 items-center justify-center"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="#f0f0f0" strokeWidth="6" />
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="#171717"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 46}
              strokeDashoffset={2 * Math.PI * 46 * (1 - progress / 100)}
            />
          </svg>
          <span className="font-mono text-4xl font-bold tabular-nums text-neutral-900">
            {dh > 0 && `${pad2(dh)}:`}
            {pad2(dm)}:{pad2(ds)}
          </span>
        </motion.div>
      ) : (
        <motion.div
          key="inputs"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="flex items-end gap-2"
        >
          {fields.map(([label, value, set]) => (
            <label key={label} className="flex flex-col items-center gap-1">
              <input
                type="number"
                min="0"
                value={value}
                onChange={(e) => set(e.target.value)}
                className="w-20 rounded-lg border border-neutral-300 bg-white px-2 py-2 text-center font-mono text-2xl outline-none focus:border-neutral-900"
              />
              <span className="text-xs uppercase tracking-wide text-neutral-400">{label}</span>
            </label>
          ))}
        </motion.div>
      )}
      </AnimatePresence>

      <div className="flex gap-3">
        {!running ? (
          <motion.button
            {...tap}
            onClick={start}
            disabled={!active && inputMs <= 0}
            className="rounded-full bg-neutral-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:opacity-40"
          >
            {remaining > 0 ? "Resume" : "Start"}
          </motion.button>
        ) : (
          <motion.button
            {...tap}
            onClick={() => setRunning(false)}
            className="rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
          >
            Pause
          </motion.button>
        )}
        <motion.button
          {...tap}
          onClick={reset}
          disabled={!active}
          className="rounded-full border border-neutral-300 px-8 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 disabled:opacity-40"
        >
          Reset
        </motion.button>
      </div>
    </div>
  );
}
