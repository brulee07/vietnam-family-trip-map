# v10.0.1 AI quality hotfix

- AI 답변의 **, #, ` 등 Markdown 기호 노출 제거
- 아이 관련 질문에서 실제 가족 연령 정보를 판단 근거로 더 적극 활용
- 답변을 모바일에 맞게 3~6문장 중심으로 간결화
- v10.0 Family-aware Context Engine 구조 유지
- PWA cache를 v10.0.1로 갱신

배포:
1. GitHub Pages에 전체 파일 덮어쓰기
2. cloudflare-worker/src.js를 Cloudflare Worker에 붙여넣고 Deploy
3. OPENAI_API_KEY Secret은 기존 값 그대로 유지
