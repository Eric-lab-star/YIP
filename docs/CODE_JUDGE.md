# 코드 채점 기능 & 배포 가이드

LeetCode 형태의 코드 채점 기능 전체 개요, 로컬 실행법, 프로덕션 배포 계획을
기록한 문서.

---

## 1. 무엇을 만들었나

### 채점 파이프라인
- **제출(Submit)** — 문제의 모든 테스트케이스를 샌드박스에서 실행해 정답/오답 채점
  (`app/api/judge/submit`). 결과는 `submissions` 컬렉션에 저장.
- **실행(Run)** — 채점 없이, 사용자 입력(stdin)으로 코드를 한 번 실행해 출력 확인
  (`app/api/judge/run`).
- 실제 코드 실행은 앱이 아니라 **Piston 샌드박스**에서 이뤄짐 (`app/lib/judge0/`
  — 폴더명은 과거 Judge0 잔재, 현재 Piston 대상).

### 에디터 (Monaco)
- **자체 호스팅** — CDN 대신 `public/monaco/vs`에서 서빙 (`scripts/copy-monaco.mjs`).
- **포맷 버튼** — 전용 포매터 컨테이너 사용(black·prettier·gofmt·rustfmt·
  clang-format·google-java-format). 미가동 시 에디터 내장 포맷으로 폴백.
- **자동완성** — 언어별 키워드/스니펫(정적) + **LSP 타입 인식 자동완성**(pyright,
  예: `list` 변수 → `append`/`pop` 팝업). LSP 미가동 시 정적 완성으로 폴백.
- 팝업: Enter로는 선택 안 됨(Tab만), Ctrl+C로 팝업 숨김.

### 문제 & UI
- 문제 목록/풀이 페이지(`/problems`, `/problems/[slug]`), 사이드바 문제 목록.
- 출제 어드민(생성/수정/삭제), 제출 이력(`/problems/[slug]/submissions`),
  완료 라벨(정답 맞힌 문제).
- 간단한 문제 30개 + 언어별 스타터 코드 + 입출력 예시
  (`scripts/seed-simple-problems.mjs`).

---

## 2. 로컬 실행

### 채점 서비스(Docker) 기동
```bash
# Piston(채점) + Formatter + LSP 를 한 번에 (formatter/lsp는 --build 필요)
docker compose -f piston/docker-compose.yml up -d --build
# Piston 언어 런타임 설치(최초 1회, 볼륨에 영구 저장)
node piston/install-languages.mjs
```
> ⚠️ Windows에서는 WSL2 안에서 Docker를 돌린다. WSL이 유휴로 꺼지면 컨테이너도
> 내려가므로, 쓸 때 WSL 터미널을 하나 열어두거나 `docker start`로 깨운다.

### `.env.local` (로컬 전용, gitignore)
```
PISTON_URL=http://localhost:2000
FORMATTER_URL=http://localhost:2100
NEXT_PUBLIC_LSP_URL=ws://localhost:2200
```
세 변수 모두 **선택**이며, 없으면 각 기능이 우아하게 폴백한다.

### 문제 시드
```bash
node scripts/seed-problems.mjs          # 예시 1개
node scripts/seed-simple-problems.mjs   # 간단한 문제 30개
```

---

## 3. 프로덕션 배포 계획

### 구조
| 구성요소 | 배포 위치 |
|---|---|
| MongoDB Atlas, Cloudflare R2, Pusher, Anthropic, Voyage | 이미 클라우드 (env만) |
| Next.js 앱 | **Vercel** |
| Piston · Formatter · LSP 컨테이너 | **별도 리눅스 VM** (Vercel 서버리스는 불가) |

### Part A — Next 앱 (Vercel)
1. GitHub 저장소 연결.
2. 환경변수 전부 등록(아래 4장 참고). `PISTON_URL`/`FORMATTER_URL`/
   `NEXT_PUBLIC_LSP_URL`은 VM 주소로.
3. `NEXT_PUBLIC_LSP_URL`은 **빌드 타임에 인라인**되므로 VM을 먼저 띄운 뒤 배포.
4. `/api/judge/submit`은 동기 채점이라 수 초 걸릴 수 있음 →
   `export const maxDuration = 60` 추가 + Vercel **Pro** 권장(Hobby는 10초 제한).

### Part B — 채점 서비스 (VM)
1. 작은 리눅스 VM에 Docker 설치, `piston/docker-compose.yml` 기동 + 언어 설치.
2. **Caddy 등 리버스 프록시로 TLS + 도메인** 연결:
   - `judge.example.com` → Piston(2000)
   - `format.example.com` → Formatter(2100)
   - `lsp.example.com` → LSP(2200, **wss://** 필수 — 브라우저가 직접 연결)
3. Vercel 환경변수: `PISTON_URL=https://judge…`, `FORMATTER_URL=https://format…`,
   `NEXT_PUBLIC_LSP_URL=wss://lsp…`

### 단계적 접근 (추천)
- **1단계**: Vercel 앱 + **Piston만** VM에. Formatter/LSP는 비워두면 폴백 →
  채점만으로 서비스 시작(가장 단순).
- **2단계**: Formatter + LSP 추가.

### 배포 현황 (2026-07-13, 1단계 — Piston)
- **VM**: AWS EC2 `i-0f2e228490c0b1aa6`, t3.medium, Ubuntu 24.04, 20GB gp3,
  리전 `ap-northeast-2`. **고정 IP(EIP) `3.39.185.109`**
  (alloc `eipalloc-0339da9ca0b3d2016`). SG `sg-0dc425505ae9c8292`
  (SSH 22는 관리자 IP만, 2000은 미개방). 키페어 `~/.ssh/yip-judge.pem`.
- **Piston**: `~/piston/docker-compose.yml`(Piston만), 7개 런타임 설치·실행 검증.
- **노출**: cloudflared 터널(`yip-judge`, id `d28db5bc-…`) →
  `https://judge.kimkyungsub.com`. 포트 개방 없이 자동 TLS. systemd 상시 구동.
- **인증**: Piston 앞에 Caddy(`:8080`)가 `X-Judge-Secret` 검사 →
  cloudflared→Caddy→Piston. 시크릿 없으면 403. 앱은 `JUDGE_SECRET`로 헤더 전송
  (`app/lib/judge0/client.ts`). ⚠️ 시크릿 값은 저장소에 커밋 금지(Vercel env에만).
- **Vercel env(수동 설정 필요)**: `PISTON_URL=https://judge.kimkyungsub.com`,
  `JUDGE_SECRET=<Caddy와 동일한 값>`.
- **미완**: Formatter/LSP 미배포(폴백 동작), Cloudflare Access 업그레이드.

---

## 4. 배포 전 보안 TODO (필수)

1. **Atlas 비밀번호 회전** — 과거 커밋된 자격증명이 git 히스토리에 남아 있음
   (`test-mongo.mjs`는 추적 제거했으나 히스토리 존재). 프로덕션 전 반드시 회전.
2. **Piston/Formatter 인증** — 기본 인증이 없어 공개 시 임의 코드 실행 위험.
   ✅ Piston은 Caddy `X-Judge-Secret` 공유 시크릿으로 대응(2026-07-13, 위 배포 현황).
   Formatter/LSP 배포 시 동일 처리 필요.
3. **남용 방지(rate limit)** — 제출/LSP는 자원을 소모(LSP는 연결마다 pyright
   프로세스). 연결/요청 제한 필요.

---

## 5. 환경변수 레퍼런스

필수(앱 부팅에 필요): `YIPDB_MONGODB_URI`, `JWT_SECRET`, `R2_URL`, `R2_ACCESS_KEY`,
`R2_SECRET_KEY`, `R2_BUCKET`, `R2_ID`, `R2_PUBLIC`, `R2_CUSTOM`, `ANTHROPIC_API_KEY`

선택:
- `VOYAGE_API_KEY` — AI 채팅 시맨틱 캐시
- `PISTON_URL` — 채점 샌드박스 (없으면 `/api/judge/*` 503)
- `JUDGE_SECRET` — Piston 프록시 인증용 `X-Judge-Secret` 헤더 값 (프로덕션 필수, 로컬은 생략)
- `FORMATTER_URL` — 포맷 서비스 (없으면 에디터 내장 포맷 폴백)
- `NEXT_PUBLIC_LSP_URL` — LSP 자동완성 (없으면 정적 완성). 빌드 타임 인라인.
- `PUSHER_APP_ID` / `PUSHER_SECRET` / `NEXT_PUBLIC_PUSHER_KEY` /
  `NEXT_PUBLIC_PUSHER_CLUSTER` — 실시간 채팅
