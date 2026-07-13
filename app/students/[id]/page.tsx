import { validateToken } from "@/app/lib/auth/login";
import { failPost, readPosts, successPost } from "@/app/lib/mongo/posts";
import { readStudent } from "@/app/lib/mongo/students";
import { getUserProgress } from "@/app/lib/mongo/progress";
import { CardImage } from "@/components/commons/CardImage";
import ProgressCard from "@/components/judge/ProgressCard";
import TILTable from "@/components/commons/table/TILTable";
import { CatIcon } from "@/components/mdx/CatIcon";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Code2, FilePlusIcon, NotebookPen, Sparkles } from "lucide-react";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { notFound } from "next/navigation";

/* A wobbly hand-drawn underline; inherits color via `currentColor`. */
function Squiggle({ className = "" }: { className?: string }) {
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
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SectionHeading({
  icon: Icon,
  label,
  title,
}: {
  icon: typeof BookOpen;
  label: string;
  title: string;
}) {
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary" strokeWidth={2.25} />
        <span className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground">
          {label}
        </span>
      </div>
      <h2 className="relative inline-block text-3xl font-bold sm:text-4xl">
        {title}
        <Squiggle className="absolute -bottom-2 left-0 h-3 w-full text-primary" />
      </h2>
    </div>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await validateToken();

  if (!ObjectId.isValid(id)) {
    return notFound();
  }

  // param  검증
  const student = await readStudent(new ObjectId(id));
  if (!student) {
    return notFound();
  }

  const posts = await readPosts({ userId: student._id.toString() });
  const serial = getSerialized(posts);
  const isOwner = user?.success && user.id === student._id.toString();
  const progress = await getUserProgress(student._id.toString());

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      {/* Hero */}
      <header className="mb-14">
        <div
          className="doodle-box mb-6 inline-flex items-center gap-2 bg-white px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em]"
          style={{ rotate: "-1.5deg" }}
        >
          <Sparkles className="h-4 w-4 text-primary" />
          My Learning
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <CatIcon size={72} src="WALK" />
          <h1 className="relative inline-block text-4xl font-bold leading-tight sm:text-5xl">
            {student.name}
            <span className="text-primary">의 학습 정보</span>
            <Squiggle className="absolute -bottom-3 left-0 h-3.5 w-full text-foreground" />
          </h1>
        </div>
      </header>

      {/* 교재 */}
      <section className="mb-16">
        <SectionHeading icon={BookOpen} label="Books" title="교재" />
        {student.books.length ? (
          <div className="flex flex-col gap-5 space-y-5 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3 xl:grid-cols-4">
            {student.books.map((v) => (
              <CardImage
                key={v.title}
                link={v.link}
                imagekey={v.imagekey}
                title={v.title}
                state={v.state}
                description={v.description}
              />
            ))}
          </div>
        ) : (
          <div className="doodle-box bg-white px-6 py-12 text-center text-lg text-muted-foreground">
            아직 등록된 교재가 없어요 📚
          </div>
        )}
      </section>

      {/* 문제 풀이 */}
      <section className="mb-16">
        <SectionHeading icon={Code2} label="Coding Problems" title="문제 풀이" />

        <div className="mb-5">
          <ProgressCard progress={progress} />
        </div>

        <Link
          href="/problems"
          className="doodle-box group flex items-center justify-between gap-4 bg-white px-6 py-6 transition hover:bg-accent/50"
          style={{ rotate: "-0.4deg" }}
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Code2 className="h-6 w-6" strokeWidth={2.25} />
            </span>
            <div>
              <p className="text-xl font-bold">코딩 문제 풀러 가기</p>
              <p className="text-muted-foreground">
                문제를 풀고 자동 채점으로 실력을 확인하세요. 💻
              </p>
            </div>
          </div>
          <ArrowRight className="h-6 w-6 shrink-0 text-primary transition group-hover:translate-x-1" />
        </Link>
      </section>

      {/* TIL */}
      <section>
        <SectionHeading
          icon={NotebookPen}
          label="Today I Learned"
          title="TIL — 기억보다 기록"
        />

        <div
          className="doodle-box-alt mb-6 bg-accent/60 px-6 py-5 text-lg leading-relaxed"
          style={{ rotate: "-0.4deg" }}
        >
          내가 배운 내용을 글로 정리하는 것은 내가 무엇을 알고 무엇을 모르는지
          객관적으로 바라볼 수 있게 해줍니다. 또한, 시간이 지나서 다시 봤을 때
          그때의 나의 생각과 배움을 떠올릴 수 있는 좋은 방법입니다. ✏️
        </div>

        {isOwner && (
          <Button asChild variant="outline" className="mb-2 h-11 px-5 text-base">
            <Link href="/editor" className="flex items-center justify-center gap-2">
              기록하기
              <FilePlusIcon />
            </Link>
          </Button>
        )}

        {serial && serial.length > 0 ? (
          <TILTable posts={serial} />
        ) : (
          <div className="doodle-box mt-4 bg-white px-6 py-12 text-center text-lg text-muted-foreground">
            아직 작성한 기록이 없어요. 첫 TIL을 남겨보세요! 🌱
          </div>
        )}
      </section>
    </div>
  );
}

function getSerialized(posts: successPost | failPost) {
  if (!posts.ok) return null;
  const result = posts.db.map((p) => ({
    id: p._id.toString(),
    title: p.title,
    createdAt: p.createdAt,
  }));
  return result;
}
