"use client";
import Text from "@/components/commons/Text";
import { useState } from "react";

interface SelectCodeQuizz {
	children: React.ReactNode,
	question: string,
	answer: number,
}


export default function SelectCodeQuizz({answer,question, children}:SelectCodeQuizz) {
	const [selected, setSelected] = useState<number>()



	return (
		<div>
			<Text weight="bold">{question}</Text>
			<div>{children}</div>
		</div>
	)
}
