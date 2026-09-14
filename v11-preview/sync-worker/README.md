# Vietnam Family Trip Sync Worker v12.1

가족 일정 공유용 Cloudflare Worker + D1 구성입니다. 최대 9대의 스마트폰을 한 공유방에 연결합니다.

## 신규 설치
1. D1 데이터베이스를 생성합니다.
2. `schema.sql`을 실행합니다.
3. Worker 코드를 `worker.js`로 교체합니다.
4. D1 binding 이름을 `DB`로 연결합니다.

## v12.0에서 업그레이드
1. 기존 D1 Console에서 `migration-v12.1.sql`을 한 번 실행합니다.
2. 기존 Sync Worker 코드를 이 폴더의 `worker.js`로 교체하고 Deploy 합니다.
3. `/health` 응답에서 `version: "12.1"`, `maxDevices: 9`를 확인합니다.

## v12.1 API 추가
- `/sync/devices`: 참여 기기 목록
- `/sync/device/leave`: 이 기기 연결 해제
- `/sync/device/remove`: 오프라인 기기 목록 제거
- 기존 `/sync/create`, `/sync/pull`, `/sync/push`, `/sync/delete` 유지
