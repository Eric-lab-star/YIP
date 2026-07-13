import { getDB } from "./db";
import { listProblems, type Difficulty } from "./problems";

// Learning-progress summary derived from a user's submissions: how many problems
// they've solved (by difficulty) and their current solving streak. Read-only and
// computed on demand — no extra state to keep in sync with the submissions log.

export interface UserProgress {
	totalSolved: number;
	totalProblems: number;
	byDifficulty: Record<Difficulty, { solved: number; total: number }>;
	/** Consecutive days (Asia/Seoul) up to today/yesterday with ≥1 accepted solve. */
	currentStreak: number;
	/** Most recent day (YYYY-MM-DD, Asia/Seoul) with an accepted solve, or null. */
	lastSolvedDay: string | null;
}

/** Calendar day for a timestamp in Asia/Seoul as a YYYY-MM-DD key. */
function seoulDay(d: Date): string {
	return d.toLocaleDateString("en-CA", { timeZone: "Asia/Seoul" });
}

const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

export async function getUserProgress(userId: string): Promise<UserProgress> {
	const db = await getDB();
	const subs = db.collection("submissions");

	// Accepted submissions only: problem slug (for the solved set) + day (streak).
	const accepted = await subs
		.find<{ problemSlug: string; createdAt: Date }>(
			{ userId, verdict: "accepted" },
			{ projection: { problemSlug: 1, createdAt: 1, _id: 0 } }
		)
		.toArray();

	const solvedSlugs = new Set(accepted.map((s) => s.problemSlug));

	const byDifficulty = {
		easy: { solved: 0, total: 0 },
		medium: { solved: 0, total: 0 },
		hard: { solved: 0, total: 0 },
	} satisfies Record<Difficulty, { solved: number; total: number }>;

	const problems = await listProblems();
	for (const p of problems) {
		const d: Difficulty = DIFFICULTIES.includes(p.difficulty as Difficulty)
			? (p.difficulty as Difficulty)
			: "easy";
		byDifficulty[d].total++;
		if (solvedSlugs.has(p.slug)) byDifficulty[d].solved++;
	}

	const days = new Set(accepted.map((s) => seoulDay(s.createdAt)));

	return {
		totalSolved: solvedSlugs.size,
		totalProblems: problems.length,
		byDifficulty,
		currentStreak: computeStreak(days),
		lastSolvedDay: [...days].sort().at(-1) ?? null,
	};
}

// Count consecutive days with a solve, walking backwards from today. Today not
// yet being solved doesn't break the streak (it can still be extended later),
// so we start from yesterday in that case; a fully-missed day ends it.
function computeStreak(days: Set<string>): number {
	if (days.size === 0) return 0;
	const cursor = new Date();
	if (!days.has(seoulDay(cursor))) {
		cursor.setDate(cursor.getDate() - 1);
		if (!days.has(seoulDay(cursor))) return 0;
	}
	let streak = 0;
	while (days.has(seoulDay(cursor))) {
		streak++;
		cursor.setDate(cursor.getDate() - 1);
	}
	return streak;
}
