"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import Text from "@/components/commons/Text";
import { Ban, PartyPopper } from "lucide-react";
import { tv } from "tailwind-variants";

type QuizzContextValue = {
  selected: number | null;
  select: (value: number|null) => void;
  answer: number;
	layout?: "row" | "grid",
};

const QuizzContext = createContext<QuizzContextValue | null>(null);

export function useSelectCodeQuizz() {
  const ctx = useContext(QuizzContext);
  if (!ctx) throw new Error("Option must be used inside <SelectCodeQuizz />");
  return ctx;
}

interface SelectCodeQuizzProps {
  children: React.ReactNode;
  question: string;
  answer: number; 
	layout?: "row" | "grid",
}

export default function QuizzWithOptions({
  answer,
  question,
  children,
	layout="row",
}: SelectCodeQuizzProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const value = useMemo(
    () => ({
      selected,
      select: setSelected,
      answer,
			layout,
    }),
    [selected, answer]
  );

  return (
    <QuizzContext value={value}>
      <div className="my-10">
        <Text my="s" weight="bold">{question}</Text>
        <div className={style({layout})}>{children}</div>
				<div className="h-6">
					{selected === answer && <CorrectAnswer />}
					{(selected != null) && (selected !== answer) && <WrongAnswer />}
				</div>
      </div>
    </QuizzContext>
  );
}

const style = tv({
	base: "my-3",
	variants:{
		layout: {
			grid: " mx-3 grid grid-cols-2",
			row: "",
		}
	}
})



function CorrectAnswer() {
	return <div className="flex items-center text-blue-600 mx-3">
		<PartyPopper/>
		<Text weight="bold" size="md">정답!</Text>
	</div>
}

function WrongAnswer() {
	return  <div className="flex items-center text-red-500 mx-3">
		<Ban />
		<Text weight="bold" size="md" >  오답~!</Text>
	</div>
}
