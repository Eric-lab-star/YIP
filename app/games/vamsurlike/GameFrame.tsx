"use client";

import { useRef, useState } from "react";
import { Maximize2, RotateCcw } from "lucide-react";

const ink = "#263D5B";
const sky = "#49B6E5";
const paper = "#FFFDF7";

// Irregular radii give the frame the same hand-drawn feel as the landing page.
const doodleBox: React.CSSProperties = {
  border: `2.5px solid ${ink}`,
  borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
};

export default function GameFrame() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  // Bumping this key remounts the iframe, restarting the Godot game from a
  // fresh load — useful after the in-game "종료" button tears down the engine.
  const [runId, setRunId] = useState(0);

  const goFullscreen = () => {
    frameRef.current?.requestFullscreen();
    frameRef.current?.focus();
  };

  const restart = () => {
    setRunId((n) => n + 1);
    frameRef.current?.focus();
  };

  return (
    <div className="mt-6">
      <div className="overflow-hidden bg-black" style={doodleBox}>
        <iframe
          key={runId}
          ref={frameRef}
          src="/games/vamsurlike/index.html"
          title="뱀서라이크 게임"
          className="block aspect-video w-full"
          allow="fullscreen; autoplay"
        />
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 text-base">
        <span>화면을 한 번 클릭하면 키보드 조작이 시작돼요.</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={restart}
            className="flex items-center gap-2 px-4 py-1.5 font-bold transition-transform hover:-translate-y-0.5"
            style={{ ...doodleBox, backgroundColor: paper, color: ink }}
          >
            <RotateCcw className="size-4" />
            다시 시작
          </button>
          <button
            type="button"
            onClick={goFullscreen}
            className="flex items-center gap-2 px-4 py-1.5 font-bold transition-transform hover:-translate-y-0.5"
            style={{ ...doodleBox, backgroundColor: sky, color: "#fff" }}
          >
            <Maximize2 className="size-4" />
            전체화면
          </button>
        </div>
      </div>
    </div>
  );
}
