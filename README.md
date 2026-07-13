# YIP

Next.js 기반 한국어 코딩 교육 플랫폼. 파이썬 학습 콘텐츠, 실시간 채팅과 AI
도우미, 그리고 LeetCode 형태의 **코드 채점 기능**을 제공합니다.

## 주요 기능

- **학습 콘텐츠** — 브라우저 내 파이썬 실행(`react-py`) 기반의 실습 페이지
  (`app/tourOfPython/`, `app/spaceshipCaptain/` 등), MDX 문서 라우팅
- **코드 채점(Judge)** — 문제 풀이/제출/자동 채점, 제출 전 실행, 제출 이력,
  완료 표시. 코드 실행은 격리된 **Piston 샌드박스**에서 수행
  → 자세한 내용은 [`docs/CODE_JUDGE.md`](docs/CODE_JUDGE.md)
- **코드 에디터(Monaco)** — 자체 호스팅, 언어별 스타터 코드, 자동 포맷,
  타입 인식 자동완성(pyright LSP) + 키워드/스니펫
- **AI 도우미** — Anthropic 스트리밍 채팅(2단 캐시 + 사용량 쿼터)
- **실시간 채팅** — Pusher 기반 채팅방
- **글쓰기(TIL)** — TipTap 리치 텍스트 에디터
- **뱀서라이크 게임** — Godot 엔진으로 만든 뱀파이어 서바이버 스타일 2D 생존
  게임을 브라우저에서 바로 플레이(`app/games/vamsurlike/`). WASD/방향키 이동 +
  자동 공격, 레벨 업마다 무기·능력 선택. Godot 웹 빌드(`public/games/vamsurlike/`)를
  iframe으로 임베드 → 경로 `/games/vamsurlike`
- **관리자** — 학생/문제 관리(출제·수정·삭제)

## 기술 스택

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
MongoDB Atlas · Cloudflare R2 · Pusher · Anthropic AI SDK · shadcn/ui ·
Zustand · SWR · TipTap · Monaco Editor · react-py

## 시작하기

### 요구 사항
- Node.js 20+
- MongoDB Atlas, Cloudflare R2 (필수)
- (코드 채점 사용 시) Docker — [`docs/CODE_JUDGE.md`](docs/CODE_JUDGE.md) 참고

### 환경 변수
프로젝트 루트에 `.env.local`을 만들고 아래 값을 설정합니다.

**필수** (없으면 앱이 시작 시 에러)

| 변수 | 용도 |
|---|---|
| `YIPDB_MONGODB_URI` | MongoDB Atlas 연결 문자열 |
| `JWT_SECRET` | 인증 쿠키용 JWT 서명 시크릿 |
| `R2_URL` `R2_ACCESS_KEY` `R2_SECRET_KEY` `R2_BUCKET` `R2_ID` `R2_PUBLIC` `R2_CUSTOM` | Cloudflare R2 |
| `ANTHROPIC_API_KEY` | AI 채팅 |

**선택**

| 변수 | 용도 |
|---|---|
| `VOYAGE_API_KEY` | AI 채팅 시맨틱 캐시 |
| `PISTON_URL` | 코드 채점 샌드박스 |
| `FORMATTER_URL` | 코드 포맷 서비스 |
| `NEXT_PUBLIC_LSP_URL` | 타입 인식 자동완성(LSP) |
| `PUSHER_APP_ID` `PUSHER_SECRET` `NEXT_PUBLIC_PUSHER_KEY` `NEXT_PUBLIC_PUSHER_CLUSTER` | 실시간 채팅 |

### 설치 및 실행
```bash
npm install
npm run dev        # 개발 서버 (Turbopack)
```

## 명령어

```bash
npm run dev        # 개발 서버 시작
npm run build      # 프로덕션 빌드
npm run start      # 프로덕션 서버 시작
npm run lint       # ESLint
```
> 별도 테스트 스위트는 없습니다.

## 코드 채점 설정 & 배포

코드 채점 기능은 별도 컨테이너(Piston·Formatter·LSP)가 필요합니다. 로컬 실행법,
프로덕션 배포 계획, 배포 전 보안 체크리스트는
[`docs/CODE_JUDGE.md`](docs/CODE_JUDGE.md)에 정리되어 있습니다.

문제 데이터 시드:
```bash
node scripts/seed-problems.mjs          # 예시 문제 1개
node scripts/seed-simple-problems.mjs   # 간단한 문제 30개(스타터 코드·예시 포함)
```

## 프로젝트 구조

```
app/
  actions/        Server Actions (Zod 검증 → MongoDB)
  api/            Route Handlers (auth, chat, judge, tiptab ...)
  lib/            mongo/ · r2/ · judge0(Piston) · zod/ · auth/ · pusher/
  tourOfPython/   파이썬 학습 페이지 (MDX + react-py)
  games/          뱀서라이크 등 임베드 게임 페이지
components/       UI · 폼 · 에디터 · 채점(judge) 등
piston/ formatter/ lsp/   채점 관련 Docker 서비스
public/games/     Godot 웹 빌드 정적 파일
scripts/          시드/유틸 스크립트
docs/             CODE_JUDGE.md 등 문서
```

프로젝트 규약과 아키텍처 상세는 [`CLAUDE.md`](CLAUDE.md)를 참고하세요.
