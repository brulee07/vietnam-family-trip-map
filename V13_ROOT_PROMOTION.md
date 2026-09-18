# v13 루트 승격 — 운영 반영 승인 대기

작성: 2026-09-18. 작업 브랜치: `work-v13-integration`.
검증 출발점: `3eff0936a1d61932e24d7614713177e9e36a6fd7` (실제 Preview 런타임은 `0d6cd1f922b12d065d3dfd7f06999b81c1c1005f`). 사용자가 `v13-final-preview`의 실제 A/B 스마트폰 검증 완료를 확인했다.
현재 운영 main: `ddcce16ef231d5dae56c7e985132732ee9f9ee20`.

**이 문서는 배포 완료 보고가 아니다. main merge/push, GitHub Pages 배포 및 설정 변경을 실행하지 않았다. 사용자 승인이 필요하다.**

## 준비한 변경

- `v11-preview`의 검증된 앱을 루트 `index.html`, `app.js`, CSS, 메모·동기화 스크립트, 설정 파일로 이동했다. 표시 및 캐시 버전은 `13.2`로 구분했다. 기능 재설계는 하지 않았다.
- 루트의 구버전 `data/`를 검증된 5개 JSON으로 교체했다. 최종 100개 장소, 세탁소 5개 제외, 일정 참조 정상이다.
- `v11-preview/photos/` 전체를 `photos/`로 이동했다. 81개 대표사진과 기존 미사용 JPEG 1개, `.gitkeep` 4개를 그대로 보존했다. 사진 변경·재조사 없음.
- `v11-preview/sync-worker/`를 루트 `sync-worker/`로 이동했다. Worker 소스·schema·migration·설정 예제 내용은 동일하다. 실제 서버·D1·Supabase 설정은 변경하지 않았다.
- 루트 아이콘과 manifest를 검증된 앱 기준으로 정리했다. 설치 식별자는 기존 root `index.html`을 명시적으로 유지했다.
- 기존 테스트의 앱 경로를 루트로 변경했다. 승격 경로·자산 무결성·PWA 전환 검사를 추가했다.

## 삭제·교체·이동 대상

실제 제거하는 구버전 전용 실행 파일:

- `ai-assistant.js`
- `ai-assistant.css`
- `weather.js`

위 기능은 검증된 통합 `app.js`에 이미 있으므로 구버전 구현만 제거한다.

기존 UI 본문을 제거하고 호환 연결 페이지로 교체하는 11개 경로:

- `da_nang.html`, `quy_nhon.html`, `tuy_hoa.html`, `nha_trang.html`
- `da_nang_json_beta.html`, `quy_nhon_json_beta.html`, `tuy_hoa_json_beta.html`, `nha_trang_json_beta.html`
- `nha_trang_json_alpha.html`
- `data/index.html`
- `v11-preview/index.html`

도시 주소는 해당 `?city=`를 유지하고, 나머지 query 및 `#family=...&key=...` 초대 정보도 루트로 전달한다. 이전 history entry의 fragment를 먼저 지우고 `location.replace`로 이동한다. 루트 앱이 초대를 저장한 뒤 최종 주소의 fragment도 지운다.

중복 실행 구조 제거:

- `v11-preview/app.js`, `app.css`, `memo-cards.js`, `family-sync.js`, `family-sync.css`, `map-improvements.css`, `home-improvements.css`, `ai-config.js`, `sync-config.js`: 루트로 이동.
- `v11-preview/data/`, `icons/`: 루트 데이터·아이콘으로 통합 후 중복 경로 제거.
- `v11-preview/photos/`, `sync-worker/`: 내용 보존 이동.
- `v11-preview/index.html`, `manifest.json`, `service-worker.js`는 이전 설치와 주소 호환을 위해 남긴다.

구버전 README 6개는 삭제하지 않고 `docs/legacy/`로 이동했다:
`README_V9_5_1.md`, `README_V9_5_AI_SETUP.md`, `README_V10_0.md`, `README_V10_0_1.md`, `README_V10_1.md`, `README_V10_1_1.md`.

사진 감사·인수인계·검증 Markdown/CSV는 원래 `v11-preview/` 경로와 내용을 그대로 유지했다. 옛 UI 원본은 Git 이력에서 복원할 수 있다. 기존 Preview 배포, 브랜치, 준비된 `v13-final-upload` 폴더와 ZIP은 삭제하지 않았다.

## PWA / service worker 전환

1. root의 기존 `service-worker.js` URL과 scope를 유지하며 `?v=13.2`로 갱신한다. manifest의 명시적 `id`/`start_url`은 `./index.html`, scope는 `./`이다. GitHub Pages 프로젝트 하위 경로에서도 동작한다.
2. 새 캐시는 `vietnam-family-root:<프로젝트 경로>:13.2-1`로 격리한다. 앱 shell을 모두 받은 뒤 활성화한다. 설치 실패 시 기존 active worker가 유지된다.
3. JS/CSS뿐 아니라 5개 JSON 요청에도 `?v=13.2`를 사용한다. 구버전 cache-first worker가 첫 실행에 105개 장소 데이터를 돌려주던 문제를 실제 브라우저에서 재현하고 수정했다.
4. 이 프로젝트의 이전 root 캐시만 정리한다. 구버전 캐시에 외부 URL 또는 다른 경로가 섞여 있으면 보수적으로 보존한다. Preview 캐시 및 다른 앱 캐시는 유지하며 새 worker는 이를 읽지 않는다. `localStorage`나 IndexedDB를 지우지 않는다.
5. `v11-preview/service-worker.js`는 retirement worker로 남긴다. 새 루트는 정확히 해당 scope/script의 registration에만 update를 요청한다. retirement worker가 활성화되면 자신의 registration을 해제한다. 작성 중인 기존 탭을 강제로 reload/navigation하지 않는다.
6. 이전 Preview manifest는 기존 `./index.html` identity/start URL을 유지하고 scope만 부모로 확장한다. 옛 시작 주소는 연결 페이지를 통해 루트로 간다. 플랫폼별 설치 UI 반영 시점은 다를 수 있으므로 운영 배포 후 Android/iOS 홈 화면 실행 확인이 필요하다.
7. 첫 전환은 온라인 상태에서 수행한다. 이후 shell/데이터 및 방문해 캐시된 사진은 네트워크 실패 시 사용한다. 처음부터 81개 사진 전체를 오프라인 다운로드하지는 않는다. 지도 타일·날씨·AI·동기화는 각 온라인 연결 상태에 따른다.
8. 화면을 자동 강제 새로고침하지 않는다. 오래 열린 편집 화면은 작업을 마친 뒤 재실행하거나 도구의 새 버전 확인을 사용한다. 브라우저 데이터 전체 삭제를 안내하지 않는다.

## 사용자 저장 데이터와 도메인 전환

- 같은 origin의 `/v11-preview/` → root 이동은 `familyTravelV11`, `familyTravelFamilySyncV12`, 백업 저장 구조와 deviceId를 그대로 사용한다. 가족 동기화·멀티 메모 코드는 검증본과 동일하다.
- 옛 v10 도시별 `danangCustomPlaces`, `quynhonCustomPlaces`, `tuyhoaCustomPlaces`, `nhatrangCustomPlaces` 등의 저장값은 삭제하지 않는다. v13 데이터로 자동 변환하지도 않는다. 해당 구형 사용자 추가 장소는 v13 화면에 자동 표시되지 않는다. 원본은 같은 origin 저장소와 Git의 구형 코드로 복구할 수 있으며, 필요 시 별도 변환 작업 대상으로 남긴다.
- **Cloudflare Preview와 GitHub Pages는 다른 origin**이다. Preview의 localStorage/deviceId가 GitHub Pages로 자동 이동한다고 보장하지 않는다. Preview에서만 만든 미동기화 기록은 먼저 파일 백업하고 가족 동기화를 완료해야 한다.
- GitHub Pages에 처음 접속하는 기기는 운영 주소로 만든 초대 링크 또는 고급 직접 입력을 통해 기존 가족방에 연결한다. 기존 Cloudflare 초대 링크는 계속 Cloudflare를 연다. 이 링크를 몰래 다른 호스트로 보내지 않는다.
- 다른 origin에서는 새 기기로 등록될 수 있다. 9대 제한이 찼다면 사용자가 기기 목록을 확인하고 더 이상 사용할 Preview 기기를 명시적으로 정리해야 한다. 이번 작업은 원격 기기를 삭제하거나 기존 가족방을 초기화하지 않았다.

## 검증 결과

- 자동 테스트 **42 passed / 0 failed**: 기존 35개 + 승격 7개.
- `tests/promotion-baseline.json`: 검증 출발 commit의 사진·감사 문서·데이터·동기화·Worker 등 135개 파일 내용 보존 확인. 텍스트는 Git CRLF/LF 차이만 정규화한다.
- 프로젝트 prefix `/vietnam-family-trip-map/`에서 모든 로컬 진입 자산 HTTP 200. 대표사진 81개 HTTP 200·파일 바이트 일치. 미확보 19개는 예상된 404. 81개 모두 Pillow JPEG verify 및 전체 decode 통과.
- 실제 브라우저 localhost에서 기존 root v10 worker와 v13 Preview worker를 설치한 뒤 승격 상황을 재현했다. 수정 후 첫 root 로딩부터 100개 장소 표시.
- 합성 저장 일정·저장 장소·동일 deviceId·구형 custom 저장값 유지 확인. nested worker가 사라지고 root `?v=13.2`만 등록된 상태 확인. 별도 앱 캐시 보존 확인.
- 이전 Preview 초대 주소에서 root의 이름만 입력하는 참여 화면으로 이동했고 최종 fragment가 지워졌다. 합성 초대는 실제 가족방에 제출하지 않고 취소했다.
- 로컬 서버를 중단한 후 root 재로딩과 옛 `nha_trang.html` → root `?city=nha_trang` 이동 성공.
- 기존 사용자가 완료한 A/B 스마트폰 검증은 검증 출발 Preview에 대한 결과다. 승격 후보는 로컬 회귀/전환 검증을 수행했으며, 운영 배포 후 실기기 홈 화면 전환 확인은 아직 수행 전이다.

## 사용자 승인 후 실행할 순서

1. 이 변경 및 삭제 목록, PWA 전환, origin 차이를 사용자에게 보고하고 **main 반영과 운영 배포 승인을 받는다**.
2. 원격 main / work branch를 다시 조회한다. main이 변경되었다면 재검토한다. 현재 main은 작업 브랜치의 조상이므로 현재 기준으로는 fast-forward 가능하다.
3. GitHub Pages 실제 source branch/folder를 읽어서 확인한다. 준비 단계에서 Pages 설정을 변경하지 않았고 live 설정 확인은 아직 하지 않았다. `main` / root가 아닌 경우 승인 범위를 확인하기 전 임의 변경하지 않는다.
4. 기존 main commit을 복구 기준으로 기록하고, 승인된 commit만 main에 반영한다. **main push 자체가 자동 배포를 시작할 수 있으므로 승인 전 실행하지 않는다.**
5. Pages 배포 완료 후 운영 HTTP 200, 앱 버전, 100개 장소, 사진 자산, 기존 주소/초대 전환, 실제 Sync Worker 연결, 설치 PWA 갱신을 확인한다. 운영 확인 전 배포 성공으로 보고하지 않는다.
6. Cloudflare Preview와 업로드 폴더, 작업 브랜치는 그대로 유지한다. 새 서버/유료 API/DB migration은 필요 없다.

## 문제가 있을 때 복구

- `main`을 force-push/reset하지 않는다. 배포 승인 범위에 따라 승격 변경을 되돌리는 새 commit 또는 수정 commit으로 복구한다.
- 소스 rollback만으로 이미 설치된 worker가 즉시 돌아가는 것은 아니다. 과거 worker의 전체 캐시 삭제 동작을 그대로 재배포하지 말고, 새 cache version을 가진 범위 제한 worker로 복구 릴리스를 준비한다.
- 사용자의 localStorage/가족방/D1/Supabase 사진을 삭제하지 않는다. Cloudflare Preview는 전환 확인이 끝날 때까지 유지한다.
