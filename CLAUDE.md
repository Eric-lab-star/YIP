# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tool Preferences

Use `rg` (ripgrep) instead of `grep` for searching files.

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

| Variable | Purpose |
|---|---|
| `YIPDB_MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | JWT signing secret for auth cookies |
| `R2_URL` | Cloudflare R2 endpoint URL |
| `R2_ACCESS_KEY` | R2 access key ID |
| `R2_SECRET_KEY` | R2 secret access key |
| `R2_BUCKET` | R2 bucket name |
| `R2_ID` | R2 account ID |
| `R2_PUBLIC` | R2 public read URL |

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
- **In-browser Python**: `react-py` powers the sandbox pages under `app/pythonWebScrapper/`.
- **Rich text editor**: TipTap v3. Editor API routes are under `app/api/tiptab/` (image upload, link preview, post CRUD).
- **Image storage**: Cloudflare R2 via the AWS S3 SDK. Signed GET URLs expire in 4 hours. Blur placeholders generated with `sharp`.
- **State management**: Zustand for global client state. Sidebar open/close state is managed via React Context (`LayoutContextWrapper`).
- **UI primitives**: shadcn/ui components (new-york style, neutral base color, Lucide icons) in `components/ui/`.

### Notable Integrations

- `@xyflow/react` — Flow/diagram visualization
- `motion` — Animations
- `sonner` — Toast notifications
- `Yjs` / `y-protocols` — Collaborative editing foundation (TipTap)
- `open-graph-scraper` — Link preview metadata in the editor
- `react-hotkeys-hook` — Keyboard shortcuts
