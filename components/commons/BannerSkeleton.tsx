"use client";

import { Skeleton } from "@/components/ui/skeleton"

export function BannerSkeleton(){
	return (
		<div className="space-y-3">
			<Skeleton className="h-20 sm:h-20 lg:h-70 w-full"/>
			<Skeleton className="h-8 w-full"/>
			<div className="w-3/5 space-y-3">
				<Skeleton className="h-4 w-full"/>
				<Skeleton className="h-4 w-full"/>
			</div>
			<Skeleton className="h-60 w-full"/>
			<div className="w-3/5 space-y-3">
				<Skeleton className="h-4 w-full"/>
				<Skeleton className="h-4 w-full"/>
			</div>
			<Skeleton className="h-60 w-full"/>
		</div>

	)
	
}
