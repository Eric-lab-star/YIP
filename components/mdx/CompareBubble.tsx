import { doodleBox, palette, ink } from "./doodle";

type Side = {
  /**
   * 선택 사항. 강의 콘텐츠에는 이모지를 쓰지 않으므로(CLAUDE.md) 호출부는
   * 이 값을 넘기지 않는다. 없으면 아이콘 칸 자체를 그리지 않아, 라벨 앞에
   * 빈 자리가 남지 않는다.
   */
  emoji?: string;
  label: string;
  color?: string; // palette key (blue/purple/green…) or hex
  items: string[];
};

function resolve(color?: string) {
  if (!color) return ink;
  return palette[color] ?? color;
}

function Column({ side }: { side: Side }) {
  const c = resolve(side.color);
  return (
    <div
      className="flex flex-col px-5 py-4"
      style={{ ...doodleBox, borderColor: c, backgroundColor: "#ffffff" }}
    >
      <div
        className="mb-3 flex items-center gap-2 text-xl font-bold"
        style={{ color: c }}
      >
        {side.emoji && (
          <span aria-hidden className="text-2xl">
            {side.emoji}
          </span>
        )}
        <span>{side.label}</span>
      </div>
      <ul className="space-y-2">
        {side.items.map((item, i) => (
          <li key={i} className="flex gap-2 text-base leading-[1.6]">
            <span aria-hidden style={{ color: c }}>
              ✦
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Two side-by-side comparison cards (예: 제미나이 앱 vs API). */
export function CompareBubble({ left, right }: { left: Side; right: Side }) {
  return (
    <div className="my-8 grid gap-4 md:grid-cols-2">
      <Column side={left} />
      <Column side={right} />
    </div>
  );
}
