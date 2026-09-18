# 꾸이년 사진 최종 보완 조사 · Freeze

- 조사일: 2026-09-18
- 브랜치: `work-v13-integration`; 조사 시작 commit: `acf136b9c3208e25af08fc6d2772d7bd1013d0c9`
- 기준: `data/places.json`. 꾸이년 32개 등록 중 Gold Laundry는 사용자 지시에 따라 제외한 **31곳**이다. 세탁소 데이터를 삭제한 것은 아니다.
- 범위: Phase 1·2의 미완료 12곳만 추가 조사했다. 기존 검증 완료 19곳은 재조사·수정하지 않고 이전 판정을 승계했다.
- Freeze는 이번 조사의 종료를 뜻한다. 검증 불충분·미확보를 검증 완료로 간주하지 않는다.

## 최종 집계

| 항목 | 수 |
|---|---:|
| 전체 감사 대상 | 31 |
| 검증 완료 | 22 |
| 검증 불충분 | 3 |
| 미확보 | 6 |
| 최종 로컬 사진 보유 | 25 |
| 이번 신규 추가 | 1 |
| 이번 교체 / 경로 수정 | 0 / 0 |
| 기존 사진 유지 | 24 |

검증 완료 22곳 = 기존 19곳 + ZENN·MM Mega Market 판정 보완 2곳 + Ô Loan 신규 1곳. 사진 보유 25곳에는 검증 불충분 3곳의 기존 사진도 포함된다. 이 3장은 다른 장소임이 확정되지 않아 삭제·교체하지 않았으며, 정확성이 확정된 사진으로 집계하지 않았다.

## 미완료 12곳의 최종 판정

파일명은 `photos/quy_nhon/` 기준. 좌표·주소는 등록값을 기준으로 대조했으며 장소 데이터 자체는 수정하지 않았다. 기존 사진 5장은 모두 실제 이미지를 다시 열어 확인했다. 기존 사진의 원저작자·라이선스는 확인되지 않은 경우 추정하지 않았다.

| 장소 / ID | 사진 | 최종 판정 / 조치 | 동일성 판단 및 남은 제한 |
|---|---|---|---|
| Tree Hugger / `treehugger` | `treehugger.jpg` | 검증 불충분 / 유지 | 등록 주소 5A Hai Bà Trưng, 좌표 13.7712, 109.2336. 사진의 Tree Hugger 간판·짙은 청색 목재 외관·접이문·발코니는 확인. 공개 자료에서 5A 주소는 재확인했으나 같은 외관과 지점을 독립적으로 확정할 사진 확보 실패. ShareHome 연결 사진 404, Coool 사진 403. 이름·주소만으로 완료 처리하지 않음. |
| Hương Vi Spa & Clinic / `huongvi` | `huongvi.jpg` | 검증 불충분 / 유지 | 등록 주소 95 Chương Dương, 좌표 13.7541, 109.2158. 사진에 HƯƠNG VI 금색 간판·95 번호·검은 곡면 차양이 보임. 95 Chương Dương 공개 목록은 있으나 독립성 및 공식 지점 근거가 부족하고, Trip.com 여행 기록도 정확한 외관과 95번지를 함께 확정하지 못함. |
| Hy-Halona Wellness / `hyhalona` | `hyhalona.jpg` | 검증 불충분 / 유지 | 등록 좌표 13.770063, 109.232892. Grand Hyams 공식 페이지가 28 Nguyễn Huệ 호텔 내 3층 시설임을 확인. 기존 사진은 Halona Spa 로고·목재 슬랫·녹색 벽 패널·청색 의자·리셉션. 공식 갤러리의 객실/제품 사진만으로 이 리셉션의 동일성을 확정하기 부족함. |
| ZENN Wellness / `zenn` | `zenn.jpg` | **검증 완료 / 유지** | 등록 270 Nguyễn Thị Định, 13.7539121, 109.2091138. 새 공개 자료의 지점 외관 사진이 기존 사진의 ZENN 대형 글자·베이지색 건물·검은 발코니 난간·붉은 등·왼쪽 덩굴·노란 원형 표지와 일치. 공개 사업장 게시물의 주소 및 지도 링크 좌표도 등록값과 일치. 03 Nguyễn Hữu Quang 병기만으로 별도 지점으로 단정하지 않음. |
| MM Mega Market / `mmmega` | `mmmega.jpg` | **검증 완료 / 유지** | 등록 QL1D Tổ 24 Khu vực 5, 13.753381, 109.207383. MM 공식 지점 목록의 QL1D/Ghềnh Ráng 주소 확인. 새 지점 소개 콜라주의 상단 사진이 기존 사진과 동일: 회색 창고 외벽·MM 로고·오른쪽 파란 캐노피·빨간 현수막·왼쪽 녹색 판촉물. 소개 페이지의 지점명·주소가 공식 목록과 맞음. |
| Ghềnh Ráng / `ghenhrang` | `ghenhrang.jpg` 없음 | 미확보 / 추가 없음 | 등록 13.74332, 109.21476. Bãi Trứng/Hoàng Hậu 해안 자료 조사. Commons 후보는 Queen Beach, Quy Nhon 설명과 CC BY-SA 2.0 선언이 있으나 원본 HTTP 403으로 직접 사진 대조 불가. 저작자도 업로더의 이모라는 설명에 그침. 충분히 확인되지 않아 사용하지 않음. |
| Hòn Khô / `honko` | `honko.jpg` 없음 | 미확보 / 추가 없음 | 등록 13.76443, 109.29841, Nhơn Hải. Vietnam Airlines 자료의 Nhơn Hải 섬·해안 보행로 등으로 장소 확인. 공개 대표사진의 재사용 조건 미확인. 검색에 나타난 Khánh Hòa의 동명 섬(위도 12도대)은 대상과 다르므로 배제. |
| Bãi Xép Quy Nhơn / `baixep` | `baixep.jpg` 없음 | 미확보 / 추가 없음 | 등록 13.6846875, 109.2313125, M6MJ+VG3. Quy Nhon 남쪽 어촌 해변 설명과 지도 주소 확인. 대표사진의 저작자·재사용 조건을 확정하지 못함. 이전 후보의 Phú Yên Bãi Xép 좌표 13.192967, 109.300758는 다른 장소여서 사용하지 않음. |
| Ô Loan Lagoon / `oloan` | **`oloan.jpg` 신규** | **검증 완료 / 추가** | 등록 13.26857, 109.25136은 접근 전망 지점. 확보 원본의 국가 명승 표지에 ĐẦM Ô LOAN / O LOAN LAGOON 명칭이 직접 보이고, 뒤쪽 석호·양식장·낮은 산지가 공식 관광자료와 부합. Commons 설명도 An Hiệp, Tuy An, Phú Yên. 사진 촬영 GPS가 등록 좌표와 정확히 같다는 뜻은 아님. 뚜이호아 등록과 동일 장소·동일 좌표임을 확인. |
| Nhà Hàng Cá Khói / `cakhoi` | `cakhoi.jpg` 없음 | 미확보 / 추가 없음 | 등록 04 Nguyễn Trung Tín, 13.7587, 109.2189. Sluurpy 목록의 주소·전화 확인. 해당 페이지 음식 사진을 실제 열람했으나 간판·건물 등 지점 식별 단서가 없고 저작자·라이선스도 불명. 음식만으로 정확한 지점 대표사진으로 채택하지 않음. |
| Chợ Khu 2 / Market 2 / `market2` | `market2.jpg` 없음 | 미확보 / 추가 없음 | 등록 110 Nguyễn Huệ, 13.7658362, 109.2249222. 공개 시장 소개에서 주소 확인. 연결된 Google 이미지 후보를 실제 열었으나 시장 건물이 아닌 해변 산책로·조각상 사진이었으므로 배제. 사용 가능한 시장 대표사진 미확보. |
| APEC Mandala Phú Yên / `apec` | `apec.jpg` 없음 | 미확보 / 추가 없음 | 등록 Hùng Vương, Tuy Hòa, 13.10362, 109.306915. 개발사 자료·설계사 자료로 시설 확인. 뚜이호아 등록과 명칭·좌표가 동일한 이동일 종착점. 기존 Phase 2의 뚜이호아 사진/개발사 사진 비교 결과를 참고했으나 재사용 권리 미확인으로 복사하지 않음. 뚜이호아 사진·데이터는 재조사하거나 수정하지 않음. |

## 보완 조사 주요 출처

아래는 판정 근거 자료이며 기존 파일의 원출처라고 단정하지 않는다.

- Tree Hugger: [ShareHome, 5A 주소](https://sharehomevn.com/blog/quy-nhon-a-z/noi-danh-cho-tin-dio-me-quan-cafe-quy-nhon.html), [Coool 지점 목록](https://coool.cafe/cafe/tree-hugger-souvenirs-cafe-and-guesthouse-quy-nhon).
- Hương Vi: [Quy Nhon Guide 목록](https://quynhonguide.com/), [Trip.com 여행 기록](https://au.trip.com/moments/detail/quy-nhon-24728-152618993/). 목록의 독립성 한계로 단독 확정 근거로 쓰지 않음.
- Hy-Halona: [호텔 공식 시설 페이지](https://www.grandhyamshotel.com/en/wellness/hy-halona-wellness/).
- ZENN: [Quy Nhon Review 지점 자료](https://quynhonreview.vn/topAZ/spa-giam-beo-o-quy-nhon), [일치한 외관 사진](https://static.quynhonreview.vn/files/spa-giam-beo-o-quy-nhon-1786158310104.jpg), [공개 사업장 게시물과 지도 링크](https://www.beautynailhairsalons.com/VN/Quy-Nhon/112771111477630/ZENN-Wellness).
- MM: [공식 지점 목록](https://mmvietnam.com/danh-sach-he-thong/), [주소·사진을 함께 제공한 공개 지점 소개](https://local.haogiayensao.com/gialai/?shop=mm+mega+market+quy+nhon), [동일 사진이 포함된 콜라주](https://local.haogiayensao.com/vi-local/shop/shop22274-1.webp), [관광 데이터베이스](https://csdl.vietnamtourism.gov.vn/shop/?item=197).
- Ghềnh Ráng: [Commons 후보 설명](https://commons.wikimedia.org/wiki/File:Hoang_Hau_Beach_-_B%C3%A3i_t%E1%BA%AFm_Ho%C3%A0ng_H%E1%BA%ADu.jpg), [VnExpress Bãi Trứng](https://vnexpress.net/bai-trung-trong-binh-minh-4103451.html).
- Hòn Khô: [Vietnam Airlines 여행 자료](https://www.vietnamairlines.com/mm/en/plan-book/travel/travel-guide/hon-kho).
- Bãi Xép: [VinWonders 여행 자료](https://vinwonders.com/vi/wonderpedia/news/bai-xep-quy-nhon/), [지도 주소](https://wanderlog.com/place/details/5033467/b%C3%A3i-x%E1%BA%BFp-quy-nh%C6%A1n).
- Cá Khói: [지점 주소 및 후보 사진](https://www.sluurpy.com/en/quy-nh%C6%A1n/restaurant/8965477/nh%C3%A0-h%C3%A0ng-c%C3%A1-kh%C3%B3i), [직접 확인한 음식 후보](https://foto2.sluurpy.com/locali/vn/8965477/67289889.jpg).
- Market 2: [110 Nguyễn Huệ 시장 자료](https://tanitour.vn/cho-khu-2-tran-phu/). 이 페이지에 연결된 사진이 시장 외관을 입증하지 못함.
- APEC: [개발사 준공 자료](https://apeci.com.vn/apec-mandala-phu-yen-chinh-thuc-nghiem-thu-cong-trinh-2/), [NDC 설계사 실적 자료](https://ndc.vn/wp-content/uploads/2025/11/NDC-Consulting-Ho-so-nang-luc.pdf).

## 새 사진 저작자·라이선스·가공

**Ô Loan Lagoon — Linhcandng, 2015-04-04.**

- [원본 설명 및 저작권 페이지](https://commons.wikimedia.org/wiki/File:%C4%90%E1%BA%A7m_%C3%94_Loan,_An_Hi%E1%BB%87p,_Tuy_An,_Ph%C3%BA_Y%C3%AAn.jpeg)
- [원본 이미지](https://upload.wikimedia.org/wikipedia/commons/7/70/%C4%90%E1%BA%A7m_%C3%94_Loan%2C_An_Hi%E1%BB%87p%2C_Tuy_An%2C_Ph%C3%BA_Y%C3%AAn.jpeg)
- 라이선스: **[CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)**. 가공 파일에도 동일 라이선스 적용. Commons의 own work 및 저작자 표시를 근거로 사용.
- 장소 근거: [베트남 공식 관광자료](https://vietnamtourism.vn/index.php/tourism/items/2809), [Commons 장소 분류](https://commons.wikimedia.org/wiki/Category:O_Loan_lagoon), 원본 사진 내 국가 명승 표지·석호 지형 직접 확인.
- 변경: 1917×1083 → **1200×678**, 원본 비율 유지, 크롭·왜곡 없음. JPEG quality 84, optimize/progressive. **140,108 bytes**. 출처·저작자·라이선스를 EXIF에도 기록.
- 경로: `photos/quy_nhon/oloan.jpg`. 기존 `photoFile` 경로가 이미 등록되어 있으므로 JSON 수정 불필요.
- 2015년 사진이며 현재 시설 상태나 최신 영업 정보를 보증하지 않는다.

## 타 도시와 중복 등록

| 장소 | 꾸이년 좌표 | 뚜이호아 좌표 | 결론 |
|---|---|---|---|
| Ô Loan Lagoon | 13.26857, 109.25136 | 13.26857, 109.25136 | 동일 석호, 동일 접근 지점. 이번에는 꾸이년 파일만 추가. |
| APEC Mandala Phú Yên | 13.10362, 109.306915 | 13.10362, 109.306915 | 동일 숙소. 꾸이년 이동일 종착점 중복 등록. |

## 기존 검증 완료 19곳의 Freeze 승계

다음은 이전 보고서의 판정을 그대로 승계했다. 사진·데이터 변경 및 추가 웹 재조사 없음.

| 이전 보고서 | 승계 장소 | 수 |
|---|---|---:|
| `QUY_NHON_PHOTO_AUDIT_PHASE1_2026-09-18.md` | Diêu Trì Railway Station; Sala Quy Nhon Beach Hotel; Eo Gió; Kỳ Co Beach; ExploraScience Quy Nhon; Tháp Đôi; Bánh Ít Cham Towers; Phương Mai Sand Dunes; Gành Đá Đĩa; Gia Vy 2; Phượng Tèo | 11 |
| `QUY_NHON_PHOTO_AUDIT_PHASE2_2026-09-18.md` | Mr Mộc; Ngô Văn Sở Food Street; Surf Bar 1; KATINAT Quy Nhơn; ADIUVAT Coffee Roasters; Chạm Massage & Spa; Co.opmart Quy Nhơn; Chợ Đầm | 8 |

## 검증 및 변경 범위

- 실행: `node --test tests/family-sync.test.cjs tests/v13-assets.test.cjs` — **23/23 통과**, 실패 0. 멀티 메모·동시 수정·push 중 수정·네트워크 복구·사진 업로드 재시도·migration·백업 복원 및 다낭 16개 사진 HTTP 회귀 검사 포함.
- 로컬 서버 `http://127.0.0.1:8774/v11-preview/`에서 꾸이년 31곳의 등록 경로 기술 검사: **25개 HTTP 200 및 JPEG 디코딩 성공**, 미확보 6개만 예상된 404. 기존 19곳은 경로/형식 검사만 수행했으며 사진 내용 재판정은 하지 않음.
- 새 Ô Loan 사진은 일정 카드 썸네일·장소 간편 보기·상세사진 세 화면에서 실제 표시를 직접 확인. 404인 미확보 장소는 기존 무사진 표시를 유지.
- 변경 파일은 이 보고서와 `photos/quy_nhon/oloan.jpg` **2개뿐**. `places.json`, 기존 사진, Phase 1·2 보고서, 타 도시, 앱 기능, 외부 서비스 설정은 변경하지 않음.
- 운영 배포는 수행하지 않음. 이 최종 결과를 기준으로 꾸이년 사진 작업을 Freeze한다.
