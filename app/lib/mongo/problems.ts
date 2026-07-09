import { ObjectId } from "mongodb";
import { getDB } from "./db";

export type Difficulty = "easy" | "medium" | "hard";

export interface TestCase {
	stdin: string;
	expectedOutput: string;
	/** Hidden cases run for judging but are never revealed to the client. */
	hidden: boolean;
}

export interface Problem {
	_id?: ObjectId;
	slug: string;
	title: string;
	/** Markdown problem statement. */
	description: string;
	difficulty: Difficulty;
	/** Allowed language slugs (must exist in the judge language registry). */
	languages: string[];
	/** Per-language starter code, keyed by language slug. */
	starterCode: Record<string, string>;
	testcases: TestCase[];
	/** Per-run CPU time limit in seconds. */
	timeLimit: number;
	/** Per-run memory limit in kilobytes. */
	memoryLimit: number;
	createdBy: string;
	createdAt: Date;
	updatedAt: Date;
}

/** Problem shape safe to send to the client: hidden test cases stripped. */
export interface PublicProblem
	extends Omit<Problem, "_id" | "testcases"> {
	_id: string;
	sampleTestcases: { stdin: string; expectedOutput: string }[];
	testcaseCount: number;
}

async function col() {
	const db = await getDB();
	const c = db.collection<Problem>("problems");
	return c;
}

let indexEnsured = false;
async function ensureIndexes() {
	if (indexEnsured) return;
	const c = await col();
	await c.createIndex({ slug: 1 }, { unique: true });
	indexEnsured = true;
}

/** Strip hidden test cases and normalize _id for client consumption. */
export function toPublicProblem(p: Problem): PublicProblem {
	const { _id, testcases, ...rest } = p;
	return {
		...rest,
		_id: _id!.toString(),
		sampleTestcases: testcases
			.filter((t) => !t.hidden)
			.map((t) => ({ stdin: t.stdin, expectedOutput: t.expectedOutput })),
		testcaseCount: testcases.length,
	};
}

export async function listProblems(): Promise<PublicProblem[]> {
	const c = await col();
	const problems = await c.find({}).sort({ createdAt: 1 }).toArray();
	return problems.map(toPublicProblem);
}

export async function findProblemBySlug(slug: string): Promise<Problem | null> {
	const c = await col();
	return c.findOne({ slug });
}

export async function createProblem(
	problem: Omit<Problem, "_id" | "createdAt" | "updatedAt">
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
	try {
		await ensureIndexes();
		const c = await col();
		const now = new Date();
		const result = await c.insertOne({
			...problem,
			createdAt: now,
			updatedAt: now,
		} as Problem);
		return { ok: true, id: result.insertedId.toString() };
	} catch (e) {
		return { ok: false, error: e instanceof Error ? e.message : String(e) };
	}
}
