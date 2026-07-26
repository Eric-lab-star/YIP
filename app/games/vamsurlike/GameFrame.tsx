"use client";

import { useRef, useState } from "react";
import { Maximize2, Play, RotateCcw } from "lucide-react";

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
  // The iframe is not mounted until the visitor asks for it. Godot's web export
  // is 9.3MB of wasm plus a 1.4MB pack, and mounting the iframe up front made
  // the browser fetch all of it on page entry: 11.4MB transferred, 9.0s of
  // script evaluation, and a single 8.1s long task that froze the whole page
  // (measured TBT 7,880ms, TTI 10.2s). Nobody who is only reading the page
  // should pay that.
  const [started, setStarted] = useState(false);
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

  const start = () => {
    setStarted(true);
    // The iframe only exists after this render, so focus on the next frame.
    requestAnimationFrame(() => frameRef.current?.focus());
  };

  return (
    <div className="mt-6">
      <div className="overflow-hidden bg-black" style={doodleBox}>
        {started ? (
          <iframe
            key={runId}
            ref={frameRef}
            src="/games/vamsurlike/index.html"
            title="뱀서라이크 게임"
            className="block aspect-video w-full"
            allow="fullscreen; autoplay"
          />
        ) : (
          // Same aspect-video box as the iframe, so starting the game does not
          // move anything on the page.
          <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 px-6 text-center">
            <button
              type="button"
              onClick={start}
              className="flex items-center gap-2 px-6 py-2.5 text-lg font-bold transition-transform hover:-translate-y-0.5 sm:text-xl"
              style={{ ...doodleBox, backgroundColor: sky, color: "#fff" }}
            >
              <Play className="size-5" />
              게임 시작
            </button>
            {/* Kept short on purpose: the box is `aspect-video` with
                overflow-hidden, so at 320px it is only ~149px tall and a
                third line of copy would be clipped rather than scrolled. */}
            <p className="text-sm sm:text-base" style={{ color: `${paper}b0` }}>
              게임 파일 약 11MB를 내려받아요. 와이파이를 권장해요.
            </p>
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 text-base">
        <span>
          {started ? "화면을 한 번 클릭하면 키보드 조작이 시작돼요." : ""}
        </span>
        {/* Restart and fullscreen act on the iframe, so they only exist once
            there is one. */}
        {started && (
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
        )}
      </div>
    </div>
  );
}
