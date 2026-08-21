# HANDOFF — 2026-08-06 (2026-08-16 3차 갱신)

두 갈래가 섞여 있다. **A는 진행 중이고, B는 미완이다.**

- (A) YIP 저장소 — PR #41·#42·#43·#44·#45 는 main 에 머지됨.
  **지금 미완인 것은 `/problems` 개선 2단계(주제 분류)이고, 브랜치는
  `feat/problem-topics` 다. A-5 절이 전부 다룬다.**
- (B) 사용자 Neovim 설정 (`~/AppData/Local/nvim/`, **이 저장소 밖**) — 미완.

**이어받는 사람이 가장 먼저 읽을 것은 A-5 절이다.** 7개 작업 중 5개가 끝났고
프로덕션 DB 백필이 이미 실행됐다. 남은 작업과 막힌 지점이 거기 있다.

**가장 먼저 알아야 할 것 — dev 서버가 머신을 죽이던 버그를 잡았다.**
`npm run dev` 후 페이지를 열면 postcss 워커가 무한 재생성돼 **6 초 만에 node
프로세스 400 개 이상, 커밋 96%** 로 시스템이 멎었다. 2026-08-16 10:49 에 실제로
멈춰서 강제 재시작했다. 원인은 잘못된 워크스페이스 루트가 `.next` 영속 캐시에
굳은 것이고, **`rm -rf .next` 로 해소된다.** 자세한 것은 A-3 절.

**지금 브랜치를 받았다면 `rm -rf .next` 를 한 번 하고 시작할 것.**

**반응형 체크는 이제 끝났다.** 이전 판들이 "유일한 미이행 요구사항" 으로
남겨두던 것이다. 오버플로는 8 개 폭 전부 깨끗했고, 대신 **숫자로는 안 잡히는
찌그러짐**이 나와 PR #45 가 됐다. A-4 절.

이전 갱신분 요약 — `gemini-3.5-flash` 등 모델명 4 종은 실제 키로 호출해 유효함을
확인했다. 브랜치 정리도 끝났다.

---

## A. YIP 저장소 (2026-08-06 세션)

### 목표

사용자의 미커밋 작업 51 개 경로(코딩냥이 표정 `mood` 프롭 + 레슨 본문 개편)가
이미 머지된 브랜치 위에 얹혀 있었다. 이것을 main 기준 새 브랜치로 옮겨 PR 로
만드는 것이 출발점이었고, 옮기는 과정에서 드러난 문제들을 함께 처리했다.

### 내린 결정과 이유

**설치 안내가 양쪽에서 따로 구현돼 충돌했다 — PR #35 쪽을 택했다.**
사용자 작업은 11 개 실습 페이지에 설치 명령을 손으로 써놨고, 그 사이 PR #35 가
같은 문제를 `<PackageInstall />` 로 해결해 main 에 들어갔다. 컴포넌트를 택한
이유는 `utils/pythonPackages.ts` 의 **버전 하한을 싣기** 때문이다. 손으로 쓴
줄에는 그 정보가 없다.
다만 `git grep 가상환경 main` 이 **비어 있음을 확인하고**, #35 에 대응물이 없는
가상환경 / `ModuleNotFoundError` 안내는 살렸다. 한쪽을 통째로 택했으면
사라졌을 내용이다.

**`python-dotenv` 를 레지스트리에 새로 등록했다.** 7 개 챕터가 `load_dotenv()` 를
쓰는데 설치 목록에 없었고, `utils/pythonPackages.ts` 에 항목 자체가 없어서 배열
추가만으로는 해결되지 않았다. `min` 은 1.0 으로 잡았고 **API 때문이 아니라
유지되는 계열에 맞춘 것**이라는 점을 그 파일 헤더 주석에 적어뒀다 —
`load_dotenv()` 는 0.x 에도 있어서 하한을 올릴 기술적 이유가 없다.
설치 확인용 한 줄은 `importlib.metadata` 를 쓴다. 배포명과 임포트명이 달라서
`google-genai`·`langchain` 과 같은 처리다.

**`.gitattributes` 를 `.mdx` 로 좁히지 않고 전체 텍스트 대상으로 했다.**
CRLF 사고는 `.mdx` 에서 났지만 슬라이드는 `.tsx` 다. 확장자를 좁히면 절반만
막힌다. 바이너리 6 종은 자동 판별에 맡기지 않고 명시했다 — 오판되면 조용히
깨지고 한참 뒤에 드러난다.

**이미 CRLF 로 커밋돼 있던 48 개 파일을 지금 정규화했다.** 미루면 다음에 그
파일을 건드리는 사람이 **무관한 기능 PR 안에서 파일 전체가 뒤집히는 diff** 를
보게 된다. 리뷰 가능하도록 `.gitattributes` 추가(`f9a596b`)와
정규화(`d6ede3e`)를 별도 커밋으로 나눴다.

**중복 브랜치는 ancestry 가 아니라 내용 대조로 판단했다.**
`worktree-mathbot2-mission4` 는 머지된 적이 없어 `--merged` / `--contains` 로는
판단할 수 없다. 미션 4 블록 102 줄을 CRLF 제거 후 main 과 직접 diff 해
**완전 동일**을 확인하고 지웠다.

**이 문서를 지우지 않고 B 절만 남겼다.** Neovim 조사 결과가 다른 곳에 없다.

**머지 완료된 원격 브랜치 4 개는 지우지 않았다** (`docs/package-install-guidance`,
`docs/simplewebdev-sitemap`, `feat/nyang-mood`, `fix/turbopack-workspace-root`).
정리 대상으로 제시한 목록에 없었다.

### 실패한 시도 — 반복하지 말 것

**워크트리에 `node_modules` 정션을 걸면 빌드가 죽는다.** 이 문서의 이전 판에는
통한다고 적혀 있었으나 지금은 아니다. Turbopack 이
`Symlink [project]/node_modules is invalid, it points out of the filesystem root`
로 패닉한다. PR #34 가 workspace root 를 프로젝트 디렉터리로 고정한 뒤로 정션이
가리키는 메인 체크아웃이 루트 밖으로 판정된다. **워크트리마다 `npm install` 을
따로 해야 한다** (약 35 초). **이 실패를 코드 회귀로 오진하지 말 것.**
정션을 지울 땐 `[System.IO.Directory]::Delete($path, $false)` 로 링크만 지운다.
`Remove-Item -Recurse` 는 사용자의 진짜 `node_modules` 까지 지울 수 있다.

**워크트리에 `.env.local` 이 없으면 빌드가 `YIPDB_MONGODB_URI is not defined` 로
죽는다.** page data 수집 단계에서 터진다. 메인 체크아웃에서 복사하면 통과한다.
이것도 코드 문제가 아니다.

**워크트리 격리 세션에서 Bash 파이프·리다이렉트가 거부된다.** "too complex to
verify that it stays inside the worktree" 로 실행 자체가 막힌다. 평범한 단일
명령으로 쪼개거나 PowerShell 도구를 쓴다. 파일 목록을 도는 `for` 루프도 같은
이유로 막혔다 — Grep 도구로 대체했다.

**긴 heredoc 은 Bash 도구에서 파싱에 실패한다.** 이 문서를 통째로 쓰려다
`unexpected EOF while looking for matching` 로 죽었다(파일은 다행히 그대로였다).
긴 문서는 저장소 밖 임시 파일에 쓴 뒤 이어 붙인다.

**`npm run lint` 출력은 30000 자에서 잘려 요약 줄이 안 보인다.** 미니파이된
파일 경고가 출력을 잡아먹는다. PowerShell 로 받아 `problem` 매칭 줄만 뽑아야
숫자를 볼 수 있다.

**`EnterWorktree(name)` 는 `origin/main` 기준이라 특정 브랜치 위에 쌓을 수 없다.**
`git worktree add <경로> -b <새브랜치> <기준브랜치>` 로 먼저 만들고
`EnterWorktree(path)` 로 들어가야 한다.

**AppTest 의 `file_uploader.set_value()` 에 `UploadedFile` 객체를 넘기면
`ValueError: too many values to unpack` 이 난다.** `(filename, bytes, mime_type)`
튜플을 넘겨야 한다 (streamlit 1.61.1 기준).

### 현재 상태 — 전부 실행해서 확인함

**main 은 `27bb0bd`. 열린 PR 0 건.** 머지된 것: #38 `5ddb61e`, #39 `2adab6e`,
#40 `27bb0bd`.

검증 명령과 결과 (마지막으로 워크트리에서 `npm install` + `.env.local` 복사 후
실행):

- `npx tsc --noEmit` → 0 errors
- `npm run build` → 정적 페이지 106/106, "Compiled successfully"
- `npm run lint` → **167 problems (20 errors, 147 warnings)**. CLAUDE.md 가
  적어둔 기준선은 168 이므로 신규 findings 0 건이다.
- `.mdx` 237 개를 `@mdx-js/mdx` + `remark-gfm` + `remark-cjk-friendly` 로 컴파일
  → 0 failed. **이 스크립트는 임시로 만들고 지웠다 — 다시 필요하면 새로 짜야
  한다.** 프로젝트 트리 안에 있어야 `@mdx-js/mdx` 가 해석된다.
- `git ls-files --eol` 에 `i/crlf` **0 건**

**테스트 스위트는 없다.** `npm test` 는 존재하지 않는다.

미션 4 코드는 임시 venv (streamlit 1.61.1 / pillow 12.3.0 / google-genai) 에서
**실제로 실행해 확인했다**:

- 올린 파일을 PIL 로 여는 부분이 동작한다. `UploadedFile` 은 `io.BytesIO`
  하위 클래스다.
- 앱이 Streamlit 런타임에서 예외 없이 뜬다. 업로드 전 버튼 0 개 → 업로드 후 1 개.
- **API 호출이 버튼 안에 갇혀 있다** — 사진만 올렸을 때 호출 없음, 버튼을 누른
  뒤에야 API 에 도달(가짜 키라 400 `API_KEY_INVALID`).

작업 트리는 아직 `feat/nyang-mood`(머지됨)에 있고 origin 보다 1 커밋 뒤다.
이 문서는 untracked 로 남겨뒀다.
→ **2026-08-16 에 해소됨. 아래 참조.**

---

## A-2. 2026-08-16 세션 — 모델명 검증과 정리

### 저장소 상태

`main` @ `27bb0bd`, origin 과 동기. 열린 PR 0 건. **저장소 파일은 하나도
바뀌지 않았다** (이 문서만 갱신). `npx tsc --noEmit` → **0 errors** 재확인.

**작업 트리를 `main` 으로 옮겼다.** 이전 판이 남겨둔 `feat/nyang-mood` 체크아웃은
main 과 58 파일 / +2429 −2463 차이였다 — 대부분 CRLF 정규화 **이전** 상태다.
거기서 파일을 고쳤다면 정규화를 되돌리는 diff 를 만들었을 것이다.

**머지 완료 브랜치 4 개를 로컬·원격 모두 삭제했다** (`docs/package-install-guidance`,
`docs/simplewebdev-sitemap`, `feat/nyang-mood`, `fix/turbopack-workspace-root`).
`git merge-base --is-ancestor` 로 main 에 완전히 포함됨을 확인한 뒤 `-d` 로 지웠다.
이 4 개는 **squash 가 아니라 진짜 머지 커밋**으로 들어갔기 때문에 ancestry 판정이
유효하다. 지금 남은 브랜치는 로컬·원격 모두 `main` 하나뿐이다.

### 모델명 — 4 종 전부 유효하다 (실제 키로 확인)

이전 판은 `gemini-3.5-flash` 하나만 의심했지만, 저장소는 **4 종**을 쓴다.
`client.models.list()` 가 돌려준 54 개 목록과 대조한 결과 **전부 존재한다**:

| 모델명 | 사용 | API 가 보고한 지원 동작 |
|---|---|---|
| `gemini-3.5-flash` | 68 곳 | `generateContent`, `countTokens`, `createCachedContent`, `batchGenerateContent` |
| `gemini-3.1-flash-lite-image` | 16 곳 | `generateContent`, `countTokens`, `batchGenerateContent` |
| `gemini-embedding-001` | 13 곳 | `embedContent`, `countTextTokens`, `countTokens` |
| `gemini-embedding-2` | 1 곳 | `embedContent`, `countTextTokens`, `countTokens` |

**목록에 있다는 것과 실제로 도는 것은 다르므로 호출까지 했다.** `3x + 7 = 25`
문제 이미지를 PIL 로 만들어 `MathBot_part2/task` 의 템플릿을 그대로 실행했다:

- **미션 2** — 사진 속 문제를 `3x + 7 = 25 / Find the value of x` 로 정확히 읽었다.
  비전 경로가 동작한다.
- **미션 3** — 단계별 풀이 후 `정답: 6`. 수학적으로 맞다.
- **미션 4** — Streamlit `AppTest` 로 런타임에서 굴렸다. 업로드 전 버튼 0 개 /
  업로드 후 버튼 1 개·이미지 1 개·**풀이 없음** / 버튼 클릭 후 실제 API 호출 →
  풀이 렌더 + `st.warning` 1 개. 예외는 전 단계 0 건.
  **API 호출이 버튼 안에 갇혀 있음을 실제 응답으로 확인했다** — 교재가
  "돈과 시간을 아낀다냥" 이라고 가르치는 동작이 그대로다.

검증 스크립트는 **저장소 밖 scratchpad 에 있었고 영속 위치에 저장하지 않았다.**
다시 필요하면 새로 짜야 한다. 재현 방법은 아래 "재현 레시피" 에 적어뒀다.

실제 키를 담았던 임시 `.env` 는 **삭제했고**, scratchpad 전체를 스캔해 키
잔여물이 없음을 확인했다. 저장소에는 키가 들어간 적이 없다.

### 재현 레시피 (검증을 다시 해야 할 때)

저장소 밖 임시 디렉터리에서:

```
python -m venv gemvenv
./gemvenv/Scripts/python.exe -m pip install google-genai pillow streamlit python-dotenv
```

`.env` 는 `rg -N "^GEMINI_API_KEY=" <저장소>/.env.local > .env` 로 만든다
(키 값이 화면에 찍히지 않는다). **끝나면 반드시 지운다.**
모델 목록은 `client.models.list()` 로 받고, `m.name` 은 `models/` 접두사를
떼어내야 저장소 문자열과 대조된다.

### 실패한 시도 — 반복하지 말 것

**`AppTest` 에 `at.imgs` 는 없다.** `at.image` 다 (streamlit 1.61.1).
`AttributeError: 'AppTest' object has no attribute 'imgs'` 로 죽는다.
이전 판이 기록한 `file_uploader.set_value()` 함정 — `(filename, bytes, mime_type)`
튜플을 넘겨야 하고 `UploadedFile` 객체는 `ValueError: too many values to unpack`
을 낸다 — 은 **여전히 유효했다.** 그대로 통했다.

`google-genai` 는 `generate_content` 호출마다
`Direct use of automatic function calling (AFC) ... is not recommended` 경고를
찍는다. **동작에는 영향이 없다.** 교재 코드가 틀린 게 아니므로 고치려 들지 말 것.

### 미해결 의문 (A 절)

- **반응형 체크를 하지 않았다.** CLAUDE.md 요구사항이지만 `/AIDeveloper` 는
  로그인 게이트라 세션이 필요하다. 미션 4 가 추가된
  `app/AIDeveloper/MathBot_part2/task` 를 320/390/768/1024/1280 에서 봐야 한다.
  **이것이 지금 남은 유일한 미이행 요구사항이다.**
  → **2026-08-16 에 완료했다. A-4 절 참조.** (같은 세션에서 처음 시도했을 때는
  A-3 의 포크 폭탄으로 dev 서버가 죽어 막혔다.)
- **API 키를 다루는 방식이 챕터마다 다르다 — 방침 결정이 필요하다.**
  `MathBot_part2` 는 `.env` + `load_dotenv()` 인데
  `app/AIDeveloper/BlogApp_part2/task/page.mdx:59` 와 `:169` 는
  `genai.Client(api_key="여기에 본인의 제미나이 API 키 입력")` 로 코드에 직접
  적는다. 둘 다 동작하므로 버그가 아니라 **교육 방침 문제**다. 임의로 통일하지 말 것.
- `python-dotenv` 의 `min` 1.0 이 PyPI 현재 유지 계열이 맞는지 **직접 확인하지
  않았다** (추정). `utils/pythonPackages.ts` 헤더의 "PyPI 최신 버전 확인 시점"은
  2026-07-31 그대로 뒀다.
- 모델 목록에 `gemini-3.6-flash`, `gemini-3.7-flash` 가 이미 있다. 교재를 최신
  모델로 올릴지는 **묻지 않았고 판단하지 않았다.** `gemini-3.5-flash` 는 정상
  동작하므로 급한 일이 아니다.

---

## A-3. 2026-08-16 2차 세션 — dev 서버가 머신을 죽이던 버그

### 무엇이었나

"클로드가 브라우저를 확인할 때 램이 부족해져 화면이 꺼졌다" 는 사용자 보고를
확인하는 데서 시작해, 재현·규명까지 갔다.

이벤트 로그로 사실 확인이 됐다. 브라우저 도구 호출과 Windows 리소스 소모 탐지기
이벤트가 **초 단위로 겹친다**:

| 시각 (KST) | 사건 |
|---|---|
| 10:47:01 | 반응형 체크용 `npm run dev -- --port 3100` |
| 10:47:12 | 첫 브라우저 도구 호출 |
| 10:49:13 | `navigate` **와 동시에** "가상 메모리 부족" 진단 (이벤트 2004) |
| ~10:50 | Turbopack FATAL, `os error 1450` |
| 10:52:43 | **리소스 탐지기 자신이** 메모리 할당 실패 (이벤트 1007) |
| 10:57:28 | 사용자가 강제 재시작 |

### 진짜 원인 — 메모리 누수가 아니라 프로세스 폭증

재현 5 회, 5 회 모두 성공. 페이지 요청 한 번에:

```
        node 프로세스   커밋    시스템 핸들
t+0          4          43%      147,066
t+6초      413          96%      325,604   → 머신 정지
```

`next dev` 가 `.next/dev/build/postcss.js` 워커를 **상한 없이 재생성**한다.
`@import "tailwindcss"` 해석이 실패 → 워커 사망 → 재생성 → 무한 루프.

**이 증상을 오진하기 쉽다.** Windows 리소스 탐지기는 프로세스를 하나씩
보고하므로 이벤트 로그에는 `node.exe 2.1GB` **하나만** 찍힌다. 메모리 누수처럼
보이지만 프로세스는 전부 작고 수백 개다. **개수를 봐야 한다.**

원인은 홈 디렉터리에 실수로 생긴 `package.json` / `package-lock.json`
(`npm i prettier` 흔적) 을 Next 16.2.1 이 워크스페이스 루트로 오인한 것.
업스트림 vercel/next.js#92978, PR #96159 로 수정, **16.3.0 에 포함**.

### 실패한 시도 — 반복하지 말 것

**설정을 아무리 고쳐도 소용없다. `.next` 를 지워야 한다.** 잘못된 루트가 영속
캐시에 굳기 때문이다. 캐시를 남긴 채 시도한 것들:

| 시도 | 결과 |
|---|---|
| 홈의 떠도는 `package.json`·lockfile·`node_modules` 삭제 | 폭주 353 개 |
| `@tailwindcss/postcss` 에 `{ base: import.meta.dirname }` | 폭주 362 개 |
| `turbopack: { root }` 제거 (PR #34 가 넣은 것) | 폭주 326 개 |
| **위 + `rm -rf .next`** | **정상 (최대 5 개)** |

`.next` 하나만 다른 마지막 줄이 유일한 성공이다. 세 번을 헛짚고 나서야
찾았으니, 같은 증상을 보면 **설정부터 만지지 말고 캐시를 먼저 지울 것.**

`next.config.ts:66-71` 주석이 `turbopack.root` 고정이면 해결된다고 읽히는데,
그게 세 번 헛짚은 직접적인 이유다. PR #41 이 그 주석을 고친다.

### 만든 것

- **PR #41** `docs/turbopack-root-cache-caveat` — `next.config.ts` 주석 보강.
  동작 변경 없음. 위 통제 비교 표를 주석에 남겼다. **머지됨.**
- **PR #42** `chore/next-16.3` — `next` 16.2.1 → 16.3.1,
  `@next/mdx` 16.2.9 → 16.3.1. **머지됨.**

**`eslint-config-next` 는 15.5.4 그대로 뒀다.** 올리면 lint 기준선이 흔들리고
이번 수정과 무관하다. 임의로 올리지 말 것.

**`CLAUDE.md` 에 `nextjs-agent-rules` 블록이 추가됐다.** 16.3 의 `next dev` 가
실행할 때마다 써넣는 생성물이다. 손으로 쓴 게 아니고, 커밋해두지 않으면 매번
워킹트리가 더러워진다. PR #42 에 포함시켰다. 지워도 다시 생긴다.

### 검증 (PR #42 브랜치에서 전부 실행)

- `npx tsc --noEmit` → 0 errors
- `npm run build` → exit 0. **`.next` 를 지운 콜드 빌드**라
  vercel/next.js#96619 (16.3 의 postcss 워커 풀 경쟁) 도 함께 걸러졌다.
- `npm run lint` → 167 problems. 기준선 168 이므로 신규 0 건.
- `npm run dev` → node 최대 5 개 / 커밋 53% / 해석 에러 0 회.
  `/AIDeveloper/MathBot_part2/task` (307 → `/login`, 인증 게이트 정상),
  `/Algorithm`, `/problems` 전부 200.

`.mdx` 컴파일 검사는 **하지 않았다** — `.mdx` 파일을 건드리지 않았다.

### 미해결 의문 (A-3 절)

- **16.3 에 열린 회귀 두 건이 있다.** #96619 (postcss·webpack-loaders 워커 풀이
  같은 런타임 파일을 덮어써 콜드 빌드가 깨짐) 와 #96626 (심볼릭 링크에서 빌드
  패닉). 이번 콜드 빌드는 통과했지만 **매번 통과한다는 보장은 없다.** 빌드가
  이유 없이 깨지면 여기를 먼저 볼 것.
- **업그레이드가 실제로 재발을 막는지는 확인하지 못했다.** 확인하려면 홈에
  떠도는 `package.json` 을 일부러 다시 만들어야 하는데, 세션 권한이 홈
  디렉터리 쓰기를 막는다. 16.3 에서 정상 동작하는 것까지만 확인했다.
- **머지 후 `rm -rf .next` 가 필요하다.** 업그레이드만으로는 이미 오염된 캐시가
  안 풀린다. 이 머신에서는 조사 중에 이미 지웠으므로 정상이다. **다른 체크아웃
  이나 다른 사람 머신에서는 한 번 해야 한다.**

---

## A-4. 2026-08-16 — 반응형 체크 (드디어 완료)

`app/AIDeveloper/MathBot_part2/task` 를 320 / 390 / 641 / 768 / 769 / 1024 /
1025 / 1280 에서 측정했다. 로그인 게이트라 사용자가 브라우저에서 직접 로그인한
뒤 진행했다 (자격증명은 에이전트가 입력할 수 없다).

### 오버플로 — 8 개 폭 전부 통과

`documentElement.scrollWidth` 가 모든 폭에서 뷰포트와 같다. 가로 스크롤되는
코드 블록 9 개는 전부 `overflow-x: auto` 안이라 정상이다.

### 진짜 문제는 숫자가 못 잡았다 → PR #45

320px 에서 코딩냥 말풍선이 **한 줄에 5.6 자**로 짜부라져 있었다. 아바타가
`shrink-0` 100px 라 266px 컬럼의 절반 가까이를 먹고, 말풍선에 153px 만
남는다. 도입부 말풍선 하나가 **985px 높이**였다.

**왜 `scrollWidth` 검사가 통과했는지가 핵심이다.** 이전에 누군가 320px 오버플로를
`min-w-0` + `break-words` 로 고쳤고(그 주석이 컴포넌트에 남아 있다), 그 수정이
**오버플로를 찌그러짐으로 바꿨다.** 숫자는 그때부터 계속 깨끗했다.
스크린샷을 보고서야 찾았다. CLAUDE.md 의 "숫자만으로는 부족하다" 가 정확히
이 경우다.

PR #45 가 `sm` 미만에서 아바타 56px / `px-3 py-3` / `text-base` 로 줄였다.
320px 기준 5.6 → 9.7 자, 985 → 602px. `sm` 이상은 값을 명시적으로 되돌려
넓은 화면은 그대로다(계산된 스타일로 확인: 100px / 20.25px).

세로로 쌓으면 컬럼 전체를 쓸 수 있지만 **말풍선 꼬리가 `-left-[10px]` 로 옆의
아바타를 가리키게 배치돼 있어** 꼬리까지 손봐야 한다. 그건 더 큰 변경이라
안 했다. 9.7 자도 충분하지는 않으니 후속 여지가 있다.

### 덤 — ZWJ 잔재 → PR #44

DOM 에서 제목을 읽어보니 첫 코드포인트가 `U+200D` 였다. 이모지를 지우면서
결합 문자만 남은 것. 4 개 파일. 소스를 눈으로 읽어서는 안 보인다.

### 미수정으로 남긴 것

**`spaceshipCaptain/setup/goal` 이 320px 에서 7px 넘친다** (`scrollWidth` 327).
범인은 `NyangSpeech` 밖의 `<span class="text-xl font-bold">` 안에 있는
`pygame.display.set_mode((` — 줄바꿈할 곳이 없는 긴 식별자다.
**#45 를 stash 하고 다시 재서 기존 문제임을 확인했다** (아바타 100px 상태에서도
327px). 별도 PR 감이다.

### 측정 방법 — 재현할 때 주의할 점

창이 최대화돼 있으면 `resize_window` 는 성공을 보고하고 아무것도 안 한다.
같은 오리진 iframe 에 페이지를 띄우고 iframe 폭을 바꾸면 미디어 쿼리가 따라온다.
스크롤바만큼 iframe 을 넓혀야 뷰포트가 의도한 값이 된다.

세 가지 함정을 겪었다:

- **iframe 을 재사용하면 이전 렌더가 남아** `h1` 이 2 개로 보인다. 서버 HTML 은
  1 개다. 매번 iframe 을 새로 만들 것.
- **1024px 에서 오버플로가 한 번 잡혔는데 사이드바 확장 애니메이션 도중 값이었다.**
  1.2 초 더 기다려 3 회 재측정하니 전부 정상. 전환 애니메이션이 있는 폭은
  반드시 여러 번 재라.
- **스크린샷은 축소 저장된다** (뷰포트 1351px → 이미지 1120px, 배율 0.829).
  좌표로 요소 위치를 판단하지 말 것 — `loading="lazy"` 이미지가 아직 안 그려진
  것을 "아바타가 사라졌다" 로 오진했다. 캔버스에 그려 픽셀을 읽으면 확실하다.

---

## A-5. 2026-08-16 3차 세션 — /problems 주제 분류 (진행 중)

### 목표

`/problems` 는 문제 131 개를 `createdAt` 순서로 한 줄씩 나열한다. 1단계(PR #46,
**아직 열려 있음**)가 검색·필터를 넣었고, 2단계인 이 작업이 목록을 주제별
**접힌 섹션**으로 바꾼다. 첫 화면이 131 행이 아니라 25 줄짜리 목차가 되는 것이
목적이다.

설계: `docs/superpowers/specs/2026-08-16-problem-topics-design.md`
계획: `docs/superpowers/plans/2026-08-16-problem-topics.md`
실행 원장: `.superpowers/sdd/2026-08-16-problem-topics/progress.md`
(**gitignore 되어 있다.** 내린 판정이 전부 거기 있으니 지우지 말 것.)

### 내린 결정과 이유

**주제는 커리큘럼과 독립이다.** 사용자 결정. 강의 순서를 그대로 비추는 게
아니라 문제만의 분류 체계를 둔다.

**한 문제 = 한 주제.** 태그가 아니다. 태그면 한 문제가 여러 섹션에 나타나 목록을
겹치지 않게 접을 수 없고, 그게 원래 요구였던 "훑어보기" 를 못 푼다.

**주제는 DB 컬렉션이다.** 코드 상수가 아니다. 사용자가 관리자 화면에서 추가·
이름변경·순서변경하길 원했다. 대신 작업량이 커졌다(컬렉션 + 액션 + 관리 UI).

**문제가 주제를 가리키는 참조**(`problems.topicSlug` → `topics.slug`)로 했다.
주제가 문제 목록 배열을 갖는 반대 방향은 "한 문제 한 주제" 불변식이 코드에만
있고 깨져도 조용하다. 참조 방향은 스키마가 강제한다. 이름 변경도 문서 1 건
쓰기로 끝난다(복제였다면 131 건).

**주제 삭제는 참조가 남아 있으면 거부한다.** 문제들을 미분류로 떨어뜨리는
대안은 실수로 지웠을 때 분류가 조용히 사라진다.

**백필의 출발점은 Algorithm 레슨의 `/problems/<slug>` 링크다.** 그 문제를
가르치는 챕터가 직접 링크하므로 현재 존재하는 가장 좋은 신호다. 확인한 수치:
링크 113 개, 링크됐는데 시드에 없는 것 0 개, 어느 레슨도 안 거는 것 18 개
(기초 17 + `two-sum-stdin`). **한 문제가 두 챕터에서 링크되는 경우는 0 건**
(직접 확인).

### 실패한 시도 — 반복하지 말 것

**`javascript_tool` 로 보낸 합성 click / input 이벤트는 React 에 도달하지
않는다.** 이걸 모르고 "페이지 전체가 비대화형" 이라 판단해 커밋 3 개를 이분하며
회귀를 찾았다. **회귀는 없었다.** `computer` 도구의 진짜 마우스 클릭으로는
정상 동작한다(난이도 필터 클릭 → "131개 중 31개"). 같은 세션 오전에는 합성
방식이 통했으므로 확장 프로그램 쪽 변화로 보인다 (추정). **UI 상호작용 검증은
`computer` 의 실제 입력으로만 할 것.**

**편집기 TS 진단이 이 세션에서 4/4 오보였다.** 전부 서브에이전트가 파일을 고친
직후에 떴고, `updateProblemTopic 미사용`·`FORCE 미사용`·`ProblemList.tsx 타입
에러 5 건` 모두 `npx tsc --noEmit` 재실행 시 0 errors 였다. CLAUDE.md 가 브랜치
전환 상황에 대해 적어둔 경고가 서브에이전트 편집에도 그대로 적용된다.

**계획 문서의 닫히지 않은 코드 펜스 하나가 브리프 추출을 통째로 막았다.**
Task 2 끝의 stray ``` 때문에 Task 3~7 이 "코드 블록 안" 으로 취급돼 추출이
실패했다. 파일을 읽어서가 아니라 도구를 돌리다 드러났다.

### 현재 상태 — 확인한 것만

**브랜치 `feat/problem-topics`, HEAD `5c2b732`.** 작업 트리 깨끗.
`docs/problem-topics-spec` 위에 쌓여 있고, 그 아래에 PR #46 커밋(`d6561b9`)이
들어 있다 — 즉 **이 브랜치는 아직 머지 안 된 PR #46 을 포함한다.**

7 개 작업 중 **1~5 완료, 6~7 미착수.**

| 작업 | 커밋 | 상태 |
|---|---|---|
| 1 `topics` 컬렉션·CRUD | `02dd602` | 리뷰 통과 |
| 2 `topicSlug` + slug 예약어 | `7d7fddb`, `12f2275` | 수정 1 라운드 후 통과 |
| 3 백필 스크립트 | `3a614b5`, `11181e0` | 수정 1 라운드 후 통과 |
| 4 API 응답 형태 | `85dfcb4` | 리뷰 통과, 발견 0 건 |
| 5 접힌 주제 섹션 | `5c2b732` | 구현·자체검증 완료, **리뷰 미실시** |
| 6 관리자 주제 관리 화면 | — | 미착수 |
| 7 폼의 주제 선택 | — | 미착수 |

**프로덕션 DB 는 이미 바뀌었다** (사용자 승인 후 실행). 실측 확인:
`topics` 24 개(order 0..23), 인덱스 `{_id}` / `{slug}` unique / `{order}`,
`problems` 131 개 중 130 개에 `topicSlug`, 미분류 1 개(`two-sum-stdin`),
고아 참조 0, 문제 0 개인 주제 0.
`node scripts/backfill-problem-topics.mjs --write` 재실행은 가드가 거부한다
(실측 확인). 되돌리려면 `--force` 가 필요하다.

검증 명령과 결과 (`5c2b732` 기준, 전부 직접 실행):

- `npx tsc --noEmit` → 0 errors
- `npm run build` → exit 0, `/problems` 는 여전히 정적(`○`) + 1 시간 revalidate
- `npm run lint` → 167 problems (main 기준선 168, 신규 0)
- 브라우저(실제 클릭): 로드 시 보이는 행 0 개 / 섹션 25 개 / 섹션 클릭하면
  펼쳐짐 / 검색 "하노이" → "131개 중 1개", 재귀 섹션만 남고 자동 펼침
- 반응형 320·390·641·768·769·1024·1025·1280 → 오버플로 전부 0, 헤더 겹침 0
- **Task 4 의 유예 검증 해소**: `/problems/s-hanoi` 사이드바에 문제 링크 132 개.
  API 배열→객체 변경이 사이드바를 비우지 않았다.

### 다음 단계 — 첫 번째 행동 하나

**`http://localhost:<port>/login` 에서 로그인한 뒤 `/problems` 를 320px 에서
다시 재고, `components/judge/TopicSection.tsx` 의 헤더가 겹치는지 확인한다.**

이유: 헤더는 `{total}문제{solvedCount > 0 && ` · ${solvedCount} 완료`}` 를
렌더한다. 로그아웃 상태에서는 `solvedCount` 가 0 이라 뒷부분이 아예 안 나오고,
지금까지 잰 "겹침 0" 은 **짧은 쪽 문자열 기준이라 최악의 경우를 못 덮었다.**
구현자가 스스로 이 위험을 신고했다 — 헤더에 `truncate` 나 `min-w-0` 이 없다.
겹치면 그 자리에서 수정한다.

그 다음은 Task 5 리뷰(미실시) → Task 6 → Task 7 순서다. 계획 파일에 각 작업의
브리프가 그대로 있고, `.superpowers/sdd/2026-08-16-problem-topics/task-N-brief.md`
로 이미 추출돼 있다.

### 미해결 의문

- **완료 수가 붙은 섹션 헤더가 320px 에서 겹치는가.** 위 "다음 단계" 그대로다.
  겹칠 것으로 본다 (추정) — 헤더에 `truncate`/`min-w-0` 이 없고 메타 span 이
  `shrink-0` 이다.
- **Task 5 가 리뷰를 받지 않았다.** 1~4 는 전부 태스크 리뷰를 거쳤다.
- **PR #46 이 아직 열려 있다.** 이 브랜치가 그걸 포함하므로, #46 을 먼저
  머지할지 이 브랜치에 흡수시킬지 정해야 한다.
- `list_search` 챕터만 문제가 3 개다(다른 챕터는 5 개). 백필에서도 3 으로
  확인됐다. 의도인지 누락인지 **여전히 확인 안 했다.**
- `두 수의 합` 제목이 3 개다. 백필로 `prefix_sum` / `basics` / 미분류 로
  흩어졌지만 제목 중복 자체는 남는다. 콘텐츠 판단이라 손대지 않았다.
- `spaceshipCaptain/setup/goal` 이 320px 에서 7px 넘친다(A-4 절에서 발견,
  기존 문제로 확인됨). 여전히 미수정.

---

## B. Neovim LSP·treesitter (저장소 밖)

### 목표
"`.mdx`에 LSP가 없는 것 같다"에서 시작해 "설치 안 된 서버 전부 적용"까지 확대됐다.

### 뿌리 원인 두 개 — 이게 이 문서의 핵심이다

**1. `.mdx`는 filetype 자체가 없었다.** `nvim --headless --clean foo.mdx -c 'echo &filetype'` → 빈 문자열. LSP도 treesitter도 붙을 자리가 없었다. 개별 플러그인 설정 문제가 아니었다.

**2. Windows에서 npm 전역 설치 서버는 전부 spawn에 실패한다.** npm은 전역 bin에 파일 셋을 깐다 — 확장자 없는 bash shim, `.cmd`, `.ps1`. `vim.fn.executable()`은 PATHEXT를 보고 **확장자 없는 쪽에 매치해서 게이트를 통과시키지만**, libuv는 그걸 못 띄운다. `lsp.lua`의 `servers` 표 게이트가 무력하다는 뜻이다.

이 두 번째가 **pyright를 조용히 죽이고 있었다.** 사용자는 모르고 있었다. `.exe` shim으로 설치된 서버(scoop의 lua_ls)는 무관하다.

### 실패한 시도 — 반복하지 말 것

- **treesitter에 `mdx` 파서 추가**: 불가능하다. nvim-treesitter에 `mdx` 파서가 **존재하지 않는다** (플러그인 전체 검색 0건). 목록에 `'mdx'`를 적으면 설치가 실패한다. markdown 파서를 별칭 등록하는 게 유일한 길이다.
- **`vscode-uri` 버전 핀 고정으로 MDX LSP 살리기**: 3.0.8과 3.1.0 **둘 다** default export가 없다. 선언된 `^3.0.7` 범위 안에 해결책이 없다.
- **`vim.lsp.config[server]`에서 기본 `cmd`를 읽어 argv[0]만 교체**: 동작하지 않는다. lazy.nvim이 `init()`을 **nvim-lspconfig가 runtimepath에 오르기 전에** 실행해서, 그 시점의 `cmd`는 nil이다. 그래서 `npm_cmd()`는 설정을 읽지 않고 실행파일을 직접 resolve한다 (`lsp.lua` 상단).
- **jdtls의 OSGi 번들 캐시(`config_win/org.eclipse.osgi`)를 원인으로 지목**: 아니었다. `.bak`으로 옮겨뒀는데 **지워도 된다.** 진짜 원인은 Java 버전이었다.
- **헤드리스 검증에서 `vim.treesitter.highlighter.active[0]`**: 버그다. `active`는 실제 bufnr로 키가 걸린다(보통 1). 0으로 조회하면 항상 false가 나와 "하이라이터가 안 붙었다"는 오진을 낳는다.

### 확정된 진단 — MDX LSP는 지금 불가능하다

`@mdx-js/language-server` 0.6.3(최신)이 시작하자마자 죽는다. 전역·프로젝트 로컬 양쪽에서 동일하게 재현된다:

    node ./node_modules/.bin/mdx-language-server.cmd --stdio

`vscode-markdown-languageservice@0.5.0`이 `vscode-uri`를 default import 하는데 `vscode-uri` 3.x는 `{ URI, Utils }`만 내보낸다 (`SyntaxError: ... does not provide an export named 'default'`). 상위 패키징 버그이고 (microsoft/vscode#192144), 올라갈 상위 버전이 없다.

그래서 `mdx_analyzer`를 `servers` 표에서 **일부러 뺐다.** 넣으면 `.mdx` 열 때마다 에러만 뜬다. `lsp.lua`의 `servers` 표 바로 위 주석에 이유가 다 적혀 있다. 릴리스가 고쳐지면 한 줄 되살리면 된다.

전역 패키지는 **설치된 채로 남아 있다** (지금은 쓸모없음).

### jdtls — 세 겹이었다

1. `nvim-jdtls` 플러그인이 없었다 → `lua/plugins/jdtls.lua` 신설.
2. `ftplugin/java.txt`가 **`.txt`라 한 번도 실행된 적이 없었다** → `java.lua`로 rename. 내용은 원래 정확했다.
3. 그래도 exit code 13. 진짜 원인은 nvim이 아니라 워크스페이스 로그에만 남는다:
   `Unsupported class file major version 70` (70 = Java 26, 65 = Java 21). PATH/`JAVA_HOME`의 openjdk 26을 jdt.ls 번들 ASM이 못 읽어 m2e 번들 활성화가 실패한다.
   → `corretto-jdk`가 이미 **21.0.12 LTS**로 깔려 있어서 다운로드 없이 그 `java.exe`를 직접 가리키게 했다 (`ftplugin/java.lua`).

`servers` 표에서 `jdtls`는 **의도적으로 뺐다** — nvim-jdtls가 루트마다 직접 attach하므로 중복 클라이언트가 뜬다.

### arduino — 설정이 원래 틀려 있었다

- clangd/cli/fqbn이 `settings` 테이블에 있었는데 이 서버는 **명령줄 플래그**로 받는다. 서버는 그 값을 본 적이 없다. `-clangd`/`-cli`/`-fqbn`으로 옮겼다. `-cli`는 디렉터리가 아니라 실행파일이다.
- 설정이 가리키던 `arduino-cli.yaml`이 **없었다.** `arduino-cli config init`으로 생성했다.
- 서버 바이너리는 scoop 패키지도 npm도 없어서 공식 릴리스 0.7.7을 받아 `C:/Users/cyon2/arduino_cli/bin/`에 뒀다(사용자 승인함). PATH는 건드리지 않고 clangd처럼 전체 경로로 참조한다.

### 현재 상태 — 8개 전부 attach 확인함

각 파일을 헤드리스로 열어 `vim.lsp.get_clients({bufnr=b})`가 비지 않는 것까지 확인했다. 에러 알림 0건.

| 파일 | filetype | treesitter | LSP |
|---|---|---|---|
| page.mdx | mdx | markdown | tailwindcss |
| SlideShell.tsx | typescriptreact | tsx | tailwindcss, ts_ls |
| globals.css | css | css | tailwindcss |
| main.c | c | c | clangd |
| probe.py | python | python | pyright |
| Main.java | java | java | jdtls |
| blink.ino | arduino | arduino | arduino_language_server |
| lsp.lua | lua | lua | lua_ls |

`.mdx`의 injection도 동작한다 — 한 버퍼 안에서 markdown, markdown_inline, tsx, typescript, python, bash, html 파서가 같이 물린다.

**재현**: `nvim --headless <파일> -c 'lua vim.wait(60000, function() return #vim.lsp.get_clients({bufnr=0})>0 end)'` 후 클라이언트 확인. 검증 스크립트는 세션 scratchpad에 있었고 **영속 위치에 저장하지 않았다** — 다시 필요하면 새로 짜야 한다.

`cmake`는 원래부터 설치돼 있었고 **검증하지 않았다.**

### 청소해야 할 것

- `~/AppData/Local/nvim/jdtls/config_win/org.eclipse.osgi.bak` — 내가 만든 백업. 원인이 아니었으므로 지워도 된다.
- `C:/Users/cyon2/Documents/source_code/java_workspace/lsptest/` — 내 테스트가 만든 jdtls 워크스페이스. 실패 로그가 들어 있다.

### 미해결 의문

- `tailwindcss` LSP가 `.mdx`에도 붙는다. 유용해 보이지만 의도한 동작인지, 성능에 영향이 있는지 확인하지 않았다.
- MDX LSP를 굳이 지금 살리려면 `vscode-uri` v2를 강제 주입하는 방법이 남아 있다 (추정 — 시도하지 않았다). `Utils` API가 깨질 수 있어 권하지 않는다.
- `ts_ls`가 그동안 설치조차 안 돼 있었다. 이 저장소가 거의 다 TypeScript인데 왜 없었는지 모른다 — 의도적으로 뺀 것인지 확인 필요.
