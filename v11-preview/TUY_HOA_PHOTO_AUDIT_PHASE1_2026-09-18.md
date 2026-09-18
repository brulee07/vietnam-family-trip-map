# 뚜이호아 장소사진 1차 조사 — 2026-09-18

## 범위와 결과

- 기준 브랜치: `work-v13-integration`, 시작 commit `07a8d40af221da5cc2af05e7cae87b94402ae4fc`.
- 기준 데이터: `data/places.json`의 사용자 지정 13곳만 조사. Giặt Ủi Tuy Hòa Laundry·Giặt Sấy Phú Yên 및 나머지 뚜이호아 장소는 제외했다. 세탁소 데이터 삭제 작업은 하지 않았다.
- 기존 로컬 사진 7장을 직접 열고, 공식 시설·관광 자료와 공개 장소 자료의 주소·건물·시설·지형을 대조했다. 기존 사진 원저작자나 라이선스는 추측하지 않았다.
- 새 사진은 원본 파일을 직접 열어 확인한 뒤 사용했다. 검색 썸네일만으로 저장하지 않았다.

| 항목 | 수 |
|---|---:|
| 조사 대상 / 조사 수행 | 13 / 13 |
| 사진 검증 완료 | 10 |
| 기존 사진 검증 불충분 | 1 |
| 미확보 | 2 |
| 기존 사진 유지 | 7 |
| 새 사진 추가 | 4 |
| 사진 교체 / 경로 수정 | 0 / 0 |
| 최종 사진 보유 | 11 |

사진 보유 11곳에는 검증 불충분인 Vincom의 기존 사진도 포함된다. ‘조사 수행’과 ‘사진 검증 완료’는 구분한다. 다낭·꾸이년 Freeze 결과, 나트랑, 기존 앱 기능과 외부 서비스는 변경하지 않았다.

## 13곳별 기준 데이터와 판정

사진 경로는 모두 `photos/tuy_hoa/` 아래다. 아래 좌표는 등록값이다. 풍경 사진의 촬영 위치가 장소 대표 좌표와 정확히 같다고 주장하지 않는다. 데이터 주소·좌표는 이번에 수정하지 않았다.

| 장소 / ID | 등록 좌표 · 주소 | 기존 사진 → 최종 조치 | 판정 · 직접 확인 및 교차검증 근거 |
|---|---|---|---|
| APEC Mandala Phú Yên / `apec` | 13.10362, 109.306915 · Đại lộ Hùng Vương, Tuy Hòa | `apec.jpg` 있음 → 유지 | **검증 완료.** 개발사 준공 페이지의 사진과 기존 사진이 같은 장면이다. 양쪽 고층 타워, 가운데 계단형 연결부, 하단 APEC MALL 글자·검은 기단·수목 배치 일치. 공식 프로젝트 명칭과 Hùng Vương 주소도 대조. 꾸이년과 동일 등록. [A] |
| Rosa Alba Resort & Villas / `rosa` | 13.1115, 109.3078 · 88 Lê Duẩn Street | `rosa.jpg` 있음 → 유지 | **검증 완료.** 공식 홈페이지의 88 Lê Duẩn 주소 확인. 기존 수영장 사진의 야자수 식재 구획·긴 수영장 축·물속 흰 라운저·양측 파라솔/저층 시설을 공식 항공사진 및 Recreation 사진과 대조. 서로 반대쪽에서 본 수영장 사진이며 공식 사진에는 ROSA ALBA 건물 표지도 보임. [R] |
| Nghinh Phong Tower / `nghinhphong` | 13.11632, 109.30726 · Quảng trường Nghinh Phong | `nghinhphong.jpg` 있음 → 유지 | **검증 완료.** 서로 다른 높이의 두 가는 정상부, 계단처럼 낮아지는 각주 군집, 해변 광장의 흑백 바닥 무늬가 지방정부 사진과 일치. 공식 관광 DB의 Nguyễn Hữu Thọ–Độc Lập 교차로 해변 광장 설명과 대조. [N] |
| Nhạn Tower / `thapnhan` | 13.0823667, 109.3015583 · Núi Nhạn | 없음 → **`thapnhan.jpg` 추가** | **검증 완료.** Commons 원본 GPS 13.082164, 109.301483는 등록 지점 인근 약 24m. 야간 사진의 사각 벽돌 탑 몸체·세로 기둥형 장식·상부 축소 탑층을 국가관광청 주간 사진과 대조. Tuy Hòa Nhạn 언덕이라는 설명도 일치. [T] |
| Gành Đá Đĩa / `ganhdadia` | 13.35419, 109.29363 · Tuy An Đông | `ganhdadia.jpg` 있음 → 유지 | **검증 완료.** 기존 사진의 바다에 접한 벌집형 다각 기둥·둥글게 휘며 층진 암석·뒤쪽 녹지 경사면을 관광청의 An Ninh Đông/Tuy An 해안 주상절리 설명 및 해안 사진과 대조. 꾸이년 등록과 좌표 동일. 사진의 밝기나 색감을 이유로 교체하지 않음. [G] |
| Ô Loan Lagoon / `oloan` | 13.26857, 109.25136 · Tuy An | 없음 → **`oloan.jpg` 추가** | **검증 완료.** 꾸이년과 명칭·좌표가 정확히 동일. 기존 검증 사진을 다시 직접 열어 국가 명승 표지의 ĐẦM Ô LOAN / O LOAN LAGOON, 뒤편 석호·양식 구획·낮은 산지를 확인하고 공식 관광자료와 대조. 검증된 꾸이년 파일을 바이트 그대로 복사했으며 꾸이년 원본은 변경하지 않음. [O] |
| Mũi Điện · Bãi Môn / `muidien` | 12.8965126, 109.4570124 · Hòa Tâm, Đông Hòa | `muidien.jpg` 있음 → 유지 | **검증 완료.** 풍경이 아닌 현장 안내판 사진이다. BÃI MÔN–MŨI ĐẠI LÃNH 명칭, Bãi Môn 해변·담수 하천 건너는 다리·등대 오르는 길·해안 곶 배치가 선명하다. 관광청의 Hòa Tâm/Đông Hòa, 해변 서쪽 담수 하천, Mũi Đại Lãnh=Mũi Điện 설명과 교차검증. 구도가 덜 대표적이어도 정확하므로 유지. [D] |
| Vũng Rô Bay / `vungro` | 12.86607, 109.42361 · Hòa Xuân Nam / Đông Hòa | 없음 → **`vungro.jpg` 추가** | **검증 완료.** 원본 GPS 12.860200, 109.402559는 만 서쪽 촬영 위치로 등록 만 기준점과 약 2.4km 차이. 물을 감싸는 산지·항구/정박 시설·좁아지는 만 입구가 공식 경관 자료와 부합하고, 원저작자의 Vịnh Vũng Rô 설명 및 GPS를 함께 사용했다. 같은 정차 지점이라고 단정하지 않음. [V] |
| Tuy Hòa Beach / `tuyhoabeach` | 13.111, 109.3089 · Tuy Hòa beachfront | 없음 → **`tuyhoabeach.jpg` 추가** | **검증 완료.** 원본 GPS 13.104389, 109.316611는 등록 대표점에서 약 1.1km 떨어진 같은 도시 해변축. 북쪽으로 이어지는 넓은 모래사장·해안 수목·먼 해안 산지 및 Commons의 Tuy Hoa, Phu Yen 설명을 공식 관광자료의 시내 해변 설명과 대조. 특정 숙소 전용 해변이나 동일 하차점 사진으로 보증하지 않음. [B] |
| Vincom Plaza Tuy Hòa / `vincom` | 13.0959, 109.3065 · Hùng Vương × Trần Phú, Ward 7 | `vincom.jpg` 있음 → 유지 | **검증 불충분.** 기존 사진의 VINCOM PLAZA·CGV·WinMart 간판, 흰색 고전식 외관과 아치형 창을 직접 확인. 공식 연락처와 관광 DB로 교차로 지점 주소는 확인했으나 공식 페이지의 로고/내부 사진만으로 이 외관의 정확한 지점까지 확정하지 못함. 공개 지점 소개 사진 접근은 403, 추가 기업 여행자료는 timeout. 다른 지점이라고 확인된 것도 아니므로 기존 파일을 보존하고 검증 완료에는 넣지 않음. [C] |
| Co.opmart Tuy Hòa / `coopmarttuyhoa` | 13.0862, 109.3051 · 8 Duy Tân, Ward 4 | `coopmarttuyhoa.jpg` 있음 → 유지 | **검증 완료.** 공식 지점 주소 Ô Phố 8B, Khu Dân Dụng Duy Tân과 Apple Maps의 8 Duy Tan으로 지점을 확인. 공식 지점 갤러리의 흰 건물·중앙 로고 패널·정면 출입구·양쪽 청색 띠/창 구획이 기존 행사 단체사진 배경과 일치. 공식 페이지에서 표시하는 새 행정구역 명칭과 기존 데이터 표기 차이는 보고만 하고 데이터는 유지. [P] |
| Tuy Hòa Market / Chợ Tuy Hòa / `tuyhoamarket` | 13.0847, 109.3048 · Ngô Quyền / Ward 4 | 없음 → 추가 없음 | **미확보.** VR 장소자료와 CAND 현장 보도에서 Trần Hưng Đạo·Ngô Quyền·Lương Văn Chánh·Lê Lợi에 둘러싸인 시장임을 확인. VR 후보 원본을 직접 열어 CHỢ TUY HÒA 간판·중앙 삼각 박공·양옆 곡선 상가 외관을 확인했으나 촬영자·재사용 라이선스 미확인으로 앱에 저장하지 않음. [M] |
| WinMart Tuy Hòa / `winmarttuyhoa` | 13.0964, 109.3066 · 중심권, 실제 지점 재확인 표기 | 없음 → 추가 없음 | **미확보.** 지방정부 사업장 자료가 Lô 02-01, 2층 Vincom Plaza 지점을 명시하고, Vincom 행사 및 WinMart 자체 Tuy Hòa 자료도 해당 영업점 존재를 뒷받침. 등록 주소는 아직 구체적 지점을 확정하지 않은 표현이다. 정확한 지점 전경과 재사용 권리가 함께 확인되는 사진을 확보하지 못해 일반 WinMart 사진이나 Vincom 사진을 대신 넣지 않음. [W] |

## 기존 사진 검증 및 장소 자료

링크는 동일성 판단 근거다. 기존 사진의 원출처·촬영자·라이선스는 별도 확인되지 않는 한 미상으로 남긴다. 원출처 불명을 이유로 이미 정확한 사진을 교체하지 않았다.

- **[A]** [APEC 개발사 준공 자료](https://apeci.com.vn/apec-mandala-phu-yen-chinh-thuc-nghiem-thu-cong-trinh-2/), [기존 파일과 일치한 개발사 사진](https://apeci.com.vn/wp-content/uploads/2022/09/DHP2533-HDR-Pano-1024x842.jpg).
- **[R]** [Rosa Alba 공식 홈페이지·주소](https://rosaalbaresort.com/), [공식 Recreation](https://rosaalbaresort.com/recreation/), [수영장·시설 원경](https://rosaalbaresort.com/wp-content/uploads/2022/05/Rosa-Alba_Flycam_14-min.jpg), [수영장과 호텔 표지가 함께 있는 공식 사진](https://rosaalbaresort.com/wp-content/uploads/2022/05/Rosa-Alba_Flycam_15-min-1.jpg).
- **[N]** [공식 관광 DB](https://csdl.vietnamtourism.gov.vn/vcgt/?item=309), [지방정부 Nghinh Phong 기사·사진](https://eawer.daklak.gov.vn/thap-nghinh-phong-phu-yen-1820.html).
- **[T]** [국가관광청 Nhạn Tower](https://vietnamtourism.vn/index.php/tourism/items/1370), [공식 주간 사진](https://vietnamtourism.vn/imguploads/tourist/2014/PhuYen/46Thapnhan01JPG.jpg), [Commons 장소 좌표](https://commons.wikimedia.org/wiki/Category:Thap_Nhan). 새 사진 출처는 아래 별도 표기.
- **[G]** [국가관광청 Gành Đá Đĩa](https://vietnamtourism.vn/index.php/tourism/items/2930), [해안 사진](https://vietnamtourism.vn/imguploads/tourist/2014/PhuYen/Ghenhdadia/46Dadia02JPG.jpg).
- **[O]** [국가관광청 Ô Loan](https://vietnamtourism.vn/index.php/tourism/items/2809). 꾸이년 최종 보고서의 저작권·검증 기록을 함께 활용.
- **[D]** [국가관광청 Bãi Môn–Mũi Đại Lãnh](https://vietnamtourism.vn/index.php/tourism/items/2719).
- **[V]** [국가관광청 Vũng Rô](https://vietnamtourism.vn/index.php/tourism/items/2236), [공식 만 경관](https://vietnamtourism.vn/imguploads/tourist/2014/PhuYen/46Vungro01.jpg).
- **[B]** [공식 Phú Yên 관광자료의 Tuy Hòa 해변 설명](https://phuyentourism.gov.vn/tin-tuc/nhieu-san-pham-moi-phuc-vu-du-khach-dip-he.html). 새 사진 GPS·촬영 방향은 아래 Commons 설명 참고.
- **[C]** [Vincom 공식 연락처](https://vincom.com.vn/lien-he), [공식 지점 소개](https://vincom.com.vn/vincom-plaza-tuy-hoa/gioi-thieu), [관광 DB 지점 주소](https://csdl.vietnamtourism.gov.vn/shop/?item=476), [추가 공개 지점 사진 자료](https://local.haogiayensao.com/daklak/?shop=vincom+plaza+tuy+hoa). DB의 내부 이미지는 외관의 지점 일치 증거로 사용하지 않음.
- **[P]** [Co.opmart 공식 지점·갤러리](https://co-opmart.com.vn/he-thong-sieu-thi/co-opmart-tuy-hoa), [Apple Maps 지점 주소](https://maps.apple.com/place?place-id=IC0550266AFF8DFAC).
- **[M]** [시장 VR 자료·사진](https://phuyenvrtour.com/cho-tuy-hoa.html), [시장 네 방향 도로를 확인한 CAND 보도](https://cand.vn/doi-song/Tam-dung-hoat-dong-cho-Tuy-Hoa-ngoi-cho-lon-nhat-o-Phu-Yen-i618288/).
- **[W]** [지방정부 사업장 목록](https://dlieya.daklak.gov.vn/uploads/xa-dlieya/tin2025/9122025/Copy%20of%202594_SCT-QLNL_09122025-signed_01.pdf), [Vincom Tuy Hòa의 WinMart 행사 자료](https://vincom.com.vn/trend/vincom-plaza-tuy-hoa-sinh-nhat-tron-7-nam-hang-tram-qua-g-i-tang), [WinMart 자체 Tuy Hòa 소식](https://winmart.vn/tin-tuc/cam-nang-mua-sam-winmart-tuy-hoa-tu-13062026-10072026).

## 신규 사진 저작권 및 가공 내역

신규 4장 모두 아래 출처·저작자·라이선스를 적용한다. 가공본도 각각 동일 CC BY-SA 라이선스로 제공한다. 출처·저작자·라이선스는 JPEG EXIF에도 기록했다. 오래된 촬영일의 사진이므로 현재 시설 상태를 보증하지 않는다.

| 파일 | 원저작자 / 촬영일 | 원본 및 라이선스 | 가공 및 결과 |
|---|---|---|---|
| `thapnhan.jpg` | Christophe95 / 2018-07-19 | [Nhan Tower 1 설명](https://commons.wikimedia.org/wiki/File:Nhan_Tower_1.jpg), [원본](https://upload.wikimedia.org/wikipedia/commons/e/e1/Nhan_Tower_1.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | EXIF 방향 반영, 3024×4032 → 900×1200, JPEG quality 84 progressive/optimize, 166,620 bytes. 크롭·왜곡 없음. |
| `vungro.jpg` | Huynh Phuc Hung / 2010-03-08 | [Vung Ro Bay 설명·GPS](https://commons.wikimedia.org/wiki/File:Vung_Ro_Bay.jpg), [원본](https://upload.wikimedia.org/wikipedia/commons/2/21/Vung_Ro_Bay.jpg), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) | 원본 800×501 유지, 재압축 JPEG quality 84 progressive/optimize, 52,661 bytes. 확대·크롭 없음. |
| `tuyhoabeach.jpg` | Christophe95 / 2018-07-19 | [Beach in Tuy Hoa 1 설명·GPS](https://commons.wikimedia.org/wiki/File:Beach_in_Tuy_Hoa_1.jpg), [원본](https://upload.wikimedia.org/wikipedia/commons/3/39/Beach_in_Tuy_Hoa_1.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | 4032×3024 → 1200×900, JPEG quality 84 progressive/optimize, 129,860 bytes. 크롭·왜곡 없음. 최초 원본 요청은 429였으나 이후 일반 재시도에서 확보. |
| `oloan.jpg` | Linhcandng / 2015-04-04 | [Đầm Ô Loan 설명](https://commons.wikimedia.org/wiki/File:%C4%90%E1%BA%A7m_%C3%94_Loan,_An_Hi%E1%BB%87p,_Tuy_An,_Ph%C3%BA_Y%C3%AAn.jpeg), [원본](https://upload.wikimedia.org/wikipedia/commons/7/70/%C4%90%E1%BA%A7m_%C3%94_Loan%2C_An_Hi%E1%BB%87p%2C_Tuy_An%2C_Ph%C3%BA_Y%C3%AAn.jpeg), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) | 꾸이년에서 최적화된 1200×678, 140,108 bytes를 바이트 동일 복사. 원본 1917×1083에서 비율 유지 축소·JPEG 최적화한 파일이며 이번 추가 가공 없음. |

## 중복 등록 확인

| 장소 | 꾸이년과 뚜이호아의 좌표 | 처리 |
|---|---|---|
| APEC Mandala Phú Yên | 양쪽 모두 13.10362, 109.306915 | 같은 숙소. 꾸이년 이동일 종착점 중복 등록. 뚜이호아 기존 사진만 검증·유지. |
| Gành Đá Đĩa | 양쪽 모두 13.35419, 109.29363 | 같은 주상절리 명소. 두 도시 일정에 등록된 사실 기록, 각 기존 파일 유지. |
| Ô Loan Lagoon | 양쪽 모두 13.26857, 109.25136 | 같은 석호 접근 지점. 같은 사진 재사용 허용에 따라 뚜이호아 폴더에 추가. |

## 앱 적용 검사

- 로컬 서버: `http://127.0.0.1:8775/v11-preview/`.
- 대상 13개 `photoFile` 경로 전수 검사: **11개 HTTP 200 / JPEG 판독 성공**, 미확보 2개(`tuyhoamarket`, `winmarttuyhoa`)는 파일 부재와 HTTP 404를 함께 확인. 새로운 경로 오류 없음.
- 신규 4곳 모두 일정 카드·장소 간편보기·상세사진을 브라우저에서 실제 열어 확인. Nhạn은 1/18 일정, Vũng Rô는 1/20 일정에서 검사. Ô Loan·Tuy Hòa Beach는 가족방에 참여하지 않은 별도 localhost origin의 로컬 일정에만 임시 추가하여 검사했다. 운영 일정·가족방 상태는 변경하지 않았다.
- Nhạn 세로 원본은 기존 UI의 가로 `cover` 프레임에서 일부가 잘리지만 탑이 식별되고 깨진 이미지가 없음을 확인. 원본 파일 비율은 유지했고 앱 CSS는 수정하지 않았다.
- 기존 자동 검사: `node --test tests/family-sync.test.cjs tests/v13-assets.test.cjs` — **23/23 통과, 실패 0**. 멀티 메모·push 중 변경 보존·A/B 수렴·네트워크 복구·사진 재시도·migration·백업/복원 및 다낭 16개 동결 사진 HTTP 검사 포함.

## 변경 파일 및 보존 범위

1. `TUY_HOA_PHOTO_AUDIT_PHASE1_2026-09-18.md`
2. `photos/tuy_hoa/thapnhan.jpg`
3. `photos/tuy_hoa/oloan.jpg`
4. `photos/tuy_hoa/vungro.jpg`
5. `photos/tuy_hoa/tuyhoabeach.jpg`

`places.json`은 이미 해당 경로를 보유하므로 수정하지 않았다. 기존 사진 7장, 다낭·꾸이년 전체 Freeze 파일, 나트랑, 제외 세탁소, 나머지 뚜이호아 장소, 앱 코드·Worker·D1·Supabase는 변경하지 않았다. 이번 작업은 지정된 13곳의 조사·로컬 검사·브랜치 commit/push까지만이며 운영/Preview 재배포는 하지 않는다.
