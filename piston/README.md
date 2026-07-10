# Piston sandbox (code execution engine)

YIP never runs submitted code itself. Untrusted user code executes inside a
self-hosted **Piston** instance (engineer-man/piston), isolated in its own
sandbox. The Next.js app only orchestrates over REST (`app/lib/judge0/`).

```
browser ─▶ /api/judge/submit ─▶ Piston /api/v2/execute (per test case)
   ▲                                │
   └── poll /api/judge/submission/[id] ┘  (returns the already-judged result)
```

Piston runs on Docker Desktop / WSL2 without the cgroup-v1 host tweaks Judge0
needs, which is why we use it for local self-hosting.

## 1. Run Piston

Requires Docker. On Windows, install Docker Desktop (WSL2 backend) or Docker
inside WSL2, then:

```bash
docker compose -f piston/docker-compose.yml up -d
```

## 2. Install language runtimes

Piston ships with no languages — install the ones the judge uses (persists in
the `piston-packages` volume):

```bash
node piston/install-languages.mjs
# sanity check
curl http://localhost:2000/api/v2/runtimes
```

This installs Python, Node (JavaScript), TypeScript, GCC (C/C++), Java, Go, Rust.
The judge's language ↔ runtime mapping lives in `app/lib/judge0/languages.ts`
(`piston` candidate names); it resolves against `GET /api/v2/runtimes` at submit
time, so exact version pinning isn't needed.

## 3. Point the app at it

Add to `.env.local` (read lazily — the app boots without it and `/api/judge/*`
returns 503 until set):

```
PISTON_URL=http://localhost:2000
```

Then restart `npm run dev`, open a problem, and submit. In production the app
must be able to reach the Piston host over the network.

## 4. Seed a problem (if you haven't)

```bash
node scripts/seed-problems.mjs
```
