# 전체 도시 대표사진 최종 검사 — 2026-09-18

다낭·꾸이년·뚜이호아·나트랑 **Freeze**. 사진 동일성 조사는 검증 가능한 범위에서 종료하며 불충분·미확보 상태를 숨기지 않는다. 기존 Freeze 자료는 재조사·수정하지 않고 각 보고서의 판정을 승계했다.

|도시|대상|검증 완료|최종 검증 불충분|미확보|사진 보유|추가|교체|제거|
|---|---:|---:|---:|---:|---:|---:|---:|---:|
|다낭|16|16|0|0|16|1|0|0|
|꾸이년|31|22|3|6|25|5|0|0|
|뚜이호아|26|15|4|7|19|4|0|1|
|나트랑|27|17|4|6|21|5|0|1|
|합계|100|70|11|19|81|15|0|2|

추가·교체·제거는 각 도시 전체 감사 Phase 누적. 이번 집 PC 작업(시작 `1dfddea`)만은 나트랑 **추가 5 / 교체 0 / 제거 1**, 뚜이호아는 최종 보고서·판정 보완만 했다. 대상은 실제 장소 중복을 합치지 않은 도시별 등록 항목 100개이다.

## 최종 자동 검사

- `places.json` 105개 중 `cat == 세탁` 5개 제외, 실제 검사 100개.
- 앱과 동일하게 `photoFile || photos/{city}/{id}.jpg` 적용. 다낭 `con`의 명시적 `photos/da_nang/conmarket.jpg`도 정상 반영했다.
- 로컬 사진 81개 모두 파일 존재, HTTP 200, Content-Type image/jpeg, 응답과 파일 바이트 동일, Pillow JPEG verify 및 전체 decode 통과.
- 로컬 미확보 19개는 예상된 HTTP 404. 사진 보유는 로컬 대표사진 기준이다. 앱에 남아 있는 기존 외부 fallback은 표시될 수 있으나 그 사진의 동일성·현재 HTTP 상태를 이번 로컬 검사 결과로 보증하지 않는다.
- 절대경로·상위경로 이탈 없음, 모든 명시적 사진 경로의 도시 폴더가 등록 도시와 일치. 잘못된 상대경로 발견 없음.
- SHA-256 중복 2쌍: 꾸이년/뚜이호아의 `ganhdadia`, `oloan`. 각 쌍은 같은 등록 좌표·동일 실제 장소로 정상 공유. 비정상 파일 중복 없음.
- 꾸이년/뚜이호아 `apec`도 같은 좌표·동일 실제 호텔 등록이며 도시마다 다른 파일 사용을 강제하지 않았다. 같은 도시의 `rosa`/`roselispa`, `nhatrangcenter`/`coconutmassage`는 같은 건물 좌표지만 호텔·스파 또는 쇼핑센터·입점점의 구분을 유지했다.
- 도시-사진 오연결의 내용상 판정은 각 도시 감사에 근거한다. 기계적인 경로 일치가 불충분 11곳의 장소 동일성을 입증하는 것은 아니다.
- 신규 5장(camranh, nhatrangbeach, longson, oceanography, vinwonders)은 로컬 앱의 일정 카드·간편보기·상세화면에서 직접 표시 확인. 최종 2장은 1/23·1/24 일정에서 확인했다. CSS 중앙 크롭은 기존 동작을 유지했다.
- `node --test tests/family-sync.test.cjs tests/v13-assets.test.cjs`: **23 passed / 0 failed**. Phase별 실행과 최종 이미지 추가 후 실행 모두 통과. 다낭 Freeze 16장 HTTP 무결성 테스트 포함.

## 세탁소 제외와 후속 정리

제외 5곳: `quy_nhon/gold`, `tuy_hoa/giatuituyhoa`, `tuy_hoa/giatsayphuyen`, `nha_trang/laundry2h`, `nha_trang/washgo`. 조사·사진 확보·위 집계에서 제외했다. 기존 데이터와 일정 연결에 영향을 주므로 사용자 지침대로 임의 삭제하지 않았다. 실제 일정 화면에도 일부 남아 있음을 확인했다. **최종 여행지도에서의 제거는 후속 정리 대상이며 이번 작업으로 화면 제외까지 완료한 것은 아니다.**

## 변경 파일 및 Git 기록

시작 HEAD `1dfddea83f76bc835e6ecdcffc036b4321971712`, 브랜치 `work-v13-integration`.

- `485ec08099d2cfbddc0bb0bf9a3ed2cfb36ea228`: 뚜이호아 최종 보고서·Freeze.
- `4d759e2d53ad5c6dea41313f0b99088a48a77559`: 나트랑 Phase 1, 사진 3장 추가·잘못된 WinMart 지점 1장 제거.
- `fdad48bb709b875a5d01ecd5c816a91bffa51506`: 나트랑 Phase 2 보고서.
- `1ed6981ce40826a4cfb6e187597ddeb8f6ef2ead`: 나트랑 최종 사진 2장·보고서·Freeze.

위 단계마다 push 성공 후 live remote HEAD == local HEAD와 working tree clean을 확인했다. 이 전체 보고서는 마지막 별도 커밋으로 저장한다.

시작 대비 변경 11개 경로:

- 보고서 5개: `TUY_HOA_PHOTO_AUDIT_FINAL_2026-09-18.md`, `NHA_TRANG_PHOTO_AUDIT_PHASE1_2026-09-18.md`, `NHA_TRANG_PHOTO_AUDIT_PHASE2_2026-09-18.md`, `NHA_TRANG_PHOTO_AUDIT_FINAL_2026-09-18.md`, 이 보고서(모두 `v11-preview/`).
- 추가 5개: `v11-preview/photos/nha_trang/{camranh,nhatrangbeach,longson,oceanography,vinwonders}.jpg`.
- 제거 1개: `v11-preview/photos/nha_trang/winmarttranphu.jpg`.

`git diff`/`status`로 의도한 변경만 확인했다. 다낭·꾸이년 사진·보고서, 뚜이호아 기존 사진, 장소/일정 JSON, 앱 코드·동기화·PWA 등 기능 변경 없음. `main`은 기존 `ddcce16ef231d5dae56c7e985132732ee9f9ee20` 그대로이며 merge/rebase/push하지 않았다. PR 생성·Preview 재배포 없음.
