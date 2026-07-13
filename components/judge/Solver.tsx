"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Editor, { loader, type OnMount } from "@monaco-editor/react";
import { toast } from "sonner";
import { Play, Wand2 } from "lucide-react";
import type { editor as MonacoEditorNS } from "monaco-editor";

// Serve Monaco from our own origin (public/monaco/vs) instead of the default
// jsDelivr CDN, so the editor works offline / behind a strict CSP. The assets
// are copied from the monaco-editor package by scripts/copy-monaco.mjs.
loader.config({ paths: { vs: "/monaco/vs" } });
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { LANGUAGES } from "@/app/lib/judge0/languages";
import ResultPanel, {
	type SubmissionResult,
	VERDICT_LABEL,
} from "@/components/judge/ResultPanel";
import HintPanel from "@/components/judge/HintPanel";
import { registerCompletions } from "@/components/judge/editorCompletions";
import {
	LspSession,
	registerLspCompletions,
	setActiveSession,
} from "@/components/judge/lspClient";

// Languages with a type-aware LSP backend (via the lsp/ bridge). Currently
// Python (pyright); extend as more language servers are added.
const LSP_URL = process.env.NEXT_PUBLIC_LSP_URL;
const LSP_LANGS = new Set(["python"]);

export interface SolverProblem {
	slug: string;
	languages: string[];
	starterCode: Record<string, string>;
	/** Sample stdin used to prefill the run input box. */
	sampleStdin?: string;
}

interface RunOutput {
	stdout: string;
	stderr: string;
	compileOutput: string | null;
	exitCode: number | null;
	signal: string | null;
	timeMs: number | null;
}

const POLL_INTERVAL_MS = 1200;
const MAX_POLLS = 50;

type CodeEditor = Parameters<OnMount>[0];
type MonacoNamespace = Parameters<OnMount>[1];

// Safe, language-agnostic cleanup: strip trailing whitespace, collapse runs of
// blank lines, trim leading/trailing blank lines, and end with one newline. It
// never touches indentation/structure, so it can't break whitespace-sensitive
// languages like Python.
function normalizeWhitespace(src: string): string {
	const lines = src
		.replace(/\r\n/g, "\n")
		.split("\n")
		.map((l) => l.replace(/[ \t]+$/, ""));
	const out: string[] = [];
	let blanks = 0;
	for (const line of lines) {
		if (line.trim() === "") {
			blanks++;
			if (blanks > 1) continue;
		} else {
			blanks = 0;
		}
		out.push(line);
	}
	while (out.length && out[0].trim() === "") out.shift();
	while (out.length && out[out.length - 1].trim() === "") out.pop();
	return out.join("\n") + "\n";
}

// Monaco ships real formatters only for JS/TS (and JSON/CSS/HTML). For the other
// judge languages we register a fallback provider so the "포맷" button still
// does useful whitespace cleanup everywhere.
const FALLBACK_FORMAT_LANGS = ["python", "cpp", "c", "java", "go", "rust"];
let formattersRegistered = false;
function registerFallbackFormatters(monaco: MonacoNamespace) {
	if (formattersRegistered) return;
	formattersRegistered = true;
	for (const lang of FALLBACK_FORMAT_LANGS) {
		monaco.languages.registerDocumentFormattingEditProvider(lang, {
			provideDocumentFormattingEdits(model: MonacoEditorNS.ITextModel) {
				return [
					{
						range: model.getFullModelRange(),
						text: normalizeWhitespace(model.getValue()),
					},
				];
			},
		});
	}
}

export default function Solver({ problem }: { problem: SolverProblem }) {
	const langOptions = useMemo(
		() =>
			LANGUAGES.filter((l) => problem.languages.includes(l.slug)),
		[problem.languages]
	);

	const [language, setLanguage] = useState(langOptions[0]?.slug ?? "python");
	const [code, setCode] = useState(problem.starterCode[language] ?? "");
	const [running, setRunning] = useState(false);
	const [result, setResult] = useState<SubmissionResult | null>(null);
	const [stdin, setStdin] = useState(problem.sampleStdin ?? "");
	const [runningRun, setRunningRun] = useState(false);
	const [runOutput, setRunOutput] = useState<RunOutput | null>(null);
	// Track code edited per language so switching languages doesn't lose work.
	const perLangCode = useRef<Record<string, string>>({ ...problem.starterCode });
	const editorRef = useRef<CodeEditor | null>(null);
	const [editorReady, setEditorReady] = useState(false);

	const handleMount: OnMount = (editor, monaco) => {
		editorRef.current = editor;
		registerFallbackFormatters(monaco);
		registerCompletions(monaco);
		if (LSP_URL) registerLspCompletions(monaco, "python");

		// Ctrl+C hides the suggestion popup while it's open. The `precondition`
		// keeps the binding active only when the widget is visible, so Ctrl+C
		// still copies normally when there are no suggestions showing.
		editor.addAction({
			id: "hide-suggest-on-ctrl-c",
			label: "자동완성 팝업 숨기기",
			keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyC],
			precondition: "suggestWidgetVisible",
			run: (ed) => ed.trigger("keyboard", "hideSuggestWidget", {}),
		});

		setEditorReady(true);
	};

	// Manage a type-aware LSP session for the active language (if supported).
	useEffect(() => {
		const ed = editorRef.current;
		if (!LSP_URL || !editorReady || !ed || !LSP_LANGS.has(language)) {
			setActiveSession(null);
			return;
		}
		const session = new LspSession(LSP_URL, language);
		let disposed = false;
		session
			.start(ed.getValue())
			.then(() => {
				if (disposed) session.dispose();
				else setActiveSession(session);
			})
			.catch(() => {
				// LSP unavailable — static keyword/snippet completions still work.
			});
		return () => {
			disposed = true;
			setActiveSession(null);
			session.dispose();
		};
	}, [language, editorReady]);

	const onFormat = useCallback(async () => {
		const ed = editorRef.current;
		if (!ed) return;

		// Prefer the server-side formatter service (real formatters per language).
		try {
			const res = await fetch("/api/judge/format", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ language, code: ed.getValue() }),
			});
			if (res.ok) {
				const { formatted } = (await res.json()) as { formatted?: string };
				const model = ed.getModel();
				if (typeof formatted === "string" && formatted.length > 0 && model) {
					// Replace via edit (not setValue) so undo history is preserved.
					ed.executeEdits("format", [
						{ range: model.getFullModelRange(), text: formatted },
					]);
					setCode(formatted);
					return;
				}
			}
			// Non-OK (503 not configured / 422 couldn't format) → fall through.
		} catch {
			// network error → fall through to the built-in formatter
		}

		// Fallback: Monaco's built-in formatter (JS/TS) or the whitespace provider.
		await ed.getAction("editor.action.formatDocument")?.run();
	}, [language]);

	// Run the code once against the custom stdin (no judging) and show output.
	const onRun = useCallback(async () => {
		if (runningRun) return;
		if (!code.trim()) {
			toast.error("코드를 입력하세요.");
			return;
		}
		setRunningRun(true);
		setRunOutput(null);
		try {
			const res = await fetch("/api/judge/run", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ language, code, stdin }),
			});
			if (res.status === 401) {
				toast.error("로그인이 필요합니다.");
				return;
			}
			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				toast.error(err.error ?? "실행에 실패했습니다.");
				return;
			}
			setRunOutput((await res.json()) as RunOutput);
		} catch {
			toast.error("네트워크 오류가 발생했습니다.");
		} finally {
			setRunningRun(false);
		}
	}, [runningRun, code, language, stdin]);

	// Summarize the last failing submission for the AI "오답 진단" action. Null
	// while pending, accepted, or before any submission. Only non-hidden case
	// details are included — hidden judging data must never reach the model.
	const failureSummary = useMemo(() => {
		if (!result || result.verdict === "pending" || result.verdict === "accepted") {
			return null;
		}
		const label = VERDICT_LABEL[result.verdict] ?? result.verdict;
		const lines = [`판정: ${label} (${result.passed}/${result.total} 통과)`];
		const firstFail = result.results.find((r) => r.statusId !== 3 && !r.hidden);
		if (firstFail) {
			lines.push(`실패한 예시 테스트 ${firstFail.index + 1}`);
			if (firstFail.compileOutput) lines.push(`컴파일 출력: ${firstFail.compileOutput}`);
			if (firstFail.expected != null) lines.push(`기대 출력: ${firstFail.expected}`);
			if (firstFail.stdout != null) lines.push(`실제 출력: ${firstFail.stdout}`);
			if (firstFail.stderr) lines.push(`에러: ${firstFail.stderr}`);
		} else {
			lines.push("숨김 테스트에서 실패했습니다 (구체적 입출력은 공개되지 않음).");
		}
		return lines.join("\n");
	}, [result]);

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
			const data = (await res.json()) as SubmissionResult;
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
				<div className="flex items-center gap-2">
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

					<Button
						type="button"
						variant="outline"
						onClick={onFormat}
						title="코드 정렬"
					>
						<Wand2 className="size-4" />
						포맷
					</Button>
				</div>

				<div className="flex items-center gap-2">
					<Button asChild variant="ghost">
						<Link href={`/problems/${problem.slug}/submissions`}>제출 기록</Link>
					</Button>
					<Button
						type="button"
						variant="outline"
						onClick={onRun}
						disabled={runningRun}
					>
						{runningRun && <Spinner />}
						<Play className="size-4" />
						실행
					</Button>
					<Button onClick={onSubmit} disabled={running}>
						{running && <Spinner />}
						제출
					</Button>
				</div>
			</div>

			<div className="overflow-hidden rounded-md border">
				<Editor
					height="52vh"
					language={monacoLang}
					theme="vs-dark"
					value={code}
					onChange={(v) => setCode(v ?? "")}
					onMount={handleMount}
					options={{
						minimap: { enabled: false },
						fontSize: 14,
						scrollBeyondLastLine: false,
						tabSize: 4,
						padding: { top: 20, bottom: 20 },
						// Coding assistance: autocomplete, snippets, smart editing.
						quickSuggestions: true,
						suggestOnTriggerCharacters: true,
						// Enter never accepts a suggestion (inserts a newline); use Tab.
						acceptSuggestionOnEnter: "off",
						tabCompletion: "on",
						parameterHints: { enabled: true },
						wordBasedSuggestions: "currentDocument",
						suggestSelection: "first",
						autoClosingBrackets: "languageDefined",
						autoClosingQuotes: "languageDefined",
						autoIndent: "full",
						formatOnPaste: true,
						bracketPairColorization: { enabled: true },
					}}
				/>
			</div>

			<div>
				<label className="mb-1 block text-sm font-medium text-muted-foreground">
					입력 (stdin)
				</label>
				<Textarea
					value={stdin}
					onChange={(e) => setStdin(e.target.value)}
					rows={3}
					placeholder="실행 시 프로그램에 전달할 입력을 여기에 넣으세요."
					className="font-mono text-sm"
				/>
			</div>

			<HintPanel
				problemSlug={problem.slug}
				language={language}
				code={code}
				failureSummary={failureSummary}
			/>

			{runOutput && <RunResultPanel output={runOutput} />}

			{result && <ResultPanel result={result} />}
		</div>
	);
}

function RunResultPanel({ output }: { output: RunOutput }) {
	const failed =
		(output.compileOutput && output.compileOutput.trim().length > 0) ||
		(output.exitCode !== null && output.exitCode !== 0) ||
		!!output.signal;

	return (
		<div className="rounded-md border p-3">
			<div className="mb-2 flex items-center gap-2 text-sm">
				<span className="font-medium">실행 결과</span>
				<span className={failed ? "text-red-600" : "text-green-600"}>
					{output.signal
						? `종료 신호 ${output.signal}`
						: `종료 코드 ${output.exitCode ?? 0}`}
				</span>
				{output.timeMs !== null && (
					<span className="text-muted-foreground">· {output.timeMs}ms</span>
				)}
			</div>

			{output.compileOutput && output.compileOutput.trim() && (
				<div className="mb-2">
					<div className="text-xs font-medium text-red-600">컴파일 오류</div>
					<pre className="mt-1 overflow-x-auto whitespace-pre-wrap rounded bg-muted p-2 text-xs">
						{output.compileOutput}
					</pre>
				</div>
			)}

			<div>
				<div className="text-xs font-medium text-muted-foreground">출력 (stdout)</div>
				<pre className="mt-1 max-h-60 overflow-auto whitespace-pre-wrap rounded bg-muted p-2 text-xs">
					{output.stdout || "(출력 없음)"}
				</pre>
			</div>

			{output.stderr && output.stderr.trim() && (
				<div className="mt-2">
					<div className="text-xs font-medium text-red-600">오류 (stderr)</div>
					<pre className="mt-1 max-h-60 overflow-auto whitespace-pre-wrap rounded bg-muted p-2 text-xs">
						{output.stderr}
					</pre>
				</div>
			)}
		</div>
	);
}
