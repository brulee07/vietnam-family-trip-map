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
