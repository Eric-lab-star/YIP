# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tool Preferences
- Use `rg` (ripgrep) instead of `grep` for searching files
- Prefer: `rg "pattern" .` over `grep -r "pattern" .`
```

**2. Via system prompt (if using the API)**

Include an instruction like:
```
When searching for patterns in files, always use `rg` (ripgrep) instead of `grep`.
## Commands

```bash
npm run dev        # Start dev server (Next.js)
npm run build      # Production build (Turbopack)
npm run start      # Start production server
npm run lint       # Run ESLint
```

No test suite is configured. There is no `test` script in `package.json`.

## Environment Variables

The app will throw at startup if these are missing:

| Variable | Purpose |
|---|---|
| `YIPDB_MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | JWT signing secret for auth cookies |
| `R2_URL` | Cloudflare R2 endpoint URL |
| `R2_ACCESS_KEY` | R2 access key ID |
| `R2_SECRET_KEY` | R2 secret access key |

## Architecture

**YIP** is a Korean coding education platform ("기계와 대화하는 언어를 배우는 곳") built with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4.

### Directory Layout

- `app/` — Next.js App Router pages and server-side logic
  - `actions/` — Server Actions (form submissions, CRUD)
  - `api/` — Route handlers (editor image upload, link preview, auth)
  - `lib/` — Backend utilities
    - `mongo/` — MongoDB data access layer (`db.ts`, `students.ts`, `tests.ts`, `posts.ts`, `challenge.ts`)
    - `auth/login.ts` — JWT cookie auth (`signAccessToken`, `validateToken`, `setLoginToken`)
    - `r2/` — Cloudflare R2 (S3-compatible) image storage client
    - `zod/` — Shared Zod validation schemas
    - `results.ts` — `safe`/`safeAsync`/`unwrap` Result-type helpers
    - `tv/` — `tailwind-variants` style definitions
  - `pythonWebScrapper/` — Korean Python curriculum pages (day_1–day_6, challenges, sandboxes)
  - `students/[id]/` — Student profile pages
  - `editor/` — TipTap rich text editor page
  - `login/` — Login page
- `components/` — React components
  - `ui/` — Base UI primitives (button, input, select, calendar, etc.)
  - `commons/` — Shared layout/content components (Header, SideBar, Banner, CodeBlock, Text, Title, etc.)
  - `forms/` — Feature-specific form components (student, login, challenge, quizz)
  - `editor/` — TipTap editor wrapper
  - `codesandbox/` — In-browser Python sandbox UI
  - `SWR/` — SWR-powered data-fetching components
- `types/` — Shared TypeScript type declarations (re-exported from `types/index.d.ts`)

### Data Flow

All database writes go through **Server Actions** (`app/actions/`) which validate with Zod, then call the MongoDB layer (`app/lib/mongo/`). Client components use **SWR** (`components/SWR/`) for reads, or consume data passed as props from server components.

**Authentication** uses a JWT stored in an `httpOnly` cookie (`logInToken`). `validateToken()` is called server-side to gate pages. Token lifetime is 2 hours.

### Key Patterns

- **Result type** (`app/lib/results.ts`): `safe(fn)` / `safeAsync(fn)` wraps thrown errors into `{ ok, value/error }`. Use `unwrap(result)` to re-throw.
- **Forms**: `react-hook-form` with `@hookform/resolvers/zod` for schema-driven validation. Field-level error messages are in Korean (matching the schemas in `app/lib/zod/`).
- **Styling**: Tailwind v4 with `tailwind-variants` (`tv`) for variant-based component styles. Utility helpers: `clsx` + `tailwind-merge` via `cn()`.
- **In-browser Python**: `react-py` powers the Python sandbox pages under `app/pythonWebScrapper/`.
- **Rich text editor**: TipTap v3 with multiple extensions (highlight, image, lists, typography, etc.). Editor API routes live under `app/api/editorjs/`.
- **Image storage**: Cloudflare R2 via the AWS S3 SDK (`app/lib/r2/`). Blur placeholders generated with `sharp`.
- **State management**: Zustand for global client state. Layout sidebar open/close state is managed via React Context (`LayoutContextWrapper`).
