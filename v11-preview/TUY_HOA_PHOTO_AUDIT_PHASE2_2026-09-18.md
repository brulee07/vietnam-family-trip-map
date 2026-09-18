# 뚜이호아 장소사진 Phase 2 — 2026-09-18

## 범위와 결과

- 브랜치: `work-v13-integration`. 시작 commit: `e6ba17dc83c1f53dd9464e16d128a7a4ca017ca5`.
- `data/places.json`의 사용자 지정 13곳만 조사했다. 세탁소는 제외했다.
- 기존 사진 9장을 실제 이미지로 직접 확인했다. 주소·간판·전화번호·실내 구조·공식 시설 소개를 공개 웹 자료와 대조했다. 검색 제목만으로 검증 완료를 판정하지 않았다.
- 다낭·꾸이년·뚜이호아 Phase 1·나트랑 사진/데이터/보고서, 앱 코드 및 외부 서비스는 변경하지 않았다. `places.json`도 변경하지 않았다.

| 집계 | 수 |
|---|---:|
| 조사 수행 | 13 / 13 |
| 사진·장소 검증 완료 | 4 |
| 검증 불충분 — 기존 파일 보존 | 4 |
| 미확보 — 잘못된 기존 사진 제거 후 1곳 포함 | 5 |
| 기존 사진 유지 | 8 |
| 새 사진 추가 / 사진 교체 | 0 / 0 |
| 다른 장소 사진 제거 | 1 |
| 경로 수정 | 0 |
| 최종 로컬 사진 보유 | 8 |

조사 완료와 사진 검증 완료는 다르다. 사진 보유 8곳에는 검증 불충분 4곳이 포함된다. 기존 사진이 틀렸다고 확정되지 않은 경우에는 파일을 보존했으나 검증 완료로 세지 않았다. APEC Spa와 Lumiere는 사진 속 시설에 대한 근거가 있어도 등록 위치와의 불일치가 남아 보수적으로 검증 불충분으로 집계했다.

## 13곳별 대조

사진은 모두 `photos/tuy_hoa/` 아래다. 좌표·주소는 등록값이며 이번에 교정하지 않았다. 외부 자료의 행정구역 변경 표기만으로 다른 지점이라고 판단하지 않았다.

| 장소 / ID | 등록 좌표 · 주소 | 기존 사진 / 조치 | 최종 판정 및 근거 |
|---|---|---|---|
| Bánh Canh Hẹ Thảo Vy / `thaovy` | 13.1009, 109.3062 · 393 Đại lộ Hùng Vương | `thaovy.jpg` 있음 / 유지 | **검증 완료.** 실제 사진의 큰 청색 간판에 Thảo Vy와 `393 HÙNG VƯƠNG, TUY HÒA`가 선명하다. 흰 다층 건물 아래 긴 개방형 차양·조리대가 있는 음식점 외관이다. 지방 관광 목록은 Thảo Vy를 Hùng Vương에 등재하고, Phu Yen 여행자료도 393번지를 명시한다. 이름+번지+도시 일치로 지점을 확인했다. 사진에서 GPS 자체는 확인할 수 없다. [TV] |
| Bánh Canh Hẹ Thành Tâm / `thanhtam` | 13.0969, 109.3161 · 53 Điện Biên Phủ | `thanhtam.jpg` 없음 / 추가 없음 | **미확보.** 공식 관광 목록 및 Vinpearl 자료는 53번지, 후자는 전화 0383 410 745도 명시한다. ExoTrails에는 같은 페이지에 53과 30이 혼재한다. 갤러리/음식 사진 후보는 검색했으나 정확한 점포 외관·재사용 조건을 함께 확인하지 못했다. 다른 bánh canh 가게나 일반 음식 사진을 넣지 않았다. [TT] |
| Quán Cô Ba Diệp / `cobadiep` | 13.0979, 109.319 · 261 Điện Biên Phủ | `cobadiep.jpg` 없음 / 추가 없음 | **미확보.** Cungdi 공개 장소자료가 261번지와 지도 링크를 제공한다. 직접 원문 요청은 404였고 검색 도구에는 본문이 남아 있었다. 독립된 지점 외관·간판·촬영자·사용권까지 검증하지 못했다. 제목/주소만으로 사진을 채택하지 않았다. [CB] |
| Cơm Gà Tuyết Nhung / `tuyetnhung` | 13.0842, 109.3097 · 189 Lê Thánh Tôn | `tuyetnhung.jpg` 있음 / 유지 | **검증 완료.** 사진 간판의 CƠM GÀ Tuyết Nhung, 189 LÊ THÁNH TÔN, 0772.488.096을 확인했다. 지역 장소소개와 가게 공개 게시물의 주소·전화가 일치한다. 옅은 청록색 벽·청색 문틀·노란 간판의 가게 사진이며 다른 동명 식당으로 볼 근거가 없다. [TN] |
| Ô Loan Seafood Lunch Zone / `oloanseafood` | 13.28433, 109.25531 · Quốc lộ 1, Ô Loan Lagoon 권역 | `oloanseafood.jpg` 있음 / **잘못된 파일 제거**, 대체 없음 | **미확보 / 기존 사진 오연결 확정.** 이미지의 실제 간판과 지도 사진 표제가 모두 AN LAGOON Seafood Master이다. 공식 업체 사이트는 Đầm Lập An, Lăng Cô, Huế 주소와 전화 0234 3676767 / 0938 601666을 명시한다. Ô Loan/Phú Yên과 다른 지역이다. 사진에는 수상 식당·중앙 뾰족한 지붕·양쪽 원뿔형 초가지붕·뒤 산줄기가 보인다. 등록 항목은 특정 식당이 아닌 QL1 접근권역이므로 An Hải의 특정 식당 사진이나 Phase 1 석호 사진을 임의로 대신 넣지 않았다. [OL] |
| Hiệp Yến Coffee & Restaurant / `hiepyen` | 13.1041, 109.3061 · 262–266 Hùng Vương | `hiepyen.jpg` 있음 / 보존 | **검증 불충분.** 사진 표제 Cafe Hiệp Yến, 붉은 계단·목재 카운터·늘어진 식물·2층 난간을 확인했다. Foody/지역 여행자료는 262–266, 다른 업체 목록은 340, Foody 제목에는 365도 있다. 사진에는 번지나 전화가 없고 동일 실내와 등록 지점을 확정하는 근거가 부족하다. 동명 Cơm Niêu Hiệp Yến과 혼동하지 않았다. [HY] |
| SANDY VIBES Coffee and Tea / `sandyvibes` | 13.1182, 109.3049 · Nguyễn Huệ 해변, P7 | `sandyvibes.jpg` 있음 / 보존 | **검증 불충분.** 사진에 SANDY VIBES COFFEE 간판, 초가지붕·중앙 계단·유리 전면·밧줄 난간이 보인다. 공개 기사 사진 원본도 직접 열어 입구/야간 파빌리온을 확인했지만 기존 사진과 동일 건물 구획까지 확정하지 못했다. 자료에는 Nguyễn Huệ 해변과 Độc Lập/Khu phố Nguyễn Du가 혼재하며 등록 좌표와 정확한 부지 대응이 미해결이다. 같은 브랜드명만으로 완료 처리하지 않았다. [SV] |
| URA BEACH Camping & Coffee / `urabeach` | 13.1096, 109.3075 · 21 Độc Lập, P7 | `urabeach.jpg` 있음 / 유지 | **검증 완료.** 목판 URA BEACH 간판의 조개/파도 로고, 목재·초가 개방 구조, 바다로 열린 좌석, 사진 표제의 전체 상호를 확인했다. 공개 지도 기반 장소자료는 21 Độc Lập와 0965 964007을 명시하고 방문기에도 동일 번지와 해변 개방형 카페 구조가 나온다. 이름·정확한 주소·해변 시설 특성으로 Tuy Hòa 지점을 대조했다. 사진의 촬영 GPS까지 독립 확정한 것은 아니다. [UR] |
| PHD Book & Coffee / `phdcoffee` | 13.1136, 109.2924 · An Dương Vương, Bình Kiến (477R+4X6) | `phdcoffee.jpg` 있음 / 유지 | **검증 완료.** 기존 사진의 흰 벽을 채우는 가로 목재 책장, 오른쪽 노출 벽돌 기둥·유리문, 삼각대 스탠드 조명·목재 의자/쿠션 배치가 MIA 소개의 책장 사진과 일치한다. 해당 기사는 An Dương Vương/Bình Kiến 주소와 091 9021717을 명시하고 외관 PHD 간판 사진도 제공한다. 외관·실내 원본 4장을 직접 대조했다. [PHD] |
| Roseli Spa · Rosa Alba Resort / `roselispa` | 13.1115, 109.3078 · 88 Lê Duẩn | `roselispa.jpg` 없음 / 추가 없음 | **미확보 (시설 동일성 확인).** 공식 Spa 페이지가 Roseli를 호텔 3층 시설로 명시하고 88 Lê Duẩn/0257 2222222를 제공한다. 공식 SPA01 리셉션·SPA05 시술실 원본을 직접 열었다. 일반 Rosa Alba 수영장 사진으로 대신하지 않았다. 공식 페이지는 All Rights Reserved이며 재사용 라이선스·개별 촬영자 미확인으로 새 사진을 넣지 않았다. [RS] |
| APEC Spa Tuy Hoà / `apecspa` | 13.0988, 109.3183 · 23 Điện Biên Phủ (임시 주소 앵커) | `apecspa.jpg` 있음 / 보존 | **검증 불충분 (사진의 상호·SH06 확인).** 실제 사진 간판에 APEC SH06 Spa와 0797 699799가 보인다. 공개 장소자료의 Lô SH06 Khu APEC, ĐL Hùng Vương 및 같은 전화와 일치한다. 그러나 등록된 23 Điện Biên Phủ/좌표와 동일 지점이라고 할 수 없다. APEC 호텔 내부 스파라고 임의 해석하지 않았다. 사진 교체 대신 등록 앵커 문제를 기록한다. [AS] |
| An Spa / `anspa` | 13.1089, 109.3067 · 271 Lê Duẩn, P7 | `anspa.jpg` 없음 / 추가 없음 | **미확보.** Tripadvisor 장소와 별도 공개 목록이 271 Lê Duẩn를 가리킨다. 정확한 지점 외관·사용권을 함께 확인할 수 있는 사진은 확보하지 못했다. 타 도시 동명 An Spa 이미지는 사용하지 않았다. [AN] |
| Lumiere Wellness · TUI BLUE Tuy Hoa / `tuibluewellness` | 13.1221, 109.3047 · 2 Hải Dương / Độc Lập 해변권 | `tuibluewellness.jpg` 있음 / 보존 | **검증 불충분 (사진·호텔 내부 시설은 확인, 등록 위치 문제).** 공식 Lumiere 페이지의 적외선 사우나 사진을 직접 열어 목재 아치 3개, 곡선 라운저와 HANG HỒNG NGOẠI 표지를 대조했다. 기존 사진의 냉온 족욕 수조도 공식 시설 설명과 부합한다. 공식 주소는 02 Hải Dương이며 공식 체인/호텔 설명은 시내 호텔과 별도 해변 시설을 구분한다. 등록 해변권 좌표를 호텔 내부 사우나 위치로 확정할 수 없어 전체 장소 검증 완료에서는 제외했다. 사진을 더 좋은 것으로 교체하지 않았다. [LW] |

## 출처 및 후보 검토

아래는 동일성 판단 자료다. 기존 이미지의 원출처나 라이선스라는 뜻은 아니다. 기존 스크린샷에 표시된 업로더 이름을 재사용 허락으로 해석하지 않았다. 새로 채택한 사진이 없으므로 새 사진의 저작자·라이선스 목록은 없다.

- **[TV]** [Phú Yên 공식 관광 업소 목록](https://phuyentourism.gov.vn/thongtin/diachi.pdf), [393 Hùng Vương를 명시한 지역 여행자료](https://phuyen.travel/kinh-nghiem-du-lich/theo-doi-tuong/du-lich-phu-yen-cho-gia-dinh/).
- **[TT]** [공식 업소 목록](https://phuyentourism.gov.vn/thongtin/diachi.pdf), [Vinpearl — Thành Tâm 주소·전화](https://vinpearl.com/vi/banh-canh-he-phu-yen), [ExoTrails — 53/30 혼재](https://exotrails.com/routes/banh-canh-he-thanh-tam), [RestaurantGuru 갤러리 후보](https://restaurantguru.com/Banh-Canh-He-Thanh-Tam-tp-Tuy-Hoa). 개별 사진 저작자/재사용 조건 미확인, 미채택.
- **[CB]** [Cungdi 장소 본문](https://cungdi.net/phu-yen/quan-co-ba-diep-tinh-hoa-am-thuc-phu-yen-hoi-tu-tai-mot-dia-chi/), [본문이 제공한 지도 링크](https://maps.app.goo.gl/gwDedPjc58b2XBSN6). 지도 링크의 현장 사진까지 검증했다는 뜻은 아니다. 직접 요청 404, 후보 사진 저작자/라이선스 미확인.
- **[TN]** [지역 식당 소개](https://thodiaphuyen.com.vn/danh-muc/quan-an/com-ga-tuyet-nhung), [업체 공개 게시물](https://www.findglocal.com/VN/Tuy-H%C3%B2a/1347627051924644/C%C6%A1m-g%C3%A0-Tuy%E1%BA%BFt-Nhung). 음식 후보 사진도 확인했으나 정확한 기존 외관을 유지했다.
- **[OL]** [AN Lagoon 공식 사이트 — Lập An/Lăng Cô/Huế 주소](https://www.anlagoon.com/), [Phú Yên 공식 관광 지도 — An Hải 해산물 업소](https://phuyentourism.gov.vn/thongtin/bandodulich.pdf), [Ô Loan 권역 식당 목록](https://www.foody.vn/phu-yen/dia-diem-tai-khu-vuc-dam-o-loan), [An Hải 현장 보도](https://thanhnien.vn/ve-an-hai-an-hai-san-185514785.htm). 특정 식당과 등록 권역의 동일성을 확정할 수 없어 대체 미채택. 원사진은 시작 commit에 보존되어 복구 가능하다.
- **[HY]** [Foody 지점 자료](https://www.foody.vn/phu-yen/hiep-yen-cafe-diem-tam), [262–266번지 자료](https://tuyhoago.com/quan-ca-phe-dep-o-phu-yen/), [340번지·전화 자료](https://www.viet-biz.com/hiep-yen-coffee-restaurant-0257-3686-869).
- **[SV]** [기사 및 사진](https://daklakreview.vn/topAZ/quan-ca-phe-view-bien-tuy-hoa), [공개 사업자 주소](https://hoptackinhdoanh.com/danh-ba-doanh-nghiep/sandy-vibes-chi-nhanh-cong-ty-tnhh-ialc-viet-nam). 후보 저작자/라이선스 미확인, 새로 사용하지 않음.
- **[UR]** [지도 기반 장소 주소·전화](https://www.top-rated.online/cities/Tuy%2BH%C3%B2a%2BCity/place/p/16400456/URA%2BBEACH%2BCamping%2B%26%2BCoffee), [21 Độc Lập 방문기](https://www.lemon8-app.com/%40ngoc.thichlaca/7542576213685879317?region=vn). 직접 페이지 요청 일부 실패 시 검색 도구가 제공한 본문을 사용했다.
- **[PHD]** [MIA 장소·주소·사진 기사](https://mia.vn/cam-nang-du-lich/phd-book-coffee-tuy-hoa-mo-hinh-ca-phe-doc-sach-doc-dao-tai-phu-yen-2194), [책장 대조 원본](https://mia.vn/media/uploads/blog-du-lich/PHD-book-coffee-tuy-hoa-mo-hinh-ca-phe-doc-sach-doc-dao-tai-phu-yen-02-1637666016.jpg). 기사 작성자 Kiều Oanh, 사진 개별 촬영자/라이선스 미상. 검증 자료로만 열람했고 새로 복제하지 않았다.
- **[RS]** [Rosa Alba 공식 Roseli 소개·3층 명시](https://rosaalbaresort.com/vi/spa-thu-gian/), [SPA01](https://rosaalbaresort.com/wp-content/uploads/2023/11/SPA01-scaled.jpg), [SPA05](https://rosaalbaresort.com/wp-content/uploads/2023/11/SPA05-scaled.jpg). 제공처 Rosa Alba Resort, 개별 촬영자 미상, All Rights Reserved. 앱용 신규 사용권 미확인으로 미채택.
- **[AS]** [APEC Spa 공개 장소정보](https://www.50bestspa.com/spa/apec-spa-tuy-hoa-duong-sinh-tri-lieu-tuy-hoa). 검색 도구가 반환한 Contact & Details의 SH06·0797 699799를 사용했다. 이 페이지의 일반적 웰니스 서비스 설명은 지점 검증 근거로 사용하지 않았다.
- **[AN]** [Tripadvisor Tuy Hòa An Spa](https://www.tripadvisor.de/Attraction_Review-g1582771-d21502116-Reviews-An_Spa-Tuy_Hoa_Dak_Lak_Province.html), [271 Lê Duẩn 별도 목록](https://doctortrust.vn/reviews/an-spa-phu-yen-phu-yen). 후보 개별 저작자/재사용 조건 미확인.
- **[LW]** [TUI BLUE 공식 Lumiere 시설](https://tuibluetuyhoa.com/lumiere-jim-jil-bang-clubs/), [공식 적외선 사우나 원본](https://tuibluetuyhoa.com/wp-content/uploads/2024/10/ACC_AC109079149_TB-TuyHoa-Spa-JJB-9-5-2-2.jpg), [공식 체인 호텔 정보](https://www.tui-blue.com/en/en/hotels/tui-blue-tuy-hoa/), [호텔·별도 해변 설명](https://luxurylifestyle.com/headlines/awaken-in-paradise-the-stunning-sunrise-at-tui-blue-tuy-hoa.html). 공식 적외선 사우나와 산소실 원본은 열람했으며 냉온 족욕 원본 다운로드는 SSL 오류로 실패했다. 시설 설명과 기존 사진을 대조했고 실패한 원본을 열었다고 계산하지 않았다.

## 앱 및 자동 검사

- 로컬 앱: `python -m http.server 8776 --bind 127.0.0.1 --directory v11-preview`.
- 13개 등록 경로 전부 GET 검사. 보유 8장은 **HTTP 200, image/jpeg, Pillow JPEG 검증 성공**, 응답 바이트와 로컬 파일 일치.
- 미확보 5개는 **HTTP 404**: `thanhtam`, `cobadiep`, `oloanseafood`, `roselispa`, `anspa`. 13/13 HTTP 200이라고 보고하지 않는다. `thanhtam/cobadiep/roselispa/anspa` 4개는 시작 시부터 없었으며 Ô Loan 1개는 잘못된 사진을 제거했다.
- `oloanseafood.jpg` 제거 후 일정 1/17 카드, 장소 간편보기, 상세화면을 실제 로컬 브라우저에서 열고 시각적으로 확인했다. 잘못된 식당 사진이 사라지고 텍스트/주소/길찾기는 유지되며 깨진 이미지 아이콘은 노출되지 않았다. 기존 `cardPhoto()`/`photoFigure()`의 실패 처리를 그대로 사용한다. 이 항목에는 원격 fallback 사진이 없다.
- 신규·교체 사진은 0장이므로 신규 이미지의 3개 화면 검사는 해당 없음. 위 삭제된 사진의 3개 화면 회귀 확인은 별도로 수행했다.
- 기존 테스트 재사용: `node --test tests/family-sync.test.cjs tests/v13-assets.test.cjs` → **23/23 통과, 실패 0**. 멀티 메모, busy 중 변경, 동시 수정, 네트워크 복구, 사진 실패 재시도, migration, 백업/복원 및 다낭 16개 HTTP 검사 포함. 운영 가족방에 쓰기 테스트를 하지 않았다.

| ID | 최종 HTTP | JPEG 크기 |
|---|---:|---|
| thaovy | 200 | 1258×754 |
| thanhtam | 404 | 없음 |
| cobadiep | 404 | 없음 |
| tuyetnhung | 200 | 1297×802 |
| oloanseafood | 404 | 오연결 제거 |
| hiepyen | 200 | 1317×835 |
| sandyvibes | 200 | 1236×900 |
| urabeach | 200 | 1188×856 |
| phdcoffee | 200 | 1321×889 |
| roselispa | 404 | 없음 |
| apecspa | 200 | 1027×616 |
| anspa | 404 | 없음 |
| tuibluewellness | 200 | 1342×794 |

## 변경 범위

1. 이 Phase 2 보고서 추가.
2. 다른 지역 식당으로 확인된 `photos/tuy_hoa/oloanseafood.jpg` 제거.

사진 제거를 교체 성공이나 새 사진 확보로 계산하지 않았다. 나머지 사진 파일은 원본 바이트를 유지했다. `places.json`의 주소·좌표 충돌은 후속 판단 대상으로 기록만 했으며 이번 사진 작업에서 앱 기능이나 Freeze 자료를 고치지 않았다. Preview 배포는 이번 요청에 포함되지 않아 수행하지 않았다.
