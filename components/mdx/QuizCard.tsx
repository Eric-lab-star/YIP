"use client";

import { useState } from "react";
import { doodleBoxImage, ink, sky, cream } from "./doodle";

type QuizItem = { question: string; answer: string };

function QuizRow({ item, index }: { item: QuizItem; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="px-5 py-4 "
      style={{ ...doodleBoxImage, backgroundColor: "#fff" }}
    >
      <div
        className="flex items-start gap-2 text-lg font-bold"
        style={{ color: ink }}
      >
        <span aria-hidden style={{ color: sky }}>
          Q{index + 1}.
        </span>
        <span>{item.question}</span>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-3 cursor-pointer rounded-full px-4 py-1.5 text-sm font-bold "
        style={{
          border: `2px solid ${sky}`,
          color: sky,
          backgroundColor: cream,
        }}
        aria-expanded={open}
      >
        {open ? "정답 숨기기" : "정답 보기"}
      </button>

      {open && (
        <p
          className="mt-3 px-4 py-3 text-base leading-[1.7]"
          style={{
            borderRadius: "12px 4px 12px 4px / 4px 12px 4px 12px",
            backgroundColor: "#EAF7EF",
            border: "2px dashed #16A34A",
          }}
        >
          {item.answer}
        </p>
      )}
    </div>
  );
}

/** 클릭하면 정답이 펼쳐지는 복습 퀴즈 카드 묶음. */
export function QuizCard({ items }: { items: QuizItem[] }) {
  return (
    <div className="my-8 space-y-4">
      {items.map((item, i) => (
        <QuizRow key={i} item={item} index={i} />
      ))}
    </div>
  );
}
