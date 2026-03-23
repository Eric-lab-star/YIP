
"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";

const CodeBlock = dynamic(() => import("./CodeBlock"), {
  ssr: false,
  loading: () => <Skeleton className="h-50 rounded-2xl bg-zinc-800"/>,
});

export default CodeBlock;
