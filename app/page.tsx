"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Gamepad2, BarChart3, Bot, Cpu } from "lucide-react";
import Link from "next/link";

export default function CodingAcademyLanding() {
  useEffect(() => {
    if (!document.getElementById("pretendard-font")) {
      const link = document.createElement("link");
      link.id = "pretendard-font";
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/static/pretendard.min.css";
      document.head.appendChild(link);
    }
    if (!document.getElementById("serif-font")) {
      const link = document.createElement("link");
      link.id = "serif-font";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const sansFont = {
    fontFamily:
      '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
  };
  const serifFont = { fontFamily: '"Nanum Myeongjo", "Noto Serif KR", serif' };
  const monoFont = {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  };

  const programs = [
    {
      num: "01",
      icon: Gamepad2,
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
    },
    {
      num: "02",
      title: "만드는 사람의 자신감",
      desc: "소비하는 사람이 아니라 만드는 사람이 될 때, 학생은 세상을 보는 시선이 완전히 달라집니다.",
    },
    {
      num: "03",
      title: "AI 시대의 진짜 문해력",
      desc: "코드를 읽고 쓸 수 있는 사람만이 AI를 도구로 다룰 수 있습니다. 단순한 사용자가 아닌 창작자가 되는 길입니다.",
    },
    {
      num: "04",
      title: "실패를 즐기는 태도",
      desc: "코딩은 끊임없이 에러를 만나는 일입니다. 그 과정에서 실패를 두려워하지 않고 다시 시도하는 회복력이 자랍니다.",
    },
  ];

  return (
    <div
      className="min-h-screen bg-white text-zinc-900 antialiased"
      style={sansFont}
    >
      {/* Navigation */}
      <header className="border-b border-zinc-200 sticky hidden sm:block sm:top-15 bg-white/80 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
          <nav className="hidden md:flex items-center gap-10 text-sm text-zinc-600">
            <Link href="#programs" className="hover:text-zinc-900 transition">
              프로그램
            </Link>
            <Link href="#why" className="hover:text-zinc-900 transition">
              교육 철학
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-36">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-2"></div>
            <div className="col-span-12 lg:col-span-10">
              <h1
                className="text-5xl md:text-7xl lg:text-[112px] leading-[1.05] tracking-tight"
                style={serifFont}
              >
                코드로 만드는
                <br />
                <span className="text-zinc-400">작은 세계.</span>
              </h1>
              <p className="mt-12 max-w-xl text-lg text-zinc-600 leading-relaxed">
                게임, 웹사이트, AI 챗봇, 그리고 움직이는 로봇까지 Python 하나로
              </p>
              <div className="mt-14 flex items-center gap-6">
                <Button
                  asChild
                  className="rounded-none bg-zinc-900 hover:bg-zinc-800 text-white px-8 h-12 text-sm tracking-[0.15em] uppercase"
                >
                  <Link href="#programs">
                    <span>프로그램 둘러보기</span>
                    <ArrowUpRight className="ml-2 w-4 h-4" strokeWidth={1.5} />
                  </Link>
                </Button>
                <Link
                  href="#why"
                  className="text-sm text-zinc-600 hover:text-zinc-900 underline underline-offset-[6px] decoration-zinc-300 hover:decoration-zinc-900 transition"
                >
                  교육 철학 알아보기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { v: "4+", l: "Project Tracks" },
            { v: "100%", l: "Project Based" },
            { v: "Python", l: "Powerful Language" },
          ].map((s) => (
            <div key={s.l}>
              <div
                className="text-4xl md:text-5xl tracking-tight"
                style={serifFont}
              >
                {s.v}
              </div>
              <div className="mt-3 text-[11px] tracking-[0.25em] uppercase text-zinc-500">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-28">
          <div className="grid grid-cols-12 gap-6 mb-24">
            <div className="col-span-12 lg:col-span-2">
              <div className="text-xs tracking-[0.25em] text-zinc-400 uppercase pt-3">
                Programs
              </div>
            </div>
            <div className="col-span-12 lg:col-span-10">
              <h2
                className="text-4xl md:text-6xl tracking-tight max-w-3xl leading-[1.1]"
                style={serifFont}
              >
                네 가지 트랙,
                <br />
                <span className="text-zinc-400">
                  하나의 언어로 시작하는 여정.
                </span>
              </h2>
            </div>
          </div>

          <div>
            {programs.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.num}
                  className="grid grid-cols-12 gap-6 py-14 border-t border-zinc-200 group hover:bg-zinc-50/40 transition-colors"
                >
                  <div className="col-span-12 lg:col-span-2">
                    <div className="text-xs tracking-[0.25em] text-zinc-400">
                      {p.num}
                    </div>
                    <Icon
                      className="w-7 h-7 mt-6 text-zinc-700 group-hover:text-zinc-900 transition"
                      strokeWidth={1.25}
                    />
                  </div>
                  <div className="col-span-12 lg:col-span-6">
                    <div className="text-[11px] tracking-[0.25em] uppercase text-zinc-500 mb-4">
                      {p.tag}
                    </div>
                    <h3
                      className="text-3xl md:text-4xl tracking-tight mb-4 leading-tight"
                      style={serifFont}
                    >
                      {p.title}
                    </h3>
                    <div
                      className="text-[11px] tracking-[0.2em] text-zinc-400 mb-7 uppercase"
                      style={monoFont}
                    >
                      {p.tech}
                    </div>
                    <p className="text-zinc-600 leading-[1.8]">{p.desc}</p>
                  </div>
                  <div className="col-span-12 lg:col-span-4 lg:pl-10 lg:border-l lg:border-zinc-200">
                    <div className="text-[11px] tracking-[0.25em] uppercase text-zinc-400 mb-5">
                      What students gain
                    </div>
                    <ul className="space-y-4">
                      {p.benefits.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-4 text-sm text-zinc-700"
                        >
                          <span className="w-5 h-px bg-zinc-400 mt-2.5 shrink-0"></span>
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Code */}
      <section id="why" className="border-b border-zinc-200 bg-zinc-50/60">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-28">
          <div className="grid grid-cols-12 gap-6 mb-20">
            <div className="col-span-12 lg:col-span-2">
              <div className="text-xs tracking-[0.25em] text-zinc-400 uppercase pt-3">
                Why Code
              </div>
            </div>
            <div className="col-span-12 lg:col-span-10">
              <h2
                className="text-4xl md:text-6xl tracking-tight max-w-3xl leading-[1.1]"
                style={serifFont}
              >
                왜 지금,
                <br />
                <span className="text-zinc-400">아이들에게 코딩일까요?</span>
              </h2>
              <p className="mt-10 max-w-2xl text-zinc-600 leading-[1.8]">
                코딩 교육은 직업 훈련이 아닙니다. 세상을 이해하고, 만들고, 바꿀
                수 있는 사람으로 자라기 위한 가장 좋은 도구 중 하나입니다.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200">
            {reasons.map((r) => (
              <div key={r.num} className="bg-white p-10 lg:p-12">
                <div className="text-xs tracking-[0.25em] text-zinc-400 mb-8">
                  {r.num}
                </div>
                <h3
                  className="text-2xl md:text-[28px] mb-5 tracking-tight"
                  style={serifFont}
                >
                  {r.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-[1.85]">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
