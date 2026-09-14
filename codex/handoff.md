# 인수인계 — 2026-09-15

## 현재 작업과 범위

사용자는 프로젝트의 Markdown 문서를 읽고 구조와 버그를 검토해 달라고 요청했다.
검토 도중 반복되는 Codex 훅 실패를 먼저 수정해 달라는 요청이 추가됐다.

- **훅 수정:** 커밋·푸시·PR 생성까지 완료. 변경된 훅의 재신뢰와 실제 Codex 이벤트 실행 확인은 남아 있다.
- **프로젝트 검토:** 문서와 주요 코드 검토, 빌드·타입·MDX 검사, 버그 4건의 로컬 재현을 완료했다.
- **애플리케이션 버그 수정:** 하지 않았다. 실제 DB·학생 계정·운영 데이터를 변경하지 않았다.
- 이 파일은 사용자가 요청한 `codex/handoff.md`다. 루트의 `HANDOFF.md`나 `.codex/`와 경로를 혼동하지 말 것.

## 브랜치와 PR

- 현재 브랜치: `fix/codex-windows-hook`
- 훅 수정 커밋: `bb7a6ac` — `fix(codex): run repository hook correctly on Windows`
- PR: https://github.com/Eric-lab-star/YIP/pull/56
- 문서 작성 직전 조회 결과: **OPEN**, 병합되지 않음.
- PR에는 `.codex/hooks.json`과 `.codex/hooks/no-recursive-grep.py`를 추가했다. 두 파일은 작업 시작 당시 미추적 상태였다.

### 기존 사용자 작업 — 보존할 것

아래 변경은 이번 훅 수정 전에 이미 있었으며 수정·커밋하지 않았다.

```text
 M app/dashBoard/books.ts
 M app/layout.tsx
 M components/commons/AppSideBar.tsx
 M tsconfig.json
?? .codex/agents/
?? .codex/hooks/stray-dev-server.py
?? AGENTS.md
?? app/RaspberryPi/
?? utils/curriculum/RapberryPi.ts
?? utils/sideBarTree/raspberryPiTree.ts
```

`git add .`, `git reset --hard`, 사용자 변경을 지우는 정리 작업을 하지 말 것.
위 목록과 PR 상태는 기록 시점의 값이므로 다음 작업 전에 다시 확인한다.

## 1. Codex 훅 수정

### 확인한 원인

프로젝트의 `.codex/hooks.json`은 Claude Code에서 복사한 다음 명령을 사용했다.

```text
python "$(dirname "$(git rev-parse --path-format=absolute --git-common-dir)")/.claude/hooks/no-recursive-grep.py"
```

PowerShell에서 안전한 `rg --files` 입력을 전달해 재현했을 때:

1. Bash용 `dirname`을 찾지 못했다.
2. Python이 `C:\.claude\hooks\no-recursive-grep.py`라는 잘못된 경로를 열려고 했다.
3. 훅 프로세스가 종료 코드 `2`로 끝났다.

`PreToolUse`의 입력 필드 `tool_input.command`와 기존 차단 응답
`hookSpecificOutput.permissionDecision = "deny"`는 Codex 문서와 맞았다.
직접 재현한 문제는 실행 명령과 경로였다.

### 변경 내용과 이유

- 기본 `command`는 `python3`와 `git rev-parse --show-toplevel`로 `.codex/hooks/no-recursive-grep.py`를 실행한다.
- `commandWindows`는 Python의 `subprocess`로 Git 루트를 구하고 `pathlib`·`runpy`로 같은 스크립트를 실행한다. Bash 전용 `dirname`에 의존하지 않는다.
- Git 루트에서 경로를 구하므로 프로젝트 하위 폴더에서 실행해도 동작한다.
- 기존 재귀 grep 차단 정책과 JSON 응답을 유지했다.
- 안내 문구는 `AGENTS.md`를 가리키고, 도구 자체의 속도보다 `.gitignore`에 따른 검색 범위 차이를 설명하도록 바꿨다.
- `.claude/` 설정과 사용자 전역 `config.toml`의 신뢰 기록은 변경하지 않았다.
- 미추적 `stray-dev-server.py`는 현재 프로젝트 Codex 훅 설정에 연결되어 있지 않다. 이번 수정에서 활성화하지 않았다.

### 훅 검증

총 **30회 실행이 통과**했다.

- 두 설정 명령 × 두 실행 위치(저장소 루트, `app/lib`) × 허용·차단 사례 7개 = 28회.
- Windows 명령을 `cmd.exe`로 실행한 허용·차단 사례 2회.
- `rg`, `git status`, 비재귀 grep 파이프라인은 종료 코드 0·빈 출력.
- 재귀 grep은 종료 코드 0·올바른 Codex 차단 JSON.
- 안내가 `AGENTS.md`로 시작하는 것도 확인해 `.claude`의 기존 스크립트가 아닌 `.codex` 스크립트 실행을 확인했다.
- 변경 파일의 `git diff --cached --check` 통과.

**검증 중 실수:** 첫 `cmd.exe` 검증기는 명령 전체를 하나의 argv 항목으로 전달하면서 인용 부호를 잘못 이스케이프했다.
`SyntaxError: unterminated string literal`이 났지만 제품 코드 문제는 아니었다.
검증기를 실제 셸 명령 전달 방식으로 수정한 뒤 허용·차단 모두 통과했다.

Unix 환경에서 직접 실행한 검증은 하지 않았다.

### 남은 적용 단계

사용자가 Codex의 **`/hooks`에서 변경된 프로젝트 `PreToolUse` 훅을 검토하고 다시 신뢰해야 한다.**
Codex는 훅 정의의 해시가 바뀌면 재검토를 요구한다. 신뢰 해시를 직접 수정하거나 검사를 우회하지 않았다.
따라서 직접 명령 실행 검증과 실제 Codex 이벤트에서의 활성화 확인을 구분해야 한다.

참고한 공식 문서: https://learn.chatgpt.com/docs/hooks

## 2. 파악한 프로젝트 구조

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 기반 한국어 코딩 교육 플랫폼.
- `app/<강좌>/`: MDX 교재와 슬라이드. 강좌마다 구조가 다르므로 `utils/curriculum/`과 `utils/sideBarTree/`를 함께 확인한다.
- `app/actions/`, `app/api/`: 쓰기·조회 진입점. 일반적인 흐름은 입력 검증 → 인증·권한 확인 → `app/lib/mongo/` 호출이다.
- 활동지는 배포 중 Server Action ID 변경에 따른 저장 실패를 피하려고 `/api/worksheet`를 사용한다. 모든 DB 쓰기가 Server Action이라는 문서 설명에는 이 예외가 있다.
- 인증은 JWT 쿠키, `proxy.ts`의 서명 검사, 서버의 `validateToken()`과 폐기 목록으로 구성된다. 관리자 권한은 별도 검사한다.
- MongoDB: 학생·문제·제출·채팅·활동지 등. R2: 이미지. Pusher: 실시간 채팅. Piston: 격리된 코드 실행. Formatter·LSP: 선택적 보조 서비스.

참고한 문서: `README.md`, `AGENTS.md`, `CLAUDE.md`, 루트 `HANDOFF.md`,
`AI_COURSE_REVIEW.md`, `AI_COURSE_TODO_ADD.md`, `docs/CODE_JUDGE.md`,
`piston/README.md`, 문제 주제 분류 설계와 구현 계획.
예전 검토 문서의 미완료 목록은 현재 코드와 대조해야 한다.
예를 들어 패키지 설치 버전 하한은 현재 `utils/pythonPackages.ts`와 `PackageInstall`에 존재한다.

## 3. 확인한 애플리케이션 버그 — 아직 미수정

검증은 실제 소스를 TypeScript로 변환해 실행하되 DB·쿠키 등 외부 경계에는 메모리 대역을 사용했다.
테스트 전용 JWT 키만 사용했고 실제 환경 파일이나 운영 데이터는 읽거나 변경하지 않았다.
브라우저나 운영 환경에서 재현했다는 뜻은 아니다.

### 높음: 권한을 낮춰도 기존 관리자 JWT가 유지됨

- 위치: `app/actions/studentAction.ts:44`, 특히 `updateStudentAction()`의 저장 부분.
- `studentSchema`는 `role` 변경을 허용한다. 액션은 DB에 새 역할을 저장하지만 토큰을 폐기하지 않는다.
- `app/lib/auth/login.ts`의 `validateToken()`은 기존 JWT에 담긴 역할을 반환한다. 현재 DB의 역할은 확인하지 않는다.
- 재현 결과: 저장된 역할은 `student`, 폐기 호출은 0회, 같은 토큰의 검증 결과는 여전히 `admin`.
- 결과: 기존 세션이 만료될 때까지 관리자 권한을 행사할 수 있다. 기본 토큰 수명은 6시간이다.
- 수정 시 역할 등 인증에 영향을 주는 변경의 세션 무효화를 설계하고, 다른 관리자가 대상을 변경하는 경우도 검증할 것.

### 높음: 발급과 폐기가 같은 초이면 토큰이 폐기되지 않음

- 위치: `app/lib/mongo/revocation.ts:71`.
- 폐기 시각은 초 단위이며 판정은 `iat < doc.notBefore`다. 같은 값은 통과한다.
- 실제 `isTokenRevoked()` 재현 결과: 폐기 시각 1초 전·같은 초·1초 후 토큰 → `[true, false, false]`.
- 결과: 계정 삭제 직전에 같은 초에 발급된 토큰이 유효하게 남을 수 있다.
- 비교 경계를 수정할 때는 폐기 직후 새 로그인도 같은 초에 일어나는 경우를 함께 검증할 것.

### 중간: 폐기된 JWT가 남으면 로그인 화면에 들어갈 수 없음

- 위치: `proxy.ts:31`, `app/lib/auth/requireAuth.ts:19`.
- 서버는 폐기 목록을 확인해 인증을 거부하고 `/login`으로 보낸다.
- `/login`의 프록시는 서명과 만료만 확인하므로 해당 토큰을 유효하다고 보고 `/`로 보낸다. 쿠키도 지우지 않는다.
- 재현 결과: 서버 검증은 `success: false`인데 같은 JWT로 `/login` 요청 시 307·`Location: /`·쿠키 삭제 없음.
- `components/commons/Header.tsx`는 인증 실패 상태에서 로그인 링크만 표시하고 로그아웃 메뉴를 숨기므로 UI에서 복구하기도 어렵다.
- 로그인 진입 판단과 서버 세션 유효성 판단을 일치시켜야 한다.

### 중간: 미커밋 RaspberryPi 사이드바의 링크 4개가 모두 존재하지 않음

- 위치: `utils/curriculum/RapberryPi.ts:13`, `utils/sideBarTree/raspberryPiTree.ts:9`.
- 커리큘럼 slug는 `raspberryPi_intro`이고 사이드바는 아래 네 경로를 생성한다.

```text
/RaspberryPi/raspberryPi_intro/goal
/RaspberryPi/raspberryPi_intro/goal_slide
/RaspberryPi/raspberryPi_intro/task
/RaspberryPi/raspberryPi_intro/task_slide
```

- 실제 페이지는 `app/RaspberryPi/WhatIsRaspberryPi/page.mdx`에 있다.
- 성공한 프로덕션 빌드의 `.next/server/app-paths-manifest.json`과 대조해 네 경로 모두 없음을 확인했다.
- 이 강좌는 사용자 미커밋 작업이다. 의도한 강좌 구조를 확인하고 경로와 트리를 함께 맞춰야 한다.
- `app/RaspberryPi/layout.tsx`에 `requireAuth()`가 있으므로 프록시 matcher 누락만으로 콘텐츠가 공개된다고 판단하면 안 된다.

## 4. 프로젝트 검증 결과

| 검사 | 결과 |
|---|---|
| `npx tsc --noEmit` | 종료 코드 0 |
| `npm run build` | 종료 코드 0, `Compiled successfully`, 정적 페이지 106개 생성 |
| MDX 컴파일 | 245개 모두 통과. `@mdx-js/mdx` + `remark-gfm` + `remark-cjk-friendly` 사용 |
| `npm run lint` | 종료 코드 1. 오류 22개 + 경고 147개 = 169건 |
| lint 발생 파일과 main 대조 | 모든 발생 파일이 현재 `main`과 동일. 해당 경로에 대한 `git diff main --exit-code`는 0 |
| 버그 로컬 재현 | 위 4건 모두 확인 |

문서의 lint 기준선 168건은 현재 측정값 169건과 다르다.
별도 main 체크아웃에서 lint 전체를 재실행한 것은 아니며, **발생 파일이 main과 동일한지**를 확인했다.
프로젝트 전체에 버그가 없다는 검증이나 모든 화면의 동작 검증을 수행한 것은 아니다.

로컬 결과 파일은 gitignore된 `scratchpad/`에 있다.

```text
scratchpad/project-review-build.log
scratchpad/project-review-lint.json
scratchpad/project-review-repro.cjs
scratchpad/codex-hook-pr.md
```

버그 재현 재실행:

```powershell
node scratchpad/project-review-repro.cjs
```

마지막 RaspberryPi 검사에는 성공한 빌드의 `.next/server/app-paths-manifest.json`이 필요하다.

## 5. 실행 환경 주의와 다음 작업

- 이 세션의 기본 샌드박스에서 PowerShell 프로세스 시작이 `CreateProcessAsUserW failed: -1073283067`로 계속 실패했다. 읽기·검증·파일 작업은 승인된 `require_escalated` 실행으로 진행했다.
- 이는 훅 안의 `dirname` 실패와 별개의 관측이다. 훅 수정으로 샌드박스 프로세스 문제가 해결됐다고 말하지 말 것.
- 빌드는 실행 중인 Next dev/start 서버가 없음을 확인한 뒤 수행했다. 다음에도 확인할 것. 루트 `HANDOFF.md`에는 dev/build가 `.next`를 공유해 서버를 망가뜨린 기록이 있다.
- 앱 코드를 수정하기 전 설치된 `node_modules/next/dist/docs/`의 관련 문서를 읽는다.
- 다음 우선순위는 훅 재신뢰와 실제 이벤트 확인, 인증 버그 3건의 수정·회귀 검증이다. 인증 수정은 훅 PR과 별도 PR로 처리한다.
- RaspberryPi 경로 수정은 사용자 작성 중인 강좌 작업과 맞춰 진행한다.
- PR #56은 병합하지 않았다. 병합은 별도 사용자 지시가 필요하다.
