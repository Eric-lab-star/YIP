"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import Text from "@/components/commons/Text";

type QuizzContextValue = {
  selected: number | null;
  select: (value: number|null) => void;
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

export default function QuzzWithOptions({
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
    <QuizzContext value={value}>
      <div>
        <Text my="s" weight="bold">{question}</Text>
        <div>{children}</div>
      </div>
			{selected === answer && <Text weight="bold" size="md" style="text-blue-600">정답!</Text>}
			{(selected != null) && (selected !== answer) && <Text weight="bold" size="md" style="text-red-500" >오답~!</Text>}
    </QuizzContext>
  );
}
