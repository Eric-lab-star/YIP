"use client";

import { useState } from "react";
import { accent, doodleBox, doodleButtonRadius, ink, sky } from "../doodle";

type Region = {
  id: string;
  name: string;
  detail: string;
  /** 공식 기계 도면 기준 mm. 왼쪽 위가 원점이고 보드는 85 × 56. */
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  /** 보드 뒷면에 있는 부품은 점선으로 그린다. */
  back?: boolean;
};

const REGIONS: Region[] = [
  { id: "gpio", name: "GPIO 헤더", detail: "핀 40개가 두 줄로 서 있어요. 버튼, 센서, LED를 연결해요.", x: 7.1, y: 1, w: 50.8, h: 5, fill: "#1F2937" },
  { id: "wifi", name: "Wi-Fi·블루투스", detail: "무선으로 공유기나 다른 기기와 통신해요.", x: 6.7, y: 6.7, w: 10.7, h: 13.3, fill: "#CBD5E1" },
  { id: "soc", name: "SoC (CPU)", detail: "CPU가 들어 있는 칩이에요. 명령을 처리해요.", x: 21.8, y: 15.8, w: 14.8, h: 14.8, fill: "#94A3B8" },
  { id: "ram", name: "RAM", detail: "지금 쓰는 프로그램을 펼쳐 놓는 작업 공간이에요.", x: 39, y: 15.8, w: 11.5, h: 14.8, fill: "#111827" },
  { id: "sd", name: "microSD 슬롯", detail: "보드 뒷면에 있어요. 운영체제와 파일을 보관하는 카드를 끼워요.", x: 0, y: 22, w: 13, h: 12, fill: "#FDE68A", back: true },
  { id: "ethernet", name: "이더넷", detail: "랜 케이블로 공유기에 연결해요.", x: 66.7, y: 2.3, w: 21.3, h: 15.5, fill: "#D1D5DB" },
  { id: "usb3", name: "USB 3.0", detail: "안쪽이 파란 포트 2개예요. 많은 데이터를 빠르게 옮길 때 좋아요.", x: 70.4, y: 22, w: 16.9, h: 13.5, fill: "#3B82F6" },
  { id: "usb2", name: "USB 2.0", detail: "안쪽이 검은 포트 2개예요. 키보드와 마우스를 연결하기 좋아요.", x: 70.4, y: 40, w: 16.9, h: 13.4, fill: "#374151" },
  { id: "power", name: "USB-C 전원", detail: "보드에 전기를 공급해요.", x: 7, y: 49.5, w: 8.7, h: 7.5, fill: "#D1D5DB" },
  { id: "hdmi0", name: "micro-HDMI 0", detail: "모니터를 연결해요. USB-C에 가까운 쪽이에요.", x: 22.7, y: 49, w: 6.6, h: 7.5, fill: "#D1D5DB" },
  { id: "hdmi1", name: "micro-HDMI 1", detail: "두 번째 모니터를 연결할 수 있어요.", x: 36.2, y: 49, w: 6.6, h: 7.5, fill: "#D1D5DB" },
  { id: "csi", name: "카메라 단자 (CSI)", detail: "리본 케이블로 카메라 모듈을 연결해요.", x: 43.5, y: 33, w: 3, h: 22.5, fill: "#F5F5F4" },
  { id: "dsi", name: "디스플레이 단자 (DSI)", detail: "리본 케이블로 호환 디스플레이를 연결해요.", x: 1.4, y: 16.6, w: 3.8, h: 23, fill: "#F5F5F4" },
  { id: "audio", name: "3.5mm 오디오·영상", detail: "이어폰이나 스피커를 연결해요.", x: 50.7, y: 44, w: 6.6, h: 14, fill: "#1F2937" },
];

const HOLES = [
  [3.5, 3.5],
  [61.5, 3.5],
  [3.5, 52.5],
  [61.5, 52.5],
];

/**
 * 라즈베리파이 4 Model B 윗면 그림. 부품 위치는 공식 기계 도면의 치수를 따른다.
 * focus 로 고른 부품만 강조하고, 나머지 부품도 눌러서 설명을 볼 수 있다.
 */
export function PiBoard({
  focus = [],
  title,
}: {
  focus?: string[];
  title: string;
}) {
  const [picked, setPicked] = useState<string | null>(focus[0] ?? null);
  const active = REGIONS.find((region) => region.id === picked);
  const lit = (id: string) =>
    picked ? picked === id : focus.length === 0 || focus.includes(id);

  return (
    <figure className="my-8 px-3 py-4 sm:px-5" style={{ ...doodleBox, color: ink }}>
      <figcaption className="mb-3 text-lg font-bold">{title}</figcaption>
      <svg
        viewBox="-2 -2 93 63"
        role="group"
        aria-label={`${title}. 부품을 누르면 설명이 나와요.`}
        className="block w-full"
      >
        <rect width="85" height="56" rx="3" fill="#2F855A" stroke={ink} strokeWidth="0.5" />
        {HOLES.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.35" fill="#FFFDF7" stroke="#D4A017" strokeWidth="0.6" />
        ))}
        {REGIONS.map((region) => (
          <g
            key={region.id}
            role="button"
            tabIndex={0}
            aria-label={region.name}
            aria-pressed={picked === region.id}
            onClick={() => setPicked(region.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setPicked(region.id);
              }
            }}
            className="cursor-pointer outline-none"
            opacity={lit(region.id) ? 1 : 0.35}
          >
            <rect
              x={region.x}
              y={region.y}
              width={region.w}
              height={region.h}
              rx="0.6"
              fill={region.fill}
              fillOpacity={region.back ? 0.55 : 1}
              stroke={picked === region.id ? sky : ink}
              strokeWidth={picked === region.id ? 0.9 : 0.3}
              strokeDasharray={region.back ? "1 0.7" : undefined}
            />
          </g>
        ))}
      </svg>
      <div className="mt-3 rounded-xl p-3" style={{ backgroundColor: accent }} aria-live="polite">
        <p className="font-bold">{active ? active.name : "부품을 눌러 보세요"}</p>
        <p className="leading-relaxed">
          {active ? active.detail : "그림 속 부품을 누르면 이름과 하는 일이 나와요."}
        </p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {REGIONS.map((region) => (
          <button
            key={region.id}
            type="button"
            aria-pressed={picked === region.id}
            onClick={() => setPicked(region.id)}
            className="border-2 px-2 py-1 text-sm font-bold"
            style={{
              borderColor: ink,
              borderRadius: doodleButtonRadius,
              backgroundColor: picked === region.id ? sky : "#fff",
              color: picked === region.id ? "#fff" : ink,
            }}
          >
            {region.name}
          </button>
        ))}
      </div>
    </figure>
  );
}
