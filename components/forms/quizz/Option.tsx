
"use client";

import React from "react";
import { useSelectCodeQuizz } from "./QuizzForm";

type OptionProps = {
  value: number;
  children: React.ReactNode;
};

export function Option({ value, children }: OptionProps) {
  const { selected, select, answer } = useSelectCodeQuizz();

  const isSelected = selected === value;
  const isCorrect = selected !== null && value === answer;
  const isWrongSelected = selected !== null && isSelected && value !== answer;

  return (
    <button
      type="button"
      onClick={() => select(value)}
      style={{
        display: "block",
        width: "100%",
        textAlign: "left",
        padding: "10px 12px",
        marginTop: 8,
        borderRadius: 8,
        border: "1px solid #ddd",
        cursor: "pointer",
        background: isCorrect
          ? "#e9ffe9"
          : isWrongSelected
          ? "#ffe9e9"
          : isSelected
          ? "#f3f4f6"
          : "white",
      }}
    >
      {children}
    </button>
  );
}
