"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import Text from "@/components/commons/Text";

type QuizzContextValue = {
  selected: number | null;
  select: (value: number) => void;
  answer: number;
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
  answer: number; // keep it number (your example shows string, but number is better)
}

export default function SelectCodeQuizz({
  answer,
  question,
  children,
}: SelectCodeQuizzProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const value = useMemo(
    () => ({
      selected,
      select: setSelected,
      answer,
    }),
    [selected, answer]
  );

  return (
    <QuizzContext.Provider value={value}>
      <div>
        <Text weight="bold">{question}</Text>
        <div>{children}</div>

        {/* optional: show current selection */}
        {/* <div>Selected: {selected ?? "none"}</div> */}
      </div>
    </QuizzContext.Provider>
  );
}
