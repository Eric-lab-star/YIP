"use client";

import { useMemo, useState } from "react";
import { Check, Copy, RotateCcw } from "lucide-react";
import { SaveStatusLine, useWorksheetStore } from "./useWorksheetStore";
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

/**
 * 레슨 안에서 바로 채우는 활동지.
 *
 * 예전에는 이 자리가 `____` 가 들어간 코드블록이었다. 보기에는 활동지인데
 * 정작 칸에 쓸 수가 없어서, "아래에 옮겨 적자냥" 이라는 지시를 따를 방법이
 * 없었다. 그래서 진짜 입력칸으로 바꾸고 계정에 저장한다.
 *
 * 저장은 자동이다 — 학생이 저장 버튼을 잊는 쪽이, 요청을 조금 더 보내는
 * 쪽보다 훨씬 비싸다. 읽기·쓰기·디바운스는 `useWorksheetStore` 가 맡는다.
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
	const fieldIds = useMemo(() => fields.map((f) => f.id), [fields]);
	const { values, setField, clearAll, status, savedAt, isLoading } =
		useWorksheetStore(pageId, fieldIds);
	const [copied, setCopied] = useState(false);

	// 초기화는 되돌릴 수 없으니 한 번 더 묻는다. `confirm()` 대신 인라인으로
	// 묻는 이유는, 브라우저 기본 대화상자가 페이지를 멈춰 세우는 데다 학생이
	// 습관적으로 확인을 눌러버리기 쉬워서다.
	const [confirming, setConfirming] = useState(false);

	async function copyAll() {
		const text = fields
			.map((f) => `${f.label}\n${values[f.id]?.trim() || "(비어 있음)"}`)
			.join("\n\n");
		try {
			await navigator.clipboard.writeText(title ? `[${title}]\n\n${text}` : text);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {
			/* 클립보드가 막힌 환경 — 무시 */
		}
	}

	return (
		<div className="my-7 px-3 py-5 sm:px-6" style={{ ...doodleBox, backgroundColor: "#fff" }}>
			<div className="mb-4 flex flex-wrap items-center gap-2">
				{title && (
					<span className="text-lg font-bold" style={{ color: ink }}>
						{title}
					</span>
				)}
				<div className="ml-auto flex flex-wrap items-center gap-2">
					<button
						type="button"
						onClick={copyAll}
						className="flex items-center gap-1 rounded-md border px-2 py-1 text-sm"
						style={{ borderColor: sky, color: sky }}
						aria-label={copied ? "복사됨" : "활동지 전체 복사"}
					>
						{copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
						{copied ? "복사됨" : "전체 복사"}
					</button>

					{confirming ? (
						<>
							<span className="text-sm" style={{ color: "#DC2626" }}>
								이 활동지의 내용을 모두 지울까냥?
							</span>
							<button
								type="button"
								onClick={async () => {
									await clearAll();
									setConfirming(false);
								}}
								className="rounded-md px-2 py-1 text-sm font-bold text-white"
								style={{ backgroundColor: "#DC2626" }}
							>
								지우기
							</button>
							<button
								type="button"
								onClick={() => setConfirming(false)}
								className="rounded-md border px-2 py-1 text-sm"
								style={{ borderColor: "#CBD5E1", color: ink }}
							>
								취소
							</button>
						</>
					) : (
						<button
							type="button"
							onClick={() => setConfirming(true)}
							className="flex items-center gap-1 rounded-md border px-2 py-1 text-sm"
							style={{ borderColor: "#CBD5E1", color: "#6B7280" }}
							aria-label="이 활동지 초기화"
						>
							<RotateCcw className="size-3.5" />
							초기화
						</button>
					)}
				</div>
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
								onChange={(e) => setField(f.id, e.target.value)}
								className="w-full resize-y rounded-md border-2 px-3 py-2 text-lg outline-none focus:border-[#49B6E5]"
								style={{ borderColor: "#CBD5E1", color: ink }}
							/>
						) : (
							<input
								type="text"
								value={values[f.id] ?? ""}
								onChange={(e) => setField(f.id, e.target.value)}
								className="w-full rounded-md border-2 px-3 py-2 text-lg outline-none focus:border-[#49B6E5]"
								style={{ borderColor: "#CBD5E1", color: ink }}
							/>
						)}
					</label>
				))}
			</div>

			<SaveStatusLine status={status} savedAt={savedAt} isLoading={isLoading} />
		</div>
	);
}
