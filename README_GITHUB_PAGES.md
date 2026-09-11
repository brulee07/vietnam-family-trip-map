# 2027 Vietnam Family Trip Map · GitHub Pages PWA

## 현재 버전
- Hub: v2 날짜별 전체 일정표 중심 홈
- Da Nang: v15
- Quy Nhon: v4.3
- Tuy Hoa: v3.6
- Nha Trang: v3.5

## 업데이트 방법
1. 이 폴더 안의 파일을 GitHub 저장소 루트에 복사합니다.
2. GitHub Desktop에서 변경 파일을 확인합니다.
3. Summary 예시: `Update hub to schedule view v2`
4. `Commit to main`을 누릅니다.
5. `Push origin`을 누릅니다.
6. GitHub Pages 배포 완료 후 사이트를 새로고침합니다.

## 포함 파일
- `index.html`: 날짜별 전체 일정표 중심 홈
- `manifest.json`: 홈 화면 앱 설정
- `service-worker.js`: PWA 캐시 v2
- `.nojekyll`: GitHub Pages 정적 배포 보조
- `icons/`: 앱 아이콘
- `da_nang.html`, `quy_nhon.html`, `tuy_hoa.html`, `nha_trang.html`: 도시별 지도

## 사용 메모
- 지도 타일, 장소 검색, 경로 계산은 인터넷 연결이 필요합니다.
- HTML 문서는 service worker에서 network-first로 처리해 새 배포 반영이 더 잘 되도록 했습니다.

## v3 업데이트 내용

- 허브 페이지 v2의 날짜별 전체 일정표 구조를 유지했습니다.
- 다낭, 꾸이년, 뚜이호아, 나트랑 지도 상단에 `← 여행 홈으로` 버튼을 추가했습니다.
- 모바일 지도 상단에는 `🏠 홈` 버튼이 함께 표시됩니다.
- `service-worker.js` 캐시 이름을 v3로 변경해 GitHub Pages 반영 후 최신 파일을 다시 받도록 했습니다.

## GitHub Desktop 반영 방법

1. 이 폴더 안의 파일들을 기존 `vietnam-family-trip-map` 저장소 폴더에 덮어씁니다.
2. GitHub Desktop에서 Summary에 `Add home buttons to city maps v3` 입력
3. `Commit to main` 클릭
4. `Push origin` 클릭
5. 배포 후 스마트폰에서 여행지도 아이콘을 다시 열어 확인합니다.
