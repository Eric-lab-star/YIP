import { validateToken } from "@/app/lib/auth/login";
import { isSupportedLanguage } from "@/app/lib/judge0/languages";
import { NextRequest, NextResponse } from "next/server";

// Proxies a format request to the self-hosted formatter service (FORMATTER_URL,
// e.g. http://localhost:2100). Read lazily — without it, /api/judge/format
// returns 503 and the client falls back to its built-in formatting.
const MAX_CODE = 64 * 1024;
const TIMEOUT_MS = 20_000;

export async function POST(req: NextRequest) {
	const auth = await validateToken();
	if (!auth.success) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const url = process.env.FORMATTER_URL;
	if (!url) {
		return NextResponse.json({ error: "formatter not configured" }, { status: 503 });
	}

	const body = await req.json().catch(() => null);
	const language = body?.language;
	const code = body?.code;
	if (!isSupportedLanguage(language) || typeof code !== "string") {
		return NextResponse.json({ error: "Invalid input" }, { status: 400 });
	}
	if (code.length > MAX_CODE) {
		return NextResponse.json({ error: "too large" }, { status: 413 });
	}

	// Formatter has no auth of its own; in production it sits behind the same
	// reverse proxy as Piston, which requires the shared secret header. Send it
	// when configured; locally (direct http://localhost:2100) it's unset.
	const headers: Record<string, string> = { "Content-Type": "application/json" };
	if (process.env.JUDGE_SECRET) headers["X-Judge-Secret"] = process.env.JUDGE_SECRET;

	try {
		const res = await fetch(`${url.replace(/\/$/, "")}/format`, {
			method: "POST",
			headers,
			body: JSON.stringify({ language, code }),
			signal: AbortSignal.timeout(TIMEOUT_MS),
		});
		const data = await res.json().catch(() => ({}));
		if (!res.ok) {
			// Formatter couldn't format (e.g. syntax error) — surface as 422.
			return NextResponse.json(
				{ error: data.error ?? "format failed" },
				{ status: res.status === 503 ? 503 : 422 }
			);
		}
		return NextResponse.json({ formatted: data.formatted });
	} catch (e) {
		console.error("format proxy error:", e);
		return NextResponse.json({ error: "formatter unreachable" }, { status: 502 });
	}
}
