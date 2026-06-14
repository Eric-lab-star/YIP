import Image from "next/image";
import type { ReactNode } from "react";
import { ink, cream, doodleBoxImage } from "./doodle";

const CAT_IMG = "https://r2.kimkyungsub.com/AIDeveloper/Coolonfident.png";

/**
 * 코딩냥(고양이 선생님)의 말풍선. MDX 본문에 캐릭터의 설명 대사를 넣을 때 쓴다.
 * children 은 마크다운으로 작성하면 되고, 좌측 아바타 + 손그림 말풍선으로 렌더된다.
 */
export function NyangSpeech({ children }: { children: ReactNode }) {
  return (
    <div className="my-7 flex items-start gap-3">
      <Image
        src={CAT_IMG}
        alt="코딩냥"
        width={100}
        height={100}
        className="mt-1 shrink-0 rounded-full object-cover"
        aria-hidden
      />
      <div
        className="relative flex-1 px-5 py-4 text-lg leading-[1.8]"
        style={{
          ...doodleBoxImage,
          backgroundColor: cream,
        }}
      >
        {/* 말풍선 꼬리 — 아바타 쪽을 향하는 작은 삼각형 */}
        <span
          aria-hidden
          className="absolute -left-[10px] top-5"
          style={{ lineHeight: 0 }}
        >
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
            {/* ① cream 채움 — 본체 테두리선을 살짝 덮어 '입구'를 뚫어줌 */}
            <path d="M14 3 Q5 8 1.5 10 Q5 12 14 17" fill={cream} />
            {/* ② 바깥 두 선만 ink로 — 본체와 닿는 오른쪽은 비워서 자연스럽게 연결 */}
            <path
              d="M14 3 Q5 8 1.5 10 Q5 12 14 17"
              fill="none"
              stroke={ink}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {children}
      </div>
    </div>
  );
}
