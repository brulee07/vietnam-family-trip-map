# v13 maintenance cleanup

운영 기준: `12f9d5cc4b13d3d91fa4b425c3ad6d4506ecad9b`, https://brulee07.github.io/vietnam-family-trip-map/ .
작업 브랜치: `maintenance-v13-cleanup`. main merge는 사용자 승인 전 금지.
사용자가 운영 A/B 양방향 텍스트·사진 메모 실사용 검증 완료를 확인함.

## 삭제 전 기록한 브랜치

|브랜치|삭제 전 HEAD|역할 및 main 포함 상태|
|---|---|---|
|work-v11-family-sync-fix|380252a048cd1d39df95fb0d378e96a2eb3d8ae2|가족 동기화·독립 멀티 메모. main의 조상, 고유 commit 0|
|work-v11-photo-agent|041f3b57aabb58620a8a00aeaa5c8a5e1d01d048|다낭 사진 검증. 동일 패치가 main에 포함(git cherry '-'). 원래 패치 docs/archive/git/041f3b5.patch 보관|
|work-agent-push-test|83cbdfb34fa6d99cc033b21d60512525ffd36fd0|push 확인용 WORK_PUSH_TEST.md 한 줄. main 미포함이지만 앱 변경 없음. 전체 패치 docs/archive/git/83cbdfb.patch 보관|

삭제 전 세 브랜치의 로컬 branch는 존재하지 않았음. 원격 branch 정리 결과는 아래 완료 기록에 기재한다. 패치는 내용을 복구하기 위한 기록이며 원래 commit SHA 자체를 영구 보존하는 tag는 아니다.

## 문서 보관

- 구버전 README 6개: docs/legacy/ → docs/archive/legacy/.
- 개발/인수인계 보고서·체크리스트·설정 설명서 10개: v11-preview/ → docs/archive/v11-preview/.
- 이동 문서 내용 보존. 인수인계 문서의 상대 링크 4개만 현재 감사 문서 경로로 수정. tests/promotion-baseline.json에 이동 경로와 링크 변환표를 기록하고, 검사 시 링크만 원래 표기로 역변환하여 원래 135개 SHA-256을 모두 검증.
- 현재 README의 archive 위치 갱신. 역사 기록인 V13_ROOT_PROMOTION.md와 Freeze 감사 문서는 원문 유지하며 archive/README.md에서 옛 경로와 현재 경로를 설명.
- 운영 배포 결과와 109개 운영 자산 HTTP 검사, Preview 검증 JSON을 docs/releases/에 보관. 이후 로컬 업로드 폴더를 삭제해도 운영 commit·URL·검증 근거는 저장소에 남는다.

## 승인된 로컬 삭제 대상

Codex scratch 경로 C:/Users/LEE/.codex/visualizations/2026/09/18/01a0b3d7-2fc1-7582-a13e-f914f64a78ad/ 아래 정확히 두 항목만 대상:
- v13-final-upload/ (106 files, 약 33.38MiB)
- v13-final-preview.zip (약 33.08MiB)
사진 감사 원본, 검사 스크립트, 배포 결과 원본은 보존.

## 보존 항목

- main, work-v13-integration, maintenance-v13-cleanup.
- backup-pre-v13-root-promotion → ddcce16ef231d5dae56c7e985132732ee9f9ee20.
- 운영 JS/CSS/HTML/manifest/service worker/data/icons/photos, Worker 코드·설정, migration SQL 변경 없음.
- 모든 사진 감사 문서/CSV 및 최종 사용성·루트 승격 보고서 원문 보존.
- Cloudflare Pages vietnam-family-v11-photo-preview와 vietnam-family-v11-sync-test 및 내부 모든 배포 보존. 별도 마지막 정리 단계까지 삭제 보류.
- Workers, D1, Supabase, 운영 가족방·deviceId 데이터 변경 없음.
- **TEST ROOM — 보존**: 테스트/운영 방을 확실하게 구별할 근거가 없으므로 어느 원격 방도 삭제하지 않음. 실제 방 내용이나 공유키를 수집하지 않음.

## 완료 기록

- 승인된 세 원격 브랜치를 기록한 SHA에 대한 lease와 atomic push로 삭제 완료. 로컬 branch는 원래 없었으며 해당 remote-tracking ref도 제거됨.
- v13-final-upload/ 및 v13-final-preview.zip 삭제 완료. 사진 감사 원본과 배포/HTTP 기록 보존.
- Cloudflare Pages 프로젝트·배포 삭제 0건, 가족방/D1/Supabase 변경 0건.
- 자동 테스트 42 passed / 0 failed. 사진·데이터·동기화·문서의 기존 135개 SHA-256 보존 검사 통과. archive Markdown 상대 링크 검사 통과.
- 운영 자산 109개 HTTP 200 및 로컬 실행 자산과 내용 일치. 운영 commit은 여전히 12f9d5c, 장소 100개·사진 81개.
- 실제 운영 브라우저에서 가족 공유 패널·Today Day 1·날씨 실시간 응답·AI 실제 응답 확인.
- 가족 공유가 꺼진 검사 브라우저에서 사진 메모와 텍스트 메모 2개 추가, 새로고침 후 보존, 사진 확대 표시 확인. 검사용 메모만 UI에서 삭제 완료.
- 이번 UI 검사는 로컬 첨부/저장까지이며 원격 가족방에 쓰지 않았음. 운영 A/B 양방향 텍스트·사진 동기화 실사용 완료는 사용자 확인을 기록한 것임.
- 운영 실행 파일·사진·data·Worker·migration 변경 0건. 문서 이동/추가, README 경로 안내, 테스트 baseline 경로 및 링크 역변환 검사만 변경.
- main merge와 운영 재배포는 실행하지 않음. cleanup commit·push 후 main 반영 승인을 요청함.
