# v13 GitHub Pages 운영 배포 결과 — 2026-09-18

운영 URL: https://brulee07.github.io/vietnam-family-trip-map/
운영 commit: `12f9d5cc4b13d3d91fa4b425c3ad6d4506ecad9b`

## 승인된 안전 절차

1. `origin/work-v13-integration`에 12f9d5c push, local/remote 일치 확인.
2. 운영 main `ddcce16ef231d5dae56c7e985132732ee9f9ee20`에 annotated tag `backup-pre-v13-root-promotion` 생성 후 origin push. 원격 peeled tag commit 일치 확인.
3. 로컬 main에 work-v13-integration을 fast-forward 병합.
4. main에서 42개 자동 테스트 전부 통과. 루트 100개 장소, 사진 81개, 프로젝트 하위 경로 HTTP 검사 통과.
5. Pages API로 실제 source `main` / `/`, HTTPS enabled 확인 후 origin/main push.
6. GitHub Pages latest build: `built`, commit 12f9d5c, error message null, updated_at `2026-09-18T14:02:14Z` 확인.
7. 운영 HTTP 자산 109개 모두 200이며 로컬 배포본과 일치. JSON 장소 100개, 대표사진 81개 확인.

## 실제 운영 화면 검사

- v13.2 UI와 100개 장소 표시 정상.
- 다낭·꾸이년·뚜이호아·나트랑 일정 모두 진입 정상.
- 가족 공유 패널, 고급 직접 입력 경로 표시 정상. 기존 가족방에는 가입/쓰기/삭제 요청을 하지 않음.
- 이전 `/v11-preview/index.html`의 합성 초대 fragment가 루트로 전달되고 주소창에서 제거됨. 기기 이름만 확인하는 참여 화면 정상. 합성 초대는 가입 없이 취소함.
- 같은 날짜 임시 메모 A/B 2개 추가, 서로 다른 위치 표시, 새로고침 후 2개 보존 확인. 시험 후 해당 메모만 앱 UI로 삭제함. 사용자 저장소 전체나 deviceId를 초기화하지 않음.
- Today Mode: Day 11 나트랑, 0/5곳 일정과 체크리스트/날씨 표시 정상. 진행 상태는 변경하지 않음.
- 날씨: Open-Meteo 실제 응답, 베트남 시각 2026-09-18 21:00 및 기온/강수 표시 확인.
- AI: 운영 앱에서 일정 변경 없는 연결 확인 질문에 실제 응답 수신. 일정 적용 없음.
- 사진 첨부: 편집 UI/파일 선택 진입까지 확인. 파일 업로드는 브라우저 권한 거부로 실행하지 못함. 우회하지 않았으며 **운영 사진 첨부/업로드 검증은 미완료**로 남김. 기존 42개 자동 테스트 중 사진 동기화 회귀는 통과했으나 이 결과를 운영 첨부 검증으로 대신하지 않음.

## 보존과 최종 상태

- 기존 스마트폰, 가족방, deviceId, 원격 Sync Worker/D1/Supabase를 초기화/재배포하지 않음.
- 기존 Cloudflare Preview, 테스트 브랜치, 과거 문서, v13-final-upload 폴더 보존.
- main/local HEAD와 origin/main, origin/work-v13-integration은 모두 12f9d5c.
- working tree clean.
- 상세 HTTP 근거: 같은 폴더의 `v13-production-http-check.json`.

## Rollback 방법 (현재 실행하지 않음)

1. `backup-pre-v13-root-promotion` tag의 대상 ddcce16을 원격에서 다시 확인한다.
2. 현재 origin/main에서 복구 작업 브랜치를 만들고, 백업 tag의 운영 파일을 기준으로 복구 변경을 만든다. main force-push/reset은 사용하지 않는다.
3. 예전 service worker는 다른 앱 캐시까지 삭제하는 코드가 있으므로 그대로 재배포하지 않는다. 복구 앱 shell과 일치하는 새 버전의 범위 제한 worker를 함께 준비한다. 이미 설치된 v13 worker의 캐시 전환도 검사한다.
4. 복구본 테스트와 HTTP/실제 화면 검증 후 새 복구 commit을 main에 반영하여 Pages 재배포한다.
5. localStorage/deviceId/가족방/D1/Supabase 사진은 삭제하지 않는다. 전체 브라우저 데이터 삭제를 복구 절차로 사용하지 않는다.
6. 배포 후 온라인으로 다시 열어 복구 버전과 데이터 보존을 확인한다. 기존 Cloudflare Preview는 계속 남아 있다.

## 사진 첨부 재검증 — 사용자 권한 승인 후

- 운영 URL에서 공개 앱 아이콘(192×192)을 메모에 첨부했다. 파일 선택, 앱용 압축(6KB), 미리보기, 저장 성공.
- 실제 새로고침 후 동일 날짜의 사진 메모가 유지되었으며 확대 화면에서 이미지가 정상 표시됨을 스크린샷으로 확인했다.
- 따라서 위의 브라우저 권한 거부로 남겨둔 **운영 사진 첨부 검증은 완료**로 갱신한다.
- 가족 공유가 꺼진 상태의 로컬 첨부·저장 검증이다. 이번 재검증에서 Supabase 업로드나 다른 가족 기기로의 전파를 새로 검사한 것은 아니다. 기존 가족방과 deviceId를 초기화하지 않았다.

- 검증 후 해당 임시 사진 메모만 삭제했다. 일정에서 임시 카드가 사라지고 “메모를 삭제했습니다.” 메시지가 표시됨을 실제 화면으로 확인했다. 저장소 main은 변경 없이 clean이다.

## 운영 실기기 검증 사용자 확인

사용자가 운영 GitHub Pages에서 실제 A폰/B폰 양방향 텍스트·사진 메모 동기화까지 검증 완료했다고 확인했다. 해당 확인 이후 cleanup은 문서·임시 파일·개발 브랜치 정리만 수행하며 운영 기능과 가족방 데이터는 변경하지 않는다.
