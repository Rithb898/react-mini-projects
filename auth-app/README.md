# Auth App

A complete authentication flow built on the [FreeAPI](https://freeapi.app) Auth module — register, login, view profile, logout.

## Features
- Register & login forms with loading states
- Token-based session (accessToken in `localStorage`, sent as `Bearer`)
- Current-user profile, restored on reload
- Success / error messages
- Clean black & white UI

## API
`https://api.freeapi.app/api/v1/users` — `/register`, `/login`, `/logout`, `/current-user`

## Stack
React 19 · TypeScript · Vite · Tailwind CSS v4

## Run
```bash
pnpm install
pnpm dev
```
