# Judge0 sandbox (code execution engine)

YIP never runs submitted code itself. Untrusted user code executes inside a
self-hosted **Judge0 CE** instance, isolated in its own containers/cgroups. The
Next.js app only orchestrates over REST (`app/lib/judge0/`).

```
browser ──▶ /api/judge/submit ──▶ Judge0 REST ──▶ isolate sandbox
   ▲                                   │
   └── poll /api/judge/submission/[id] ┘  (reads batch results, derives verdict)
```

## 1. Run Judge0

> ⚠️ Judge0 has **host requirements** (Linux, cgroup access, `privileged`
> containers). It cannot run on Vercel/serverless — put it on a VM you control
> (VPS, EC2, a managed container host, etc.). Follow the upstream install notes
> if `up` fails: https://github.com/judge0/judge0

```bash
cp judge0/judge0.conf.example judge0/judge0.conf   # then edit the secrets
docker compose -f judge0/docker-compose.yml up -d

# sanity check — should list languages
curl -H "X-Auth-Token: <AUTHN_TOKEN>" http://localhost:2358/languages
```

## 2. Point the app at it

Set these env vars for the YIP app (they are read lazily — the app still boots
without them, and `/api/judge/*` returns 503 until they are set):

| Variable            | Example                        | Notes                                   |
|---------------------|--------------------------------|-----------------------------------------|
| `JUDGE0_URL`        | `http://judge-host:2358`       | Base URL of the Judge0 server           |
| `JUDGE0_AUTH_TOKEN` | *(same as `AUTHN_TOKEN`)*      | Optional; required if Judge0 auth is on |

In production the Next app (on Vercel) must be able to reach the Judge0 host, so
expose it over HTTPS / a private network and keep `JUDGE0_AUTH_TOKEN` secret.

## 3. Language ids

`app/lib/judge0/languages.ts` maps our language slugs to Judge0 `language_id`s.
They match the default Judge0 CE set; if you run a custom build, verify with
`GET {JUDGE0_URL}/languages` and update the registry.

## 4. Seed a problem

```bash
node scripts/seed-problems.mjs   # inserts a sample "두 수의 합" problem
```
