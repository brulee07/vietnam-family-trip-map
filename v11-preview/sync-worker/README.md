# Family Sync Worker (Cloudflare Worker + D1)

이 Worker는 AI Worker와 별도로 가족 일정 동기화만 담당합니다.

## 저장 데이터
- 일정 순서
- 하루 메모
- 저장 장소 / 직접 추가 장소
- Today Mode 진행 상태
- 체크리스트

AI 대화, AI 복원 기록, 기기별 설정은 저장하지 않습니다.

## 배포 개요
1. Cloudflare D1 데이터베이스 `vietnam-family-trip-sync` 생성
2. `schema.sql` 실행
3. 새 Worker `vietnam-family-trip-sync` 생성
4. D1 binding 이름을 반드시 `DB`로 연결
5. `worker.js` 배포
6. Worker 주소의 `/health`가 `ok:true`를 반환하는지 확인
7. 웹 앱의 `sync-config.js`에 Worker 기본 주소를 입력

`wrangler.toml.example`은 Wrangler CLI를 사용할 때 참고용입니다.
