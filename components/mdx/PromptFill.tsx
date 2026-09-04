"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { SaveStatusLine, useWorksheetStore } from "./useWorksheetStore";
import type { WorksheetField } from "./Worksheet";

/**
 * 빈칸을 그 자리에서 채워 완성하는 AI 프롬프트.
 *
 * 예전에는 `____________` 이 박힌 코드블록이었다. 학생은 그걸 복사해서 AI
 * 채팅창에 붙여넣은 **다음** 빈칸을 찾아 고쳐야 했는데, 그 단계에서 빈칸을
 * 그대로 둔 채 보내는 일이 생긴다. 여기서 채우고 완성된 프롬프트를 복사하면
 * 그 실수 자체가 없어진다.
 *
 * 채운 값은 활동지와 같은 곳에 저장된다. 그래서 1-A 에서 쓴 재료 세 줄이
 * 이 프롬프트의 같은 칸에 그대로 나타난다 — 학생이 같은 내용을 두 번 쓰지
 * 않는다.
 */
export function PromptFill({
	pageId,
	title,
	/** `{{fieldId}}` 자리에 입력칸이 들어간다. 나머지는 그대로 출력된다. */
	template,
	fields,
}: {
	pageId: string;
	title?: string;
	template: string;
	fields: WorksheetField[];
}) {
	const fieldIds = useMemo(() => fields.map((f) => f.id), [fields]);
	const byId = useMemo(
		() => Object.fromEntries(fields.map((f) => [f.id, f])),
		[fields]
	);
	const { values, setField, status, savedAt, isLoading } = useWorksheetStore(
		pageId,
		fieldIds
	);
	const [copied, setCopied] = useState(false);

	// 템플릿을 글자 조각과 빈칸으로 나눈다.
	const parts = useMemo(() => {
		const out: Array<{ text: string } | { id: string }> = [];
		const re = /\{\{([a-z0-9-]+)\}\}/g;
		let last = 0;
		let m: RegExpExecArray | null;
		while ((m = re.exec(template))) {
			if (m.index > last) out.push({ text: template.slice(last, m.index) });
			out.push({ id: m[1] });
			last = m.index + m[0].length;
		}
		if (last < template.length) out.push({ text: template.slice(last) });
		return out;
	}, [template]);

	/** 복사할 때는 안 채운 칸을 빈칸 표시로 남긴다 — 빠뜨린 게 눈에 보이게. */
	const assembled = useMemo(
		() =>
			parts
				.map((p) =>
					"text" in p ? p.text : values[p.id]?.trim() || "____________"
				)
				.join(""),
		[parts, values]
	);

	const missing = fields.filter((f) => (values[f.id] ?? "").trim() === "");

	async function copyPrompt() {
		try {
			await navigator.clipboard.writeText(assembled);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {
			/* 클립보드가 막힌 환경 — 무시 */
		}
	}

	return (
		<div className="my-7">
			<div
				className="relative rounded-xl px-5 py-5"
				style={{ backgroundColor: "#282c34" }}
			>
				<button
					type="button"
					onClick={copyPrompt}
					className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-md border border-white/25 bg-white/10 px-2 py-1 text-xs font-medium text-white/80 backdrop-blur transition hover:bg-white/25 hover:text-white"
					aria-label={copied ? "복사됨" : "완성된 프롬프트 복사"}
				>
					{copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
					{copied ? "복사됨" : "프롬프트 복사"}
				</button>

				{title && (
					<div className="mb-3 pr-24 text-sm font-bold text-white/70">{title}</div>
				)}

				{/* 프롬프트는 줄바꿈과 들여쓰기가 의미를 갖는다. 입력칸이 줄 안에
				    끼어들어도 그 모양이 유지되도록 pre-wrap 으로 흘린다. */}
				<div
					className="whitespace-pre-wrap break-words font-mono text-[0.95rem] leading-[2.1] text-white"
					style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace' }}
				>
					{parts.map((p, i) =>
						"text" in p ? (
							<span key={i}>{p.text}</span>
						) : (
							<input
								key={i}
								type="text"
								value={values[p.id] ?? ""}
								onChange={(e) => setField(p.id, e.target.value)}
								placeholder={byId[p.id]?.label ?? "여기에 입력"}
								aria-label={byId[p.id]?.label ?? p.id}
								size={Math.max(12, (values[p.id] ?? "").length + 2)}
								className="mx-1 rounded border-b-2 bg-white/10 px-2 py-0.5 align-baseline font-mono text-[0.95rem] text-white outline-none placeholder:text-white/35 focus:bg-white/20"
								style={{ borderColor: "#49B6E5" }}
							/>
						)
					)}
				</div>
			</div>

			{missing.length > 0 && (
				<div className="mt-2 text-sm" style={{ color: "#B45309" }}>
					아직 안 채운 칸: {missing.map((f) => f.label).join(" · ")} — 그대로 복사하면
					빈칸(`____________`)이 함께 붙습니다.
				</div>
			)}

			<SaveStatusLine status={status} savedAt={savedAt} isLoading={isLoading} />
		</div>
	);
}
