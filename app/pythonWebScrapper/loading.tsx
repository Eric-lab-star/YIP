import { Skeleton } from "@/components/ui/skeleton"

export default function Loading(){
	return (
		<div className=""> 
		{[0,0].map((_, i) => <div key={i}>
			<Title/>
			<Paragraph />
			<List />
			<List />
			<List />
		 </div>)
		}
		</div>
	) 
}


function Title(){
	return <Skeleton className="my-3 w-45 h-10"/>
}

function Text() {
	return <Skeleton className="my-1 w-full h-6"/>
}

function Paragraph(){
	return <div className="my-7">
	{[0,0].map((_,i)=> <div key={i} className="mb-7 space-y-1">
			<div className="pl-10">
				<Skeleton className="  w-full h-6"/>
			</div>
			<Skeleton className=" w-11/12 h-6"/>
			<Skeleton className=" w-full h-6"/>
			<Skeleton className=" w-7/12 h-6"/>
		</div>)}
	</div>
}

function List() {
	return <div className="space-y-1 my-8">
		<Skeleton className="w-30 h-8 mb-3"/>
		<Skeleton className="w-50 h-6"/>
		<Skeleton className="w-40 h-6"/>
		<Skeleton className="w-40 h-6"/>
	</div>
}

function Image(){
	return <div className="flex justify-center items-center">
		<Skeleton className="h-200 w-120"/>
	</div>
}
