# 집 PC 인수인계 — 2026-09-18

## 기준과 작업 종료 상태

- 기준 저장소: https://github.com/brulee07/vietnam-family-trip-map
- 앞으로 사용할 기준 브랜치: **`work-v13-integration`**.
- 이 문서 작성 전 최신 작업 commit: **`4b1516d`**, 전체 SHA `4b1516df3ba1725e88c138e1b7041d8c3062fbfe`. 뚜이호아 Phase 2 결과이며 origin과 일치·working tree clean 확인 완료.
- 이 인수인계 문서만 별도 commit·push하므로 집 PC에서 받을 최신 HEAD는 `4b1516d`의 후속 문서 commit이다. `4b1516d`로 reset하거나 checkout하지 말고 원격 브랜치의 최신 HEAD를 받는다.
- 학교 PC에서는 문서 작성·push 후 종료한다. 새 장소 조사·사진 변경·배포는 수행하지 않는다.
- `main`은 변경·merge·push하지 않았다. 학교 PC 로컬 main 기준 SHA: `ddcce16ef231d5dae56c7e985132732ee9f9ee20`.

## v13 통합과 Preview

- 멀티 메모 v12.9 기준 `380252a048cd1d39df95fb0d378e96a2eb3d8ae2` 위에 다낭 사진 commit `041f3b57aabb58620a8a00aeaa5c8a5e1d01d048`을 선택 통합했다. 사진 cherry-pick은 `74076b6`, v13 통합 commit은 `4212a37`이다. 충돌 없이 다낭 보고서와 dragon.jpg를 통합했고 family-sync.js/memo-cards.js를 과거 버전으로 되돌리지 않았다.
- v13 Preview: **https://v13-integration.vietnam-family-v11-sync-test.pages.dev/**
- Cloudflare Pages `vietnam-family-v11-sync-test` 프로젝트의 별도 `v13-integration` Preview이다. 기존 운영 GitHub Pages·main·사진 Preview·memo-cards Preview를 교체하지 않는다. 근거: [V13_INTEGRATION.md](V13_INTEGRATION.md).
- Preview에는 Sync/AI Worker, 날씨, 지도, Supabase 이미지 읽기 연결 및 noindex가 배포용 설정으로 적용되었다. 원본 서비스 설정을 다시 만들지 않는다.
- 위 URL은 기존 배포 기록의 프로젝트/Preview 별칭이다. 이번 인수인계에서 웹 도구의 접속 확인은 실패하여 현재 HTTP 상태를 새로 보증하지 않는다. **꾸이년·뚜이호아의 후속 사진 commit까지 해당 URL에 배포됐다는 기록은 없다. Git push와 Pages Direct Upload 배포는 별개다.** 집에서는 로컬 최신 브랜치와 배포본을 구분한다.
- 기존 일정 편집, Today Mode, AI, 날씨, 백업·복원 및 가족 동기화 구현을 유지했다. 회귀 테스트가 외부 AI/날씨 서비스의 모든 실동작을 보증하는 것은 아니다.

## 지역별 사진 상태

| 범위 | 대상 | 검증 완료 | 검증 불충분 | 미확보 | 최종 사진 보유 |
|---|---:|---:|---:|---:|---:|
| 다낭 — Freeze | 16 | 16 | 0 | 0 | 16 |
| 꾸이년 — 최종 Freeze, 세탁소 제외 | 31 | 22 | 3 | 6 | 25 |
| 뚜이호아 Phase 1 — 완료 결과 보존 | 13 | 10 | 1 | 2 | 11 |
| 뚜이호아 Phase 2 | 13 | 4 | 4 | 5 | 8 |
| **뚜이호아 전체 — 세탁소 제외** | **26** | **14** | **5** | **7** | **19** |

사진 보유에는 검증 불충분인 기존 사진도 포함된다. 조사 종료/Freeze를 모든 사진의 정확성 검증 완료로 해석하지 않는다.

### 다낭 Freeze

16/16 검증 완료, 기존 15장 유지, dragon.jpg 1장 추가, 교체·경로 수정 0. 기존 파일은 보존했다. [다낭 보고서](../../../v11-preview/DA_NANG_PHOTO_AUDIT_2026-09-17.md).

### 꾸이년 Freeze

Phase 1 `0a318d5`, Phase 2 `acf136b`, 최종 보완 `07a8d40`. 최종 보완에서 Ô Loan 사진 1장을 추가하고 ZENN·MM Mega Market의 판정을 보완했다. 최종 31곳/22 완료/3 불충분/6 미확보/25 보유. **이 결과·사진·데이터는 앞으로 재조사하거나 임의 수정하지 않는다.** 잔여 불확실성이 있어도 Freeze 상태를 유지한다. [최종 보고서](../../../v11-preview/QUY_NHON_PHOTO_AUDIT_FINAL_2026-09-18.md).

### 뚜이호아 Phase 1·2

- Phase 1 `e6ba17d`: 기존 7장 유지, 신규 4장(thapnhan, oloan, vungro, tuyhoabeach), 교체 0. [Phase 1 보고서](../../../v11-preview/TUY_HOA_PHOTO_AUDIT_PHASE1_2026-09-18.md).
- Phase 2 `4b1516d`: 기존 8장 유지, 신규·교체 0, 잘못된 사진 제거 1. [Phase 2 보고서](../../../v11-preview/TUY_HOA_PHOTO_AUDIT_PHASE2_2026-09-18.md).
- `photos/tuy_hoa/oloanseafood.jpg`에는 **AN LAGOON Seafood Master** 간판과 지도 표제가 있었다. 업체 공식 주소는 **Đầm Lập An, Lăng Cô, Huế**로 Ô Loan/Phú Yên과 다른 지역이다. [공식 근거](https://www.anlagoon.com/). 오연결을 확정해 파일을 제거했다. 임의의 식당이나 Phase 1 석호 사진으로 대체하지 않았다.
- `oloanseafood`는 특정 식당이 아닌 QL1 접근 점심권역 POI이다. `oloan` 석호 관광 POI와 구분한다. 제거한 원본은 이전 Git commit에 남아 있으나 다시 활성화하지 않는다.
- Phase 2에서는 places.json·앱 코드·Freeze 자료를 변경하지 않았다. 최종 8개 보유 경로 HTTP 200/JPEG 정상, 미확보 5개는 404. 제거 후 카드·간편보기·상세화면에서 잘못된 사진과 깨진 아이콘이 표시되지 않음을 확인했다.

## 뚜이호아 남은 12곳 — 정확한 이름

다음은 후속 보완 대상으로만 인계한다. 이번 인수인계 작업에서는 조사하지 않는다. Phase 1 기존 보고서·사진은 그대로 보존하고, 후속 조사 결과는 별도 보완 문서에 기록한다. 기존 검증 완료 14곳은 재조사·수정하지 않는다.

| 분류 | 정확한 장소명 | ID | 남은 사항 |
|---|---|---|---|
| 검증 불충분 | Vincom Plaza Tuy Hòa | vincom | 정확한 지점 외관의 독립 대조 부족 |
| 검증 불충분 | Hiệp Yến Coffee & Restaurant | hiepyen | 262–266/340/365 Hùng Vương 표기와 기존 실내 사진의 지점 대응 |
| 검증 불충분 | SANDY VIBES Coffee and Tea | sandyvibes | Nguyễn Huệ/Độc Lập 주소·등록 좌표·건물 대응 |
| 검증 불충분 | APEC Spa Tuy Hoà | apecspa | 사진 SH06·전화는 확인, 등록 23 Điện Biên Phủ 임시 앵커와 불일치 |
| 검증 불충분 | Lumiere Wellness · TUI BLUE Tuy Hoa | tuibluewellness | 공식 호텔 내부 사우나 사진은 대조됨. 호텔 02 Hải Dương와 등록 해변권 좌표 문제 |
| 미확보 | Tuy Hòa Market / Chợ Tuy Hòa | tuyhoamarket | 지점 사진 후보의 촬영자·재사용 조건 미확인 |
| 미확보 | WinMart Tuy Hòa | winmarttuyhoa | 정확한 지점 전경·재사용 조건 부족 |
| 미확보 | Bánh Canh Hẹ Thành Tâm | thanhtam | 53/30 Điện Biên Phủ 혼재 및 사진 검증 부족 |
| 미확보 | Quán Cô Ba Diệp | cobadiep | 261 Điện Biên Phủ 외관·사용권 확인 부족 |
| 미확보 | Ô Loan Seafood Lunch Zone | oloanseafood | 오연결 제거 후 정확한 권역 대표사진 미확보 |
| 미확보 | Roseli Spa · Rosa Alba Resort | roselispa | 공식적으로 Rosa Alba 3층 시설 확인, 사진 사용권 미확인 |
| 미확보 | An Spa | anspa | 271 Lê Duẩn 지점의 대표사진·사용권 확인 부족 |

## 멀티 메모와 실제 기기 검증

- v12.9의 `familyTravelV11.memoCards`는 메모 ID별 독립 카드이다. 하루 여러 메모, 각 카드의 수정·삭제·사진·장소 사이 이동을 지원한다. `notes`, `notePositions`, `memoPhotos`는 자동 migration 및 복구용 호환 데이터로 보존한다.
- ID별 merge, push 중 새 로컬 변경 보존/후속 push, 사진 실패 pending/error 및 재시도, 텍스트 동기화 독립 진행, Supabase 원격 사진 참조를 포함한다. 같은 카드의 동시 텍스트 편집은 레코드 시각/결정적 동률 규칙이며 문자 단위 공동편집은 아니다.
- 기존 최대 9대 가족 기기 구조를 유지했다. **9대 실기 동시 검증을 수행한 것은 아니다.**
- 실제 사용자 확인: A폰에서 B폰(아내)이 작성한 메모가 보였고, 이후 아내 B폰에서도 정상 확인됐다고 보고했다. 사진 포함 메모가 확인됐다는 사용자 보고도 있다. 따라서 실제 **A→B/B→A 텍스트·사진 포함 메모 공유 확인**을 인계한다.
- C에 해당하는 PC 브라우저 화면에서도 사용자가 본인 및 아내의 사진 포함 메모 수신을 확인했다. 다만 대화에 명시적인 C 기기 식별이나 C에서 새 메모를 작성한 뒤 A/B로 전파하는 별도 시험 기록은 없다. **C 수신 확인과 A/B/C 모든 방향·동시 편집 실기 검증 완료를 구분한다.** 자동 테스트 결과로 이 공백을 대신 주장하지 않는다.
- 위 기기 확인은 memo-cards/v12.9 테스트 흐름에서 이루어졌다. 이후 v13 통합을 사용자가 확인했다고 보고했지만 전체 시나리오를 v13에서 재실행한 상세 기록은 없다. 예전 개발 문서의 ‘폰 테스트 예정’ 문구는 문서 작성 당시 상태이며 이후 사용자 확인과 시점을 구분한다.
- 모든 기기는 같은 버전 URL과 같은 가족 공유방에 참여해야 한다. URL origin이 바뀌면 localStorage·참여 상태가 별도다. 초대 링크/공유키는 이 Git 문서에 기록하지 않는다. 기존 기기에서 초대 링크를 사용하고 새 방 생성·데이터 초기화를 하지 않는다.
- 마지막 로컬 회귀: `node --test tests/family-sync.test.cjs tests/v13-assets.test.cjs` **23/23 통과**. 실제 모델/동기화 코드와 모의 서버로 migration·동시 추가/수정·busy/poll/upload 중 변경·복구·백업 및 다낭 HTTP 검사. 자세한 구조: [MULTI_MEMO_CARDS.md](MULTI_MEMO_CARDS.md).

## Supabase / 외부 서비스

- Sync Worker `vietnam-family-trip-sync`의 잘못된 SUPABASE_URL을 **`https://aqgduityefmozvkxkuzj.supabase.co`**로 수정·재배포한 이력이 있다.
- 이전 작업에서 작은 테스트 JPEG의 Worker `/photo/upload` 성공, remoteId/remoteUrl 반환, remoteUrl GET 200 및 이미지 확인이 완료된 상태로 인계됐다. 이후 실제 폰의 사진 메모 공유도 사용자 확인을 받았다. 이번 문서 작성에서 업로드를 다시 실행한 것은 아니다.
- 운영 설정의 이 수정은 Git 브랜치 변경과 별개다. clone 후 환경변수를 다시 덮어쓰거나 secret을 재생성하지 않는다. 비밀키는 출력·문서화하지 않는다.
- Secret key, D1 schema/바인딩/내용, Supabase 버킷·기존 객체, 가족방·기기 ID를 삭제·초기화·변경하지 않는다. 운영 Workers와 GitHub Pages도 변경하지 않는다.

## 다음 작업 규칙

1. **모든 도시의 세탁소는 최종 제외**한다. 이는 조사·사진 확보 대상 제외이며 기존 JSON에서 일괄 삭제하라는 뜻은 아니다. Gold Laundry, Giặt Ủi Tuy Hòa Laundry, Giặt Sấy Phú Yên 등을 재조사하지 않는다.
2. **다낭·꾸이년 Freeze 사진·데이터·검증보고서는 앞으로 수정하지 않는다.** 뚜이호아 Phase 1 기존 결과도 보존한다.
3. 나트랑은 **아직 사진 전수조사를 시작하지 않았다.** 기존 사진이 있다는 사실을 검증 완료로 간주하지 않는다.
4. 다음 권장 순서: **뚜이호아 남은 12곳만 보완 → 별도 최종 보고서와 집계 → 뚜이호아 Freeze → 이후 사용자 지시에 따라 나트랑 조사**.
5. 정확한 기존 사진은 유지한다. 신규 사진은 장소 동일성·출처·저작자·라이선스를 확인한다. 불확실하면 검증 불충분/미확보로 남긴다. 주소·좌표 문제를 임의의 사진 교체로 숨기지 않는다.
6. 앱 기능, 멀티 메모, Sync, AI, 날씨, Today, 백업, Worker, D1, Supabase, service worker/PWA 구조는 사진 작업에서 수정하지 않는다. main merge·운영 배포·이전 버전 삭제도 하지 않는다.

## 집 PC 시작 절차

### 새 clone

집 PC의 원하는 상위 폴더에서 실행한다. 학교 PC의 절대 경로나 런타임 경로를 복사하지 않는다.

```powershell
git clone --branch work-v13-integration https://github.com/brulee07/vietnam-family-trip-map.git
cd vietnam-family-trip-map
```

### 기존 clone

먼저 아래 읽기 전용 확인을 실행한다. 수정·미추적 파일이 있으면 보존하고 중단하여 충돌 여부를 판단한다. 임의 stash/reset/clean/강제 checkout은 하지 않는다.

```powershell
git rev-parse --show-toplevel
git status --short --branch
git remote -v
git branch --show-current
```

저장소·origin이 맞고 working tree가 clean일 때만 최신 원격 정보를 받아 기준 브랜치로 이동한다.

```powershell
git fetch origin
git switch work-v13-integration
# 로컬에 해당 브랜치가 없을 때에만 위 switch 대신 실행:
# git switch --track -c work-v13-integration origin/work-v13-integration
git pull --ff-only origin work-v13-integration
```

ff-only 실패 또는 로컬/원격 분기가 있으면 강제 정렬하지 말고 차이를 조사한다. main으로 전환하거나 main을 pull/merge할 필요가 없다.

### 공통 검증 후 시작

```powershell
git branch --show-current
git status --short --branch
git rev-parse HEAD
git rev-parse origin/work-v13-integration
git ls-remote origin refs/heads/work-v13-integration
git log -5 --oneline
git merge-base --is-ancestor 4b1516d HEAD
node --test tests/family-sync.test.cjs tests/v13-assets.test.cjs
python -m http.server 8776 --bind 127.0.0.1 --directory v11-preview
```

- branch는 work-v13-integration, 수정/미추적 파일 없음, HEAD와 origin 및 ls-remote SHA 일치, `4b1516d` 조상 검사 exit 0 확인.
- 최신 로그에는 이 HANDOFF 파일만 추가한 후속 commit이 있어야 한다.
- Node/Python 미설치 시 집 PC에서 사용 가능한 런타임을 확인한다. 테스트 실패를 무시하고 사진 작업을 시작하지 않는다.
- 로컬 확인 URL: http://127.0.0.1:8776/ . 새 origin의 가족 공유는 자동으로 기존 운영방을 연결하지 않는다. 사진 조사만 할 때는 가족방 참여·쓰기 동기화가 필요 없다.
- 문서와 세 지역 Freeze 보고서를 먼저 읽고 남은 12곳을 확인한다. 최종 지시에 따라 허용된 파일만 검토·commit하고 `origin/work-v13-integration`에만 push한다.
