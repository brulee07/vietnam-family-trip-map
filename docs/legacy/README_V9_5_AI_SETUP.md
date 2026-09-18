# Vietnam Family Travel Platform v9.5 — AI 연결 안내

v9.5는 현재 지도 경로 + 여행 JSON 데이터를 Cloudflare Worker를 통해 OpenAI에 전달합니다.

## 가장 쉬운 설치 순서
1. GitHub Pages에 v9.5 파일을 업로드합니다.
2. Cloudflare에 Worker를 하나 만듭니다.
3. `cloudflare-worker/src.js`를 Worker에 배포합니다.
4. Worker의 Secret에 `OPENAI_API_KEY`를 등록합니다.
5. `ALLOWED_ORIGIN`을 본인의 GitHub Pages Origin으로 설정합니다.
6. Worker의 URL 끝에 `/chat`을 붙입니다.
7. 여행 사이트 → AI 여행 비서 → ⚙️ → `/chat` 주소 저장.
8. `현재 동선 점검`을 눌러 실제 AI 답변을 확인합니다.

## v9.5에서 되는 것
- 자유 질문형 생성형 AI 답변
- 현재 도시 자동 인식
- 현재 지도 경로 순서 실시간 전달
- 가족 구성/여행 기간/도시간 이동 정보 반영
- 해당 도시 장소 DB 반영
- 최근 대화 일부 유지
- API 오류/시간초과 안내

## 아직 하지 않는 것
- 실시간 날씨 검색
- 실시간 영업 여부/가격 확인
- AI 답변에서 지도 장소 자동 추가/삭제
- AI 추천 경로를 버튼 한 번으로 지도에 적용

위 기능은 다음 버전에서 확장하기 적합합니다.
