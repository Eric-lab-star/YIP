// Registry of languages the judge supports. `id` is the Judge0 language_id used
// by the sandbox; `monaco` is the editor language id used on the client. The
// Judge0 ids below match the default Judge0 CE language set — if you run a
// different Judge0 build, verify them against `GET {JUDGE0_URL}/languages`.
export interface JudgeLanguage {
	/** Stable slug used in our DB, URLs and API payloads. */
	slug: string;
	/** Human-readable label for the UI. */
	label: string;
	/** Judge0 language_id. */
	id: number;
	/** Monaco editor language id. */
	monaco: string;
}

export const LANGUAGES: readonly JudgeLanguage[] = [
	{ slug: "python", label: "Python 3", id: 71, monaco: "python" },
	{ slug: "javascript", label: "JavaScript (Node.js)", id: 63, monaco: "javascript" },
	{ slug: "typescript", label: "TypeScript", id: 74, monaco: "typescript" },
	{ slug: "cpp", label: "C++ (GCC)", id: 54, monaco: "cpp" },
	{ slug: "c", label: "C (GCC)", id: 50, monaco: "c" },
	{ slug: "java", label: "Java", id: 62, monaco: "java" },
	{ slug: "go", label: "Go", id: 60, monaco: "go" },
	{ slug: "rust", label: "Rust", id: 73, monaco: "rust" },
] as const;

const BY_SLUG = new Map(LANGUAGES.map((l) => [l.slug, l]));

export function getLanguage(slug: string): JudgeLanguage | undefined {
	return BY_SLUG.get(slug);
}

export function isSupportedLanguage(slug: unknown): slug is string {
	return typeof slug === "string" && BY_SLUG.has(slug);
}
