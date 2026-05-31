import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { evaluate, type Cell, type Player } from "./game";
import Square from "./components/Square";

const EMPTY: Cell[] = Array(9).fill(null);

function App() {
  const [board, setBoard] = useState<Cell[]>(EMPTY);
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const result = useMemo(() => evaluate(board), [board]);
  const gameOver = result.winner !== null || result.draw;
  const current: Player = xIsNext ? "X" : "O";

  function play(i: number) {
    if (board[i] || gameOver) return;
    const next = board.slice();
    next[i] = current;
    setBoard(next);

    const outcome = evaluate(next);
    if (outcome.winner) setScores((s) => ({ ...s, [outcome.winner!]: s[outcome.winner!] + 1 }));
    else if (outcome.draw) setScores((s) => ({ ...s, draws: s.draws + 1 }));

    setXIsNext((v) => !v);
  }

  function reset() {
    setBoard(EMPTY);
    setXIsNext(true);
  }

  const status = result.winner
    ? `${result.winner} wins the round`
    : result.draw
    ? "Round drawn"
    : `${current} to move`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 px-4 py-10 text-neutral-100">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
        <header className="text-center">
          <h1 className="bg-gradient-to-r from-sky-400 to-amber-400 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
            Tic Tac Toe
          </h1>
          <p className="mt-1 text-xs text-neutral-400">Two players · X goes first</p>
        </header>

        {/* Scoreboard */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {([
            ["X", scores.X, "X" as const],
            ["Draws", scores.draws, null],
            ["O", scores.O, "O" as const],
          ] as [string, number, Player | null][]).map(([label, n, who]) => {
            const isActive = !gameOver && who === current;
            const accent = who === "X" ? "text-sky-400" : who === "O" ? "text-amber-400" : "text-neutral-300";
            return (
              <div
                key={label}
                className={`rounded-2xl border px-3 py-2.5 text-center transition-colors ${
                  isActive ? "border-white/40 bg-white/10" : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <div className={`text-xs font-semibold uppercase tracking-wide ${accent}`}>{label}</div>
                <div className="text-2xl font-bold tabular-nums">{n}</div>
              </div>
            );
          })}
        </div>

        {/* Status */}
        <div className="mt-5 flex h-8 items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-2 text-sm font-medium"
            >
              {!gameOver && (
                <span
                  className={`inline-block h-2.5 w-2.5 rounded-full ${
                    current === "X" ? "bg-sky-400" : "bg-amber-400"
                  }`}
                />
              )}
              <span className={gameOver ? "font-semibold text-white" : "text-neutral-300"}>
                {status}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Board */}
        <div className="mt-5 grid grid-cols-3 gap-2.5 rounded-2xl border border-white/10 bg-black/20 p-2.5">
          {board.map((cell, i) => (
            <Square
              key={i}
              value={cell}
              onClick={() => play(i)}
              highlight={result.line?.includes(i) ?? false}
              disabled={gameOver}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={reset}
          className="mt-6 w-full rounded-full bg-white py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200"
        >
          {gameOver ? "Play again" : "Reset game"}
        </motion.button>
      </div>
    </div>
  );
}

export default App;
