import { ObjectId } from "mongodb";
import { getDB } from "./db";
import type { Verdict } from "../judge0/verdict";

export interface TestResult {
	index: number;
	statusId: number;
	status: string;
	hidden: boolean;
	timeMs: number | null;
	memoryKb: number | null;
	// Populated only for non-hidden cases, so hidden test data never leaks.
	stdout?: string | null;
	stderr?: string | null;
	compileOutput?: string | null;
	expected?: string | null;
}

export interface Submission {
	_id?: ObjectId;
	userId: string;
	problemId: string;
	problemSlug: string;
	language: string;
	code: string;
	verdict: Verdict;
	/** Judge0 batch tokens, aligned to the problem's test-case order. */
	tokens: string[];
	results: TestResult[];
	passed: number;
	total: number;
	timeMs: number | null;
	memoryKb: number | null;
	createdAt: Date;
	updatedAt: Date;
}

async function col() {
	const db = await getDB();
	return db.collection<Submission>("submissions");
}

let indexEnsured = false;
async function ensureIndexes() {
	if (indexEnsured) return;
	const c = await col();
	await c.createIndex({ userId: 1, createdAt: -1 });
	await c.createIndex({ problemSlug: 1, userId: 1 });
	indexEnsured = true;
}

export async function createSubmission(
	sub: Omit<Submission, "_id" | "createdAt" | "updatedAt">
): Promise<string> {
	await ensureIndexes();
	const c = await col();
	const now = new Date();
	const result = await c.insertOne({
		...sub,
		createdAt: now,
		updatedAt: now,
	} as Submission);
	return result.insertedId.toString();
}

/** A user's submissions for a problem, most recent first. */
export async function listSubmissionsByUserAndProblem(
	userId: string,
	problemSlug: string,
	limit = 50
): Promise<Submission[]> {
	await ensureIndexes();
	const c = await col();
	return c
		.find({ userId, problemSlug })
		.sort({ createdAt: -1 })
		.limit(limit)
		.toArray();
}

export async function findSubmissionById(
	id: string
): Promise<Submission | null> {
	const c = await col();
	try {
		return await c.findOne({ _id: new ObjectId(id) });
	} catch {
		return null;
	}
}

export async function updateSubmissionResult(
	id: string,
	update: Pick<
		Submission,
		"verdict" | "results" | "passed" | "total" | "timeMs" | "memoryKb"
	>
): Promise<void> {
	const c = await col();
	await c.updateOne(
		{ _id: new ObjectId(id) },
		{ $set: { ...update, updatedAt: new Date() } }
	);
}
