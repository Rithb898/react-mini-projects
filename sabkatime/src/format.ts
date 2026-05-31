// Stopwatch: "mm:ss.cs" (centiseconds).
export function formatStopwatch(ms: number): { main: string; cs: string } {
  const totalCs = Math.floor(ms / 10);
  const cs = totalCs % 100;
  const totalSec = Math.floor(totalCs / 100);
  const sec = totalSec % 60;
  const min = Math.floor(totalSec / 60);
  const pad = (n: number) => String(n).padStart(2, "0");
  return { main: `${pad(min)}:${pad(sec)}`, cs: pad(cs) };
}

// Timer: "hh:mm:ss" (hours hidden when zero by the component).
export function formatClock(ms: number): { h: number; m: number; s: number } {
  const totalSec = Math.ceil(ms / 1000);
  return {
    h: Math.floor(totalSec / 3600),
    m: Math.floor((totalSec % 3600) / 60),
    s: totalSec % 60,
  };
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
