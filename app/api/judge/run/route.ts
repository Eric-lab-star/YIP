import { validateToken } from "@/app/lib/auth/login";
import { getLanguage } from "@/app/lib/judge0/languages";
import { execute, isJudgeConfigured, resolveRuntime } from "@/app/lib/judge0/client";
import { runSchema } from "@/app/lib/zod/judgeSchema";
import { NextRequest, NextResponse } from "next/server";

// Fixed limits for an ad-hoc run (no per-problem context here).
const RUN_TIME_LIMIT_MS = 5000;
const RUN_MEMORY_BYTES = 256 * 1024 * 1024;

export async function POST(req: NextRequest) {
	const auth = await validateToken();
	if (!auth.success) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	if (!isJudgeConfigured()) {
		return NextResponse.json(
			{ error: "채점 서버가 설정되지 않았습니다." },
			{ status: 503 }
		);
	}

	const parsed = runSchema.safeParse(await req.json().catch(() => null));
	if (!parsed.success) {
		return NextResponse.json({ error: "Invalid input" }, { status: 400 });
	}
	const { language, code, stdin } = parsed.data;

	const lang = getLanguage(language);
	if (!lang) {
		return NextResponse.json({ error: "지원하지 않는 언어입니다." }, { status: 400 });
	}

	let runtime: { language: string; version: string } | null;
	try {
		runtime = await resolveRuntime(lang.piston);
	} catch (e) {
		console.error("run runtime lookup error:", e);
		return NextResponse.json({ error: "채점 서버에 연결하지 못했습니다." }, { status: 502 });
	}
	if (!runtime) {
		return NextResponse.json(
			{ error: "채점 서버에 해당 언어 런타임이 설치되지 않았습니다." },
			{ status: 503 }
		);
	}

	try {
		const run = await execute({
			language: runtime.language,
			version: runtime.version,
			filename: lang.filename,
			source: code,
			stdin,
			runTimeoutMs: RUN_TIME_LIMIT_MS,
			memoryLimitBytes: RUN_MEMORY_BYTES,
		});
		return NextResponse.json({
			stdout: run.stdout,
			stderr: run.stderr,
			compileOutput: run.compileStderr,
			exitCode: run.code,
			signal: run.signal,
			timeMs: run.wallTimeMs,
			memoryKb: run.memoryKb,
		});
	} catch (e) {
		console.error("run execute error:", e);
		return NextResponse.json({ error: "실행에 실패했습니다." }, { status: 502 });
	}
}
