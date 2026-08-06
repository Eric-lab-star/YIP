# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working Agreement

Carry a task through to the end without checking in at each step. The round
trips cost more than the mistakes they prevent — a 142-file sweep landed from a
single "정리하고 PR까지" because nothing interrupted it.

**Finish the whole thing.** When verification passes, commit and open the PR
without asking. "Should I commit?" is not a question worth a round trip.

**Verification is the gate, not approval.** Before calling lesson work done:

```bash
npx tsc --noEmit          # must be 0 errors
npm run build             # reproduces Vercel failures; `npm run dev` does not
npm run lint              # compare against main's baseline, not against zero
```

For `.mdx`, compile with `@mdx-js/mdx` + `remark-gfm` as well — it catches JSX
brace errors that `tsc` cannot see. Lint currently reports 168 problems on
`main`; the bar is "no new findings", not a clean sheet.

Editor diagnostics arriving *during* a branch switch are not a verification
result. Merging #28 produced 22 `Cannot find module '@/components/slide/
SlideShell'` errors the instant the checkout landed on `main`; the file was
tracked and present the whole time — the TS server had simply read the working
tree while git was still rewriting it. Re-run `tsc` before believing a
diagnostic that appeared without an edit.

**Ask only when the answer changes the work**, or before something
irreversible: force push, deleting files, merging, anything that leaves the
machine. Routine judgment calls are yours to make — state the assumption and
keep going.

**Report results, not progress.** Say what changed, what was verified, and what
is still open. Skip the narration of steps already taken.

**Split unrelated work into separate PRs.** A verified fix should not wait
behind a large mechanical sweep, and a reviewer should not have to untangle
them.

**Say what you broke.** Scripted bulk edits go wrong; the useful thing is the
list of what was wrong and how it was caught, not a clean-looking summary.

## Tool Preferences

Use `rg` (ripgrep) instead of `grep` for searching files. It matters more here
than in most repos — measured on this tree:

| command | files read | time |
|---|---|---|
| `rg pattern` | 793 | 0.06s |
| `grep -rn pattern .` | 101,181 | 18.5s |
| `rg -uuu pattern` | 101,181 + binaries | 67.8s |

Times are with a warm file cache. The first `grep -rn` of a session ran past
120s and had to be backgrounded, so treat 18.5s as the optimistic number.

`node_modules` alone is 81,617 files, plus `.next`, `public/monaco`, and any
`.claude/worktrees`. All of it is gitignored, so `rg` skips it and `grep -r`
does not. The gap is about *what gets opened*, not matching speed — on an equal
scope `grep` was actually faster than `rg -uuu`.

Two flags worth knowing:

- `-r` is `--replace`, **not** recursive (recursion is already the default), and
  it takes an argument — so `rg -rn pattern` eats the `n` as the replacement,
  succeeds, and prints every match rewritten to `n`. It looks like the file was
  corrupted. Its real job is reshaping matches:
  `rg -o 'session: (\d+)' -r 'session=$1'` → `session=12`.
- To search gitignored files use `-uu`. `-uuu` additionally disables binary
  detection and will crawl through `.next` cache blobs (that is the 67.8s).

`fd` (installed) beats `find` for locating files, but for a different reason —
its traversal is genuinely parallel, so it wins even on an equal scope:

| task | fd | find |
|---|---|---|
| `.mdx` across the whole tree | 0.09s | 0.86s |
| same, traversal only (output discarded) | 0.08s | 0.84s |
| dump all 112k paths | 1.35s | 0.77s |

So prefer `fd` for the normal "where is this file" case. It is not a blanket
rule: once the result set is tens of thousands of lines `find` wins, because
fd's cost there is emitting the paths, not walking the tree. And scope still
beats tool choice — adding `-prune` for `node_modules` takes `find` from 0.86s
to 0.06s on its own.

Two shells are available here and they do not share syntax. A PowerShell
here-string (`@'…'@`) passed to the Bash tool does not error — it silently
becomes part of the string. `git commit -m @'…'@` that way produced a commit
whose subject line was a lone `@`, which then needed an amend and a force push
to undo. In Bash use a heredoc (`git commit -F - <<'MSG'`); keep `@'…'@` for
the PowerShell tool.

## Responsive Checks

Any new page or UI must be checked across screen widths before it is called
done — visitors arrive on whatever device they happen to have.

Check at least 320 / 390 / 768 / 1024 / 1280, and **include the width just past
a breakpoint**. `app/problems/[slug]` shipped with its 실행 and 제출 buttons off
screen not only on phones (320–570px) but also at 1024–1250px, where
`lg:grid-cols-2` halves the column while the toolbar keeps its full width.
Checking only the narrow end misses that class of bug entirely.

Two notes on measuring it:

- If the browser window is maximized, resizing it does nothing. Loading the page
  in a fixed-width `iframe` on the same origin works, since media queries follow
  the iframe's width.
- `documentElement.scrollWidth > innerWidth` on the page itself is a bug. A wide
  table or code block extending past the viewport is not, **provided it scrolls
  inside an `overflow-x: auto` container** — inside `overflow: hidden` the
  content is simply unreachable.

Numbers alone miss overlap and squeezing, so look at it too.

## Lesson Content

Lesson pages (`app/AIDeveloper`, `app/tourOfPython`, `app/Algorithm`,
`app/spaceshipCaptain`, `app/PublicDataViz`, `app/simpleWebDev`) and the
components that render them
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

## Lesson Section Structure

Six sections carry lesson content, and they do **not** all have the same shape.
Check the section's tree module before assuming:

| section | routes per chapter | curriculum type |
|---|---|---|
| `AIDeveloper`, `PublicDataViz`, `tourOfPython`, `spaceshipCaptain` | goal / goal_slide / task / task_slide | flat `Lesson[]` |
| `Algorithm` | `goal/page.mdx` + `task/page.mdx` only — no slides | flat `Lesson[]` |
| `simpleWebDev` | one `page.mdx` per chapter | `Part[]` of `{ name, lessons }` |

`simpleWebDev` (32강, Streamlit) is the odd one out on purpose, and its
curriculum header says why: Piston runs pure Python only, so Streamlit apps are
never judged, which removes the reason to split 개념/실습 into separate routes.
Its chapters are grouped into 부 (parts), so the sidebar has one folder per part
rather than one per chapter.

The four sections that do share the shape use the same **four routes per
chapter**:

```
app/<section>/<slug>/goal/page.mdx        개념 — 학습 목표
app/<section>/<slug>/goal_slide/page.tsx  개념 슬라이드 — 학습 슬라이드
app/<section>/<slug>/task/page.mdx        실습 — 실습 과제
app/<section>/<slug>/task_slide/page.tsx  실습 슬라이드 — 실습 슬라이드
```

The sidebar labels are exactly those four Korean strings — they come from the
tree module, not the page. Two modules per section drive everything:

- `utils/curriculum/<section>.ts` — a flat `Lesson[]` of
  `{ name, slug, description }`, in teaching order. This is the only place a
  chapter is declared.
- `utils/sideBarTree/<section>Tree.ts` — maps that array into one folder per
  chapter with the four files, then exports
  `<section>Pages = buildLessonPages(tree, …)` for `LessonPager`'s prev/next.

So adding a chapter means one entry in the curriculum array plus the four route
files. Anything that isn't a lesson (e.g. spaceshipCaptain's 모든 코드 확인하기
source dumps) is appended to the tree by hand *after* the mapped chapters, and
deliberately kept out of the curriculum array.

`.mdx` pages export `metadata` including a `session` number; the slide pages are
`"use client"` and render `<SlideShell slides={slides} />` from
`components/slide/SlideShell`. Each `Slide` carries a `script` field — that is
the **instructor's spoken narration**, not student-facing text, so it should
read as something a teacher says out loud.

Prop shapes that are easy to get wrong (check the component, don't guess):

- `<CompareBubble left={{ label, color, items: string[] }} right={{…}} />` —
  not `{title, tone, body}`. `emoji` exists but must stay unset per the emoji
  rule above.
- `<Callout type="goal" | "analogy" | "tip" | "important" | "note">` — the
  heading text lives in the MDX body, the component only tints the box.
- `<NyangSpeech mood="WELCOME" | "TEACH" | "ASK" | …>` — the avatar's
  expression. `components/mdx/nyangMood.ts` documents which mood belongs on
  which kind of line and holds the R2 URLs; omitting `mood` falls back to the
  default face.

Every `.mdx` route renders through `mdx-components.tsx`, which maps the base
elements (headings, lists, code, tables) to the hand-drawn doodle style. Style a
lesson by using those elements, not by adding per-page classes.

The `lesson-converter` agent exists for converting a legacy single-page chapter
into this shape.

`spaceshipCaptain` was converted in PR #28, merged 2026-07-27 as `957a2fe`: 17
single long pages, whose sidebar entries were ~90 in-page anchors, became 12
chapters. It was a regrouping rather than a 1:1 split — five of the old pages
were exercise-only and got folded into the `task` of the chapter that teaches
them. The rationale per chapter is in the header comment of
`utils/curriculum/spaceshipCaptain.ts`.

The slide narration and prose in those 12 chapters were newly written and have
**not** been checked against how the class is actually taught. `tsc`, `build`,
and `lint` all pass, but none of them can tell whether an explanation is right,
so treat that content as unreviewed until someone reads it.

## Commands

```bash
npm run dev        # Start dev server (Next.js + Turbopack)
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
```

No test suite is configured.

`dev`, `build`, and `postinstall` all run `scripts/copy-monaco.mjs` first, which
copies the Monaco editor runtime from `node_modules` into `public/monaco/vs` so
the editor is served from our origin instead of a CDN. `public/monaco/` is
gitignored — if the editor 404s, re-run `npm install` or the script directly.

Local code-judge stack (all optional; each feature falls back gracefully when
its service is down — see `docs/CODE_JUDGE.md` for details):

```bash
docker compose -f piston/docker-compose.yml up -d --build  # Piston + formatter + LSP
node piston/install-languages.mjs                          # one-time runtime install
```

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

Optional: `TOKEN_MAX_AGE_HOURS` (default `6`) sets the auth-token lifetime in hours (`app/lib/auth/login.ts`). Shorter bounds how long a leaked or revoked token stays usable; login is low-friction so a short window costs little.

Optional (must be set together to enable): `PHONE_ENC_KEY` + `PHONE_INDEX_KEY` turn on reversible encryption of the student phone number at rest (`app/lib/auth/phoneCrypto.ts`). `PHONE_ENC_KEY` is a 32-byte AES-256 key as base64 or 64 hex chars; `PHONE_INDEX_KEY` is any non-empty HMAC secret used to build the searchable blind index login queries by. **Opt-in and dual-mode**: with the keys unset the number is stored/read as plaintext exactly as before, so deploying changes nothing until you set the keys AND run `scripts/migrate-phone-encryption.mjs` (which encrypts existing rows and adds their blind index). During migration the app reads both legacy-plaintext and encrypted rows, so the safe order is: set keys → deploy → migrate. Losing `PHONE_ENC_KEY` makes stored numbers unrecoverable; losing/rotating `PHONE_INDEX_KEY` breaks login lookups until re-migrated — treat both as durable secrets.

Optional rate-limit overrides, all with working defaults — set them only to tune a limit, never to enable one: `LOGIN_MAX_ATTEMPTS_PER_IP` / `LOGIN_MAX_ATTEMPTS_PER_NAME` (10-minute window), `JUDGE_SUBMIT_LIMIT_PER_MIN` (default 20), `JUDGE_HINT_LIMIT_PER_MIN` (default 10).

`IMAGE_BASE_URL` in `app/lib/r2/utils.ts` switches between the production domain and the R2 dev public URL based on `NODE_ENV`.

## Architecture

**YIP** is a Korean coding education platform built with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4.

### Data Flow

All database writes go through **Server Actions** (`app/actions/`) which validate with Zod, then call the MongoDB layer (`app/lib/mongo/`). Client components use **SWR** (`components/SWR/`) for reads, or consume data passed as props from server components.

**Authentication** uses a JWT stored in an `httpOnly` cookie (`logInToken`). Lifetime defaults to 6 hours (`TOKEN_MAX_AGE_HOURS`). Enforcement has two layers, and both matter — the middleware is a fast redirect, not the boundary:

- `proxy.ts` (Next 16's middleware, Edge runtime) verifies the token **signature** on the gated route matcher using `jose`. It only checks the signature — never merely the cookie's presence — and clears a rejected cookie.
- Server-side, `validateToken()` (`app/lib/auth/login.ts`) is called in API routes, Server Actions, and via `requireAuth()` (`app/lib/auth/requireAuth.ts`) in the gated section layouts. It verifies the signature with `jsonwebtoken` **and** checks the revocation list (`app/lib/mongo/revocation.ts`): a deleted/disabled user's still-valid token is rejected. `deleteStudentAction` calls `revokeUserTokens`.

Gated section layouts (`AIDeveloper`, `tourOfPython`, `spaceshipCaptain`, `PublicDataViz`, `chat`, `editor`, `students`) are `force-dynamic` and call `requireAuth()`, so content cannot render for an unauthenticated or revoked session even if the middleware is bypassed. `/dashBoard` is on the proxy matcher but has no layout of its own.

**`Algorithm` and `simpleWebDev` are deliberately ungated** — absent from the proxy matcher, and `app/simpleWebDev/layout.tsx` has no `requireAuth()` on purpose. Adding one would 307 every search visitor to `/login`, and both are in `sitemap.ts` precisely so their chapters are crawlable. If you add a lesson section, decide gating first: gated sections are excluded from the sitemap and disallowed in `robots.ts`.

Both sitemap entries are **derived from the curriculum array**, not listed by hand, so a new chapter becomes crawlable the moment it is declared. Keep it that way — `/simpleWebDev` spent time crawlable-but-unlisted because a stale "it's still a placeholder" comment held it out of the sitemap long after the 32 chapters landed.

`requireAuth()` proves *who* the user is, never *what they may do*. Admin authorization is a separate, per-page check — `app/dashBoard/page.tsx` loads the student and tests `student.role !== "admin"` in the body. Adding an admin page means writing that check again; there is no layout doing it for you.

Login itself is brute-force limited (`app/lib/mongo/authRateLimit.ts`): credentials are name + phone number with no password, so an unthrottled endpoint would let anyone who knows a student's name walk the phone-number space. Only *failed* attempts count and a success clears the counter. Judge submissions and AI hints have their own per-minute caps (`judgeRateLimit.ts`). All of these live in Mongo rather than process memory because Vercel functions share no state.

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

Two plugins are loaded: `remark-gfm`, and `remark-cjk-friendly` — the latter is not optional here. CommonMark only closes a `**` run when it is right-flanking, and a Korean particle after a closing paren (`**강조(부연)**은`) fails that test, so without the plugin the asterisks render literally. Any bold-next-to-Hangul bug is this.

### Algorithm Course & Problem Seeds

The algorithm course pairs lesson content with judged problems, one chapter per
topic:

- Lessons live at `app/Algorithm/<topic>/goal/page.mdx` (concept) and
  `app/Algorithm/<topic>/task/page.mdx` (exercises); `app/Algorithm/page.mdx`
  is the chapter index.
- Each chapter has a matching seed script `scripts/seed-<topic>-problems.mjs`
  that inserts its problems (typically five) into Mongo. Expected outputs are
  generated by a reference `solve` in the script, so test cases are correct by
  construction. Scripts upsert by slug (safe to re-run) and support `--print`
  (preview, no DB) and `--json` (full cases). Shared env/URI loading is in
  `scripts/lib/mongoUri.mjs`.
- Test-case sizes are bounded by Piston's limits — the seed scripts document
  the measured stdout/stdin caps; keep generated cases under them.
- Convention from git history: each chapter lands as one commit
  ("Add algorithm chapter N: <topic>, and five problems") on a branch, then a
  merge commit.

Problem-solving UI is `/problems` and `/problems/[slug]` (Monaco editor, 실행/
제출, submission history), backed by `app/api/judge/*`.

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
- Godot — `app/games/vamsurlike/` embeds a Godot web export (checked into `public/games/vamsurlike/`) via iframe; the game itself is not built from this repo

### Config Notes

- `reactStrictMode` is **off** — intentional, not a mistake.
- `dns.setDefaultResultOrder('ipv4first')` is set in `next.config.ts` to avoid IPv6 connection issues with MongoDB Atlas. A second DNS workaround sits next to it, for Windows dev only: Node 24's c-ares can fail to enumerate resolvers when two adapters are active and falls back to `127.0.0.1`, where nothing listens — every `mongodb+srv://` SRV lookup then dies with `ECONNREFUSED`. When that dead default is detected, the real resolvers are read from the OS via PowerShell. If Mongo suddenly can't resolve locally, look here.
- `htmlLimitedBots` is extended with `Daumoa|NaverBot|kakaotalk-scrap|Yeti`. When `generateMetadata` awaits (e.g. `/problems/[slug]` hitting Mongo), Next streams the shell first and emits meta tags in the body — fine for JS-running bots, useless for the Korean crawlers that drive KakaoTalk link previews and Naver/Daum indexing. It **replaces** Next's default list, so the default pattern is spliced back in from an internal import guarded by a fallback.
- `optimizePackageImports` rewrites barrel imports (`lucide-react`, Radix, `date-fns`) to per-module ones so a route bundles only the icons it uses.
- MongoDB (`app/lib/mongo/db.ts`) connects to the `yipDB` database with a shared client pool (`attachDatabasePool` from `@vercel/functions`, cached on `global` in dev). Stable API `strict` stays **false** on purpose — Atlas Search/Vector Search commands (`createSearchIndex`, `$vectorSearch`) aren't part of Stable API v1 and the semantic cache depends on them.
