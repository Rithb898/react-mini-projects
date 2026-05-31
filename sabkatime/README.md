# SabkaTime

A polished Stopwatch & Timer app built with React.

## Features
- **Stopwatch** — start, pause, resume, reset, and lap times (centisecond precision)
- **Timer** — custom hours/min/sec input, start, pause, resume, reset
- Animated circular progress ring + audible beep on timer finish
- Smooth Motion animations — sliding tab pill, view transitions, button taps, animated lap list
- Tab switch between modes
- Responsive black & white UI

## Stack
React 19 · TypeScript · Vite · Tailwind CSS v4 · Motion

Time is tracked against wall-clock timestamps (not interval counting) so it stays accurate even when the tab is throttled.

## Run
```bash
pnpm install
pnpm dev
```
