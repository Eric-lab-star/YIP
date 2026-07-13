"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Lightbulb, ChevronDown, Stethoscope, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import ChatMarkdown from "@/components/commons/ChatMarkdown";

const MAX_LEVEL = 3;

interface HintPanelProps {
	problemSlug: string;
	language: string;
	/** Current editor contents — sent so hints/diagnosis can reference the code. */
	code: string;
	/**
	 * A short summary of the most recent failing submission, or null when the
	 * last submission passed / none has run. Enables the "오답 진단" action.
	 */
	failureSummary: string | null;
}

// Progressive AI hints for the current problem. Level 1→3 escalates from a
// nudge to step-by-step pseudocode (never a full solution); the diagnose action
// explains why a failed submission is wrong. Streams the reply token-by-token.
export default function HintPanel({
	problemSlug,
	language,
	code,
	failureSummary,
}: HintPanelProps) {
	const [text, setText] = useState("");
	const [level, setLevel] = useState(0); // 0 = nothing requested yet
	const [mode, setMode] = useState<"hint" | "diagnose">("hint");
	const [loading, setLoading] = useState(false);

	const request = useCallback(
		async (reqMode: "hint" | "diagnose", reqLevel: number) => {
			if (loading) return;
			setLoading(true);
			setMode(reqMode);
			setText("");
			try {
				const res = await fetch("/api/judge/hint", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						problemSlug,
						language,
						code,
						mode: reqMode,
						level: reqLevel,
						failure: reqMode === "diagnose" ? failureSummary ?? undefined : undefined,
					}),
				});
				if (res.status === 401) {
					toast.error("로그인이 필요합니다.");
					return;
				}
				if (res.status === 429) {
					toast.error("AI 힌트 요청이 너무 잦습니다. 잠시 후 다시 시도해주세요.");
					return;
				}
				if (!res.ok || !res.body) {
					const err = await res.json().catch(() => ({}));
					toast.error(err.error ?? "AI 힌트를 가져오지 못했습니다.");
					return;
				}
				if (reqMode === "hint") setLevel(reqLevel);
				const reader = res.body.getReader();
				const decoder = new TextDecoder();
				for (;;) {
					const { done, value } = await reader.read();
					if (done) break;
					setText((prev) => prev + decoder.decode(value, { stream: true }));
				}
			} catch {
				toast.error("네트워크 오류가 발생했습니다.");
			} finally {
				setLoading(false);
			}
		},
		[loading, problemSlug, language, code, failureSummary]
	);

	const reset = () => {
		setText("");
		setLevel(0);
		setMode("hint");
	};

	const showPanel = loading || text.length > 0;

	return (
		<div className="rounded-md border p-3">
			<div className="flex flex-wrap items-center gap-2">
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() => request("hint", 1)}
					disabled={loading}
					title="문제를 스스로 풀도록 돕는 단계적 힌트"
				>
					<Lightbulb className="size-4" />
					AI 힌트
				</Button>

				{failureSummary && (
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={() => request("diagnose", 0)}
						disabled={loading}
						title="틀린 제출의 원인을 진단합니다 (정답은 알려주지 않아요)"
					>
						<Stethoscope className="size-4" />
						오답 진단
					</Button>
				)}

				{showPanel && (
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={reset}
						disabled={loading}
						className="ml-auto"
					>
						<X className="size-4" />
						닫기
					</Button>
				)}
			</div>

			{showPanel && (
				<div className="mt-3">
					<div className="mb-1 flex items-center gap-2 text-xs font-medium text-muted-foreground">
						{mode === "diagnose"
							? "오답 진단"
							: `AI 힌트 · ${level}/${MAX_LEVEL}단계`}
						{loading && <Spinner className="size-3" />}
					</div>

					<ChatMarkdown content={text || "…"} className="text-sm" />

					{mode === "hint" && level > 0 && level < MAX_LEVEL && !loading && (
						<Button
							type="button"
							variant="outline"
							size="sm"
							className="mt-2"
							onClick={() => request("hint", level + 1)}
						>
							<ChevronDown className="size-4" />
							더 자세한 힌트 ({level + 1}단계)
						</Button>
					)}
				</div>
			)}
		</div>
	);
}
