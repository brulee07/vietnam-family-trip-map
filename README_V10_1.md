# v10.1 Weather-aware AI

v10.0.1 안정판에 실시간 날씨 컨텍스트를 추가했습니다.

- 다낭·꾸이년·뚜이호아·나트랑 현재 날씨/7일 예보: Open-Meteo
- 도시 지도 우측 상단에 현재 날씨 칩 표시
- AI Context에 `liveWeather` 추가
- AI가 가족 구성 + 현재 경로 + 실제 단기 날씨를 함께 판단
- 예보 범위 밖의 2027 여행 날짜는 실제 예보처럼 단정하지 않음
- 영업시간/교통 API는 연결하지 않음

## 배포
1. GitHub Pages: ZIP 전체 파일을 기존 프로젝트에 덮어쓰기
2. Cloudflare Worker: `cloudflare-worker/src.js` 전체를 최신 Worker 코드로 교체 후 Deploy
3. 기존 `OPENAI_API_KEY` Secret은 그대로 유지

권장 Commit summary:
`v10.1 - Add Weather-aware AI`
