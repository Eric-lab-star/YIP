
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
  // const isCorrect = selected !== null && value === answer;
  // const isWrongSelected = selected !== null && isSelected && value !== answer;
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
			true: " bg-linear-65 from-purple-500 to-pink-500",
			false: " hover:bg-linear-65 from-purple-500/30 to-pink-500/30"
		},
		layout: {
			row: "mx-3 px-3  min-h-13 shadow-sm flex items-center rounded-sm",
			grid: "px-3 py-2 rounded-sm",
		}
	}
})
