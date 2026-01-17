import { Skeleton } from "@/components/ui/skeleton"

export default function Loading(){
	return (
		<div> 
			<Skeleton className="w-50 h-8"/>
			<div className="px-3">
				<Skeleton className="my-3 w-full h-5"/>
				<Skeleton className="my-3 w-full h-5"/>
				<Skeleton className="my-3 w-full h-5"/>
			</div>
			<Skeleton className="my-3 w-full h-100"/>

			<Skeleton className="w-50 h-8"/>
			<div className="px-3">
				<Skeleton className="my-3 w-full h-5"/>
				<Skeleton className="my-3 w-full h-5"/>
				<Skeleton className="my-3 w-full h-5"/>
			</div>
		</div>

	) 
}
