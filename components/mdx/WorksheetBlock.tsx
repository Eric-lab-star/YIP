"use client";

import { Worksheet } from "./Worksheet";
import {
	FINAL_PROJECT_PAGE_ID,
	getWorksheetBlock,
} from "@/utils/worksheets/finalProject";

/**
 * 레슨에서 활동지 한 블록을 부르는 얇은 껍데기.
 *
 *     <WorksheetBlock block="1-C" />
 *
 * 문항을 MDX 에 늘어놓지 않는 이유는 `utils/worksheets/finalProject.ts` 의
 * 헤더 주석에 있다 — 교사 화면이 같은 정의를 읽어야 라벨이 어긋나지 않는다.
 */
export function WorksheetBlock({ block }: { block: string }) {
	const def = getWorksheetBlock(block);
	if (!def) {
		// 오타를 조용히 삼키면 활동지가 통째로 사라진 걸 아무도 모른다.
		return (
			<div className="my-7 rounded-md border-2 border-red-400 px-4 py-3 text-red-700">
				활동지 <code>{block}</code> 을 찾을 수 없습니다. (
				<code>utils/worksheets/finalProject.ts</code> 확인)
			</div>
		);
	}
	return (
		<Worksheet
			pageId={FINAL_PROJECT_PAGE_ID}
			title={def.title}
			fields={def.fields}
		/>
	);
}
