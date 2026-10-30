"use client";

import { Fragment, useState } from "react";
import { cream, doodleBoxImage, ink, sky } from "./doodle";

export type CheckQuestion = {
  question: string;
  /** Code lines to read. An array because MDX strips indentation from a
      multi-line template literal, which would change the Python. */
  code?: string[];
  options: string[];
  /** 0-based index into `options`. */
  answer: number;
  /** Shown only once solved, so a wrong pick never gives the answer away. */
  explanation: string;
  /** Where to reread when stuck: a heading of this lesson, or an earlier one. */
  review: string;
};

type Progress = { wrong: number[]; solved: boolean };

const MARKS = ["①", "②", "③", "④"];
const green = "#16A34A";
const red = "#DC2626";

const emptyProgress = (count: number): Progress[] =>
  Array.from({ length: count }, () => ({ wrong: [], solved: false }));

/** `backticks` become inline code; question strings have no other markup. */
function Inline({ text }: { text: string }) {
  return text.split("`").map((part, i) => (
    <Fragment key={i}>
      {i % 2 === 1 ? (
        <code className="font-mono text-[0.92em] break-words">{part}</code>
      ) : (
        part
      )}
    </Fragment>
  ));
}

function QuestionRow({
  item,
  index,
  progress,
  onPick,
}: {
  item: CheckQuestion;
  index: number;
  progress: Progress;
  onPick: (option: number) => void;
}) {
  const { wrong, solved } = progress;
  const stuck = wrong.length > 0 && !solved;

  return (
    <div
      className="px-5 py-4"
      style={{ ...doodleBoxImage, backgroundColor: "#fff" }}
    >
      <div
        className="flex items-start gap-2 text-lg font-bold"
        style={{ color: ink }}
      >
        <span aria-hidden style={{ color: sky }}>
          Q{index + 1}.
        </span>
        <span className="min-w-0">
          <Inline text={item.question} />
        </span>
      </div>

      {item.code && (
        <pre
          className="mt-3 overflow-x-auto rounded-lg px-4 py-3 font-mono text-sm leading-[1.6]"
          style={{ backgroundColor: "#282C34", color: "#ABB2BF" }}
        >
          <code>{item.code.join("\n")}</code>
        </pre>
      )}

      <div className="mt-3 space-y-2">
        {item.options.map((option, i) => {
          const isWrong = wrong.includes(i);
          const isAnswer = solved && i === item.answer;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onPick(i)}
              disabled={solved || isWrong}
              className="flex w-full items-start gap-2 rounded-xl px-4 py-2.5 text-left text-base leading-[1.6] enabled:cursor-pointer disabled:cursor-default"
              style={{
                border: `2px solid ${isAnswer ? green : isWrong ? red : "#D5DCE5"}`,
                backgroundColor: isAnswer
                  ? "#EAF7EF"
                  : isWrong
                    ? "#FDECEC"
                    : "#fff",
                color: ink,
                opacity: solved && !isAnswer ? 0.6 : 1,
              }}
            >
              <span aria-hidden>{MARKS[i]}</span>
              <span className="min-w-0">
                <Inline text={option} />
                {isWrong && <span className="sr-only"> (오답)</span>}
                {isAnswer && <span className="sr-only"> (정답)</span>}
              </span>
            </button>
          );
        })}
      </div>

      {stuck && (
        <p
          role="status"
          className="mt-3 px-4 py-3 text-base leading-[1.7]"
          style={{
            borderRadius: "12px 4px 12px 4px / 4px 12px 4px 12px",
            backgroundColor: cream,
            border: `2px dashed ${sky}`,
            color: ink,
          }}
        >
          아직 아니에요. <b>{item.review}</b> 부분을 다시 읽고 다른 답을 골라
          보세요.
        </p>
      )}

      {solved && (
        <p
          role="status"
          className="mt-3 px-4 py-3 text-base leading-[1.7]"
          style={{
            borderRadius: "12px 4px 12px 4px / 4px 12px 4px 12px",
            backgroundColor: "#EAF7EF",
            border: `2px dashed ${green}`,
            color: ink,
          }}
        >
          <b>정답이에요.</b> <Inline text={item.explanation} />
        </p>
      )}
    </div>
  );
}

/** 답을 먼저 골라야 해설이 열리는 객관식 확인 문제 묶음. */
export function CheckQuiz({ questions }: { questions: CheckQuestion[] }) {
  const [progress, setProgress] = useState(() =>
    emptyProgress(questions.length),
  );

  const pick = (index: number, option: number) =>
    setProgress((prev) =>
      prev.map((p, i) => {
        if (i !== index) return p;
        return option === questions[index].answer
          ? { ...p, solved: true }
          : { ...p, wrong: [...p.wrong, option] };
      }),
    );

  const solved = progress.filter((p) => p.solved).length;
  const firstTry = progress.filter(
    (p) => p.solved && p.wrong.length === 0,
  ).length;
  const done = solved === questions.length;

  return (
    <div className="my-8 space-y-4">
      {questions.map((item, i) => (
        <QuestionRow
          key={i}
          item={item}
          index={i}
          progress={progress[i]}
          onPick={(option) => pick(i, option)}
        />
      ))}

      <div
        className="flex flex-wrap items-center justify-between gap-3 px-1"
        style={{ color: ink }}
      >
        <p role="status" className="m-0 text-base font-bold">
          {done
            ? `모두 풀었어요. ${questions.length}문제 중 ${firstTry}문제를 한 번에 맞혔어요.`
            : `${questions.length}문제 중 ${solved}문제 해결`}
        </p>
        {done && (
          <button
            type="button"
            onClick={() => setProgress(emptyProgress(questions.length))}
            className="cursor-pointer rounded-full px-4 py-1.5 text-sm font-bold"
            style={{
              border: `2px solid ${sky}`,
              color: sky,
              backgroundColor: cream,
            }}
          >
            처음부터 다시 풀기
          </button>
        )}
      </div>
    </div>
  );
}
