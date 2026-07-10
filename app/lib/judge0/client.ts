// REST client for a self-hosted Piston instance (engineer-man/piston). Piston is
// where untrusted user code actually runs — isolated in its own sandbox — so
// this app never executes submitted code itself; it only orchestrates.
//
// Config is read lazily (NOT at module load) so the rest of the app still boots
// when the judge isn't configured. Required: PISTON_URL (e.g. http://localhost:2000).

const REQUEST_TIMEOUT_MS = 30_000;

function baseUrl(): string {
	const url = process.env.PISTON_URL;
	if (!url) throw new Error("PISTON_URL is not configured");
	return url.replace(/\/$/, "");
}

/** Whether the judge is configured at all (used to fail fast with a clear error). */
export function isJudgeConfigured(): boolean {
	return !!process.env.PISTON_URL;
}

interface Runtime {
	language: string;
	version: string;
	aliases?: string[];
}

// Installed runtimes rarely change; cache them per server process.
let runtimesCache: Runtime[] | null = null;

async function getRuntimes(): Promise<Runtime[]> {
	if (runtimesCache) return runtimesCache;
	const res = await fetch(`${baseUrl()}/api/v2/runtimes`, {
		signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
	});
	if (!res.ok) {
		throw new Error(`Piston runtimes failed: ${res.status}`);
	}
	runtimesCache = (await res.json()) as Runtime[];
	return runtimesCache;
}

/**
 * Resolve one of our candidate runtime names to an installed Piston runtime.
 * Matches on the runtime `language` or any of its `aliases` (case-insensitive),
 * so we tolerate Piston's naming (e.g. "c++" vs "cpp", "javascript" vs "node").
 */
export async function resolveRuntime(
	candidates: string[]
): Promise<{ language: string; version: string } | null> {
	const want = new Set(candidates.map((c) => c.toLowerCase()));
	const runtimes = await getRuntimes();
	const rt = runtimes.find(
		(r) =>
			want.has(r.language.toLowerCase()) ||
			(r.aliases ?? []).some((a) => want.has(a.toLowerCase()))
	);
	return rt ? { language: rt.language, version: rt.version } : null;
}

export interface PistonRunResult {
	stdout: string;
	stderr: string;
	code: number | null;
	signal: string | null;
	compileCode: number | null;
	compileStderr: string | null;
	wallTimeMs: number | null;
	memoryKb: number | null;
}

/**
 * Execute one run (one test case) on Piston and return the normalized result.
 * Piston is synchronous: the response already contains stdout/stderr/exit info,
 * so there's no token/polling dance.
 */
export async function execute(params: {
	language: string;
	version: string;
	filename: string;
	source: string;
	stdin: string;
	runTimeoutMs: number;
	memoryLimitBytes: number;
}): Promise<PistonRunResult> {
	const res = await fetch(`${baseUrl()}/api/v2/execute`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			language: params.language,
			version: params.version,
			files: [{ name: params.filename, content: params.source }],
			stdin: params.stdin,
			run_timeout: params.runTimeoutMs,
			compile_timeout: 10_000,
			run_memory_limit: params.memoryLimitBytes,
		}),
		signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
	});
	if (!res.ok) {
		throw new Error(`Piston execute failed: ${res.status} ${await res.text()}`);
	}

	const data = (await res.json()) as {
		run?: {
			stdout?: string;
			stderr?: string;
			code?: number | null;
			signal?: string | null;
			wall_time?: number;
			memory?: number;
		};
		compile?: { code?: number | null; stderr?: string | null } | null;
	};

	const run = data.run ?? {};
	const compile = data.compile ?? null;
	return {
		stdout: run.stdout ?? "",
		stderr: run.stderr ?? "",
		code: run.code ?? null,
		signal: run.signal ?? null,
		compileCode: compile ? compile.code ?? null : null,
		compileStderr: compile ? compile.stderr ?? null : null,
		wallTimeMs: typeof run.wall_time === "number" ? run.wall_time : null,
		memoryKb:
			typeof run.memory === "number" ? Math.round(run.memory / 1024) : null,
	};
}
