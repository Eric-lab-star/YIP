"use client";
import Text from "@/components/commons/Text"
import { Square, SquareCheckBig } from "lucide-react";
import { useState } from "react";


interface SelectableQuizz {
	question: string,
	answer: string,
	options: string[],
}
export default function SelectableQuizz({question, answer, options}:SelectableQuizz) {
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
			<Text weight="bold">{question}</Text>
			{options.map(v => <Option key={v} value={v} selected={selected} handleClick={handleClick}/>)}
			{selected && <Text weight="bold" style={selected === answer ? "text-blue-500" : "text-rose-500"}>{selected === answer ? "정답!" : "오답!"} </Text> }
		</div>
	)
	
}

interface Option {
	selected: string,
	handleClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void,
	value: string
}

export function Option({value, selected, handleClick}: Option) {
	return (
			<Text weight="bold">
				<div className="h-8 flex items-center space-x-2">
					<label className={`h-6 flex items-center peer hover:text-blue-400 ${selected === value && "text-orange-400"}`} >
						{selected === value ? <SquareCheckBig className="stroke-1" /> : <Square className="stroke-1"/>}
						<input value={value} type="checkbox" className="mr-2 appearance-none" onClick={handleClick}/>
						{value}
					</label>
				</div>
			</Text>
	)
}
