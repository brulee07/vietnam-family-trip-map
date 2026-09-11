# 2027 베트남 가족여행 지도 v9.3

## 핵심 변경

v9.3는 v8-beta에서 검증한 JSON 연동 지도를 공식 도시 지도 파일로 승격한 버전입니다.

- `da_nang.html`, `quy_nhon.html`, `tuy_hoa.html`, `nha_trang.html`이 `data/places.json`과 `data/itineraries.json`을 읽습니다.
- 기존 테스트용 `*_json_beta.html` 파일은 정리했습니다.
- 기존 기능은 유지합니다.
  - 날짜별 전체 일정표 허브
  - 도시별 홈 버튼
  - 마커 이름 ON/OFF
  - 응급·약국·숙소 주소 카드
  - PWA 홈 화면 추가 구조

## GitHub 반영 방법

1. ZIP 압축을 풉니다.
2. 이 폴더 안의 파일 전체를 기존 `vietnam-family-trip-map` 저장소 폴더에 덮어씁니다.
3. GitHub Desktop에서 다음 메시지로 커밋합니다.

```text
Promote JSON maps to official v9.3
```

4. `Commit to main` 후 `Push origin`을 클릭합니다.
5. GitHub Pages 반영 후 스마트폰에서 각 도시 지도에 `JSON 데이터: 공식 연동 성공` 표시가 뜨는지 확인합니다.

## 앞으로의 관리 방식

- 장소 수정: `data/places.json`
- 일정 프리셋 수정: `data/itineraries.json`
- 응급·숙소·병원·약국 정보 수정: `data/safety.json`
- 여행 전체 정보 수정: `data/trip.json`

지도 HTML은 가능한 한 자주 수정하지 않고, 데이터 파일 중심으로 관리하는 것을 권장합니다.


## v9.3 hotfix
- 다낭 공식 지도 파일을 다낭 v16 기반으로 복구하고 JSON 연동 상태 표시를 추가했습니다.
- 나머지 3개 도시의 JSON 공식 지도 구조는 유지했습니다.


## v9.4 AI Travel Assistant Foundation
- AI chat panel on hub and all four city maps
- Travel Context Engine reads trip/cities/places/safety JSON and live map itinerary
- No API key is stored in browser code
- Optional secure backend endpoint can be set with localStorage key `travelAiEndpoint`


## v9.4.1 AI Route Context Hotfix

- Fix AI assistant access to city-map itinerary state isolated inside ES modules.
- Add `window.getTravelAiRoute()` bridge on all four city maps.
- Refresh AI context when the assistant opens and whenever a question is asked.
- Bump service-worker cache to `vietnam-family-trip-v9-4-1`.

## v9.5 AI Travel Assistant
- 실제 AI 연결을 위한 Cloudflare Worker 패키지 추가
- OpenAI API key는 GitHub Pages에 저장하지 않음
- AI 비서 ⚙️에서 Worker `/chat` 주소를 저장하거나 `ai-config.js`에 공용 endpoint 설정
- 상세 절차: `README_V9_5_AI_SETUP.md`
