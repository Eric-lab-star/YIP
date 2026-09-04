"use client";

import { PromptFill } from "./PromptFill";
import { FINAL_PROJECT_PAGE_ID, getPrompt } from "@/utils/worksheets/finalProject";

/**
 * 레슨에서 채우는 프롬프트 하나를 부르는 얇은 껍데기.
 *
 *     <PromptBlock prompt="1-B" />
 *
 * `WorksheetBlock` 과 같은 이유로 정의를 레지스트리에 둔다 — 프롬프트 문구가
 * MDX 와 레지스트리 두 곳에 갈라져 있으면 한쪽만 고쳐진다.
 */
export function PromptBlock({ prompt }: { prompt: string }) {
	const def = getPrompt(prompt);
	if (!def) {
		return (
			<div className="my-7 rounded-md border-2 border-red-400 px-4 py-3 text-red-700">
				프롬프트 <code>{prompt}</code> 을 찾을 수 없습니다. (
				<code>utils/worksheets/finalProject.ts</code> 확인)
			</div>
		);
	}
	return (
		<PromptFill
			pageId={FINAL_PROJECT_PAGE_ID}
			title={def.title}
			template={def.template}
			fields={def.fields}
		/>
	);
}
