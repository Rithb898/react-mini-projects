import { AnimatePresence, motion } from "motion/react";
import { type Cell } from "../game";

type Props = {
  value: Cell;
  onClick: () => void;
  highlight: boolean;
  disabled: boolean;
};

export default function Square({ value, onClick, highlight, disabled }: Props) {
  const color = value === "X" ? "text-sky-400" : value === "O" ? "text-amber-400" : "";

  return (
    <motion.button
      whileHover={!value && !disabled ? { scale: 1.06 } : undefined}
      whileTap={!value && !disabled ? { scale: 0.9 } : undefined}
      onClick={onClick}
      disabled={disabled || value !== null}
      className={`flex aspect-square items-center justify-center rounded-xl border text-5xl font-extrabold transition-colors sm:text-6xl ${
        highlight
          ? "border-white/60 bg-white/15 shadow-[0_0_20px_rgba(255,255,255,0.25)]"
          : "border-white/10 bg-white/[0.04] hover:bg-white/10"
      } ${color}`}
    >
      <AnimatePresence>
        {value && (
          <motion.span
            key={value}
            initial={{ scale: 0, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="drop-shadow"
          >
            {value}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
