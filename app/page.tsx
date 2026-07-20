import {
  ArrowUpRight,
  Gamepad2,
  BarChart3,
  Bot,
  Cpu,
  Sparkles,
  Star,
} from "lucide-react";
import Link from "next/link";
import { CatIcon } from "@/components/mdx/CatIcon";

/* ── Doodle design tokens ─────────────────────────────────────── */
const ink = "#263D5B"; // secondary — hand-drawn ink line / text
const sky = "#49B6E5"; // primary — playful accent
const paper = "#FFFDF7"; // warm notebook paper surface

// Irregular radii give every box a hand-drawn, "imperfect line" feel.
// Base tilt uses the standalone `rotate` CSS property (not `transform`) so it
// composes with Tailwind's `translate`/`rotate` hover utilities instead of
// overriding them — keeps the hover lift smooth and the tilt steady.
const doodleBox = (rot = 0): React.CSSProperties => ({
  border: `2.5px solid ${ink}`,
  borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
  rotate: `${rot}deg`,
});

const doodleBoxAlt = (rot = 0): React.CSSProperties => ({
  border: `2.5px solid ${ink}`,
  borderRadius: "15px 225px 15px 255px / 255px 15px 225px 15px",
  rotate: `${rot}deg`,
});

/* A wobbly hand-drawn underline. */
function Squiggle({
  color = sky,
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 300 14"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M3 8 Q 30 2, 58 7 T 116 7 Q 150 12, 184 6 T 242 7 Q 270 2, 297 8"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// No "use client" and no font-injecting effect: the root layout already loads
// this exact Google Fonts stylesheet in <head>, so the effect was fetching it a
// second time. Nothing here is interactive, so the page ships as a server
// component with no client JS.
export default function CodingAcademyLanding() {
  // Hand-written font for Korean body + headings (Gaegu), Latin display fallback.
  const handFont = {
    fontFamily: '"Gaegu", "Delius Swash Caps", "Comic Sans MS", cursive',
  };
  // Latin accent labels lean on the swashy display face.
  const swashFont = {
    fontFamily: '"Delius Swash Caps", "Gaegu", cursive',
  };
  const monoFont = {
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  };

  const programs = [
    {
      num: "01",
      icon: Gamepad2,
      color: sky,
      tag: "Game Development",
      title: "게임을 만들며 배우는 코딩",
      tech: "Python · pygame-ce",
      desc: "직접 만든 게임이 화면에서 움직이는 순간, 코딩은 더 이상 어려운 공부가 아니라 가장 재미있는 놀이가 됩니다. 캐릭터를 움직이고 충돌을 감지하고 점수를 계산하는 과정에서 변수, 반복문, 조건문, 객체지향이 자연스럽게 몸에 익습니다.",
      benefits: [
        "즉각적인 시각 피드백",
        "논리적 사고력 훈련",
        "창의력과 기획력 동시 성장",
      ],
    },
    {
      num: "02",
      icon: BarChart3,
      color: "#16A34A",
      tag: "Web Application",
      title: "데이터를 보여주는 웹사이트",
      tech: "Python · Streamlit",
      desc: 'Streamlit으로 단 몇 줄의 코드만으로 데이터 시각화 웹사이트를 완성합니다. 내가 분석한 데이터를 친구, 가족과 인터넷으로 공유하는 경험은 "내가 만든 결과물"의 의미를 새롭게 알려줍니다.',
      benefits: [
        "데이터 분석적 사고",
        "결과물 배포의 경험",
        "실용적인 도구 제작 능력",
      ],
    },
    {
      num: "03",
      icon: Bot,
      color: "#D97706",
      tag: "AI Service",
      title: "나만의 AI 챗봇 만들기",
      tech: "Python · LangChain",
      desc: "AI 시대에 가장 중요한 역량은 AI를 사용하는 것이 아니라 직접 만들어 보는 것입니다. LangChain으로 대형 언어 모델을 연결하고 프롬프트를 설계하며 나만의 AI 서비스를 구축해 봅니다.",
      benefits: [
        "AI 시대의 핵심 역량",
        "LLM 동작 원리 이해",
        "서비스 설계 경험",
      ],
    },
    {
      num: "04",
      icon: Cpu,
      color: "#DC2626",
      tag: "Embedded · Robotics",
      title: "코드로 움직이는 자동차와 로봇",
      tech: "ESP32 · MicroPython",
      desc: "화면 속 코드가 실제 세상에서 바퀴를 굴리고 LED를 깜빡이며 센서로 주변을 감지합니다. 하드웨어와 소프트웨어가 만나는 지점을 손으로 직접 만지며 배웁니다.",
      benefits: [
        "소프트웨어와 하드웨어의 융합",
        "문제 해결의 입체감",
        "메이커(Maker) 정신",
      ],
    },
  ];

  const reasons = [
    {
      num: "01",
      title: "문제 해결의 사고방식",
      desc: "복잡한 문제를 작은 단위로 쪼개고 단계적으로 해결하는 컴퓨팅 사고력은 어떤 분야에서도 통하는 평생 자산입니다.",
      rot: -1.2,
    },
    {
      num: "02",
      title: "만드는 사람의 자신감",
      desc: "소비하는 사람이 아니라 만드는 사람이 될 때, 학생은 세상을 보는 시선이 완전히 달라집니다.",
      rot: 1,
    },
    {
      num: "03",
      title: "AI 시대의 진짜 문해력",
      desc: "코드를 읽고 쓸 수 있는 사람만이 AI를 도구로 다룰 수 있습니다. 단순한 사용자가 아닌 창작자가 되는 길입니다.",
      rot: 0.8,
    },
    {
      num: "04",
      title: "실패를 즐기는 태도",
      desc: "코딩은 끊임없이 에러를 만나는 일입니다. 그 과정에서 실패를 두려워하지 않고 다시 시도하는 회복력이 자랍니다.",
      rot: -1,
    },
  ];

  return (
    <div
      className="min-h-screen antialiased"
      style={{
        ...handFont,
        color: ink,
        backgroundColor: paper,
        // Notebook dot-grid paper.
        backgroundImage: `radial-gradient(${ink}14 1.4px, transparent 1.4px)`,
        backgroundSize: "24px 24px",
      }}
    >
      <CatIcon size={100} />
      {/* Hero */}
      <section>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div
            className="inline-flex items-center gap-2 mb-10 px-4 py-1.5 bg-white text-base"
            style={{ ...doodleBox(-1.5), ...swashFont }}
          >
            <Sparkles className="w-4 h-4" style={{ color: sky }} />
            Code · Create · Play
          </div>

          <h1
            className="text-5xl md:text-7xl lg:text-[110px] leading-[1.05]"
            style={{ ...handFont, fontWeight: 700 }}
          >
            코드로 만드는
            <br />
            <span className="relative inline-block" style={{ color: sky }}>
              작은 세계.
              <Squiggle
                color={ink}
                className="absolute -bottom-3 left-0 w-full h-3.5"
              />
            </span>
          </h1>

          <p className="mt-12 max-w-xl text-2xl leading-relaxed">
            게임, 웹사이트, AI 챗봇, 그리고 움직이는 로봇까지 — Python 하나로 ✏️
          </p>

          <div className="mt-14 flex flex-wrap items-center gap-6">
            <Link
              href="#programs"
              className="inline-flex items-center gap-2 px-8 h-14 text-xl text-white"
              style={{ ...doodleBox(-1), backgroundColor: ink }}
            >
              <span>프로그램 둘러보기</span>
              <ArrowUpRight className="w-5 h-5" strokeWidth={2.25} />
            </Link>
            <Link href="#why" className="relative text-xl">
              교육 철학 알아보기
              <Squiggle
                color={sky}
                className="absolute -bottom-2 left-0 w-full h-2.5"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { v: "4+", l: "Project Tracks", rot: -1.5 },
              { v: "100%", l: "Project Based", rot: 1.2 },
              { v: "Python", l: "Powerful Language", rot: -0.8 },
            ].map((s) => (
              <div
                key={s.l}
                className="bg-white px-8 py-8 text-center"
                style={doodleBox(s.rot)}
              >
                <div
                  className="text-4xl md:text-5xl"
                  style={{ ...handFont, fontWeight: 700, color: sky }}
                >
                  {s.v}
                </div>
                <div
                  className="mt-3 text-sm tracking-[0.2em] uppercase"
                  style={{ ...monoFont, color: ink }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <div className="mb-16 flex items-center gap-3">
            <Star className="w-6 h-6" style={{ color: sky }} fill={sky} />
            <span
              className="text-base tracking-[0.25em] uppercase"
              style={{ ...swashFont, color: ink }}
            >
              Programs
            </span>
          </div>
          <h2
            className="text-4xl md:text-6xl max-w-3xl leading-[1.15] mb-20"
            style={{ ...handFont, fontWeight: 700 }}
          >
            네 가지 트랙,
            <br />
            <span style={{ color: sky }}>하나의 언어로 시작하는 여정.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programs.map((p, i) => {
              const Icon = p.icon;
              const rot = i % 2 === 0 ? -0.8 : 0.8;
              return (
                <div
                  key={p.num}
                  className="bg-white p-8 lg:p-10"
                  style={i % 2 === 0 ? doodleBox(rot) : doodleBoxAlt(rot)}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="inline-flex w-14 h-14 items-center justify-center text-white"
                      style={{
                        ...doodleBox(rot * -2),
                        backgroundColor: p.color,
                      }}
                    >
                      <Icon className="w-7 h-7" strokeWidth={2} />
                    </span>
                    <span
                      className="text-3xl"
                      style={{ ...swashFont, color: `${ink}55` }}
                    >
                      {p.num}
                    </span>
                  </div>

                  <div
                    className="inline-block text-sm tracking-[0.15em] uppercase mb-3 px-3 py-1"
                    style={{
                      ...monoFont,
                      color: p.color,
                      border: `2px dashed ${p.color}`,
                      borderRadius: "12px 4px 12px 4px / 4px 12px 4px 12px",
                    }}
                  >
                    {p.tag}
                  </div>

                  <h3
                    className="text-3xl md:text-4xl mb-3 leading-tight"
                    style={{ ...handFont, fontWeight: 700 }}
                  >
                    {p.title}
                  </h3>
                  <div
                    className="text-sm tracking-[0.1em] mb-5 uppercase"
                    style={{ ...monoFont, color: `${ink}99` }}
                  >
                    {p.tech}
                  </div>
                  <p className="text-lg leading-[1.7] mb-7">{p.desc}</p>

                  <ul
                    className="space-y-3 pt-6"
                    style={{ borderTop: `2px dashed ${ink}33` }}
                  >
                    {p.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-lg">
                        <span style={{ color: p.color }}>✦</span>
                        <span className="leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Code */}
      <section id="why">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <div className="mb-12 flex items-center gap-3">
            <Sparkles className="w-6 h-6" style={{ color: sky }} />
            <span
              className="text-base tracking-[0.25em] uppercase"
              style={{ ...swashFont, color: ink }}
            >
              Why Code
            </span>
          </div>
          <h2
            className="text-4xl md:text-6xl max-w-3xl leading-[1.15]"
            style={{ ...handFont, fontWeight: 700 }}
          >
            왜 지금,
            <br />
            <span style={{ color: sky }}>아이들에게 코딩일까요?</span>
          </h2>
          <p className="mt-10 max-w-2xl text-xl leading-[1.7] mb-16">
            코딩 교육은 직업 훈련이 아닙니다. 세상을 이해하고, 만들고, 바꿀 수
            있는 사람으로 자라기 위한 가장 좋은 도구 중 하나입니다. 💡
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reasons.map((r, i) => (
              <div
                key={r.num}
                className="bg-white p-9 lg:p-11"
                style={i % 2 === 0 ? doodleBox(r.rot) : doodleBoxAlt(r.rot)}
              >
                <div
                  className="inline-flex w-12 h-12 items-center justify-center mb-6 text-xl text-white"
                  style={{ ...doodleBoxAlt(-r.rot * 2), backgroundColor: sky }}
                >
                  {r.num}
                </div>
                <h3
                  className="text-2xl md:text-[30px] mb-4"
                  style={{ ...handFont, fontWeight: 700 }}
                >
                  {r.title}
                </h3>
                <p className="text-lg leading-[1.75]">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
