import { ChevronLeft, ChevronRight} from "lucide-react";
import Link from "next/link";

export default function NextAndPrev({next, prev, nextPage, prevPage}: {next:string, prev: string, nextPage: string, prevPage: string}){
	return(
		<>
			<div className="mt-20 flex justify-between">
				<Link href={prev} >
					<div className="w-fit py-2 flex items-center justify-between hover:border-b-red-400 hover:border-b hover:animate-pulse">
						<ChevronLeft />
						<div>{prevPage}</div>
					</div>
				</Link>
				<Link href={next}>
					<div className="w-fit py-2 flex items-center justify-between hover:animate-pulse hover:border-b hover:border-b-red-400">
						<div>{nextPage}</div>
						<ChevronRight />
					</div>
				</Link>
			</div>
		</>
	)
}
