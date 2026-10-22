import { doodleBox, accent } from "./doodle";

/**
 * 절(섹션) 시작에 놓는 짧은 스토리 클립 플레이어.
 *
 * 라즈베리파이 교재의 "하나와 도윤" 시리즈처럼, 번호 절이 시작될 때
 * 15초 안팎의 이야기 영상으로 흥미를 끌고 내레이션이 그 절의 학습
 * 포인트를 말해 준다. 페이지 상단의 본 영상(VideoLesson)과 달리 본문
 * 흐름 안에 작게 앉는 인라인 플레이어라서 기본 컨트롤만 쓴다.
 *
 * preload="metadata": 한 페이지에 클립이 10개 놓이므로 눌렀을 때만
 * 본편을 받는다. 첫 화면 썸네일은 metadata의 첫 프레임으로 충분하다.
 */
export function SectionClip({ src, title }: { src: string; title: string }) {
  return (
    <figure
      className="my-6 overflow-hidden p-1.5 sm:p-2"
      style={{ ...doodleBox, backgroundColor: accent }}
    >
      <video
        src={src}
        controls
        playsInline
        preload="metadata"
        aria-label={title}
        className="w-full rounded-xl bg-black"
      />
    </figure>
  );
}
