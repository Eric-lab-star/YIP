"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";

// The Solver ships the Monaco editor wrapper, the completion/LSP glue, and the
// result/hint panels — a heavy chunk that also kicks off the Monaco runtime
// fetch from /monaco/vs. None of it can render on the server (Monaco is
// client-only), so we split it into its own chunk and load it after the
// problem statement has painted, matching the ssr:false pattern used by
// CodeBlock.lazy.tsx. The left column (statement) stays interactive
// immediately; the editor swaps in where the skeleton sits.
const Solver = dynamic(() => import("./Solver"), {
	ssr: false,
	loading: () => (
		<Skeleton className="h-[60vh] w-full rounded-2xl bg-zinc-800/80" />
	),
});

export default Solver;
