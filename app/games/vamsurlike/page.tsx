import type { Metadata } from "next";
import GameFrame from "./GameFrame";

export const metadata: Metadata = {
  title: "뱀서라이크 게임",
  description:
    "YIP에서 만든 뱀파이어 서바이버 스타일 2D 생존 게임을 브라우저에서 바로 플레이해 보세요. Godot 엔진으로 제작했습니다.",
  alternates: {
    canonical: "https://yipcode.xyz/games/vamsurlike",
  },
};

const ink = "#263D5B";
const paper = "#FFFDF7";

const handFont = {
  fontFamily: '"Gaegu", "Delius Swash Caps", "Comic Sans MS", cursive',
};

export default function VamsurlikePage() {
  return (
    <div
      className="min-h-screen px-4 py-8 sm:px-6"
      style={{ ...handFont, color: ink, backgroundColor: paper }}
    >
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold sm:text-4xl">🧛 뱀서라이크</h1>
        <p className="mt-2 text-lg">
          몰려오는 몬스터를 피해 10분간 살아남으세요! 이동은{" "}
          <span className="font-bold">WASD / 방향키</span>, 공격은 자동입니다.
          레벨 업마다 무기와 능력을 골라 성장하세요. (키보드가 필요한
          게임이에요)
        </p>
        <GameFrame />
      </div>
    </div>
  );
}
