import type { CSSProperties } from "react";

/* ── Doodle tokens (mirror app/styles/theme.css) ──────────────────────
   primary=sky · ink line/text · paper background, plus a few accent
   tints reused across the hand-drawn MDX components below. */

export const ink = "#263D5B";
export const sky = "#49B6E5";
export const paper = "#FFFDF7";
export const accent = "#E6F4FB"; // sky tint
export const cream = "#FFF6E9"; // warm paper

/** Named accents so MDX authors can write `color="purple"` etc. */
export const palette: Record<string, string> = {
  sky,
  blue: sky,
  ink,
  purple: "#8B5CF6",
  green: "#16A34A",
  orange: "#D97706",
  red: "#DC2626",
  pink: "#DB2777",
};

/* ── 방식 A: border-radius (드롭인 수정) ─────────────────────────────────
   기존 값(255px/225px)은 박스가 납작할 때 브라우저가 비율을 맞춰
   강제로 찌그러뜨려서(clamping) 남색 띠가 생겼음.
   한 변의 반지름 합이 작아지도록 값을 줄이면 어떤 높이에서도 안전.
   손그림 느낌(비대칭)은 그대로 유지됨. */
export const doodleBox: CSSProperties = {
  border: `2.5px solid ${ink}`,
  borderRadius: "36px 14px 30px 14px / 14px 30px 14px 36px",
};

/* ── 방식 B: border-image (크기 무관, 절대 안 깨짐) ──────────────────────
   살짝 흔들리는(wobbly) 둥근 사각형을 SVG로 그려서 테두리에 입힘.
   박스가 늘어나거나 납작해져도 모양만 스트레치될 뿐 clamping이 없음. */

// 가장자리를 따라 살짝 흔들리는 둥근 사각형 path (64x64 기준)
const WOBBLE_PATH =
  "M13 7 Q22 5 32 6 Q42 4 51 7 " + // 윗변: 물결처럼 두 번 출렁
  "Q58 7 57 15 " + // 우상단 모서리
  "Q59 24 57 32 Q60 41 58 50 " + // 오른변: 안팎으로 살짝 흔들
  "Q58 58 50 57 " + // 우하단 모서리
  "Q41 60 32 58 Q22 60 14 57 " + // 아랫변: 출렁출렁
  "Q6 58 7 50 " + // 좌하단 모서리
  "Q5 41 7 32 Q4 23 6 14 " + // 왼변: 흔들
  "Q6 6 13 7 Z"; // 좌상단 모서리 → 시작점으로

/** ink 색(또는 원하는 색)으로 손그림 테두리 SVG를 data URI로 만들어 줌. */
export function doodleBorderImage(stroke: string = ink): string {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' ` +
    `viewBox='0 0 64 64' preserveAspectRatio='none'>` +
    `<path d='${WOBBLE_PATH}' fill='none' stroke='${stroke}' ` +
    `stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/** doodleBox와 똑같이 쓰되, 어떤 크기에서도 안 찌그러지는 버전.
 *  ⚠️ border-image는 안쪽 padding 위에 그려지므로,
 *     padding은 12px(=py-3) 이상 유지하는 걸 권장 (지금 py-4면 충분). */
export const doodleBoxImage: CSSProperties = {
  border: "3px solid transparent",
  borderImageSource: doodleBorderImage(),
  borderImageSlice: 12,
  borderImageWidth: "12px",
  borderImageRepeat: "stretch",
};
