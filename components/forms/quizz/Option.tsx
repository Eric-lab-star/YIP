
"use client";

import React from "react";
import { useSelectCodeQuizz } from "./QuzzWithOptions";

type OptionProps = {
  value: number;
  children: React.ReactNode;
};

export function Option({ value, children }: OptionProps) {
  const { selected, select, answer } = useSelectCodeQuizz();

  const isSelected = selected === value;
  const isCorrect = selected !== null && value === answer;
  const isWrongSelected = selected !== null && isSelected && value !== answer;
	const clickHandler = () => {
		if (selected === value){
			select(null)
			return
		} 
		select(value)
	}

  return (
		<div 
			className={`mx-3 px-3 border-b h-13 border-b-gray-400 flex items-center ${isSelected ? "hover:bg-yellow-400" : "hover:bg-zinc-300"} ${isSelected && "bg-yellow-400"}`}
			onClick={clickHandler} >
			{children}
    </div>
  );
}
