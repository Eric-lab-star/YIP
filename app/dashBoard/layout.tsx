import { requireAdmin } from "@/app/lib/auth/requireAuth";

// Reads cookies for the auth gate, so this subtree is never statically
// generated. Declared explicitly to skip the build-time prerender attempt.
export const dynamic = "force-dynamic";

/**
 * 관리자 게이트. `/dashBoard` 아래 **전부**에 걸린다.
 *
 * 이전에는 라우트마다 각자 확인했고, 그래서 확인을 빠뜨린 라우트가 생겼다.
 * `/dashBoard/signup` 과 `/dashBoard/new` 는 비로그인 방문자에게 회원등록 폼을
 * 그대로 200 으로 돌려줬고, `/dashBoard/[id]` 는 더 나빠서 **학생 문서를 읽어
 * 폼에 채운 HTML** 을 돌려줬다 — 전화번호가 평문으로 들어 있었다. ObjectId 만
 * 알면 누구든 열 수 있었고, 그 id 는 다른 화면의 링크에 드러나 있다.
 *
 * 쓰기 경로(`studentCreateAction` 등)는 `isAdmin()` 으로 각자 막고 있었지만,
 * 그건 저장을 막을 뿐 읽기를 막지 못한다. 새 관리자 페이지를 추가할 때 검사를
 * 다시 쓰는 것을 잊어도 되도록 여기 한 곳에 둔다.
 *
 * `proxy.ts` 도 `/dashBoard/:path*` 를 잡지만 그건 빠른 리다이렉트일 뿐 경계가
 * 아니다. 경계는 여기다.
 */
export default async function Layout({ children }: { children: React.ReactNode }) {
	await requireAdmin();
	return <>{children}</>;
}
