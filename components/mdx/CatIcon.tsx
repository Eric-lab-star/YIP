import Image from "next/image";

const BASE_URL = "https://r2.kimkyungsub.com/AIDeveloper";
const COOL = `${BASE_URL}/Coolonfident.png`;
const BIG_SMILE = `${BASE_URL}/big_smile.png`;
const WALK = `${BASE_URL}/orange-cat-walking.png`;

const kind = {
  BIG_SMILE,
  COOL,
  WALK,
};
/** 인라인 캐릭터 이미지 — 텍스트/제목 안에 고양이를 넣고 싶을 때 쓴다냥.
 *  강의 콘텐츠에는 이모지를 쓰지 않으므로(CLAUDE.md) 이걸로 대신한다. */
export function CatIcon({
  size = 100,
  src = "COOL",
}: {
  size?: number;
  src?: "BIG_SMILE" | "COOL" | "WALK";
}) {
  return (
    <Image
      src={kind[src]}
      alt="코딩냥"
      width={size}
      height={size}
      className="inline-block align-middle object-cover rounded-full"
      aria-hidden
    />
  );
}
