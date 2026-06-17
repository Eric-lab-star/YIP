# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tool Preferences

Use `rg` (ripgrep) instead of `grep` for searching files.

## Commands

```bash
npm run dev        # Start dev server (Next.js + Turbopack)
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint (flat config, next/core-web-vitals + next/typescript)
```

No test suite is configured. No CI/CD pipeline exists.

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
| `R2_CUSTOM`         | R2 custom read URL                  |

Additionally used at runtime (for real-time chat/collaboration):

| Variable                     | Purpose                    |
|------------------------------|----------------------------|
| `PUSHER_APP_ID`              | Pusher app identifier      |
| `NEXT_PUBLIC_PUSHER_KEY`     | Pusher public key          |
| `PUSHER_SECRET`              | Pusher secret key          |
| `NEXT_PUBLIC_PUSHER_CLUSTER` | Pusher cluster region      |

`IMAGE_BASE_URL` in `app/lib/r2/utils.ts` switches between the production domain (`https://r2.kimkyungsub.com`) and the R2 dev public URL based on `NODE_ENV`.

## Architecture

**YIP** is a Korean coding education platform built with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4. Production domain: `yipcode.xyz`.

### Directory Structure

```
app/
├── actions/          # Server Actions (all DB writes)
├── api/              # API route handlers (REST endpoints)
├── lib/              # Shared server-side logic
│   ├── auth/         # JWT token signing/validation
│   ├── mongo/        # MongoDB connection + CRUD per collection
│   ├── pusher/       # Pusher server/client config
│   ├── r2/           # Cloudflare R2 client, upload, signed URLs, image compression
│   ├── tv/           # Tailwind Variants style definitions
│   ├── utils/        # Misc utilities (wait, delay)
│   ├── zod/          # Zod schemas for form validation
│   └── results.ts    # Result<T> error handling pattern
├── styles/           # Global CSS (Tailwind v4 + doodle tokens + TipTap editor styles)
├── tourOfPython/     # Python curriculum (70+ lesson pages, MDX + react-py sandbox)
├── spaceshipCaptain/ # Arduino/game dev curriculum
├── AIDeveloper/      # AI/LLM development course (RAG, LangChain, Streamlit)
├── simpleWebDev/     # Web development basics
├── editor/           # TipTap rich text editor (view/edit/list posts)
├── dashBoard/        # Admin dashboard (student CRUD, signup)
├── students/         # Student profiles
├── chat/             # Real-time chat (Pusher)
└── login/            # Authentication page

components/
├── SWR/              # SWR data-fetching hooks (useUser)
├── commons/          # Layout (AppSideBar, Header, LayoutContextWrapper), shared UI
├── editor/           # TipTap editor component (TipTab.tsx)
├── forms/            # Form components (login, signup, challenge, quiz, class history)
├── mdx/              # Custom MDX components for lesson content
├── codesandbox/      # CodeSandbox integration
└── ui/               # shadcn/ui primitives (20+ components)

hooks/                # Custom React hooks (11 files)
lib/                  # Root-level utils: cn(), pusher-singleton, tiptap-utils, tiptapIndent
types/                # TypeScript type definitions (actions, hook-form, testForm)
utils/                # Curriculum data trees + sidebar navigation structures + baseURL
fonts/                # Custom font files
public/               # Static assets
```

### Data Flow

All database writes go through **Server Actions** (`app/actions/`) which validate with Zod, then call the MongoDB layer (`app/lib/mongo/`). Client components use **SWR** (`components/SWR/`) for reads, or consume data passed as props from server components.

### Authentication

- JWT stored in an `httpOnly` cookie (`logInToken`), 20-hour expiry, HS256 algorithm
- `proxy.ts` acts as middleware — checks cookie presence and redirects unauthenticated users on protected routes (`/tourOfPython/*`, `/spaceshipCaptain/*`, `/AIDeveloper/*`, `/editor/*`, `/students/*`, `/dashBoard`)
- `validateToken()` in `app/lib/auth/login.ts` is called server-side in API routes and Server Actions for authorization
- Login uses name + phone number (no password for students)
- Token payload: `{ id, name, role }` where role is "student" or "admin"

### Database (MongoDB)

- Database name: `yipDB`
- Connection pooling via `@vercel/functions` `attachDatabasePool()`
- Dev mode: global singleton to prevent hot-reload reconnections
- Collections: `students`, `posts`, `challenges` (dynamic names: sayHello, basicCal, ifChallenge), `tests`
- All CRUD in `app/lib/mongo/` — one file per entity

### Server Actions (`app/actions/`)

| File                  | Functions                                              |
|-----------------------|--------------------------------------------------------|
| `authAction.ts`       | `loginAction`, `loginVerfyAction`, `logoutAction`      |
| `studentAction.ts`    | `studentCreateAction`, `updateStudentAction`, `deleteStudentAction` |
| `postAction.ts`       | `deletePostAction`                                     |
| `challengeAction.ts`  | `challengeAction`, `findChallengeAction`               |
| `testFormAction.ts`   | `submitForm`                                           |

### API Routes (`app/api/`)

| Route                       | Method | Purpose                                    |
|-----------------------------|--------|--------------------------------------------|
| `/api/auth/user`            | GET    | Validate JWT, return user info             |
| `/api/messages`             | POST   | Publish chat messages via Pusher           |
| `/api/r2`                   | POST   | Batch delete files from R2                 |
| `/api/r2/download/[...key]` | GET    | Generate presigned download URL (60s)      |
| `/api/tiptab/image`         | POST   | Upload image for TipTap editor             |
| `/api/tiptab/link`          | GET    | Scrape Open Graph metadata for link preview|
| `/api/tiptab/post`          | POST   | Create/update blog post                    |
| `/api/tiptab/post/[id]`     | GET    | Fetch single post by ID                    |

## Key Patterns

### Result Type (`app/lib/results.ts`)

```typescript
type Result<T> = { ok: true; value: T } | { ok: false; error: Error }

safe(fn)          // wraps sync errors into Result
safeAsync(fn)     // wraps async errors into AsyncResult
unwrap(result)    // re-throws if error, returns value if ok
```

Use this for all MongoDB and R2 calls.

### Forms

`react-hook-form` with `@hookform/resolvers/zod`. Field-level error messages are in Korean, matching the schemas in `app/lib/zod/`. Schemas validate: login, signUp, student, challenge, testForm.

### Styling

- **Tailwind CSS v4** via PostCSS (`@tailwindcss/postcss`)
- **`tailwind-variants` (`tv`)** for variant-based component styles — definitions in `app/lib/tv/`
- **`cn()` utility** (`clsx` + `tailwind-merge`) in `lib/utils.ts`
- **shadcn/ui** components (new-york style, neutral base color, Lucide icons) in `components/ui/`
- **Doodle design system**: hand-drawn aesthetic with custom tokens:
  - Ink: `#263D5B` (text/borders), Sky: `#49B6E5` (primary accent), Paper: `#FFFDF7` (background)
  - Fonts: Gaegu (handwritten body), Delius Swash Caps (display), JetBrains Mono (code)
  - Irregular border-radius for sketch-line aesthetic

### In-browser Python

`react-py` powers the sandbox pages under `app/tourOfPython/`. Lessons are written in MDX with interactive code execution.

### Rich Text Editor (TipTap v3)

- Main component: `components/editor/TipTab.tsx`
- Extensions: TextAlign, Image (resizable), Youtube, CodeBlockLowlight, Highlight, Indent, StarterKit, Collaboration (Yjs + Pusher)
- Custom styles: `app/styles/components/tiptab*.css`
- API routes under `app/api/tiptab/` handle image upload, link preview, post CRUD

### Image Storage (Cloudflare R2)

- AWS S3 SDK v3 with R2-compatible endpoint
- Signed GET URLs expire in 4 hours
- Image compression: resized to 1000px max width, WebP at 80% quality via `sharp`
- Blur placeholders: 10x10 base64 generated with `sharp`
- Upload key format: `tiptab/{userId}/{uuid}.{ext}`

### State Management

- Zustand v5 is installed but not actively used in stores
- Sidebar open/close state via React Context (`LayoutContextWrapper`)
- SWR for server data fetching (`useUser()` hook)
- React Hook Form for form state

### MDX Content

- `mdx-components.tsx` provides global component map with doodle-styled elements
- MDX pages treated as routes via `pageExtensions` config
- Curriculum pages mix MDX prose with interactive React components (code sandboxes, quizzes)

## Notable Integrations

- `pusher` / `pusher-js` — Real-time chat and collaborative editing
- `@xyflow/react` — Flow/diagram visualization
- `motion` — Animations
- `sonner` — Toast notifications
- `Yjs` / `y-protocols` — Collaborative editing foundation (TipTap)
- `open-graph-scraper` — Link preview metadata in the editor
- `react-hotkeys-hook` — Keyboard shortcuts
- `three` / `@react-three/fiber` / `@react-three/drei` — 3D graphics
- `react-player` / `media-chrome` — Video playback
- `@tanstack/react-table` — Data tables
- `@vercel/speed-insights` — Performance monitoring
- `@vercel/functions` — Serverless optimization (DB pool attachment)

## Configuration

| File               | Purpose                                                                 |
|--------------------|-------------------------------------------------------------------------|
| `next.config.ts`   | MDX support (remark-gfm), remote image patterns for R2, ipv4first DNS  |
| `tsconfig.json`    | ES2017 target, strict mode, `@/*` path alias to root                   |
| `postcss.config.mjs` | Single plugin: `@tailwindcss/postcss`                                |
| `eslint.config.mjs` | Flat config — `next/core-web-vitals` + `next/typescript`              |
| `components.json`  | shadcn/ui config (new-york style, Tailwind v4 CSS vars, Lucide icons)  |
| `.prettierrc`      | Empty object (default Prettier config)                                 |

## Path Aliases

`@/*` maps to the project root. Import examples:
```typescript
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useUser } from "@/components/SWR/auth/user"
import { validateToken } from "@/app/lib/auth/login"
```

## Conventions

- All user-facing text (labels, validation messages, metadata) is in **Korean**
- `reactStrictMode` is disabled in next.config
- No middleware.ts file — auth routing logic lives in `proxy.ts`
- Forms use Korean phone number format: `01X-XXXX-XXXX`
- Student roles: `"student"` or `"admin"`
- Curriculum data (sidebar trees, lesson order) lives in `utils/curriculum/` and `utils/sideBarTree/`
