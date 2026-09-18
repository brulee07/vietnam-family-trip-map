# 꾸이년 사진 2차 검증 — 2026-09-18

## 범위와 판정 기준

- 기준 브랜치: `work-v13-integration`; 시작 commit: `0a318d57178cdc3d9ac93598ae6c7be631f6c6f9`.
- 기준 데이터: `v11-preview/data/places.json`의 꾸이년 뒤 16개 항목. 작업 중 사용자 요청으로 **Gold Laundry 제외**, 실제 조사 대상은 **15곳**이다.
- 앞으로 모든 지역의 세탁소를 사진 조사·추가·교체 대상에서 제외한다. 기존 세탁소 데이터·사진은 삭제하거나 수정하지 않는다. Gold Laundry의 중간 검색 결과는 완료 집계에 포함하지 않았다.
- 기존 로컬 사진 **13장 모두 직접 열람**했다. 단순 이름 검색이나 주소 확인만으로 사진 검증 완료로 처리하지 않았다. 실제 사진의 식별 단서와 공개 자료가 충분히 연결되는 경우만 완료로 판정했다.
- **사진 검증 완료 8곳 / 부분 검증 5곳 / 사진 미확보 2곳 / 사용자 제외 1곳**.
- **기존 사진 13장 변경 없이 보존**: 정확성 확인 후 유지 8장, 사진 동일성 증거가 부족하여 판정 보류·원본 보존 5장. 보류 5장을 검증 완료 수에 포함하지 않는다.
- **새 사진 추가 0 / 교체 0 / 경로 수정 0 / 최종 로컬 사진 보유 13곳(대상 15곳 중)**.
- 기존 사진이 잘못되었다고 확정할 근거는 발견하지 못했다. 불확실한 사진을 임의로 삭제하거나 다른 사진으로 바꾸지 않았다. 이 보고서만 저장소에 추가한다.

## 항목별 결과

파일명 앞의 공통 경로는 `v11-preview/photos/quy_nhon/`이다. 좌표·주소는 기준 JSON의 등록값이며 신규 측량 결과가 아니다. 출처 링크는 주로 **동일성 비교 자료**다. 기존 파일의 최초 촬영자·라이선스를 뜻하지 않는다.

| 장소 / ID | 등록 주소 / 좌표 | 기존 사진 | 판정 / 조치 | 실제 사진 확인·웹 교차검증 | 한계·비고 |
|---|---|---|---|---|---|
| Mr Mộc / mrmoc | 57 Nguyễn Thị Định / 13.7549, 109.2147 | mrmoc.jpg 있음 | 검증 완료 / 유지 | [PATO 해당 지점](https://pato.com.vn/products/mr-moc-com-ngon-quy-nhon-57-nguyen-thi-dinh)의 57번 주소 및 실제 홀 사진을 비교했다. 거울 천장, 금색·반사 기둥, 검은 창틀, 노란 벽화, 목재 의자 구조가 일치한다. | 같은 체인의 222 Nguyễn Thị Định 해산물 뷔페와 구분. 기존 사진 원출처·저작자·라이선스 미상. |
| Ngô Văn Sở Food Street / foodstreet | Ngô Văn Sở / 13.7697, 109.2343 | foodstreet.jpg 있음 | 검증 완료 / 유지 | 로컬 사진의 `PHỐ ẨM THỰC QUY NHƠN / QUY NHON FOOD STREET` 간판, 분리된 호 형태의 금속 아치와 뒤편 건물 확인. [지역 안내의 Ngô Văn Sở 사진](https://top10quynhon.com/pho-am-thuc-quy-nhon/)에서 같은 아치 구조·주변 건물을 직접 비교했다. | 다른 음식거리 이름으로 일반화하지 않음. 간판 조명·문구 배치는 촬영 시기에 따라 다르다. |
| Surf Bar 1 / surf | Xuân Diệu beachfront / 13.770132, 109.235733 | surf.jpg 있음 | 검증 완료 / 유지 | [Surf Bar 1 지점 갤러리](https://restaurantguru.com/Sulf-bar-tp-Quy-Nhon)의 Q6CP+365, Xuân Diệu 주소는 등록점 부근. 직접 열람한 갤러리와 모래 위 목재 테이블·등받이 의자, 흰 커튼 구조물, 줄전구, 바다 방향·주변 고층 건물을 대조했다. [공식 지역 관광 안내](https://dulichquynhon.binhdinh.gov.vn/vi/suftbar/bookingres)도 Xuân Diệu 주소를 명시한다. | Surf Bar 2가 별도로 있으므로 1번 지점 갤러리와 위치를 사용. 집계 사이트의 An Nhon 표기, 공식 안내의 Nha Trang 표현은 불일치로 제외하고 정확한 도로·지점 정보를 사용했다. |
| KATINAT Quy Nhơn / katinat | 19–19A Nguyễn Lạc / 13.763382, 109.223602 | katinat.jpg 있음 | 검증 완료 / 유지 | [시공사 E-Green의 해당 프로젝트](https://egreenliving.vn/products/katinat-quy-nhon)가 19–19A 주소를 명시한다. 직접 열람한 시공 사진과 실내의 천장으로 휘어 올라가는 대나무 다발, 곡선 중층 난간, 중앙 화단·좌석 배치·큰 창이 일치. [Foody 지점](https://www.foody.vn/binh-dinh/katinat-nguyen-lac-quy-nhon) 주소도 일치. | 다른 도시 KATINAT 사진으로 판단하지 않았다. |
| ADIUVAT Coffee Roasters / adiuvat | 57 Nguyễn Huệ / 13.76961, 109.23226 | adiuvat.jpg 있음 | 검증 완료 / 유지 | 로컬 간판에 `ADIUVAT COFFEE ROASTERS QUINHON`이 명확하다. [VnExpress 건축·장소 기사](https://e.vnexpress.net/news/travel/places/quy-nhon-cafe-charms-patrons-with-variety-design-4159834.html)의 실제 낮 외관과 검은 간판, 돌 마감 벽, 2층 발코니·창문, 양옆 나무·인접 점포를 직접 비교했다. [지점 주소](https://www.viet-biz.com/en/adiuvat-coffee-roasters-quinhon-096-626-77-22)는 57 Nguyễn Huệ. | 기사 사진에 57A 표식도 보인다. 공개 장소 목록의 57번과 세부 호수 표기 차이는 있으나 동일 외관을 직접 확인했다. 등록 주소를 수정하지 않음. |
| Tree Hugger / treehugger | 5A Hai Bà Trưng / 13.7712, 109.2336 | treehugger.jpg 있음 | 부분 검증 / 원본 보존 | 로컬 사진의 `tree hugger` 필기체 로고, 남색 목재 외벽·접이문·상층 난간을 확인. [Tripadvisor](https://www.tripadvisor.com/Attraction_Review-g608528-d32851766-Reviews-Tree_Hugger-Quy_Nhon_Binh_Dinh_Province.html)는 5A Hai Ba Trung. [지점 갤러리](https://restaurantguru.com/Tree-Hugger-tp-Quy-Nhon) 및 [지역 기사](https://quynhonreview.vn/topAZ/quan-ca-phe-giuong-o-quy-nhon)의 실내·공예 진열 자료를 직접 열람. | 주소·상호는 일치하지만 갤러리에서 기존 야간 외관의 전체 구조까지 독립적으로 일치시킬 증거가 부족. 사진 검증 완료로 계산하지 않음. |
| Hương Vi Spa & Clinic / huongvi | 95 Chương Dương / 13.7541, 109.2158 | huongvi.jpg 있음 | 부분 검증 / 원본 보존 | 로컬 금색 HƯƠNG VI 간판, `PHUN THÊU THẨM MỸ`, 검은 곡선 차양, 파란 `95` 주소판 직접 확인. [지역 가이드](https://quynhonguide.com/)에 Hương Vi Spa & Clinic (95 Chương Dương) 표기, [여행자 기록](https://us.trip.com/moments/detail/quy-nhon-24728-152618993/)에 Hestia 맞은편 시설로 언급. | 공식 또는 충분히 독립적인 지도·외관 자료를 확보하지 못함. 지역 가이드의 출처 독립성도 확정하지 않아 주소판 95만으로 완료 처리하지 않았다. |
| Hy-Halona Wellness / hyhalona | Grand Hyams Hotel, 28 Nguyễn Huệ / 13.770063, 109.232892 | hyhalona.jpg 있음 | 부분 검증 / 원본 보존 | 로컬 사진에 녹색 Halona 표식, Spa 문구, 목재 리셉션·식물벽을 확인. [호텔 공식 시설 안내](https://www.grandhyamshotel.com/vi/wellness/hy-halona-wellness/), [공식 Wellness 소개](https://www.grandhyamshotel.com/vi/wellness/)가 호텔 3층·28 Nguyễn Huệ 주소를 명시. 공식 트리트먼트실·제품 진열·스파 사진을 직접 열람했다. | 브랜드와 호텔 위치는 확인했지만 기존 리셉션 구도를 공식 사진과 직접 일치시키지 못했다. 시설 동일성을 사진 수준까지 확정하지 않음. |
| Chạm Massage & Spa / chamspa | 152 Nguyễn Huệ / 13.76425, 109.22318 | chamspa.jpg 있음 | 검증 완료 / 유지 | [공식 연락처](https://chamspaquynhon.vn/lien-he/)의 152 Nguyễn Huệ 주소 확인. [공식 홈페이지](https://chamspaquynhon.vn/)의 실제 발마사지 사진과 로컬 사진의 갈색·크림색 좌석, 노란 발통, 목재 벽, 둥근 벽등·세로 거울 배치를 직접 대조. Chạm 로고와 리셉션도 [지역 사진](https://quynhonreview.vn/topAZ/dia-chi-massage-y-hoc-co-truyen-o-quy-nhon)과 일치. | 공식 이미지 중 한 요청은 SSL 연결 종료로 실패했지만 다른 실제 시설 사진은 열람 성공. |
| ZENN Wellness / zenn | 270 Nguyễn Thị Định / 13.7539121, 109.2091138 | zenn.jpg 있음 | 부분 검증 / 원본 보존 | 기존 사진의 `ZENN`, Wellness & Beauty Clinic 간판, 여러 층 발코니, 적색 등·식물을 확인. [공식 지역 관광 목록](https://dulichquynhon.binhdinh.gov.vn/vi/detailentertainment/?id=775) 검색 본문과 [Tripadvisor](https://www.tripadvisor.com.vn/Attraction_Review-g608528-d14802466-Reviews-Zen_Spa-Quy_Nhon_Binh_Dinh_Province.html)의 270 Nguyễn Thị Định 일치. | 여러 주소(270 Nguyễn Thị Định / 03 Nguyễn Hữu Quang 등) 자료가 있어 기존 외관이 정확히 어느 출입구인지 확정 못함. 공식 관광 페이지 직접 연결은 인증서 오류. 지역 갤러리는 실내 시술 장면 위주여서 건물 식별에 부족. |
| Co.opmart Quy Nhơn / coop | 07 Lê Duẩn / 13.76736, 109.2217 | coop.jpg 있음 | 검증 완료 / 유지 | [공식 지점 페이지](https://co-opmart.com.vn/he-thong-sieu-thi/co-opmart-quy-nhon)의 07 Lê Duẩn 주소 확인. 공식 정면 사진과 기존 사진의 중앙 흰색 Co.opmart 간판 패널, 양쪽 기둥·출입구, 상부 금속 지붕 구조를 비교했다. | 행사 배너와 로고 디자인 시기 차이는 있음. 지점의 건축 구조로 대조. |
| Chợ Khu 2 / Market 2 / market2 | 110 Nguyễn Huệ / 13.7658362, 109.2249222 | market2.jpg 없음 | 미확보 / 추가 안 함 | [Waze 장소 정보](https://www.waze.com/live-map/directions/vn/gia-lai/quy-nhon/market-2?to=place.ChIJ9TbvdY1sbzERZKZEGjri4_Y)와 [주소 안내](https://timduongdi.com/bai-viet/cho-khu-2-110-nguyen-hue-tran-phu-thanh-pho-quy-nhon-binh-dinh)가 110 Nguyễn Huệ를 명시. [지역 여행사 기사](https://www.haloquynhon.com/tin-tuc/nhung-khu-cho-hai-san-tuoi-ngon-tai-quy-nhon)의 사진 후보도 조사했다. | 일반 해산물·시장 사진만으로 정확한 입구를 식별하거나 저작자·재사용 조건을 확정하지 못해 저장하지 않음. |
| Chợ Đầm / chodam | 124 Phạm Hồng Thái / 13.7821882, 109.2254308 | chodam.jpg 있음 | 검증 완료 / 유지 | 로컬 사진에 `CHỢ ĐẦM QUY NHƠN`, `TỈNH BÌNH ĐỊNH`, 관리사무소 표식이 명확하다. [장소 목록](https://wanderlog.com/place/details/10621936), [주소 안내](https://timduongdi.xim.tv/tin-tuc/cho-dam-dong-da-quy-nhon-124-pham-hong-thai-quy-nhon-binh-dinh-new72224.html)의 124 Phạm Hồng Thái와 대조. | 나트랑 동명 Chợ Đầm과 달리 사진에 Quy Nhơn·Bình Định가 명시되어 구분된다. |
| MM Mega Market / mmmega | QL1D, Tổ 24, Khu vực 5 / 13.753381, 109.207383 | mmmega.jpg 있음 | 부분 검증 / 원본 보존 | 로컬 사진의 MM 로고·회색 외벽·판촉 천막 확인. [공식 지점 목록](https://mmvietnam.com/danh-sach-he-thong/)의 Quy Nhơn, Quốc lộ 1D, Ghềnh Ráng 주소와 [공식 관광 DB](https://csdl.vietnamtourism.gov.vn/shop/?item=197) 일치. DB의 실제 사진도 열람. | 공식 DB 사진은 실내 출입구여서 로컬 외관과 직접 일치시키기 어려움. 체인 공통 로고만으로 꾸이년 지점 사진이라고 확정하지 않았다. |
| APEC Mandala Phú Yên / apec | Đại lộ Hùng Vương, Tuy Hòa / 13.10362, 109.306915 | apec.jpg 없음 | 동일 장소 확인 / 사진 미확보 | [시행사 공식 프로젝트](https://apeci.com.vn/du-an/apec-mandala-wyndham-phu-yen/)와 [준공 기사](https://apeci.com.vn/apec-mandala-phu-yen-chinh-thuc-nghiem-thu-cong-trinh-2/)가 Hùng Vương, Tuy Hòa를 명시. 뚜이호아의 기존 apec.jpg와 공식 외관 사진을 직접 대조: APEC MALL 표식, 쌍측 고층부·중앙 테라스·수직 조명, 하부 외벽이 같으며 동일 촬영 사진임을 확인. | `tuy_hoa:apec`과 위도·경도가 정확히 같다. 꾸이년 일정에도 중복 등록된 동일 시설이다. 뚜이호아 파일은 수정하지 않음. 아래 권리 확인 한계 때문에 복사·추가하지 않았다. |

Gold Laundry(`gold`)는 사용자 요청으로 제외했다. 그 외 도시의 세탁소도 이후 사진 작업에서 제외한다.

## 새 사진 후보와 출처·권리 확인

새 사진으로 채택한 파일은 없다. 따라서 새로 사용한 사진의 저작자·라이선스·최적화 내역도 없다. 기존 13장의 원출처·저작자·라이선스는 미상이며, 웹에서 비교 사진을 발견했다는 이유로 원출처나 이용허락을 소급해서 부여하지 않았다.

- **APEC 후보:** 시행사 공식 준공 기사에 실제 외관 사진이 있다. 직접 이미지 URL: <https://apeci.com.vn/wp-content/uploads/2022/09/DHP2533-HDR-Pano-1024x842.jpg>. 사진에는 APEC MANDALA 표식이 있지만 개별 촬영자 및 공개 재사용 라이선스는 확인되지 않았다. 기존 뚜이호아 파일과 같은 사진임은 확인했으나, 이 사실을 신규 복제 허락으로 간주하지 않아 꾸이년 파일은 미확보로 남겼다. Commons 검색에 나타난 Thanh Thuỷ의 동명 APEC는 다른 지역이므로 사용하지 않았다.
- **Market 2 후보:** 지역 여행사 기사에 시장 사진이 연결되어 있지만 명확한 110 Nguyễn Huệ 간판·입구 식별과 저작자·라이선스를 함께 확인하지 못했다. 일반 시장 사진을 대체 삽입하지 않았다.
- 부분 검증 5곳은 잘못된 사진이라고 확정하지 못했으므로 기존 파일을 보존했다. 사진 동일성을 검증 완료로 승격하려면 정확한 해당 출입구·리셉션·외관과 연결되는 독립 자료가 추가로 필요하다.

## 로컬 검사

- 로컬 HTTP 서버에서 `http://127.0.0.1:8773/v11-preview/` 실행·GET: **HTTP 200**.
- 대상 15개 `photoFile` 경로 전체 요청: **13개 HTTP 200 / 2개 예상 404**. 제외한 Gold Laundry는 이 검사 집계에서 제외했다.
- 200 응답 13개 모두 파일 바이트와 HTTP 응답 바이트가 같으며 Pillow `Image.verify()` 통과, 실제 형식 **JPEG** 확인.
- 404는 `photos/quy_nhon/market2.jpg`, `photos/quy_nhon/apec.jpg`: 실제 로컬 파일 없음. 정상 로딩이나 경로 수정 완료로 계산하지 않는다.
- 새로 추가·교체한 사진이 **0장**이므로 그 사진의 카드·간편보기·상세화면 검사 대상도 **0건(해당 없음)**이다. 새 화면 표시 검사를 수행했다고 주장하지 않는다.
- 기존 자동 회귀 테스트: `node --test tests/family-sync.test.cjs tests/v13-assets.test.cjs` → **23개 통과 / 실패 0**. 가족 동기화·멀티 메모·사진 업로드 재시도·migration 등 22개 및 다낭 16장 HTTP 검사 1개 포함.
- 저장소 변경은 이 보고서 1개뿐이다. 모든 사진, `places.json`, 다낭·꾸이년 1차 보고서, 앱 기능 및 Worker/D1/Supabase 설정은 변경하지 않았다. 기존 서비스·Preview 배포도 변경하지 않았다.

## 후속 확인이 필요한 항목

- 사진 동일성 부분 검증: **Tree Hugger, Hương Vi Spa & Clinic, Hy-Halona Wellness, ZENN Wellness, MM Mega Market** (5곳).
- 사진 미확보: **Chợ Khu 2 / Market 2, APEC Mandala Phú Yên** (2곳).
- 이번 범위 밖의 꾸이년 1차 및 다른 도시 사진은 재조사·수정하지 않았다. APEC의 뚜이호아 사진은 중복 확인 목적으로 읽기만 했다.
