"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useSWR, { mutate as globalMutate } from "swr";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

const SAVE_DEBOUNCE_MS = 800;

function keyFor(pageId: string) {
	return `/api/worksheet?pageId=${encodeURIComponent(pageId)}`;
}

async function fetcher(url: string) {
	const res = await fetch(url);
	if (!res.ok) throw new Error(String(res.status));
	return res.json() as Promise<{ answers: Record<string, string> }>;
}

/**
 * 한 페이지의 활동지 답안을 읽고, 바뀐 칸을 자동 저장한다.
 *
 * 활동지 블록과 프롬프트 채우기가 같은 저장소를 쓰기 때문에 훅으로 뺐다.
 * 두 컴포넌트가 각자 디바운스와 재시도를 따로 들고 있으면 같은 버그를 두 번
 * 고치게 된다.
 *
 * 저장은 서버 액션이 아니라 `POST /api/worksheet` 로 간다 — 이유는 그 라우트
 * 주석에 있다(빌드마다 바뀌는 액션 id 때문에 배포가 나가면 저장이 끊긴다).
 */
export function useWorksheetStore(pageId: string, fieldIds: string[]) {
	const key = keyFor(pageId);
	const { data, isLoading } = useSWR(key, fetcher, {
		revalidateOnFocus: false,
		dedupingInterval: 60_000,
	});

	const [values, setValues] = useState<Record<string, string>>({});
	const [status, setStatus] = useState<SaveStatus>("idle");
	const [savedAt, setSavedAt] = useState<number | null>(null);

	// 서버 값은 **아직 비어 있는 칸에만** 채운다.
	//
	// 한 번만 채우고 끝내지 않는 이유가 있다. 1-A 의 재료 세 줄은 1-B 프롬프트에도
	// 같은 필드 id 로 들어가는데, 학생이 1-A 를 채우고 그대로 아래로 내려오면
	// 1-B 는 이미 마운트된 뒤다. 저장 후 캐시를 갱신하고 이 병합을 다시 돌려야
	// 방금 쓴 값이 프롬프트에도 나타난다.
	//
	// 손댄 칸을 덮지 않으니 타이핑 중인 글자가 되돌아가는 일은 없다.
	const fieldKey = fieldIds.join(",");
	useEffect(() => {
		if (!data) return;
		setValues((current) => {
			let changed = false;
			const merged = { ...current };
			for (const id of fieldKey.split(",")) {
				if ((merged[id] ?? "") === "" && (data.answers[id] ?? "") !== "") {
					merged[id] = data.answers[id];
					changed = true;
				}
			}
			return changed ? merged : current;
		});
	}, [data, fieldKey]);

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
			const { savedAt: at } = (await res.json()) as { savedAt: number };
			setStatus("saved");
			setSavedAt(at);
			// 같은 페이지의 다른 블록들이 방금 저장한 값을 보게 한다.
			void globalMutate(key);
		} catch {
			// 실패한 칸은 다시 대기열에 넣는다. 다음 타이핑이나 이탈 직전
			// 저장에서 함께 올라간다 — 조용히 잃는 것보다 낫다.
			pending.current = { ...patch, ...pending.current };
			setStatus("error");
		}
	}, [pageId, key]);

	const setField = useCallback(
		(id: string, value: string) => {
			setValues((v) => ({ ...v, [id]: value }));
			pending.current[id] = value;
			if (timer.current) clearTimeout(timer.current);
			timer.current = setTimeout(flush, SAVE_DEBOUNCE_MS);
		},
		[flush]
	);

	/**
	 * 이 블록의 칸을 모두 지운다.
	 *
	 * 대기 중인 저장을 **먼저 버린다.** 안 그러면 디바운스가 남아 있다가 방금
	 * 지운 칸을 옛날 값으로 되살린다.
	 */
	const clearAll = useCallback(async () => {
		if (timer.current) clearTimeout(timer.current);
		pending.current = {};
		setStatus("saving");
		try {
			const res = await fetch("/api/worksheet", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ pageId, fieldIds }),
			});
			if (!res.ok) throw new Error(String(res.status));
			setValues(Object.fromEntries(fieldIds.map((id) => [id, ""])));
			setStatus("saved");
			setSavedAt(Date.now());
			void globalMutate(key);
			return true;
		} catch {
			setStatus("error");
			return false;
		}
		// fieldIds 는 매 렌더 새 배열이라 그대로 의존성에 두면 콜백이 계속 바뀐다.
		// 내용이 같으면 같은 콜백이 되도록 문자열로 비교한다.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageId, key, fieldKey]);

	// 타이핑하다 바로 탭을 닫으면 디바운스가 아직 안 끝났다. 그 마지막 한 번을
	// 흘리지 않도록 화면이 숨겨질 때 밀어 넣는다.
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

	return { values, setField, clearAll, status, savedAt, isLoading };
}

/** 저장 상태 한 줄. 활동지와 프롬프트가 같은 문구를 쓴다. */
export function SaveStatusLine({
	status,
	savedAt,
	isLoading,
}: {
	status: SaveStatus;
	savedAt: number | null;
	isLoading: boolean;
}) {
	return (
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
					아직 저장되지 않았습니다. 한 글자 더 쓰면 다시 시도합니다 — 이 글씨가 계속
					보이면 새로고침해 주세요.
				</span>
			)}
			{!isLoading && status === "idle" && "쓰는 대로 자동 저장됩니다."}
		</div>
	);
}
