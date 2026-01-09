
"use client";

import React from "react";
import { useSelectCodeQuizz } from "./QuizzWithOptions";
import { tv } from "tailwind-variants";

type OptionProps = {
  value: number;
  children: React.ReactNode;
};

export function Option({ value, children }: OptionProps) {
  const { selected, select, answer, layout } = useSelectCodeQuizz();

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
			className={style({isSelected, layout })}
			onClick={clickHandler} >
			{children}
    </div>
  );
}

const style = tv({
	base: "",
	variants: {
		isSelected:{
			true: " hover:bg-yellow-400  bg-yellow-400",
			false: "hover:bg-zinc-300 "
		},
		layout: {
			row: "mx-3 px-3 border-b h-13 border-b-gray-400 flex items-center",
			grid: "px-3 py-2 rounded-sm",
		}
	}
})
