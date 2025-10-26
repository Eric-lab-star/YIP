import { orbit } from "@/app/stores/font"
import Link from "next/link"
import { books } from "../utils"
import { Beaker, Cpu, FlaskConical, FlaskRound, Gpu, Pickaxe, TestTubeDiagonal } from "lucide-react"
import { HTMLAttributes } from "react"

/**
	* Books component which is rendering available books in grid layout.
	*/
export default function BooksGrid() {
	return (
		<div  className="w-full grid grid-cols-4 gap-3">
			{books.map((book, i) => {
					return (
					<Link key={book.label} href={book.path} className="h-15" >
						<div className={`${LinkStyle}`}>
							{Icons[i % Icons.length]}
							<div className={`${orbit.className} text-2xl`}> {book.label}</div>
						</div>
					</ Link>)
			})}
		</div>
	)
}

const LinkStyle:HTMLAttributes<HTMLDivElement>["className"] =`
h-full w-full rounded-md bg-zinc-50 flex justify-center items-center space-x-2
`

const Icons = [
	<Pickaxe />,
	<FlaskConical/>,
	<FlaskRound/>,
	<Beaker/>,
	<TestTubeDiagonal />,
	<Cpu />,
	<Gpu />
]
