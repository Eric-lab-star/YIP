"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Editor, { loader } from "@monaco-editor/react";
import { toast } from "sonner";

// Serve Monaco from our own origin (public/monaco/vs) instead of the default
// jsDelivr CDN, so the editor works offline / behind a strict CSP. The assets
// are copied from the monaco-editor package by scripts/copy-monaco.mjs.
loader.config({ paths: { vs: "/monaco/vs" } });
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { LANGUAGES } from "@/app/lib/judge0/languages";

export interface SolverProblem {
	slug: string;
	languages: string[];
	starterCode: Record<string, string>;
}

interface TestResult {
	index: number;
	statusId: number;
	status: string;
	hidden: boolean;
	timeMs: number | null;
	memoryKb: number | null;
	stdout?: string | null;
	stderr?: string | null;
	compileOutput?: string | null;
	expected?: string | null;
}

interface SubmissionState {
	verdict: string;
	passed: number;
	total: number;
	timeMs: number | null;
	memoryKb: number | null;
	results: TestResult[];
}

const VERDICT_LABEL: Record<string, string> = {
	pending: "채점 중",
	accepted: "정답",
	wrong_answer: "오답",
	compilation_error: "컴파일 에러",
	runtime_error: "런타임 에러",
	time_limit_exceeded: "시간 초과",
	internal_error: "내부 오류",
};

function verdictTone(verdict: string): string {
	if (verdict === "accepted") return "bg-green-600 text-white";
	if (verdict === "pending") return "bg-neutral-500 text-white";
	return "bg-red-600 text-white";
}

const POLL_INTERVAL_MS = 1200;
const MAX_POLLS = 50;

export default function Solver({ problem }: { problem: SolverProblem }) {
	const langOptions = useMemo(
		() =>
			LANGUAGES.filter((l) => problem.languages.includes(l.slug)),
		[problem.languages]
	);

	const [language, setLanguage] = useState(langOptions[0]?.slug ?? "python");
	const [code, setCode] = useState(problem.starterCode[language] ?? "");
	const [running, setRunning] = useState(false);
	const [result, setResult] = useState<SubmissionState | null>(null);
	// Track code edited per language so switching languages doesn't lose work.
	const perLangCode = useRef<Record<string, string>>({ ...problem.starterCode });

	const monacoLang =
		LANGUAGES.find((l) => l.slug === language)?.monaco ?? "plaintext";

	const onLanguageChange = useCallback(
		(next: string) => {
			perLangCode.current[language] = code;
			setLanguage(next);
			setCode(perLangCode.current[next] ?? problem.starterCode[next] ?? "");
		},
		[language, code, problem.starterCode]
	);

	const poll = useCallback(async (submissionId: string) => {
		for (let i = 0; i < MAX_POLLS; i++) {
			await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
			const res = await fetch(`/api/judge/submission/${submissionId}`);
			if (!res.ok) continue;
			const data = (await res.json()) as SubmissionState;
			setResult(data);
			if (data.verdict !== "pending") return;
		}
		toast.error("채점 시간이 초과되었습니다. 잠시 후 다시 확인해주세요.");
	}, []);

	const onSubmit = useCallback(async () => {
		if (running) return;
		if (!code.trim()) {
			toast.error("코드를 입력하세요.");
			return;
		}
		setRunning(true);
		setResult(null);
		try {
			const res = await fetch("/api/judge/submit", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					problemSlug: problem.slug,
					language,
					code,
				}),
			});
			if (res.status === 401) {
				toast.error("로그인이 필요합니다.");
				return;
			}
			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				toast.error(err.error ?? "제출에 실패했습니다.");
				return;
			}
			const { submissionId } = (await res.json()) as { submissionId: string };
			setResult({
				verdict: "pending",
				passed: 0,
				total: 0,
				timeMs: null,
				memoryKb: null,
				results: [],
			});
			await poll(submissionId);
		} catch {
			toast.error("네트워크 오류가 발생했습니다.");
		} finally {
			setRunning(false);
		}
	}, [running, code, language, problem.slug, poll]);

	return (
		<div className="flex flex-col gap-3">
			<div className="flex items-center justify-between gap-2">
				<Select value={language} onValueChange={onLanguageChange}>
					<SelectTrigger className="w-48">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{langOptions.map((l) => (
							<SelectItem key={l.slug} value={l.slug}>
								{l.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Button onClick={onSubmit} disabled={running}>
					{running && <Spinner />}
					제출
				</Button>
			</div>

			<div className="overflow-hidden rounded-md border">
				<Editor
					height="52vh"
					language={monacoLang}
					theme="vs-dark"
					value={code}
					onChange={(v) => setCode(v ?? "")}
					options={{
						minimap: { enabled: false },
						fontSize: 14,
						scrollBeyondLastLine: false,
						tabSize: 4,
					}}
				/>
			</div>

			{result && <ResultPanel result={result} />}
		</div>
	);
}

function ResultPanel({ result }: { result: SubmissionState }) {
	return (
		<div className="rounded-md border p-3">
			<div className="mb-2 flex items-center gap-3">
				<Badge className={verdictTone(result.verdict)}>
					{VERDICT_LABEL[result.verdict] ?? result.verdict}
				</Badge>
				{result.verdict === "pending" ? (
					<span className="text-sm text-muted-foreground">
						채점 중입니다…
					</span>
				) : (
					<span className="text-sm text-muted-foreground">
						{result.passed}/{result.total} 통과
						{result.timeMs !== null && ` · ${result.timeMs}ms`}
						{result.memoryKb !== null &&
							` · ${Math.round(result.memoryKb / 1024)}MB`}
					</span>
				)}
			</div>

			{result.results.length > 0 && (
				<ul className="flex flex-col gap-2">
					{result.results.map((r) => (
						<li
							key={r.index}
							className="rounded border px-3 py-2 text-sm"
						>
							<div className="flex items-center justify-between">
								<span className="font-medium">
									테스트 {r.index + 1}
									{r.hidden && (
										<span className="ml-1 text-xs text-muted-foreground">
											(숨김)
										</span>
									)}
								</span>
								<span
									className={
										r.statusId === 3
											? "text-green-600"
											: "text-red-600"
									}
								>
									{r.status}
								</span>
							</div>
							{!r.hidden && r.statusId !== 3 && (
								<div className="mt-1 space-y-1 text-xs text-muted-foreground">
									{r.compileOutput && (
										<pre className="overflow-x-auto whitespace-pre-wrap">
											{r.compileOutput}
										</pre>
									)}
									{r.expected !== undefined &&
										r.expected !== null && (
											<div>
												<span className="font-medium">기대: </span>
												<code>{r.expected}</code>
											</div>
										)}
									{r.stdout !== undefined && r.stdout !== null && (
										<div>
											<span className="font-medium">출력: </span>
											<code>{r.stdout}</code>
										</div>
									)}
									{r.stderr && (
										<pre className="overflow-x-auto whitespace-pre-wrap">
											{r.stderr}
										</pre>
									)}
								</div>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
