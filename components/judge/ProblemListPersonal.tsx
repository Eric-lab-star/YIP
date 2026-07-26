"use client";

import Link from "next/link";
import useSWR from "swr";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import useUser from "@/components/SWR/auth/user";

type ApiProblem = { slug: string; solved: boolean };

async function fetcher(url: string): Promise<ApiProblem[]> {
	const res = await fetch(url);
	if (!res.ok) throw new Error(String(res.status));
	return res.json();
}

// One shared SWR key for the whole page: the list renders a SolvedMark per row,
// and deduping collapses them into a single request.
function useSolved() {
	const { data } = useSWR("/api/problems", fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		dedupingInterval: 60_000,
	});
	return data;
}

/**
 * The "완료" tick for one problem.
 *
 * This used to be rendered on the server, which forced the whole list page to
 * `force-dynamic` — every visitor got an uncached render (X-Vercel-Cache MISS,
 * ~280ms TTFB) just so a logged-in user could see their own ticks. The list
 * itself is identical for everyone, so it is now prerendered and revalidated
 * hourly, and only this per-user bit is fetched in the browser.
 */
export function SolvedMark({ slug }: { slug: string }) {
	const data = useSolved();
	if (!data?.some((p) => p.slug === slug && p.solved)) return null;
	return (
		<span className="flex items-center gap-0.5 text-xs font-medium text-green-600">
			<Check className="size-4" />
			완료
		</span>
	);
}

/**
 * Admin-only "새 문제" link. Rendered into a slot that already reserves its
 * height, so appearing after the auth check does not shift the page.
 */
export function NewProblemButton() {
	const { user } = useUser();
	if (!(user?.success && user.role === "admin")) return null;
	return (
		<Button asChild>
			<Link href="/problems/new">새 문제</Link>
		</Button>
	);
}
