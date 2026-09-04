"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { Check, Copy } from "lucide-react";
import { doodleBox, ink, sky } from "./doodle";

export interface WorksheetField {
	/** 저장 키. 한 번 정하면 바꾸지 않는다 — 바꾸면 이미 쓴 답이 화면에서 사라진다. */
	id: string;
	label: string;
	/** 라벨 아래 회색 글씨로 붙는 예시/도움말. */
	hint?: string;
	/** 여러 줄 입력. 기본은 한 줄. */
	multiline?: boolean;
	rows?: number;
}

const SAVE_DEBOUNCE_MS = 800;

/**
 * 레슨 안에서 바로 채우는 활동지.
 *
 * 예전에는 이 자리가 `____` 가 들어간 코드블록이었다. 보기에는 활동지인데
 * 정작 칸에 쓸 수가 없어서, "아래에 옮겨 적자냥" 이라는 지시를 따를 방법이
 * 없었다. 그래서 진짜 입력칸으로 바꾸고 계정에 저장한다.
 *
 * 저장은 자동이다. 학생이 저장 버튼을 누르는 걸 잊는 쪽이, 자동 저장이
 * 요청을 조금 더 보내는 쪽보다 훨씬 비싸다. 타이핑이 멈추고 800ms 뒤에
 * 바뀐 칸만 보낸다.
 */
export function Worksheet({
	pageId,
	title,
	fields,
}: {
	/** 이 활동지가 실린 페이지. 같은 페이지의 블록들은 문서 하나를 공유한다. */
	pageId: string;
	title?: string;
	fields: WorksheetField[];
}) {
	const { data, isLoading } = useSWR<{ answers: Record<string, string> }>(
		`/api/worksheet?pageId=${encodeURIComponent(pageId)}`,
		async (url: string) => {
			const res = await fetch(url);
			if (!res.ok) throw new Error(String(res.status));
			return res.json();
		},
		{
			revalidateOnFocus: false,
			// 같은 페이지의 활동지 블록이 모두 같은 키를 쓴다. 한 번만 읽으면 된다.
			dedupingInterval: 60_000,
		}
	);

	const [values, setValues] = useState<Record<string, string>>({});
	const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
	const [savedAt, setSavedAt] = useState<number | null>(null);
	const [copied, setCopied] = useState(false);

	// 서버에서 온 값을 한 번만 채운다. 매번 덮어쓰면 저장이 끝나는 순간
	// 타이핑 중이던 글자가 서버 값으로 되돌아간다.
	//
	// 불러오는 동안에도 입력은 막지 않는다 — 느린 회선에서 칸이 잠겨 있으면
	// 학생 눈에는 그냥 고장난 활동지다. 대신 이미 손댄 칸은 서버 값으로
	// 덮지 않는다.
	const seeded = useRef(false);
	useEffect(() => {
		if (seeded.current || !data) return;
		setValues((current) => {
			const merged = { ...current };
			for (const f of fields) {
				if ((merged[f.id] ?? "") === "") merged[f.id] = data.answers[f.id] ?? "";
			}
			return merged;
		});
		seeded.current = true;
	}, [data, fields]);

	const pending = useRef<Record<string, string>>({});
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

	const flush = useCallback(async () => {
		const patch = pending.current;
		pending.current = {};
		if (Object.keys(patch).length === 0) return;
		setStatus("saving");
		try {
			const res = await fetch("/api/worksheet", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ pageId, answers: patch }),
			});
			if (!res.ok) throw new Error(String(res.status));
			const { savedAt } = (await res.json()) as { savedAt: number };
			setStatus("saved");
			setSavedAt(savedAt);
		} catch {
			// 실패한 칸은 다시 대기열에 넣는다. 다음 타이핑이나 이탈 직전
			// 저장에서 함께 올라간다 — 조용히 잃는 것보다 낫다.
			pending.current = { ...patch, ...pending.current };
			setStatus("error");
		}
	}, [pageId]);

	function onChange(id: string, value: string) {
		setValues((v) => ({ ...v, [id]: value }));
		pending.current[id] = value;
		if (timer.current) clearTimeout(timer.current);
		timer.current = setTimeout(flush, SAVE_DEBOUNCE_MS);
	}

	// 타이핑하다 바로 탭을 닫으면 debounce 가 아직 안 끝났다. 그 마지막
	// 한 번을 흘리지 않도록 화면이 숨겨질 때 밀어 넣는다.
	useEffect(() => {
		function onHide() {
			if (document.visibilityState === "hidden") {
				if (timer.current) clearTimeout(timer.current);
				void flush();
			}
		}
		document.addEventListener("visibilitychange", onHide);
		return () => {
			document.removeEventListener("visibilitychange", onHide);
			if (timer.current) clearTimeout(timer.current);
		};
	}, [flush]);

	async function copyAll() {
		const text = fields
			.map((f) => `${f.label}\n${values[f.id]?.trim() || "(비어 있음)"}`)
			.join("\n\n");
		try {
			await navigator.clipboard.writeText(
				title ? `[${title}]\n\n${text}` : text
			);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {
			/* 클립보드가 막힌 환경 — 무시 */
		}
	}

	return (
		<div className="my-7 px-6 py-5" style={{ ...doodleBox, backgroundColor: "#fff" }}>
			<div className="mb-4 flex flex-wrap items-center gap-2">
				{title && (
					<span className="text-lg font-bold" style={{ color: ink }}>
						{title}
					</span>
				)}
				<button
					type="button"
					onClick={copyAll}
					className="ml-auto flex items-center gap-1 rounded-md border px-2 py-1 text-sm"
					style={{ borderColor: sky, color: sky }}
					aria-label={copied ? "복사됨" : "활동지 전체 복사"}
				>
					{copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
					{copied ? "복사됨" : "전체 복사"}
				</button>
			</div>

			<div className="flex flex-col gap-4">
				{fields.map((f) => (
					<label key={f.id} className="flex flex-col gap-1">
						<span className="font-bold" style={{ color: ink }}>
							{f.label}
						</span>
						{f.hint && (
							<span className="text-sm" style={{ color: "#6B7280" }}>
								{f.hint}
							</span>
						)}
						{f.multiline ? (
							<textarea
								rows={f.rows ?? 3}
								value={values[f.id] ?? ""}
								onChange={(e) => onChange(f.id, e.target.value)}
								className="w-full resize-y rounded-md border-2 px-3 py-2 text-lg outline-none focus:border-[#49B6E5]"
								style={{ borderColor: "#CBD5E1", color: ink }}
							/>
						) : (
							<input
								type="text"
								value={values[f.id] ?? ""}
								onChange={(e) => onChange(f.id, e.target.value)}
								className="w-full rounded-md border-2 px-3 py-2 text-lg outline-none focus:border-[#49B6E5]"
								style={{ borderColor: "#CBD5E1", color: ink }}
							/>
						)}
					</label>
				))}
			</div>

			<div className="mt-3 text-sm" aria-live="polite" style={{ color: "#6B7280" }}>
				{isLoading && "불러오는 중…"}
				{!isLoading && status === "saving" && "저장 중…"}
				{!isLoading && status === "saved" && savedAt && (
					<>
						저장됨 ·{" "}
						{new Date(savedAt).toLocaleTimeString("ko-KR", {
							hour: "numeric",
							minute: "2-digit",
						})}
					</>
				)}
				{!isLoading && status === "error" && (
					<span style={{ color: "#DC2626" }}>
						아직 저장되지 않았습니다. 한 글자 더 쓰면 다시 시도합니다 — 이 글씨가 계속 보이면 새로고침해 주세요.
					</span>
				)}
				{!isLoading && status === "idle" && "쓰는 대로 자동 저장됩니다."}
			</div>
		</div>
	);
}
