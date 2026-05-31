import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { formatStopwatch } from "../format";

const tap = { whileTap: { scale: 0.94 } } as const;

export default function Stopwatch() {
  const [elapsed, setElapsed] = useState(0); // ms
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const startRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!running) return;
    startRef.current = Date.now() - elapsed;
    const tick = () => {
      setElapsed(Date.now() - startRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  function reset() {
    setRunning(false);
    setElapsed(0);
    setLaps([]);
  }

  function lap() {
    setLaps((l) => [elapsed, ...l]);
  }

  const { main, cs } = formatStopwatch(elapsed);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="font-mono text-6xl font-bold tabular-nums tracking-tight text-neutral-900 sm:text-7xl">
        {main}
        <span className="text-3xl text-neutral-400 sm:text-4xl">.{cs}</span>
      </div>

      <div className="flex gap-3">
        {!running ? (
          <motion.button
            {...tap}
            onClick={() => setRunning(true)}
            className="rounded-full bg-neutral-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
          >
            {elapsed > 0 ? "Resume" : "Start"}
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
          onClick={running ? lap : reset}
          disabled={elapsed === 0}
          className="rounded-full border border-neutral-300 px-8 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 disabled:opacity-40"
        >
          {running ? "Lap" : "Reset"}
        </motion.button>
      </div>

      {laps.length > 0 && (
        <ul className="max-h-56 w-full max-w-xs divide-y divide-neutral-100 overflow-y-auto">
          <AnimatePresence initial={false}>
            {laps.map((l, i) => {
              const { main, cs } = formatStopwatch(l);
              return (
                <motion.li
                  key={l}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-between py-2 text-sm"
                >
                  <span className="text-neutral-400">Lap {laps.length - i}</span>
                  <span className="font-mono tabular-nums text-neutral-800">
                    {main}.{cs}
                  </span>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
