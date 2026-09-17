# 다낭 16곳 대표사진 검증 보고서

- 검증일: 2026-09-17
- 작업 브랜치: `work-v11-photo-agent`
- 기준: `v11-preview/data/places.json`의 `city == da_nang` 16개 항목
- 시작 commit: `ddcce16ef231d5dae56c7e985132732ee9f9ee20`
- 범위: 장소 대표사진의 동일성, 로컬 파일, 앱 표시. 영업시간·요금·방문 일정의 최신성 검증은 포함하지 않는다.

## 결과

| 대상 | 검증 완료 | 기존 사진 유지 | 새 로컬 사진 추가 | 사진 교체 | 경로 수정 | 미확보·검증 불충분 | 최종 로컬 사진 보유 |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 16 | 16 | 15 | 1 | 0 | 0 | 0 | 16 |

검증 완료는 데이터 목록 확인만을 뜻하지 않는다. 기존 15개 로컬 이미지를 실제 열람하고, 공개 웹의 장소 주소·시설 설명·사진·간판과 대조하였다. 용다리는 기존 로컬 파일이 없었으며, 이미 데이터에 등록되어 있던 Wikimedia Commons 사진의 원본·저작권·교량 형태를 확인한 후 로컬 파일로 추가했다. 따라서 추가 1건은 새 장소 등록이나 사진 소재 변경이 아니라 기존 외부 대체사진의 로컬 확보이다.

기존 15개 파일은 바이트 단위로 보존했다. 아래의 기존 사진 검증 URL은 동일성을 판단한 비교 자료이며, 기존 파일의 최초 촬영자나 다운로드 출처를 의미하지 않는다. 출처를 확인할 수 없는 기존 파일에 촬영자·라이선스를 임의로 부여하지 않았다.

## 장소별 판정

사진 경로는 `v11-preview/` 기준이다. 아래 약칭 파일은 모두 `photos/da_nang/` 안에 있다. 새 사진 출처가 `해당 없음`인 항목은 파일을 추가·교체하지 않았다.

| 장소명 | 기존 사진 | 판정 | 유지·추가·교체 | 검증 근거 | 새 사진 출처 | 비고 |
|---|---|---|---|---|---|---|
| 다낭 국제공항 / Da Nang International Airport | airport.jpg 존재·직접 열람 | 검증 완료 | 유지 | DAD 공항 공식 안내와 도착 구역 자료 대조. 초록색 WELCOME TO DA NANG 벽, 세로 노란 장식, 은색 기둥과 수하물 카트의 배치가 공개 사진과 일치. [A1][A2] | 해당 없음 | 공항 전체의 등록 좌표이며, 사진은 도착 구역을 표현한다. |
| 뉴 오리엔트 호텔 / New Orient Hotel Da Nang | hotel.jpg 존재·직접 열람 | 검증 완료 | 유지 | 공식 주소 20 Đống Đa 확인. New ORIENT 간판, 길쭉한 중정 수영장, 식재된 다층 발코니, 조명 테라스, Bistecca Restaurant 및 강 쪽 배경을 공식 시설자료와 숙박자료의 동일 구도 야경 사진으로 교차 확인. [H1][H2][H3] | 해당 없음 | 이전 단독 테스트의 원문 증거를 재사용했다고 주장하지 않는다. 이번 작업에서 공식 페이지·사진을 다시 확인했다. |
| 다낭역 / Ga Đà Nẵng | station.jpg 존재·직접 열람 | 검증 완료 | 유지 | Hải Phòng 거리의 다낭역 자료와 비교. GA ĐÀ NẴNG 글자, 넓은 곡선 금속 지붕, 격자 유리 전면, 전면 광장 및 뒤쪽 철로가 공개 항공사진과 일치. [S1] | 해당 없음 | 거리 번지의 자료별 표기 차이는 좌표나 데이터를 임의 수정하는 근거로 삼지 않았다. |
| 다낭박물관 / Da Nang Museum | museum.jpg 존재·직접 열람 | 검증 완료 | 유지 | 공식 신관 안내의 42–44 Bạch Đằng / 31 Trần Phú 부지 확인. 흰색 대칭 건물, 중앙 박공·붉은 지붕, 양쪽 날개와 창문 배열을 공식 관광 사진과 대조. [M1][M2] | 해당 없음 | 옛 24 Trần Phú의 Điện Hải 성채 박물관 사진과 구분. |
| 꼰시장 / Chợ Cồn | conmarket.jpg 존재·직접 열람 | 검증 완료 | 유지 | 290 Hùng Vương의 시장 확인. CHỢ CỒN 글자, 굽은 파란 전면과 흰색 지붕선, 상부 탑을 항공사 여행자료의 시장 정면 사진 및 장소정보와 대조. [C1][C2] | 해당 없음 | ID con과 파일명 conmarket의 차이는 명시적 photoFile 규칙으로 정상이다. |
| AEON MALL / Da Nang Thanh Khe | aeon.jpg 존재·직접 열람 | 검증 완료 | 유지 | 공식 시설정보의 46 Điện Biên Phủ 및 TTC Plaza 입점 확인. 흰 물결형 저층부, 수평 띠의 고층동, AEON MALL/TTC 간판과 매장 광고를 공식 개장자료 CDN의 실제 건물 사진과 대조. [E1][E2][E3] | 해당 없음 | 다른 AEON 지점이나 Hòa Xuân 계획 부지와 구분. 일부 공식 기사 URL은 404였으나 공식 시설정보와 공개 원본 CDN 사진은 확인됨. |
| 선짜 야시장 / Sơn Trà Night Market | night.jpg 존재·직접 열람 | 검증 완료 | 유지 | 관광 데이터베이스의 Lý Nam Đế–Mai Hắc Đế 교차로와 용다리 동쪽 입지 확인. 사진 아치의 CHỢ ĐÊM SƠN TRÀ 및 PHƯỜNG AN HẢI - TP ĐÀ NẴNG 표기, 야시장 통로를 대조. [N1] | 해당 없음 | 한시장·헬리오 야시장과 구분되는 현장 간판이 보인다. |
| 미카즈키 워터파크 / Mikazuki Water Park 365 | mikazuki.jpg 존재·직접 열람 | 검증 완료 | 유지 | 공식 시설의 Xuân Thiều / Nguyễn Tất Thành 위치 확인. 큰 붉은 철골 지붕, 실내 수조와 물놀이 구조물, 슬라이드와 벽면 구성을 공식 실내시설 사진과 대조. [K1] | 해당 없음 | 호텔 객실이나 외부 해변 사진이 아닌 실내 워터파크 사진. |
| Vincom Plaza / Ngô Quyền | vincom.jpg 존재·직접 열람 | 검증 완료 | 유지 | 운영사와 시 관광자료의 910A Ngô Quyền 지점 확인. 원통형 유리 입구, 양옆의 낮은 상가, 뒤 고층 건물, VINCOM PLAZA·H&M·CGV 등의 간판을 관광자료 정면 사진과 대조. [V1][V2] | 해당 없음 | 같은 이름의 다른 도시 지점과 구분. |
| GO! Da Nang | go.jpg 존재·직접 열람 | 검증 완료 | 유지 | 운영사 지점 안내에서 255–257 Hùng Vương / Vĩnh Trung Plaza 확인. 사진의 VĨNH TRUNG PLAZA 아치와 중앙 로고, 붉은 GO! 입구 및 상부 고층 건물로 지점 식별. [G1] | 해당 없음 | 과거 Big C 명칭의 자료와 현재 GO! 간판을 구분. |
| 참조각박물관 / Museum of Cham Sculpture | cham.jpg 존재·직접 열람 | 검증 완료 | 유지 | 공식 관광자료의 02 Đường 2 Tháng 9 부지 확인. 노란 낮은 전시동이 감싸는 중정, 중앙 통로와 대칭 나무·생울타리, 출입구를 공식 건물 배치 사진 및 대학 장소자료와 대조. [P1][P2] | 해당 없음 | places.json의 Commons 대체사진 출처를 기존 로컬 파일의 원출처로 단정하지 않음. |
| 용다리 / Dragon Bridge | dragon.jpg 없음; Commons 대체 URL 존재 | 검증 완료 | 추가 | 한강을 횡단하는 노란 용 모양의 연속 아치, 강 양안 도심과 배경 지형을 관광자료 및 Commons 원본 사진과 대조. 등록 좌표는 해당 교량 구간. [D1][D2] | Wikimedia Commons, Thangphan, CC0 1.0. [D1][D3] | 기존 photoFile 경로에 1200×800 JPEG 추가. 좌표·JSON·기능 변경 없음. |
| Xóm Mới Garden Đà Nẵng | xom.jpg 존재·직접 열람 | 검증 완료 | 유지 | 공식 다낭 지점 주소 222 Trần Phú 확인. 사진의 XÓM MỚI Garden 표기, 노란 벽화·파란 문·흰 자전거·꽃과 등 장식을 다낭 현장 촬영 갤러리의 같은 벽화 사진과 대조. 별도 지역자료도 동일 주소·전화번호를 제공. [X1][X2][X3] | 해당 없음 | 사진은 현장의 벽화와 장식을 담고 있어 건물 전체 외관으로 설명하지 않는다. 나트랑 144 Võ Trứ 지점과 구분. |
| Mỳ Quảng Cô Sáu | miquang.jpg 존재·직접 열람 | 검증 완료 | 유지 | 사진의 MỲ QUẢNG CÔ SÁU 간판, 397 번지판, Trần Hưng Đạo 표기 및 0963 982 634 번호를 397 Trần Hưng Đạo 지점 자료와 대조. [Q1][Q2] | 해당 없음 | 상호만으로 판정하지 않고 번지·거리·번호로 확인. |
| Bánh Xèo Bà Dưỡng | banhxeo.jpg 존재·직접 열람 | 검증 완료 | 유지 | 초록 간판의 K280/23 Hoàng Diệu 주소, 옆 노란 번지판, 0236 3 873 168 전화번호를 장소자료와 지도 정보에 대조. [B1][B2] | 해당 없음 | 골목 안 해당 가게를 식별. |
| MỘC Quán Seafood | moc.jpg 존재·직접 열람 | 검증 완료 | 유지 | 공식 CS1 주소 26 Tô Hiến Thành 확인. 나무 MỘC Quán 간판과 아래 문구, 나무의 전구 장식, 철제 기둥·화분·기와 정자·야외 테이블 구성이 Vinpearl의 다낭 지점 사진과 동일. 여행사 지점자료도 26 Tô Hiến Thành와 같은 사진 구성을 제공. [O1][O2][O3] | 해당 없음 | CS2 나트랑 74–76 Hồng Bàng과 구분. 비교자료를 발견했지만 기존 로컬 파일의 최초 출처는 단정하지 않음. |

## 근거 URL 및 유형

다음 링크는 2026-09-17에 확인한 자료다. 기존 로컬 사진의 사용권을 새로 입증하는 목록이 아니라 장소 동일성 검증 자료다. 검색 제목만을 증거로 삼지 않았으며, 장소 페이지 본문·주소 또는 원본 이미지까지 확인했다. 일부 동적 페이지의 본문 추출은 제한되었고, 이 경우 공식 주소와 접근 가능한 사진·보조 자료를 함께 사용했다.

- [A1] [다낭공항 공식 사이트](https://danangairport.vn/en) / [도착 안내](https://danangairport.vn/airport-guide-arrival-guide?t=2) — 시설 공식.
- [A2] [공항 도착구역 사진·안내](https://visitdanang.travel/en/da-nang-airport-2025-update-on-terminal-information-and-services-5427) — 여행자료. 공항의 환영 벽 사진 대조.
- [H1] [New Orient 공식](https://neworienthoteldanang.com/) — 주소 20 Đống Đa, Bistecca 및 수영장 시설 안내.
- [H2] [Skylight Pool Lounge 공식](https://neworienthoteldanang.com/dine-drink/skylight-pool-lounge) / [공식 수영장 사진](https://cdn.neworienthoteldanang.com/1784770575236-2sgql1-skylight-pool-lounge-5.webp) — 식재·중정·발코니 대조.
- [H3] [Agoda 해당 호텔](https://www.agoda.com/new-orient-hotel-da-nang/hotel/da-nang-vn.html) / [해당 숙소 이미지](https://pix8.agoda.net/hotelImages/2911802/0/cdf34542c16dadcf33c0e67e04c9dde0.jpg?ce=2) — 숙박자료. New ORIENT·Bistecca 표시와 기존 사진 구도 대조.
- [S1] [다낭역 장소·항공사진 자료](https://visitdanang.travel/vi/ga-da-nang-diem-ket-noi-giao-thong-va-du-lich-mien-trung) — 여행자료.
- [M1] [시 공식 관광포털 다낭박물관](https://danangfantasticity.com/en/discovery/the-da-nang-museum) / [신관 사진](https://danangfantasticity.com/wp-content/uploads/2025/03/bao-tang-da-nang-42-44-bach-dang-31-tran-phu-scaled.jpg).
- [M2] [박물관 공식 관람 안내](https://baotangdanang.vn/thong-bao-don-khach-tham-quan-tai-bao-tang-da-nang).
- [C1] [Vietnam Airlines 꼰시장](https://www.vietnamairlines.com/in/vi/plan-book/travel/travel-guide/cho-con-da-nang) — 항공사 여행자료.
- [C2] [Vietnam Airlines 다낭 쇼핑 안내](https://www.vietnamairlines.com/us/en/plan-book/travel/travel-guide/shopping-in-danang) — 꼰시장 정면 사진 대조.
- [E1] [AEON 공식 시설정보](https://www.aeonmall.com/facility/detail/12612/) — 지점명·주소.
- [E2] [TTC 공식 개장 기사](https://www.ttcgroup.vn/en-US/business-sectors/real-estate/other-news-1/aeon-mall-shopping-center-officially-opens-at-ttc-plaza-da-nang) — TTC Plaza 내 입점.
- [E3] [AEON 공식 개장자료 이미지](https://aeonmall-review-rikkei.cdn.vccloud.vn/public/wp/22/editors/t388eH2ldXVB6SHs4dfZrlnw2QfEeRmYVo70gFnj.jpg) — 실제 건물 원본 사진 직접 열람. 연결 기사 경로는 조회 당시 404여서 주소 판정은 E1/E2에 의존.
- [N1] [베트남 관광 데이터베이스 Sơn Trà Night Market](https://csdl.vietnamtourism.gov.vn/shop/?item=60) — 공식 관광 장소정보.
- [K1] [Mikazuki Water Park 공식](https://www.mikazukiwaterpark.com/) — 위치·실내 물놀이시설 사진.
- [V1] [Vincom 운영사 지점 소개](https://vincom.com.vn/vincom-plaza-ngo-quyen/gioi-thieu).
- [V2] [시 관광포털 Vincom Ngô Quyền](https://danangfantasticity.com/en/trung-tam-thuong-mai-vincom-plaza-ngo-quyen) / [건물 사진](https://danangfantasticity.com/wp-content/uploads/2024/10/trung-tam-thuong-mai-vincom-plaza-ngo-quyen-01.jpg).
- [G1] [GO! 공식 다낭 지점](https://sieuthi-go.vn/about-us/en/store/go-da-nang-16.html).
- [P1] [시 관광포털 참조각박물관](https://danangfantasticity.com/en/overview-da-nang-museum-of-cham-sculpture) — 주소·건물 배치.
- [P2] [Duy Tan University 박물관 소개](https://duytan.edu.vn/conferences/home/PointOfInterestDetail/7-museum-in-da-nang/8-6th-conference-on-electricity-electronics-telecommunications-and-automation) — 참조각박물관 구역만 참고. 이 오래된 문서의 별도 다낭박물관 옛 주소는 사용하지 않음. 대학 이미지 직접 다운로드는 TLS 오류여서 새 사진 후보로 사용하지 않음.
- [D1] [Commons 파일 설명·라이선스](https://commons.wikimedia.org/wiki/File:Da_nang_dragon_bridge.jpg).
- [D2] [베트남 공식 관광자료 Dragon Bridge](https://vietnamtourism.vn/en/index.php/tourism/items/2971).
- [D3] [Commons 원본 JPEG](https://upload.wikimedia.org/wikipedia/commons/d/d1/Da_nang_dragon_bridge.jpg).
- [X1] [Xóm Mới Garden 공식 다낭점](https://www.xommoigarden.com/danang) — 222 Trần Phú, 전화 093 195 1004.
- [X2] [다낭 지역 장소자료](https://khamphadanang.vn/dia-diem/xom-moi-garden-da-nang/) — 주소·전화·공간 설명.
- [X3] [Ralf Broskvar의 Da Nang 촬영 갤러리](https://www.photosbyralf.com/Travel/Vietnam/Vietnam-Da-Nang) / [동일 벽화 촬영 이미지](https://photos.smugmug.com/Travel/Vietnam/Vietnam-Da-Nang/i-MPhBfrk/0/K25m2dNRknkPwLBLrsSw6N54w7MvfbhRT6RSZMHpj/M/2026-02-02-021-M.jpg) — 다른 각도에서 같은 벽화·자전거·장식 확인. 이 사진을 앱에 새로 복사하지 않음.
- [Q1] [Foody 해당 지점](https://www.foody.vn/da-nang/my-quang-co-sau-tran-hung-dao) — 397 Trần Hưng Đạo.
- [Q2] [Tabelog 해당 식당](https://tabelog.com/vietnam/A8102/A810201/81002428/) — 주소·전화 보조 대조.
- [B1] [Bà Dưỡng 장소자료](https://visitdanang.travel/vi/banh-xeo-ba-duong).
- [B2] [Waze 해당 가게](https://www.waze.com/live-map/directions/vietnam/da-nang/da-nang/cake?to=place.ChIJO1pFs1cZQjERGFLYXHvmV5o) — 주소·전화 보조 대조.
- [O1] [Mộc 공식 다낭점](https://mocseafood.com/moc-da-nang) / [공식 지점 연락처](https://mocseafood.com/lien-he).
- [O2] [Vinpearl 다낭 해산물 식당 안내](https://vinpearl.com/en/seafood-restaurants-in-da-nang) / [Mộc 입구 사진](https://statics.vinpearl.com/Moc-Quan-Seafood-Restaurant_1723815991.jpg).
- [O3] [Monkeytravel 해당 식당](https://www.monkeytravel.com/vn/en/localguide/localguide_detail.php?place_id=1590) — 다낭 26 Tô Hiến Thành 지점 확인.

## 추가 사진 처리 기록

- 파일: `photos/da_nang/dragon.jpg`
- 제공처: Wikimedia Commons. 설명 페이지의 저작자: **Thangphan**, 라이선스: **CC0 1.0**.
- 사진 설명 페이지의 촬영일: 2018-09-03. 최근 촬영 사진으로 표시하지 않는다.
- 1920×1280 원본을 확인한 후 RGB JPEG로 변환하고, 원본 3:2 비율을 유지하여 1200×800으로 축소. JPEG 품질 85, optimize 및 progressive 사용. 생성형 이미지나 장소 합성은 사용하지 않았다.
- 최종 파일 크기: **165,552 bytes**.
- SHA-256: `d46ec54834f248376ee072e2d7cc5c4d308b1938299d031d09110f74daaa3c75`.
- `places.json`에 이미 `photos/da_nang/dragon.jpg`와 같은 Commons 출처가 등록되어 있어 JSON 수정은 필요하지 않았다.

## 로컬 앱 검증

- 2026-09-17, 실제 `v11-preview/index.html`을 로컬 HTTP 서버에서 실행.
- Chrome + Playwright, 모바일 화면 390×844, 새 임시 브라우저 컨텍스트 사용.
- 16개 사진의 명시적 `photoFile` URL을 모두 GET: **16/16 HTTP 200**, **16/16 image/jpeg**.
- 16곳 모두 브라우저 이미지 디코딩 성공, 양수 naturalWidth/naturalHeight 확인.
- 실제 앱의 일정 카드 → 간편 보기 → 상세정보 버튼 경로로 **각 16개, 총 48개 표시 검사 통과**.
- 모든 currentSrc가 해당 장소의 로컬 photoFile과 일치. 외부 대체사진 사용 **0건**, photo-error 및 깨진 이미지 **0건**, 상대경로 오류 **0건**, JavaScript pageerror **0건**.
- 전체 장소의 카드 검사는 격리된 브라우저 메모리에만 16곳짜리 임시 일정을 구성해 실행했다. save()를 호출하지 않았으며 실제 일정 JSON·사용자 저장 데이터는 수정하지 않았다.
- 새 용다리 사진은 원래 1/12 A안 일정에서 카드·간편 보기·상세사진을 각각 캡처하고 직접 열람했다. 사진·장소명 대응과 세 화면의 실제 표시를 확인했다.
- 외부 요청은 차단하고 service worker는 테스트 컨텍스트에서 비활성화하여 로컬 사진 자체를 검사했다. 이는 사진 표시 테스트이며 온라인 지도·AI·동기화·오프라인 캐시 기능의 회귀시험을 했다는 뜻은 아니다. 해당 기능의 코드는 수정하지 않았다.
- 앱에 표시되는 버전 문구는 기존 `v12.8 preview`지만, 실행·작업 경로는 요청한 `v11-preview`이다.

## 변경 범위

1. `v11-preview/photos/da_nang/dragon.jpg` — 추가.
2. `v11-preview/DA_NANG_PHOTO_AUDIT_2026-09-17.md` — 이 보고서 추가.

다낭의 기존 사진, places.json과 다른 도시의 데이터·사진, 이전 지도 UI, AI/Sync Worker, D1, Supabase, 가족 공유 데이터, service worker/PWA 및 앱 기능은 변경하지 않았다. 이 보고서의 '검증 완료'는 사진 판정이며, 기존 데이터의 verificationStatus 필드를 임의 변경하지 않았다.

## 데이터 기준 및 개별 HTTP 검사

등록 좌표를 그대로 기록했다. 동일성 판정은 위의 주소·사진·시설 단서를 함께 사용했으며, 모든 좌표를 현장에서 측량했거나 출입구 위치까지 검증했다는 의미는 아니다.

| ID | 장소명 | 분류 | 위도, 경도 | photoFile | HTTP | 카드/간편/상세 |
|---|---|---|---|---|---:|---|
| airport | 다낭 국제공항 | 교통 | 16.0429, 108.19839 | `photos/da_nang/airport.jpg` | 200 | 통과/통과/통과 |
| hotel | 뉴 오리엔트 호텔 | 숙소 | 16.08247, 108.221397 | `photos/da_nang/hotel.jpg` | 200 | 통과/통과/통과 |
| station | 다낭역 | 교통 | 16.0716, 108.2093 | `photos/da_nang/station.jpg` | 200 | 통과/통과/통과 |
| museum | 다낭박물관 | 핵심 | 16.07483, 108.22398 | `photos/da_nang/museum.jpg` | 200 | 통과/통과/통과 |
| con | 꼰시장 | 핵심 | 16.068264, 108.21437 | `photos/da_nang/conmarket.jpg` | 200 | 통과/통과/통과 |
| aeon | AEON MALL | 핵심 | 16.06654, 108.20428 | `photos/da_nang/aeon.jpg` | 200 | 통과/통과/통과 |
| night | 선짜 야시장 | 핵심 | 16.061583, 108.231972 | `photos/da_nang/night.jpg` | 200 | 통과/통과/통과 |
| mikazuki | 미카즈키 워터파크 | B안 | 16.0921823, 108.1441563 | `photos/da_nang/mikazuki.jpg` | 200 | 통과/통과/통과 |
| vincom | Vincom Plaza | 보조 | 16.071655, 108.23042 | `photos/da_nang/vincom.jpg` | 200 | 통과/통과/통과 |
| go | GO! Da Nang | 보조 | 16.066607, 108.21326 | `photos/da_nang/go.jpg` | 200 | 통과/통과/통과 |
| cham | 참조각박물관 | 보조 | 16.0601689, 108.2231104 | `photos/da_nang/cham.jpg` | 200 | 통과/통과/통과 |
| dragon | 용다리 | 보조 | 16.06111, 108.22667 | `photos/da_nang/dragon.jpg` | 200 | 통과/통과/통과 |
| xom | Xóm Mới Garden | 음식 | 16.063513, 108.223274 | `photos/da_nang/xom.jpg` | 200 | 통과/통과/통과 |
| miquang | Mỳ Quảng Cô Sáu | 음식 | 16.0662, 108.229656 | `photos/da_nang/miquang.jpg` | 200 | 통과/통과/통과 |
| banhxeo | Bánh Xèo Bà Dưỡng | 음식 | 16.0588, 108.21603 | `photos/da_nang/banhxeo.jpg` | 200 | 통과/통과/통과 |
| moc | MỘC Quán Seafood | 음식 | 16.064027, 108.241542 | `photos/da_nang/moc.jpg` | 200 | 통과/통과/통과 |

## 파일 무결성

기존 15개 로컬 사진을 시작 HEAD의 Git blob과 바이트 단위로 비교하여 전부 동일함을 확인했다. 최종 16개 SHA-256은 모두 서로 다르며, 시각적 대조에서도 다낭 내 서로 다른 장소에 같은 이미지를 재사용한 사례는 발견하지 않았다.

| ID | SHA-256 |
|---|---|
| airport | `96dc0b9a48b667ce690282635897a155288ee3796f3a5b3183685a95c62de2c7` |
| hotel | `4e3b1abb20f96e8275ac5b69851aafcde0921dadd888eaad89ac0e953147ebdf` |
| station | `0c2ad5e20917b06b36cee1b51d38bc67d4780edd3be2bb4fa0d032c69a4d8d2c` |
| museum | `9908c84417d32c15e9c2db3a1e7ef8f7adc82204510fd3912fec1df69bb9e020` |
| con | `308efab09ed1882382f9c677315751dd89ff5d7a6339192d782cffd4f798779f` |
| aeon | `32915558dd8ebdc51d7b4d2b6049b63096a103e05e5c03473b7ec51074b0ee9a` |
| night | `e11cc796adc5f7c0d3d28e626fa47f46fcb6d5266199b5c0c85a9788bf2b970d` |
| mikazuki | `c550233955e0042dceb53259754a877e684a1284bd15e072ce80c725def17b5b` |
| vincom | `e0788377a623ba18621dee8e1a8d0ff316eadaa267b7d34a9e8410cdb121940b` |
| go | `7f0290c908bc945dac21b6f5c25eb4eb12bbef3aa4d608fe8af1fcb7096bf2db` |
| cham | `6516f0748328423e6e1522666e0e446a27c1d5759f56c6213394e7db0bfb3d3d` |
| dragon | `d46ec54834f248376ee072e2d7cc5c4d308b1938299d031d09110f74daaa3c75` |
| xom | `6192e8ccdc589794b19eecfb0e2d0cb0098096ba1d011ff4dc2525584eb8c887` |
| miquang | `9a3e4db965e17c5f1affbf57fb073a2f3a535598e1df1b5aad32f89b384d3ce1` |
| banhxeo | `1583f80eb8f7acb91b40ecd2362b40be27ffc6c1d7f0a472a498c1b19c43e36e` |
| moc | `73e0aeebb95226f3ca8afc1465266f1626583311917b2ee742411039ebf5ff67` |
