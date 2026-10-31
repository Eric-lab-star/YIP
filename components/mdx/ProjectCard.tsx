"use client";

import Image from "next/image";
import Link from "next/link";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { doodleBox, doodleButtonRadius, ink, sky, accent } from "./doodle";

const FilterContext = createContext<string | null>(null);

/**
 * 프로젝트 카드 묶음. 분야를 고르면 해당 카드만 남긴다. 카드는 계속 MDX 에
 * 쓰이므로 목록을 prop 으로 받지 않고 컨텍스트로 필터 값을 내려 준다.
 */
export function ProjectGallery({
  groups,
  children,
}: {
  groups: string[];
  children: ReactNode;
}) {
  const [group, setGroup] = useState<string | null>(null);

  return (
    <FilterContext.Provider value={group}>
      <div
        className="my-6 flex flex-wrap gap-2"
        role="group"
        aria-label="분야 고르기"
      >
        {[null, ...groups].map((name) => (
          <button
            key={name ?? "전체"}
            type="button"
            aria-pressed={group === name}
            onClick={() => setGroup(name)}
            className="border-2 px-3 py-1.5 font-bold"
            style={{
              borderColor: ink,
              borderRadius: doodleButtonRadius,
              backgroundColor: group === name ? ink : "transparent",
              color: group === name ? "#fff" : ink,
            }}
          >
            {name ?? "전체"}
          </button>
        ))}
      </div>
      {children}
    </FilterContext.Provider>
  );
}

const FLOW_STEP_MS = 800;

/** 입력 → 라즈베리파이 → 출력을 눌러 보거나 신호를 흘려 보며 확인한다. */
function SignalFlow({
  input,
  process,
  output,
}: {
  input: string;
  process: string;
  output: string;
}) {
  const steps = [
    { label: "입력", detail: input },
    { label: "라즈베리파이", detail: process },
    { label: "출력", detail: output },
  ];
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => () => clearInterval(timer.current), []);

  const play = () => {
    clearInterval(timer.current);
    setActive(0);
    let next = 1;
    timer.current = setInterval(() => {
      setActive(next);
      if (++next === steps.length) clearInterval(timer.current);
    }, FLOW_STEP_MS);
  };

  const pick = (index: number) => {
    clearInterval(timer.current);
    setActive(index);
  };

  return (
    <div className="my-4 rounded-xl p-3" style={{ backgroundColor: accent }}>
      <div className="flex items-center gap-1 sm:gap-2">
        {steps.map((step, index) => (
          <div key={step.label} className="contents">
            {index > 0 && (
              <span aria-hidden style={{ color: index <= active ? sky : ink }}>
                →
              </span>
            )}
            <button
              type="button"
              aria-pressed={active === index}
              onClick={() => pick(index)}
              className="min-w-0 flex-1 border-2 px-1 py-2 text-sm font-bold transition-colors sm:text-base"
              style={{
                borderColor: ink,
                borderRadius: doodleButtonRadius,
                backgroundColor: active === index ? sky : "#fff",
                color: active === index ? "#fff" : ink,
              }}
            >
              {step.label}
            </button>
          </div>
        ))}
      </div>
      <p className="mt-3 min-h-14 leading-relaxed" aria-live="polite">
        {steps[active].detail}
      </p>
      <button
        type="button"
        onClick={play}
        className="text-sm font-bold underline underline-offset-4"
        style={{ color: ink }}
      >
        신호 따라가기
      </button>
    </div>
  );
}

/** YouTube 는 재생을 누른 뒤에야 불러온다. 그림이 첫 화면을 대신한다. */
function ProjectMedia({
  image,
  alt,
  video,
}: {
  image: string;
  alt: string;
  video?: { id: string; title: string; source: string };
}) {
  const [playing, setPlaying] = useState(false);

  if (video && playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
        title={video.title}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full"
      />
    );
  }

  return (
    <div className="relative aspect-video w-full">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 768px"
        className="object-cover"
      />
      {video && (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] px-3 py-2 text-left text-sm font-bold"
          style={{
            backgroundColor: ink,
            borderRadius: doodleButtonRadius,
            color: "#fff",
          }}
        >
          ▶ 실제 영상 보기 ({video.source})
        </button>
      )}
    </div>
  );
}

/**
 * 프로젝트 사례 한 개. 그림(또는 영상), 신호 흐름, 그리고 수업 연결과 링크를
 * 담은 MDX 본문으로 이루어진다.
 */
export function ProjectCard({
  title,
  field,
  group,
  image,
  alt,
  video,
  flow,
  children,
}: {
  title: string;
  field: string;
  group: string;
  image: string;
  alt: string;
  video?: { id: string; title: string; source: string };
  flow: { input: string; process: string; output: string };
  children: ReactNode;
}) {
  const filter = useContext(FilterContext);
  if (filter && filter !== group) return null;

  return (
    <section className="my-8 overflow-hidden" style={{ ...doodleBox }}>
      <div
        className="flex flex-wrap items-center gap-2 px-3 py-3 text-lg font-bold sm:px-6"
        style={{ backgroundColor: ink, color: "#fff" }}
      >
        <h3 className="min-w-0">{title}</h3>
        <span className="ml-auto rounded-full bg-white/20 px-2.5 py-0.5 text-sm">
          {field}
        </span>
      </div>
      <ProjectMedia image={image} alt={alt} video={video} />
      <div className="px-3 pb-3 pt-1 sm:px-6" style={{ color: ink }}>
        <SignalFlow {...flow} />
        {children}
      </div>
    </section>
  );
}

const IDEA_INPUTS = [
  { label: "버튼", when: "버튼을 누르면", lesson: "basic_tact_switch" },
  { label: "빛", when: "방이 어두워지면", lesson: "what_is_CDS" },
  { label: "가스", when: "가스가 감지되면", lesson: "MQ-2_sensor" },
  { label: "거리", when: "물체가 가까워지면", lesson: "ultra_sonic_sensor" },
  { label: "기울기", when: "보드가 기울어지면", lesson: "MPU6050_sensor" },
  { label: "온도", when: "온도가 올라가면", lesson: "DS18B02_sensor" },
  { label: "카메라", when: "카메라에 사람이 보이면", lesson: "object_detection" },
];

const IDEA_OUTPUTS = [
  { label: "LED", then: "LED로 알려 주는", lesson: "LED_controll" },
  { label: "파일", then: "시간과 함께 파일에 기록하는", lesson: "save_data" },
  { label: "웹 페이지", then: "웹 페이지로 보여 주는", lesson: "web_server" },
  { label: "소리", then: "녹음해 둔 소리를 들려주는", lesson: "audio_recorder" },
];

function IdeaChoices({
  legend,
  options,
  selected,
  onSelect,
}: {
  legend: string;
  options: { label: string }[];
  selected: number;
  onSelect: (index: number) => void;
}) {
  return (
    <fieldset className="my-4">
      <legend className="mb-2 font-bold">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => (
          <button
            key={option.label}
            type="button"
            aria-pressed={selected === index}
            onClick={() => onSelect(index)}
            className="border-2 px-3 py-1.5 font-bold"
            style={{
              borderColor: ink,
              borderRadius: doodleButtonRadius,
              backgroundColor: selected === index ? sky : "#fff",
              color: selected === index ? "#fff" : ink,
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/** 입력과 출력을 골라 내 프로젝트 문장과 배울 수업을 만든다. */
export function ProjectIdeaMixer() {
  const [inputIndex, setInputIndex] = useState(0);
  const [outputIndex, setOutputIndex] = useState(0);
  const input = IDEA_INPUTS[inputIndex];
  const output = IDEA_OUTPUTS[outputIndex];

  return (
    <div className="my-8 px-3 py-5 sm:px-6" style={{ ...doodleBox, color: ink }}>
      <IdeaChoices
        legend="무엇을 감지할까요?"
        options={IDEA_INPUTS}
        selected={inputIndex}
        onSelect={setInputIndex}
      />
      <IdeaChoices
        legend="어떻게 알려 줄까요?"
        options={IDEA_OUTPUTS}
        selected={outputIndex}
        onSelect={setOutputIndex}
      />
      <div
        className="mt-5 rounded-xl p-4"
        style={{ backgroundColor: accent }}
        aria-live="polite"
      >
        <p className="text-xl font-bold leading-relaxed">
          {input.when} {output.then} 장치
        </p>
        <p className="mt-2">
          필요한 수업:{" "}
          <Link
            className="underline underline-offset-4"
            href={`/RaspberryPi/${input.lesson}/goal`}
          >
            {input.label}
          </Link>
          {" · "}
          <Link
            className="underline underline-offset-4"
            href={`/RaspberryPi/${output.lesson}/goal`}
          >
            {output.label}
          </Link>
        </p>
      </div>
    </div>
  );
}
