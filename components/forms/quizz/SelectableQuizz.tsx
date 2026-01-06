"use client";
import Text from "@/components/commons/Text"
import { Check, Square, SquareCheckBig } from "lucide-react";
import { useState } from "react";


interface SelectableQuizz {
	question: string
}
export default function SelectableQuizz({question}:{question:string}) {
	const [selected, setSelected] = useState("")
	const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
		const value = e.currentTarget.value
		if (selected == value) {
			setSelected("")
		} else {
			setSelected(value)
		}
	}
	return(
		<div>
			<Text>{question}</Text>
			<Option value="a = 1" selected={selected} handleClick={handleClick}/>
		</div>
	)
	
}

interface Option {
	selected: string,
	handleClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void,
	value: string
}

function Option({value,selected, handleClick}: Option) {
	return (
			<Text>
				<div className="h-8 flex items-center space-x-2">
					<label className={`h-6 flex items-center peer hover:text-blue-400 ${selected == "1" && "text-blue-400"}`} >
						{selected == value ? <SquareCheckBig className="stroke-1" /> : <Square className="stroke-1"/>}
						<input value={value} type="checkbox" className="mr-2 appearance-none" onClick={handleClick}/>
						{value}
					</label>
				</div>
			</Text>
	)
}
