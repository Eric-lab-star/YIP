"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  MessageSquareText,
} from "lucide-react";

export interface Slide {
  title: string;
  content: React.ReactNode;
  bg: string;
  script: string;
}

export const CodeBlock = ({ children }: { children: string }) => (
  <pre className="bg-gray-900 text-green-300 rounded-xl p-5 text-base sm:text-lg font-mono overflow-x-auto leading-relaxed">
    <code>{children}</code>
  </pre>
);

export default function SlideShell({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showScript, setShowScript] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = slides.length;

  const goNext = useCallback(() => {
    setCurrent((c) => Math.min(c + 1, total - 1));
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrent((c) => Math.max(c - 1, 0));
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      } else if (e.key === "s" || e.key === "S") {
        setShowScript((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev, toggleFullscreen]);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const slide = slides[current];

  return (
    <div
      ref={containerRef}
      className={`w-full h-full bg-gradient-to-br ${slide.bg} flex flex-col select-none`}
    >
      <div className="flex items-center justify-between px-8 pt-6 pb-2">
        <div className="text-sm text-gray-400 font-mono">
          {current + 1} / {total}
        </div>
        {slide.title && (
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center flex-1">
            {slide.title}
          </h2>
        )}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowScript((v) => !v)}
            className={`transition-colors p-2 ${showScript ? "text-orange-500" : "text-gray-400 hover:text-gray-600"}`}
            aria-label="Toggle script (S)"
            title="강의 스크립트 (S)"
          >
            <MessageSquareText size={22} />
          </button>
          <button
            onClick={toggleFullscreen}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize size={22} /> : <Maximize size={22} />}
          </button>
        </div>
      </div>

      <div className="flex-1 px-8 sm:px-16 lg:px-24 py-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto h-full">{slide.content}</div>
      </div>

      {showScript && (
        <div className="mx-8 mb-2 bg-gray-900/90 text-gray-100 rounded-xl p-5 text-base leading-relaxed max-h-36 overflow-y-auto">
          <p className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">
            강의 스크립트
          </p>
          {slide.script}
        </div>
      )}

      <div className="flex items-center justify-between px-8 pb-6">
        <button
          onClick={goPrev}
          disabled={current === 0}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-lg"
        >
          <ChevronLeft size={24} />
          이전
        </button>

        <div className="flex-1 mx-8 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-400 rounded-full transition-all duration-300"
            style={{ width: `${((current + 1) / total) * 100}%` }}
          />
        </div>

        <button
          onClick={goNext}
          disabled={current === total - 1}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-lg"
        >
          다음
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
