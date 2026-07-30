import type { ReactNode } from "react";
import CopyCodeBlock from "@/components/mdx/CopyCodeBlock";
import {
  PYTHON_PACKAGES,
  type PythonPackageId,
} from "@/utils/pythonPackages";
import { doodleBox, ink, sky } from "./doodle";

/** 설치 도구. 대부분의 강의는 pip, 우주선 선장 만들기는 uv 를 쓴다. */
type InstallTool = "pip" | "uv";

/**
 * 실습에 필요한 패키지의 이름·최소 버전·설치 명령·설치 확인 명령을 한 상자에
 * 보여준다. 버전과 설명은 `utils/pythonPackages.ts` 한 곳에서 온다.
 *
 * ```mdx
 * <PackageInstall packages={["pandas", "matplotlib"]} />
 * <PackageInstall packages={["pygame-ce"]} tool="uv">
 *   프로젝트 폴더 안에서 실행해야 한다냥.
 * </PackageInstall>
 * ```
 */
export function PackageInstall({
  packages,
  tool = "pip",
  children,
}: {
  packages: PythonPackageId[];
  tool?: InstallTool;
  children?: ReactNode;
}) {
  const list = packages.map((id) => PYTHON_PACKAGES[id]);
  const specs = list.map((p) => `"${p.pip}>=${p.min}"`).join(" ");

  const installCmd =
    tool === "uv" ? `uv add ${specs}` : `pip install ${specs}`;
  const runner = tool === "uv" ? "uv run python" : "python";
  const checkCmd = list.map((p) => `${runner} -c "${p.check}"`).join("\n");

  return (
    <div className="my-8 px-6 py-5" style={{ ...doodleBox }}>
      <div
        className="-mx-6 -mt-5 mb-4 flex flex-wrap items-center gap-2 rounded-t-[14px] px-6 py-3 text-lg font-bold"
        style={{ backgroundColor: sky, color: "#fff" }}
      >
        <span>실습 준비</span>
        <span aria-hidden style={{ opacity: 0.7 }}>
          ·
        </span>
        <span>필요한 패키지와 버전</span>
      </div>

      <ul className="my-0 list-none space-y-2 pl-0 text-lg" style={{ color: ink }}>
        {list.map((p) => (
          <li key={p.pip} className="flex flex-wrap items-baseline gap-x-2">
            <code
              className="rounded-md px-2 py-0.5 font-mono text-base"
              style={{ backgroundColor: "#E6F4FB" }}
            >
              {p.pip}
            </code>
            <span
              className="rounded-full border px-2 py-0.5 text-sm font-bold"
              style={{ borderColor: sky, color: sky }}
            >
              {p.min} 이상
            </span>
            <span>{p.what}</span>
          </li>
        ))}
      </ul>

      <p className="mb-2 mt-5 text-lg font-bold" style={{ color: ink }}>
        설치하기 — 터미널에 그대로 붙여넣기
      </p>
      <CopyCodeBlock code={installCmd} language="bash" />

      <p className="mb-2 mt-5 text-lg font-bold" style={{ color: ink }}>
        설치 확인 — 버전 번호가 찍히면 성공
      </p>
      <CopyCodeBlock code={checkCmd} language="bash" />

      <p className="mt-4 text-base leading-[1.7]" style={{ color: ink }}>
        위 버전은 <strong>최소 기준</strong>이라, 더 높은 버전이 깔려 있으면
        그대로 써도 된다냥. 버전이 안 찍히고 에러가 나면 설치가 안 된 거라
        설치 명령을 다시 실행해보자냥.
      </p>

      {children && (
        <div className="mt-3 text-base leading-[1.7]" style={{ color: ink }}>
          {children}
        </div>
      )}
    </div>
  );
}
