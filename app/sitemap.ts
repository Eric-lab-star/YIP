import type { MetadataRoute } from "next";
import { listProblems } from "@/app/lib/mongo/problems";

const SITE_URL = "https://yipcode.xyz";

// Re-generate at most once an hour so newly published problems appear without a
// redeploy. The static content routes below rarely change; the DB-driven
// problem pages are the reason this needs to refresh.
export const revalidate = 3600;

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

// Curriculum lesson folders under /AIDeveloper. Each has a `/goal` and `/task`
// content page. The `_slide` presentation variants are intentionally omitted —
// they're slide renderings of the same material (duplicate content).
const AI_DEVELOPER_LESSONS = [
  "AIEthics_part1",
  "AIEthics_part2",
  "API_basics",
  "BlogApp_part1",
  "BlogApp_part2",
  "EnglishChat_part1",
  "EnglishChat_part2",
  "FinalProject_guide",
  "LangChain_agent",
  "MathBot_part1",
  "MathBot_part2",
  "MathBot_part3",
  "Prompt_engineering",
  "RAG1_embedding",
  "RAG2_chunking_search",
  "RAG3_vectorDB",
  "RAG4_full_pipeline",
  "Streamlit_UI",
  "noteBook",
];

const TOUR_OF_PYTHON = [
  "and_or_not",
  "cat_or_dog",
  "cat_or_dog2",
  "challenge_arithmetic",
  "challenge_binary_search",
  "condition_and_type_level1",
  "condition_and_type_level2",
  "condition_and_type_level3",
  "dictExcerciseLevel1",
  "dictExcerciseLevel2",
  "dictExcerciseLevel3",
  "dictionary",
  "functionExcercise",
  "functionExcerciseLevel2",
  "functions",
  "helloworld",
  "if",
  "if_challenge",
  "input_type_int",
  "library",
  "list",
  "listExcerciseLevel1",
  "listExcerciseLevel2",
  "listExcerciseLevel3",
  "loop",
  "numberGuessingGame",
  "todo",
  "tuple",
  "tupleExcerciseLevel1",
  "tupleExcerciseLevel2",
  "tupleExcerciseLevel3",
  "variable_string_boolean",
];

const SPACESHIP_CAPTAIN = [
  "FPSAndVector",
  "backgroundClass",
  "class",
  "classExcerciseLevel1",
  "classExcerciseLevel2",
  "classExcerciseLevel3",
  "collision",
  "gameOver",
  "keyboardInput",
  "meteorClass",
  "missileClass",
  "moduleNPackage",
  "moveSpaceShipChallenge",
  "playerSurf",
  "setup",
  "spriteClass",
  "surface",
  "surface_challenge",
  "source_code/entity/bg",
  "source_code/entity/hud",
  "source_code/entity/meteor",
  "source_code/entity/missile",
  "source_code/entity/player",
  "source_code/main",
  "source_code/settings",
];

// Public, indexable content pages. Auth-gated routes (chat, dashBoard, editor,
// login, students, /problems/*/solutions, /problems/new) are intentionally
// excluded and also blocked in robots.ts.
function staticRoutes(): Entry[] {
  const entries: Entry[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    // Section landing pages.
    { path: "/tourOfPython", changeFrequency: "weekly", priority: 0.8 },
    { path: "/spaceshipCaptain", changeFrequency: "weekly", priority: 0.8 },
    { path: "/AIDeveloper", changeFrequency: "weekly", priority: 0.8 },
    { path: "/Algorithm", changeFrequency: "weekly", priority: 0.8 },
    { path: "/simpleWebDev", changeFrequency: "weekly", priority: 0.8 },
    { path: "/problems", changeFrequency: "weekly", priority: 0.8 },
    { path: "/games/vamsurlike", changeFrequency: "monthly", priority: 0.5 },
  ];

  for (const slug of TOUR_OF_PYTHON) {
    entries.push({
      path: `/tourOfPython/${slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const slug of SPACESHIP_CAPTAIN) {
    entries.push({
      path: `/spaceshipCaptain/${slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const lesson of AI_DEVELOPER_LESSONS) {
    entries.push(
      {
        path: `/AIDeveloper/${lesson}/goal`,
        changeFrequency: "monthly",
        priority: 0.6,
      },
      {
        path: `/AIDeveloper/${lesson}/task`,
        changeFrequency: "monthly",
        priority: 0.6,
      }
    );
  }

  return entries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes().map(
    ({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })
  );

  // Problem detail pages are public and live in MongoDB. Failing to reach the
  // DB (e.g. during a build without network) shouldn't break the whole sitemap.
  let problemEntries: MetadataRoute.Sitemap = [];
  try {
    const problems = await listProblems();
    problemEntries = problems.map((p) => ({
      url: `${SITE_URL}/problems/${p.slug}`,
      lastModified: p.updatedAt ?? now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {
    problemEntries = [];
  }

  return [...staticEntries, ...problemEntries];
}
