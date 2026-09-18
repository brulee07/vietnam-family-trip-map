# 꾸이년 장소사진 1차 검증 — 2026-09-18

## 범위와 결과

- 기준: `work-v13-integration`, 시작 commit `4212a37767ec9c9ce7f24154645bc689fb7eff79`.
- `data/places.json`의 `city=quy_nhon` 앞 16곳만 조사했다. 아래 좌표는 등록값이며, 모든 좌표를 새로 측량하거나 독립적으로 확정했다는 뜻은 아니다.
- 16곳 조사 / 사진 동일성 검증 완료 11곳 / 기존 사진 유지 7곳 / 새 사진 추가 4곳 / 교체 0곳 / 미확보·사진 검증 불충분 5곳 / 최종 로컬 사진 보유 11곳.
- 기존 7장과 새 원본 4장을 직접 열람했다. 미확보 5곳은 장소 정보를 조사했더라도 사진 검증 완료로 계산하지 않았다.
- 변경은 꾸이년 JPEG 4장과 이 보고서뿐이다. JSON, 앱 코드, 다른 도시, 운영 서비스, 기존 사진은 변경하지 않았다.
- 기존 사진의 촬영자·라이선스를 새로 추정하지 않았다. 아래 기존 사진 관련 링크는 **장소 동일성 대조 자료**이며 원본 출처를 확정한 것이 아니다.

## 장소별 판정

사진 경로의 공통 접두사는 `v11-preview/photos/quy_nhon/`이다. 없음은 파일 누락이며 잘못된 상대경로로 판정하지 않았다.

| # | 장소 / ID | 등록 좌표 (위도, 경도) | 기존 사진 | 판정 / 작업 | 동일 장소 판단 근거와 주요 자료 | 비고 |
|---|---|---|---|---|---|---|
| 1 | Diêu Trì Railway Station / dieutri | 13.8072, 109.14369 | dieutri.jpg 있음 | 검증 완료 / 유지 | 사진의 `GA DIÊU TRÌ` 간판, 2층 역 건물과 긴 수평 지붕을 확인. [역 안내](https://vexere.com/vn/ve-tau-hoa/ga-dieu-tri.vi)의 108 Nguyễn Đình Thụ, Diêu Trì/Tuy Phước 주소와 등록 장소 일치. | 기존 원본 출처 미상. |
| 2 | Sala Quy Nhon Beach Hotel / hotel | 13.77218, 109.237165 | hotel.jpg 있음 | 검증 완료 / 유지 | [Booking](https://www.booking.com/hotel/vn/sala-quynhon-beach.html)의 124 Phan Chu Trinh 주소 확인. [Trip.com 실제 사진 갤러리](https://www.trip.com/hotels/qui-nhon-hotel-detail-127934331/sala-quy-nhon-beach-hotel/photo.html)와 로비를 직접 비교: SALA 표식, 세로 목재·금색 조명, 리셉션, 파란 소파·주황 쿠션, 바닥 테두리 일치. | 다른 Sala 호텔과 구분. 원본 출처 미상. |
| 3 | Eo Gió / eogio | 13.89088, 109.29141 | eogio.jpg 없음 | 검증 완료 / 추가 | Commons 원본의 Nhơn Lý 명시와 실제 암벽·풀 덮인 능선 사이의 바다를 직접 확인. [베트남 관광청](https://vietnam.travel/things-to-do/3-august-destinations-vietnam-great-weather-and-thrilling-experiences)의 Eo Gió 해안 절벽·산책 지형과 교차검증. | 2015년 경관. 현재 산책시설 사진으로 해석하지 않는다. 등록 마커는 명소 기준이며 매표소 좌표가 아니다. 출처 A. |
| 4 | Kỳ Co Beach / kyco | 13.8538125, 109.2904375 | kyco.jpg 없음 | 검증 완료 / 추가 | 원본의 `Bãi Kỳ Co–Nhơn Lý` 표기, 흰 모래 만곡 해안·가파른 곶·청록색 만 직접 확인. [관광청](https://vietnam.travel/things-to-do/3-august-destinations-vietnam-great-weather-and-thrilling-experiences), [지역 해변 안내](https://www.quynhon.com/attractions/the-best-beaches.html)의 Ky Co 경관과 대조. | 2015년 사진. 등록 좌표는 육로 접근권역이며 사진은 해변 자체다. 출처 B. |
| 5 | ExploraScience Quy Nhon / explora | 13.7183, 109.2136 | explora.jpg 있음 | 검증 완료 / 유지 | [공식 연락처](https://explorascience.vn/?page_id=2630)의 10 Đại lộ Khoa học 확인. [공식 시설 자료](https://explorascience.vn/?page_id=6448)와 [VOV 기사·사진](https://vovworld.vn/media/explorascience-quy-nhon-makes-science-accessible-to-public-2239779.vov5)을 비교: 넓고 낮은 원형 건물, 중앙 크림색 돔, 외곽 기둥, 뒤편 산지 일치. | 별도 천문대 돔과 혼동하지 않았다. 기존 원본 출처 미상. |
| 6 | Ghềnh Ráng / ghenhrang | 13.74332, 109.21476 | ghenhrang.jpg 없음 | 사진 검증 불충분 / 미확보 | [공식 관광 DB](https://csdl.vietnamtourism.gov.vn/dest/?item=486)는 Ghềnh Ráng Tiên Sa, Bãi Trứng, Hàn Mặc Tử 묘 등 복합 구역을 설명. 등록 설명은 Bãi Trứng·해안 전망인데 검토한 묘 사진 후보만으로 이를 대표한다고 확정하지 않았다. | Commons 묘 원본 다운로드 429. 일반 전망대 사진 좌표 13.752833,109.215833은 등록점과 약 1km 차이. 사진을 억지로 넣지 않음. |
| 7 | Tháp Đôi / thapdoi | 13.7861875, 109.2110625 | thapdoi.jpg 없음 | 검증 완료 / 추가 | Commons 원본 촬영 좌표 13.786167,109.211167은 등록점과 약 12m. 직접 열람한 인접 벽돌탑, 삼각형 감실·석조 기단과 [Thap Doi 자료](https://commons.wikimedia.org/wiki/Category:Thap_Doi)의 장소·위치 일치. | 두 탑 전경이 아닌 건축 세부 사진. 출처 C. |
| 8 | Bánh Ít Cham Towers / banhit | 13.868433, 109.135017 | banhit.jpg 없음 | 검증 완료 / 추가 | Commons 명시 장소 및 원본의 언덕 위 전경, 앞쪽 작은 문탑과 뒤쪽 높은 계단형 벽돌탑을 확인. [관광청 Binh Dinh 자료](https://beta-v2.vietnam.travel/things-to-do/binh-dinh-where-surf-meets-soul)의 4개 탑으로 구성된 Bánh Ít 유적 설명과 교차검증. [연구기관 위치 자료](https://seaarts.sac.or.th/artwork/579?lang=en)의 경도 109.135도 등록 위치와 부합. | 관광청·연구기관 일부 내용은 검색에 노출된 본문으로 확인, 직접 페이지 열기는 제한됨. 시내의 Tháp Đôi와 구분. 출처 D. |
| 9 | Hòn Khô / honko | 13.76443, 109.29841 | honko.jpg 없음 | 미확보 | [Vietnam Airlines 장소 안내](https://www.vietnamairlines.com/mm/en/plan-book/travel/travel-guide/hon-kho)의 Nhơn Hải, 어촌에서 배로 접근하는 암석 섬·해안 보행로를 등록 장소와 대조. | 다른 지역 동명 섬 후보 제외. 정확한 대표사진과 재사용 조건을 함께 확보하지 못함. |
| 10 | Phương Mai Sand Dunes / phuongmai | 13.8478125, 109.2675625 | phuongmai.jpg 있음 | 검증 완료 / 유지 | [Local Vietnam](https://localvietnam.com/binh-dinh/phuong-mai-sand-dunes/)의 사진과 동일 구도 확인: 모래 능선, 뒤편 석호·나무, 붉은 옷 인물. [VietnamPlus](https://en.vietnamplus.vn/phuong-mai-sand-dunes-beckon-with-adventure-serenity-post296554.vnp)의 반도·사구 지형과 대조. | 동일 사진의 게시처를 찾았으나 최초 촬영자·권리 출처까지 확정한 것은 아님. |
| 11 | Bãi Xép Quy Nhơn / baixep | 13.6846875, 109.2313125 | baixep.jpg 없음 | 미확보 | [지역 해변 안내](https://www.quynhon.com/attractions/the-best-beaches.html), [지역 보도](https://vtcnews.vn/lang-chai-bai-xep-xinh-dep-ben-bo-bien-quy-nhon-ar889030.html)의 Quy Nhon 남쪽 어촌·해변 확인. | Commons `Bãi Xép 1.jpg`의 13.192967,109.300758은 Phú Yên의 동명 해변으로 약 55km 떨어져 있어 배제. 정확한 사진 미확보. |
| 12 | Gành Đá Đĩa / ganhdadia | 13.35419, 109.29363 | ganhdadia.jpg 있음 | 검증 완료 / 유지 | [공식 관광자료와 사진](https://vietnamtourism.vn/index.php/tourism/items/2930/2)의 An Ninh Đông/Tuy An 해안, 육각형 현무암과 기울어진 계단형 주상절리를 기존 사진의 암석·해안 형태와 직접 대조. | `tuy_hoa:ganhdadia`와 좌표가 정확히 동일한 장소의 중복 등록. 다른 사진을 강제로 만들지 않음. 기존 원본 출처 미상. |
| 13 | Ô Loan Lagoon / oloan | 13.26857, 109.25136 | oloan.jpg 없음 | 미확보 | [공식 관광자료](https://vietnamtourism.vn/index.php/tourism/items/2809)의 Tuy An 기수 석호 확인. Commons의 `Đầm Ô Loan, An Hiệp, Tuy An, Phú Yên.jpeg` 원본 후보 조사. | 원본 요청이 반복 429여서 실제 사진 검증·확보를 완료하지 못함. `tuy_hoa:oloan`과 좌표가 정확히 동일하며 그쪽 파일도 없음. 양쪽 데이터·사진 변경 없음. |
| 14 | Gia Vy 2 / giavy | 13.7739, 109.22106 | giavy.jpg 있음 | 검증 완료 / 유지 | [장소·갤러리](https://www.sluurpy.com/en/quy-nh%C6%A1n/restaurant/6176608/gia-vy-2)와 [Tripadvisor](https://en.tripadvisor.com.hk/Restaurant_Review-g608528-d6963373-Reviews-Gia_Vy_2-Quy_Nhon_Binh_Dinh_Province.html)의 14 Diên Hồng 확인. 공개 외관 사진의 GIA VY 2·14 DIEN HONG·0932 798 669와 기존 내부 간판의 상호·동일 전화번호, 내부 구조를 직접 대조. | 원본 출처 미상. 집계 사이트의 무관한 연결 웹사이트는 근거로 사용하지 않음. |
| 15 | Phượng Tèo / phuongteo | 13.7678306, 109.2282057 | phuongteo.jpg 있음 | 검증 완료 / 유지 | 기존 외관 사진의 중앙 파란 `211` 주소판 확인. [공식 지역 관광 식당 안내](https://dulichquynhon.binhdinh.gov.vn/vi/detailrestaurant/?id=837)의 Phượng Tèo, 211 Nguyễn Huệ와 [주소 안내](https://timduongdi.com/bai-viet/quan-bun-cha-ca-phuong-teo-211-nguyen-hue-quy-nhon-binh-dinh)를 대조. | 415 Nguyễn Huệ 지점 자료와 구분. 간판 상단이 잘려 전체 상호는 판독 불가; 211 주소판이 핵심 단서. 공식 페이지는 검색 본문 확인, 직접 열기 오류. 기존 원본 출처 미상. |
| 16 | Nhà Hàng Cá Khói / cakhoi | 13.7587, 109.2189 | cakhoi.jpg 없음 | 미확보 | [Tripadvisor](https://www.tripadvisor.com/Restaurant_Review-g608528-d25338863-Reviews-Nha_Hang_Ca_Khoi-Quy_Nhon_Binh_Dinh_Province.html), [Trip.com](https://vn.trip.com/restaurant/vietnam/quy-nhon/detail/nh-hng-c-khi-139991766/)의 04 Nguyễn Trung Tín, FLC Sea Tower 맞은편 및 전화번호 0963774377 일치. | 사진 갤러리 후보는 있으나 정확한 대표 외관과 재사용 조건을 충분히 확보하지 못함. |

## 추가 사진 출처·저작자·사용 조건

아래 4장은 원본 전체 비율을 보존하여 JPEG로 최적화했다. 임의 크롭·왜곡·생성형 보정 없음. 긴 변 최대 1200px, quality 84, progressive/optimize. 원본의 시각적 저작자 표시는 제거하지 않았으며 EXIF에도 출처·저작자·라이선스 정보를 넣었다. CC BY-SA 사진의 최적화본은 원본과 동일한 라이선스로 제공한다. 앱의 기존 CSS는 화면 비율에 맞춰 일부를 잘라 표시하므로 파일 자체의 원본 비율 보존과는 구분한다.

| 출처 | 추가 파일 | 저작자 | 원본 페이지 | 라이선스 | 결과 |
|---|---|---|---|---|---|
| A | eogio.jpg | Hưng Hồ Bá | [Eo Gió - Nhơn Lý](https://commons.wikimedia.org/wiki/File:Eo_Gi%C3%B3_-_Nh%C6%A1n_L%C3%BD.jpg) / [Flickr 원출처](https://www.flickr.com/photos/123417148@N06/26794186606/) | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) | 1200×643, 181,293 bytes |
| B | kyco.jpg | Lê Hồ Bắc | [Ky Co beach, Quy Nhon city, Binh Dinh province, Vietnam](https://commons.wikimedia.org/wiki/File:Ky_Co_beach,_Quy_Nhon_city,_Binh_Dinh_province,_Vietnam.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | 1200×800, 149,323 bytes |
| C | thapdoi.jpg | Dragfyre | [Thap Doi 01](https://commons.wikimedia.org/wiki/File:Thap_Doi_01.JPG) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) | 900×1200, 258,682 bytes |
| D | banhit.jpg | BertholdD | [Banh It](https://commons.wikimedia.org/wiki/File:Banh_It.jpg) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) | 1024×684, 115,870 bytes |

새 사진 합계 705,168 bytes. 기존 사진은 재인코딩하지 않았다. 역사적 경관 사진이므로 현재 영업·시설·해안 접근 조건을 보증하지 않는다.

## 로컬 검증

- Python HTTP 서버, `http://127.0.0.1:8772/v11-preview/?city=quy_nhon`에서 실행. 운영 가족방 연결 없이 새 로컬 origin에서 검사.
- 16개 `photoFile` 전체 HTTP 요청 및 Pillow JPEG 무결성 검사: **11개 HTTP 200 및 JPEG 정상 / 5개 예상 404**.
- 200: dieutri, hotel, eogio, kyco, explora, thapdoi, banhit, phuongmai, ganhdadia, giavy, phuongteo.
- 404: ghenhrang, honko, baixep, oloan, cakhoi. 모두 실제 파일 없음; 해당 항목의 외부 fallback도 없음. 사진 확보 완료나 경로 오류 해결로 계산하지 않음.
- 새 4곳 전부 일정 카드 → 장소 간편 보기 → 장소 상세사진을 직접 열어 화면을 확인하고, 각 이미지의 `complete=true`, `naturalWidth>0` 확인: **4곳 × 3화면 = 12건 정상**. Day 4 Tháp Đôi, Day 5 Eo Gió/Kỳ Co, Day 6 Bánh Ít.
- 미확보 Cá Khói 일정 카드에서는 깨진 이미지 아이콘 대신 기존 로직대로 이미지 요소가 제거되는 것을 확인. 미확보 5곳의 HTTP 404를 정상 이미지 응답으로 취급하지 않는다.
- 기존 `node --test tests/family-sync.test.cjs tests/v13-assets.test.cjs`: **23개 통과 / 0개 실패**. 멀티 메모·동시 수정·업로드 실패 재시도·migration 등 22개, 다낭 사진 HTTP 검사 1개(16장).
- Git 변경 범위: 이 문서 + 위 JPEG 4장만. `places.json`, app.js, family-sync.js 및 다른 도시 파일 변경 없음. 사진 경로 수정 0건. 꾸이년 나머지 16곳은 이번 감사 대상 아님.
- 이번 작업은 브랜치 commit/push까지만 수행한다. 운영 사이트나 기존 Preview를 재배포하지 않는다.
