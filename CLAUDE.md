# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tool Preferences

Use `rg` (ripgrep) instead of `grep` for searching files.

## Lesson Content

Lesson pages (`app/AIDeveloper`, `app/tourOfPython`, `app/Algorithm`,
`app/spaceshipCaptain`) and the components that render them
(`components/mdx/`) must not use emoji — including in 코딩냥이's dialogue,
headings, and card labels. Use plain text, or `CatIcon` when a character
image is wanted.

Two exceptions, because there the emoji is content rather than decoration:

- inside code examples (e.g. `print(" ❤️ " * 10)`)
- when the lesson is *about* emoji (e.g. an exercise that prints ☀️🌧️❄️
  based on the weather)

This applies only to lesson content. General app UI (landing page, games,
navigation) is unaffected.

Note that box drawing (`─ ┌ ┐ │ ├ └ ┘`), arrows (`→ ←`), enclosed numbers
(`① ② ③`), and `○ ■ ▶ ★ ░` are **not** emoji and are used deliberately —
several appear inside Python examples, where removing them breaks the code.

## Commands

```bash
npm run dev        # Start dev server (Next.js + Turbopack)
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
```

No test suite is configured.

## Environment Variables

The app throws at startup if these are missing:

| Variable            | Purpose                             |
|---------------------|-------------------------------------|
| `YIPDB_MONGODB_URI` | MongoDB Atlas connection string     |
| `JWT_SECRET`        | JWT signing secret for auth cookies |
| `R2_URL`            | Cloudflare R2 endpoint URL          |
| `R2_ACCESS_KEY`     | R2 access key ID                    |
| `R2_SECRET_KEY`     | R2 secret access key                |
| `R2_BUCKET`         | R2 bucket name                      |
| `R2_ID`             | R2 account ID                       |
| `R2_PUBLIC`         | R2 public read URL                  |
| `R2_CUSTOM`          | R2 custom read URL                  |
| `ANTHROPIC_API_KEY`  | Anthropic API key for AI chat room  |

Optional: `VOYAGE_API_KEY` enables the AI chat semantic cache (`app/lib/mongo/aiCache.ts`) — without it, only the exact-match cache is active and semantic lookup is skipped (chat still works).

Optional: `PISTON_URL` points the code-judge feature (`app/lib/judge0/`, `app/api/judge/`) at a self-hosted Piston sandbox (e.g. `http://localhost:2000`). Read lazily — the app boots without it and `/api/judge/*` returns 503 until set. See `piston/README.md`. (The `app/lib/judge0/` folder name is historical; it now targets Piston.)

Optional: `JUDGE_SECRET` — shared secret sent as the `X-Judge-Secret` header on every Piston request (`app/lib/judge0/client.ts`). In production Piston sits behind a reverse proxy that requires this header (Piston has no auth of its own); locally it's unset and omitted (direct `http://localhost:2000`). Must match the secret configured on the proxy.

Optional: `FORMATTER_URL` points the "포맷" button (`app/api/judge/format/`) at the self-hosted code-formatter service (e.g. `http://localhost:2100`, from `formatter/`). Read lazily — without it, `/api/judge/format` returns 503 and the editor falls back to its built-in formatting.

Optional: `NEXT_PUBLIC_LSP_URL` (e.g. `ws://localhost:2200`) enables type-aware editor completions via the LSP bridge (`lsp/`, pyright for Python). The browser connects directly over WebSocket (`components/judge/lspClient.ts`); without it the editor uses only the static keyword/snippet completions. As a `NEXT_PUBLIC_` var it is inlined at build time.

`IMAGE_BASE_URL` in `app/lib/r2/utils.ts` switches between the production domain and the R2 dev public URL based on `NODE_ENV`.

## Architecture

**YIP** is a Korean coding education platform built with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4.

### Data Flow

All database writes go through **Server Actions** (`app/actions/`) which validate with Zod, then call the MongoDB layer (`app/lib/mongo/`). Client components use **SWR** (`components/SWR/`) for reads, or consume data passed as props from server components.

There is no `middleware.ts`. Auth is handled per-route: `validateToken()` is called server-side in API routes and Server Actions. **Authentication** uses a JWT stored in an `httpOnly` cookie (`logInToken`). Token lifetime is 20 hours.

### Key Patterns

- **Result type** (`app/lib/results.ts`): `safe(fn)` / `safeAsync(fn)` wraps thrown errors into `{ ok, value } | { ok: false, error }`. Use `unwrap(result)` to re-throw. Use this for all MongoDB and R2 calls.
- **Forms**: `react-hook-form` with `@hookform/resolvers/zod`. Field-level error messages are in Korean, matching the schemas in `app/lib/zod/`.
- **Styling**: Tailwind v4 with `tailwind-variants` (`tv`) for variant-based component styles. Combine classes with `cn()` (`clsx` + `tailwind-merge`). Style definitions live in `app/lib/tv/`.
- **In-browser Python**: `react-py` powers the sandbox pages under `app/tourOfPython/`.
- **Rich text editor**: TipTap v3. Editor API routes are under `app/api/tiptab/` (image upload, link preview, post CRUD).
- **AI chat**: `app/api/chat/route.ts` streams via the Vercel AI SDK (`ai`'s `streamText` + `@ai-sdk/anthropic`), not the raw Anthropic SDK. It checks a two-tier cache before calling the model — exact-match then semantic (`aiCache.ts`, Voyage embeddings + Mongo `$vectorSearch`) — enforces a per-user quota (`aiUsage.ts`), and persists/broadcasts replies over Pusher. Cache hits are re-chunked into a stream so they render with the same incremental UX as a live response.
- **Image storage**: Cloudflare R2 via the AWS S3 SDK. Signed GET URLs expire in 4 hours. Blur placeholders generated with `sharp`.
- **State management**: Zustand for global client state. Sidebar open/close state is managed via React Context (`LayoutContextWrapper`).
- **UI primitives**: shadcn/ui components (new-york style, neutral base color, Lucide icons) in `components/ui/`.

### Content Routes

MDX is enabled as a page extension (`pageExtensions` includes `md`, `mdx`), so `.mdx` files under `app/` are treated as routes. Remark plugins must be passed as serializable string names (not function refs) because Turbopack serializes the config.

### Notable Integrations

- `Pusher` / `pusher-js` — Real-time messaging (`app/lib/pusher/`, `app/chat/`)
- `@xyflow/react` — Flow/diagram visualization
- `@react-three/fiber` + `@react-three/drei` — 3D scenes (e.g. `app/spaceshipCaptain/`)
- `motion` — Animations
- `sonner` — Toast notifications
- `Yjs` / `y-protocols` — Collaborative editing foundation (TipTap)
- `open-graph-scraper` — Link preview metadata in the editor
- `react-hotkeys-hook` — Keyboard shortcuts
- `@tanstack/react-table` — Data tables
- `media-chrome` — Custom video player UI

### Config Notes

- `reactStrictMode` is **off** — intentional, not a mistake.
- `dns.setDefaultResultOrder('ipv4first')` is set in `next.config.ts` to avoid IPv6 connection issues with MongoDB Atlas.
- MongoDB (`app/lib/mongo/db.ts`) connects to the `yipDB` database with a shared client pool (`attachDatabasePool` from `@vercel/functions`, cached on `global` in dev). Stable API `strict` stays **false** on purpose — Atlas Search/Vector Search commands (`createSearchIndex`, `$vectorSearch`) aren't part of Stable API v1 and the semantic cache depends on them.
