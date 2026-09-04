"use client";

import { useState } from "react";
import useSWR from "swr";
import { Check, Copy, Sparkles } from "lucide-react";
import { doodleBox, ink, sky } from "./doodle";
import {
	FINAL_PROJECT_PAGE_ID,
	GENERATED_PROMPT_FIELD_ID,
} from "@/utils/worksheets/finalProject";

/**
 * 1-A(재료)와 1-B(네 요소)를 읽어 프롬프트 하나로 합쳐 주는 버튼.
 *
 * 학생이 두 곳에 나눠 쓴 것을 손으로 다시 조립하게 하면, 그게 곧 "같은 걸 또
 * 쓰는" 일이 된다. 조립은 기계가 하고 학생은 재료와 네 요소를 쓰는 데만
 * 집중한다.
 *
 * 값을 클라이언트에서 모아 보내지 않고 **서버가 저장된 답안을 직접 읽는다.**
 * 화면에 마운트되지 않은 블록(스크롤로 아직 안 지나온 곳)의 값도 함께 써야
 * 하기 때문이고, 보낼 내용을 브라우저가 고르지 않으니 남의 답안을 끼워 넣을
 * 방법도 없다.
 */
export function PromptComposer() {
	const [prompt, setPrompt] = useState<string | null>(null);
	const [note, setNote] = useState<string | null>(null);
	const [source, setSource] = useState<"ai" | "fallback" | null>(null);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);

	// 지난번에 만들어 둔 프롬프트가 있으면 그대로 보여준다.
	//
	// `onSuccess` 로 state 에 넣지 않는다 — 같은 페이지의 활동지 블록들이 이미
	// 같은 키를 채워둔 뒤라면 이 훅에서는 콜백이 불리지 않아 저장된 프롬프트가
	// 영영 안 뜬다. 렌더에서 직접 읽으면 캐시가 어디서 왔든 상관없다.
	const { data } = useSWR(
		`/api/worksheet?pageId=${encodeURIComponent(FINAL_PROJECT_PAGE_ID)}`,
		async (url: string) => {
			const res = await fetch(url);
			if (!res.ok) throw new Error(String(res.status));
			return res.json() as Promise<{ answers: Record<string, string> }>;
		},
		{ revalidateOnFocus: false, dedupingInterval: 60_000 }
	);

	// 이번에 만든 것이 있으면 그것을, 없으면 저장돼 있던 것을 보여준다.
	const shown = prompt ?? data?.answers?.[GENERATED_PROMPT_FIELD_ID] ?? null;

	async function generate() {
		setBusy(true);
		setError(null);
		setNote(null);
		try {
			const res = await fetch("/api/worksheet/prompt", { method: "POST" });
			const data = await res.json();
			if (!res.ok) {
				setError(data.error ?? "프롬프트를 만들지 못했습니다.");
				return;
			}
			setPrompt(data.prompt);
			setSource(data.source);
			setNote(data.note ?? null);
		} catch {
			setError("프롬프트를 만들지 못했습니다. 잠시 후 다시 눌러 주세요.");
		} finally {
			setBusy(false);
		}
	}

	async function copy() {
		if (!shown) return;
		try {
			await navigator.clipboard.writeText(shown);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {
			/* 클립보드가 막힌 환경 — 무시 */
		}
	}

	return (
		<div className="my-7 px-6 py-5" style={{ ...doodleBox, backgroundColor: "#fff" }}>
			<div className="mb-2 text-lg font-bold" style={{ color: ink }}>
				1-A와 1-B를 합쳐 프롬프트 만들기
			</div>
			<p className="mb-4 text-base" style={{ color: "#6B7280" }}>
				위에 쓴 재료(1-A)와 네 요소(1-B)를 읽어서, 제미나이가 알아듣기 좋은 프롬프트
				하나로 만들어 준다냥. 마음에 안 들면 위를 고치고 다시 누르면 된다냥!
			</p>

			<button
				type="button"
				onClick={generate}
				disabled={busy}
				className="flex items-center gap-2 rounded-md px-4 py-2 font-bold text-white disabled:opacity-60"
				style={{ backgroundColor: sky }}
			>
				<Sparkles className="size-4" />
				{busy ? "만드는 중…" : shown ? "다시 만들기" : "프롬프트 생성하기"}
			</button>

			{error && (
				<p className="mt-3 text-sm" style={{ color: "#DC2626" }}>
					{error}
				</p>
			)}

			{shown && (
				<div className="mt-5">
					<div className="mb-2 flex flex-wrap items-center gap-2">
						<span className="text-sm font-bold" style={{ color: ink }}>
							완성된 프롬프트
						</span>
						{source === "ai" && (
							<span className="text-xs" style={{ color: "#6B7280" }}>
								AI가 다듬음
							</span>
						)}
						<button
							type="button"
							onClick={copy}
							className="ml-auto flex items-center gap-1 rounded-md border px-2 py-1 text-sm"
							style={{ borderColor: sky, color: sky }}
							aria-label={copied ? "복사됨" : "완성된 프롬프트 복사"}
						>
							{copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
							{copied ? "복사됨" : "복사"}
						</button>
					</div>

					{note && (
						<p className="mb-2 text-sm" style={{ color: "#B45309" }}>
							{note}
						</p>
					)}

					<pre
						className="overflow-x-auto rounded-xl px-5 py-4 text-[0.95rem] leading-[1.9] text-white"
						style={{
							backgroundColor: "#282c34",
							fontFamily: '"JetBrains Mono", ui-monospace, monospace',
							whiteSpace: "pre-wrap",
							wordBreak: "break-word",
						}}
					>
						{shown}
					</pre>

					<p className="mt-2 text-sm" style={{ color: "#6B7280" }}>
						AI가 다듬은 문장이라도 <strong>보내기 전에 한 번 읽자냥.</strong> 내가 쓰지
						않은 조건이 끼어 있으면 지우면 된다냥.
					</p>
				</div>
			)}
		</div>
	);
}
