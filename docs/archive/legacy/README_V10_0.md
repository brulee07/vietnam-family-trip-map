# v10.0 Family-aware AI
- Travel Context Engine v2
- 가족 구성, 현재 도시, 도시별 날짜 계획, 현재 지도 경로를 함께 AI에 전달
- currentRoute를 원래 계획보다 우선
- 확정/계획/후보/재확인 필요 상태 구분
- 빠른 질문 5종
- 공용 Worker endpoint 유지
- PWA cache v10.0

중요: GitHub Pages 파일 배포와 함께 cloudflare-worker/src.js도 Cloudflare Worker에 다시 배포해야 v10.0 System Prompt가 적용됩니다.
OPENAI_API_KEY Secret은 다시 등록할 필요가 없습니다.
