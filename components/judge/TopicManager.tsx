"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	createTopicAction,
	deleteTopicAction,
	moveTopicAction,
	renameTopicAction,
} from "@/app/actions/topicAction";

type T = { slug: string; name: string; order: number };
type ActionResult = { success: true } | { success: false; error: string };

/**
 * 주제를 추가·이름변경·순서변경·삭제한다.
 *
 * 이름만 바뀌고 slug 는 고정이다 — 문제가 slug 를 참조하므로 바꾸면 분류가
 * 끊긴다. 그래서 slug 는 입력이 아니라 읽기 전용으로 옆에 보여준다.
 *
 * 문제가 남아 있는 주제는 삭제 버튼이 비활성이다. 서버도 같은 규칙을
 * 강제하므로, 이 화면을 연 뒤 다른 곳에서 문제가 추가됐더라도 지워지지
 * 않고 서버가 거부한 이유가 그대로 뜬다.
 */
export function TopicManager({
	topics,
	counts,
}: {
	topics: T[];
	counts: Record<string, number>;
}) {
	const router = useRouter();
	const [pending, start] = useTransition();
	const [error, setError] = useState("");
	const [newSlug, setNewSlug] = useState("");
	const [newName, setNewName] = useState("");

	const run = (fn: () => Promise<ActionResult>) =>
		start(async () => {
			const r = await fn();
			setError(r.success ? "" : r.error);
			// 실패했을 때도 새로고침한다. 이름 입력칸이 낙관적으로 새 값을 들고
			// 있는데 서버는 옛 값이므로, 되돌려 놓지 않으면 화면이 거짓말을 한다.
			router.refresh();
		});

	return (
		<div className="flex flex-col gap-4">
			{error && (
				<p className="text-sm text-red-600" role="alert">
					{error}
				</p>
			)}

			{topics.length === 0 ? (
				<p className="text-muted-foreground">아직 주제가 없습니다. 아래에서 추가하세요.</p>
			) : (
				<ul className="flex flex-col divide-y overflow-hidden rounded-md border">
					{topics.map((t, i) => {
						const count = counts[t.slug] ?? 0;
						return (
							<li key={t.slug} className="flex flex-wrap items-center gap-2 px-3 py-2">
								<Input
									defaultValue={t.name}
									aria-label={`${t.name} 이름`}
									disabled={pending}
									onBlur={(e) => {
										const next = e.target.value;
										if (next !== t.name) run(() => renameTopicAction(t.slug, next));
									}}
									className="min-w-0 flex-1 basis-40"
								/>
								<span className="shrink-0 font-mono text-xs text-muted-foreground">
									{t.slug}
								</span>
								<span className="shrink-0 text-sm text-muted-foreground">{count}문제</span>
								<div className="ml-auto flex shrink-0 items-center gap-1">
									<Button
										size="icon"
										variant="ghost"
										disabled={pending || i === 0}
										aria-label={`${t.name} 위로`}
										onClick={() => run(() => moveTopicAction(t.slug, "up"))}
									>
										<ChevronUp className="size-4" />
									</Button>
									<Button
										size="icon"
										variant="ghost"
										disabled={pending || i === topics.length - 1}
										aria-label={`${t.name} 아래로`}
										onClick={() => run(() => moveTopicAction(t.slug, "down"))}
									>
										<ChevronDown className="size-4" />
									</Button>
									<Button
										size="icon"
										variant="ghost"
										disabled={pending || count > 0}
										aria-label={`${t.name} 삭제`}
										title={count > 0 ? "문제가 남아 있어 지울 수 없습니다" : "삭제"}
										onClick={() => run(() => deleteTopicAction(t.slug))}
									>
										<Trash2 className="size-4" />
									</Button>
								</div>
							</li>
						);
					})}
				</ul>
			)}

			<div className="flex flex-wrap items-center gap-2">
				<Input
					value={newSlug}
					onChange={(e) => setNewSlug(e.target.value)}
					aria-label="새 주제 slug"
					placeholder="slug (영문 소문자·숫자·하이픈)"
					className="min-w-0 flex-1 basis-56"
				/>
				<Input
					value={newName}
					onChange={(e) => setNewName(e.target.value)}
					aria-label="새 주제 이름"
					placeholder="이름"
					className="min-w-0 flex-1 basis-40"
				/>
				<Button
					disabled={pending || !newSlug.trim() || !newName.trim()}
					onClick={() =>
						run(async () => {
							const r = await createTopicAction(newSlug.trim(), newName);
							if (r.success) {
								setNewSlug("");
								setNewName("");
							}
							return r;
						})
					}
				>
					추가
				</Button>
			</div>
		</div>
	);
}
