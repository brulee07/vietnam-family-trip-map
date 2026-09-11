# v9.5 Cloudflare Worker

이 Worker는 GitHub Pages의 AI 여행 비서와 OpenAI Responses API 사이의 안전한 중계 계층입니다.

## 1. Cloudflare Worker 생성
Cloudflare Dashboard → Workers & Pages → Create → Worker에서 새 Worker를 만듭니다.

## 2. Worker 코드
Dashboard 편집기를 쓸 경우 `src.js` 내용을 Worker 코드에 붙여넣고 배포합니다.
Wrangler를 쓸 경우 이 폴더의 `wrangler.jsonc`와 `src.js`를 사용합니다.

## 3. Secret 등록
Worker → Settings → Variables and Secrets에서 다음을 추가합니다.
- `OPENAI_API_KEY` : Type = Secret, Value = 본인의 OpenAI API key

API 키는 `src.js`, `ai-config.js`, GitHub 저장소에 절대로 넣지 않습니다.

## 4. 일반 변수 등록
- `OPENAI_MODEL` = `gpt-5.6-luna`
- `ALLOWED_ORIGIN` = 실제 GitHub Pages Origin
  - 예: `https://username.github.io`
  - 사용자 정의 도메인이면 예: `https://travel.example.com`

GitHub Pages가 프로젝트 경로(`/repo-name/`) 아래에 있어도 Origin에는 경로를 넣지 않습니다.

## 5. 프런트엔드 연결
Worker 주소가 `https://vietnam-family-trip-ai.example.workers.dev`라면 실제 채팅 엔드포인트는:
`https://vietnam-family-trip-ai.example.workers.dev/chat`

방법 A: 사이트의 AI 비서 → ⚙️ → 위 `/chat` 주소 입력 → 저장
방법 B: `ai-config.js`의 `endpoint`에 `/chat` 주소를 넣고 GitHub에 커밋

## 6. 테스트
도시 지도에서 경로를 바꾼 뒤 AI 비서에 `현재 동선 점검`을 요청합니다.
실제 생성형 답변이 나오고, 답변에 현재 경로 순서가 반영되면 성공입니다.

## 보안 메모
- OpenAI 키는 Cloudflare Secret으로만 저장합니다.
- Worker는 질문 길이와 출력 토큰을 제한합니다.
- `ALLOWED_ORIGIN`을 실제 사이트 Origin으로 설정하세요.
- 개인 프로젝트라도 OpenAI 사용량/예산 한도를 별도로 설정하는 것을 권장합니다.
