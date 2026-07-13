// Registry of languages the judge supports. `monaco` is the editor language id;
// `filename` is the source file name handed to the sandbox (matters for e.g.
// Java's public-class rule); `piston` is the list of candidate runtime names/
// aliases used to resolve an installed Piston runtime (see lib/judge0/client).
export interface JudgeLanguage {
	/** Stable slug used in our DB, URLs and API payloads. */
	slug: string;
	/** Human-readable label for the UI. */
	label: string;
	/** Monaco editor language id. */
	monaco: string;
	/** Source file name given to the sandbox. */
	filename: string;
	/** Candidate Piston runtime names/aliases (first installed match wins). */
	piston: string[];
}

export const LANGUAGES: readonly JudgeLanguage[] = [
	{ slug: "python", label: "Python 3", monaco: "python", filename: "main.py", piston: ["python"] },
	{ slug: "javascript", label: "JavaScript (Node.js)", monaco: "javascript", filename: "main.js", piston: ["javascript", "node"] },
	{ slug: "typescript", label: "TypeScript", monaco: "typescript", filename: "main.ts", piston: ["typescript"] },
	{ slug: "cpp", label: "C++ (GCC)", monaco: "cpp", filename: "main.cpp", piston: ["c++", "cpp"] },
	{ slug: "c", label: "C (GCC)", monaco: "c", filename: "main.c", piston: ["c"] },
	{ slug: "java", label: "Java", monaco: "java", filename: "Main.java", piston: ["java"] },
	{ slug: "go", label: "Go", monaco: "go", filename: "main.go", piston: ["go"] },
	{ slug: "rust", label: "Rust", monaco: "rust", filename: "main.rs", piston: ["rust"] },
] as const;

const BY_SLUG = new Map(LANGUAGES.map((l) => [l.slug, l]));

export function getLanguage(slug: string): JudgeLanguage | undefined {
	return BY_SLUG.get(slug);
}

export function isSupportedLanguage(slug: unknown): slug is string {
	return typeof slug === "string" && BY_SLUG.has(slug);
}
