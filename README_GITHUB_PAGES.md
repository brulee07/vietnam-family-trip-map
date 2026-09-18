# Vietnam Family Trip v13 — 루트 앱

검증된 v13 앱을 저장소 루트로 승격하는 후보입니다. **main 반영과 GitHub Pages 운영 배포는 사용자 승인 전까지 금지**합니다.

- 앱 진입점: `index.html`
- 데이터: `data/` (100곳, 세탁소 제외)
- 대표사진: `photos/` (81곳 보유; 사진 감사 결과 유지)
- 동기화: 기존 `sync-config.js`와 `sync-worker/`; 서버 재배포 불필요
- 이전 도시 HTML 및 `v11-preview/index.html`: 새 루트로 이동하는 호환 페이지
- 사진 감사·최종 사용성 보고서: `v11-preview/` 원문 보존
- 개발·검증 보고서 및 체크리스트: [docs/archive/](docs/archive/README.md)
- 운영 배포 결과와 검증 근거: `docs/releases/`
- 정리 내역: [docs/V13_CLEANUP.md](docs/V13_CLEANUP.md)
- 구버전 설명서: `docs/archive/legacy/`

승인 대상 변경, 삭제 목록, PWA 전환 및 복구 절차는 [V13_ROOT_PROMOTION.md](V13_ROOT_PROMOTION.md)를 확인합니다. 과거 문서의 `v11-preview/photos/`, `v11-preview/data/`, `v11-preview/sync-worker/` 경로는 당시 기록이며 현재 파일은 루트 아래 동일한 하위 경로로 이동했습니다.

## 로컬 검증

Node.js로 다음을 실행합니다.

```text
node --test tests/family-sync.test.cjs tests/v13-assets.test.cjs tests/v13-usability.test.cjs tests/root-promotion.test.cjs
```

정적 서버에서 저장소 루트를 제공하면 앱이 실행됩니다. GitHub Pages 프로젝트 경로 검증과 이전 worker 전환 재현은 `tests/promotion-ui-server.cjs`를 사용합니다. Git이 PATH에 없으면 `TEST_GIT`에 실행 파일 경로를 설정합니다. 다른 포트는 `PORT`로 지정합니다. `http://127.0.0.1:8137/__qa.html`에서 합성 데이터 준비 → 로컬 서버 전환 → 새 앱 열기 순서로 검사합니다. 이 서버는 실제 가족방 가입을 수행하지 않습니다.

## 승인 후 운영 반영

1. 원격 main과 작업 브랜치의 최신 상태를 다시 확인하고 승인된 변경만 반영합니다.
2. GitHub Pages의 실제 배포 source가 `main` / root인지 읽어서 확인합니다. 현재 설정이 다르면 임의 변경하지 않습니다.
3. main push가 자동 운영 배포를 시작할 수 있으므로 merge와 push 모두 승인 뒤 수행합니다.
4. 운영 URL에서 HTTP, 100개 장소, 사진 81개, 기존 URL 전환, 가족 초대, PWA 갱신을 확인합니다.
5. 기존 Cloudflare Preview와 업로드 폴더를 유지합니다. 원격 데이터나 가족방을 초기화하지 않습니다.

운영 반영을 자동 실행하는 workflow는 이번 준비 단계에서 추가하지 않았습니다.
