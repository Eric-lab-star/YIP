"use client";

import { useState, type ReactNode } from "react";
import { accent, doodleBox, doodleButtonRadius, ink, sky } from "../doodle";

/**
 * 실습 페이지의 화면 속 모의 실험. 실물 실습을 대신하지 않고, 예상을 적은 뒤에
 * 열어 보도록 만들어 페이지의 "결과를 먼저 예상" 흐름을 지킨다.
 */
function SimFrame({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="my-6 px-3 py-4 sm:px-5" style={{ ...doodleBox, color: ink }}>
      <h4 className="text-lg font-bold">{title}</h4>
      <p className="text-sm">화면 속 모의 실험이에요. 실제 부품의 결과와 다를 수 있어요.</p>
      {open ? (
        <div className="mt-3">{children}</div>
      ) : (
        <div className="mt-3">
          <SimButton onClick={() => setOpen(true)}>예상을 적었어요, 열어 볼게요</SimButton>
        </div>
      )}
    </section>
  );
}

function SimButton({
  children,
  onClick,
  pressed,
}: {
  children: ReactNode;
  onClick: () => void;
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className="border-2 px-3 py-1.5 font-bold"
      style={{
        borderColor: ink,
        borderRadius: doodleButtonRadius,
        backgroundColor: pressed ? sky : "#fff",
        color: pressed ? "#fff" : ink,
      }}
    >
      {children}
    </button>
  );
}

function Result({ children }: { children: ReactNode }) {
  return (
    <div
      className="mt-3 rounded-xl p-3 leading-relaxed"
      style={{ backgroundColor: accent }}
      aria-live="polite"
    >
      {children}
    </div>
  );
}

const RATES = [8000, 44100];
const SECONDS = [5, 10];

/** 녹음기 미션 3. 1초에 재는 횟수 × 2바이트 × 녹음 초. */
export function AudioSizeSim() {
  const [rate, setRate] = useState(44100);
  const [seconds, setSeconds] = useState(5);

  return (
    <SimFrame title="녹음 파일 크기 계산기">
      <div className="flex flex-wrap gap-2">
        {RATES.map((value) => (
          <SimButton key={value} pressed={rate === value} onClick={() => setRate(value)}>
            -r {value}
          </SimButton>
        ))}
        {SECONDS.map((value) => (
          <SimButton key={value} pressed={seconds === value} onClick={() => setSeconds(value)}>
            -d {value}
          </SimButton>
        ))}
      </div>
      <Result>
        <p>
          {rate.toLocaleString()} × 2 × {seconds} ={" "}
          <strong>{(rate * 2 * seconds).toLocaleString()}바이트</strong>
        </p>
        <p className="text-sm">실제 파일은 파일 정보만큼 조금 더 커요.</p>
      </Result>
    </SimFrame>
  );
}

/** 데이터 저장 미션 1. w 는 열 때 지우고, a 는 끝에 더한다. */
export function FileModeSim() {
  const [lines, setLines] = useState<string[]>([]);

  return (
    <SimFrame title="w와 a를 눌러 record.txt 살펴보기">
      <div className="flex flex-wrap gap-2">
        <SimButton onClick={() => setLines(["첫째 줄"])}>&quot;w&quot;로 실행</SimButton>
        <SimButton onClick={() => setLines([...lines, "첫째 줄"])}>&quot;a&quot;로 실행</SimButton>
        <SimButton onClick={() => setLines([])}>파일 지우고 처음부터</SimButton>
      </div>
      <Result>
        <p className="font-bold">record.txt: {lines.length}줄</p>
        {lines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </Result>
    </SimFrame>
  );
}

const ROUTES: Record<string, () => string> = {
  "/": () => "안녕하세요! 라즈베리파이 서버입니다.",
  "/hello": () => "반가워요!",
  "/time": () => {
    const now = new Date();
    const pad = (value: number) => String(value).padStart(2, "0");
    return `${pad(now.getHours())}시 ${pad(now.getMinutes())}분 ${pad(now.getSeconds())}초`;
  },
};

/** 웹서버 미션 2. 코드에 없는 주소는 404 가 된다. */
export function RouteSim() {
  const [visit, setVisit] = useState<{ path: string; body: string; status: number } | null>(null);

  const open = (path: string) => {
    const known = path in ROUTES;
    setVisit({ path, body: known ? ROUTES[path]() : "Not Found", status: known ? 200 : 404 });
  };

  return (
    <SimFrame title="주소를 눌러 서버에 요청하기">
      <div className="flex flex-wrap gap-2">
        {["/", "/hello", "/time", "/snack"].map((path) => (
          <SimButton key={path} pressed={visit?.path === path} onClick={() => open(path)}>
            {path}
          </SimButton>
        ))}
      </div>
      <Result>
        {visit ? (
          <>
            <p className="font-bold">브라우저: {visit.body}</p>
            <p className="break-all font-mono text-sm">
              쉘: &quot;GET {visit.path} HTTP/1.1&quot; {visit.status}
            </p>
          </>
        ) : (
          <p>주소를 골라 보세요. 같은 주소를 다시 누르면 새로 고침이에요.</p>
        )}
      </Result>
    </SimFrame>
  );
}

const BLE_WRITES = [
  { label: "바이트 01", value: 1 },
  { label: "바이트 00", value: 0 },
  { label: "바이트 02", value: 2 },
  { label: "글자 1", value: 49 },
];

/** BLE 미션 3. write_power 는 value[0] 이 1 일 때만 켠다. */
export function BleWriteSim() {
  const [received, setReceived] = useState<number | null>(null);
  const lit = received === 1;

  return (
    <SimFrame title="서랍에 값을 써 보기">
      <div className="flex flex-wrap gap-2">
        {BLE_WRITES.map((write) => (
          <SimButton
            key={write.label}
            pressed={received === write.value}
            onClick={() => setReceived(write.value)}
          >
            {write.label}
          </SimButton>
        ))}
      </div>
      <Result>
        {received === null ? (
          <p>보낼 값을 골라 보세요.</p>
        ) : (
          <>
            <p className="font-mono">받은 값: {received}</p>
            <p>LED: {lit ? "켜짐" : "꺼짐"}</p>
            <p>읽기 값: {lit ? "01" : "00"}</p>
          </>
        )}
      </Result>
    </SimFrame>
  );
}

const SAMPLE_SCORES = [0.82, 0.55, 0.31];

/** 사물인식 미션 4. 예시 점수로 THRESHOLD 의 뜻을 살펴본다. */
export function ThresholdSim() {
  const [threshold, setThreshold] = useState(0.6);
  const found = SAMPLE_SCORES.filter((score) => score >= threshold);

  return (
    <SimFrame title="THRESHOLD를 바꾸면 무엇이 달라질까요?">
      <label className="block font-bold" htmlFor="threshold">
        THRESHOLD = {threshold.toFixed(2)}
      </label>
      <input
        id="threshold"
        type="range"
        min="0.1"
        max="0.95"
        step="0.05"
        value={threshold}
        onChange={(event) => setThreshold(Number(event.target.value))}
        className="w-full"
      />
      <Result>
        <p>예시 신뢰도: {SAMPLE_SCORES.join(", ")}</p>
        <p>기준을 넘은 값: {found.length}개</p>
        <p className="font-bold">found = {found.length > 0 ? "True, LED 켜짐" : "False, LED 꺼짐"}</p>
      </Result>
    </SimFrame>
  );
}

const PIECES = [
  { name: "택트 스위치", gpio: [27] },
  { name: "CDS 모듈", gpio: [22] },
  { name: "MQ-2 모듈", gpio: [22] },
  { name: "HC-SR04", gpio: [23, 24] },
  { name: "MPU6050", gpio: [2, 3] },
  { name: "DS18B20", gpio: [4] },
  { name: "LED", gpio: [17] },
  { name: "3색 LED", gpio: [17, 27, 22] },
];

/** 최종 프로젝트 미션 1. 고른 조각의 GPIO 가 겹치는지 확인한다. */
export function PinPlanner() {
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (name: string) =>
    setPicked(picked.includes(name) ? picked.filter((item) => item !== name) : [...picked, name]);

  const used = PIECES.filter((piece) => picked.includes(piece.name)).flatMap((piece) => piece.gpio);
  const overlaps = [...new Set(used.filter((pin, index) => used.indexOf(pin) !== index))];

  return (
    <SimFrame title="내 조각의 GPIO 겹침 확인">
      <div className="flex flex-wrap gap-2">
        {PIECES.map((piece) => (
          <SimButton
            key={piece.name}
            pressed={picked.includes(piece.name)}
            onClick={() => toggle(piece.name)}
          >
            {piece.name}
          </SimButton>
        ))}
      </div>
      <Result>
        <p>쓰는 GPIO: {used.length > 0 ? [...new Set(used)].join(", ") : "아직 없어요"}</p>
        {overlaps.length > 0 ? (
          <p className="font-bold">
            GPIO {overlaps.join(", ")}이 겹쳐요. 빈 GPIO5나 GPIO6으로 옮기고 코드의 번호도 바꿔요.
          </p>
        ) : (
          <p className="font-bold">겹치는 핀이 없어요.</p>
        )}
      </Result>
    </SimFrame>
  );
}
