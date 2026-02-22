import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="p-5 space-y-3">
			<Skeleton className="w-full h-15 bg-zinc-300"/>
			<Skeleton className="w-full h-[580px] bg-zinc-300"/>
			<Skeleton className="w-full h-20 bg-zinc-300"/>
		</div>
	)
	
}
