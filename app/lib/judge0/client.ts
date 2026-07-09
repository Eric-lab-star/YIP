// Thin REST client for a self-hosted Judge0 instance. Judge0 is where untrusted
// user code actually runs — isolated in its own containers/cgroups — so this app
// never executes submitted code itself; it only orchestrates.
//
// Config is read lazily (NOT at module load) so the rest of the app still boots
// when the judge isn't configured. Required: JUDGE0_URL. Optional: JUDGE0_AUTH_TOKEN
// (sent as X-Auth-Token when the Judge0 instance has authentication enabled).

export interface Judge0Submission {
	source_code: string;
	language_id: number;
	stdin: string;
	expected_output: string;
	/** Per-run CPU time limit in seconds. */
	cpu_time_limit: number;
	/** Per-run memory limit in kilobytes. */
	memory_limit: number;
}

export interface Judge0Result {
	token: string;
	status: { id: number; description: string };
	stdout: string | null;
	stderr: string | null;
	compile_output: string | null;
	message: string | null;
	time: string | null; // seconds, as a string
	memory: number | null; // kilobytes
}

const REQUEST_TIMEOUT_MS = 15_000;

function config(): { url: string; token?: string } {
	const url = process.env.JUDGE0_URL;
	if (!url) {
		throw new Error("JUDGE0_URL is not configured");
	}
	return { url: url.replace(/\/$/, ""), token: process.env.JUDGE0_AUTH_TOKEN };
}

function authHeaders(token?: string): Record<string, string> {
	return token ? { "X-Auth-Token": token } : {};
}

const b64encode = (s: string) => Buffer.from(s, "utf-8").toString("base64");
const b64decode = (s: string | null) =>
	s === null ? null : Buffer.from(s, "base64").toString("utf-8");

/**
 * Submit a batch of runs (one per test case) and return their tokens, aligned
 * to the input order. Everything is base64-encoded so arbitrary bytes/newlines
 * in code, stdin and expected output survive transport intact.
 */
export async function submitBatch(
	submissions: Judge0Submission[]
): Promise<string[]> {
	const { url, token } = config();
	const body = {
		submissions: submissions.map((s) => ({
			...s,
			source_code: b64encode(s.source_code),
			stdin: b64encode(s.stdin),
			expected_output: b64encode(s.expected_output),
		})),
	};

	const res = await fetch(`${url}/submissions/batch?base64_encoded=true`, {
		method: "POST",
		headers: { "Content-Type": "application/json", ...authHeaders(token) },
		body: JSON.stringify(body),
		signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
	});

	if (!res.ok) {
		throw new Error(`Judge0 submit failed: ${res.status} ${await res.text()}`);
	}

	const data = (await res.json()) as ({ token: string } | { error: string })[];
	return data.map((d) => {
		if ("token" in d) return d.token;
		throw new Error(`Judge0 rejected a submission: ${d.error}`);
	});
}

/**
 * Fetch results for a batch of tokens. Decodes the base64 text fields back to
 * UTF-8. Order matches the tokens argument.
 */
export async function getBatch(tokens: string[]): Promise<Judge0Result[]> {
	const { url, token } = config();
	const fields =
		"token,status,stdout,stderr,compile_output,message,time,memory";
	const res = await fetch(
		`${url}/submissions/batch?base64_encoded=true&fields=${fields}&tokens=${tokens.join(",")}`,
		{
			headers: authHeaders(token),
			signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
		}
	);

	if (!res.ok) {
		throw new Error(`Judge0 fetch failed: ${res.status} ${await res.text()}`);
	}

	const data = (await res.json()) as {
		submissions: (Omit<
			Judge0Result,
			"stdout" | "stderr" | "compile_output" | "message"
		> & {
			stdout: string | null;
			stderr: string | null;
			compile_output: string | null;
			message: string | null;
		})[];
	};

	return data.submissions.map((s) => ({
		token: s.token,
		status: s.status,
		time: s.time,
		memory: s.memory,
		stdout: b64decode(s.stdout),
		stderr: b64decode(s.stderr),
		compile_output: b64decode(s.compile_output),
		message: b64decode(s.message),
	}));
}

/** Whether the judge is configured at all (used to fail fast with a clear error). */
export function isJudgeConfigured(): boolean {
	return !!process.env.JUDGE0_URL;
}
