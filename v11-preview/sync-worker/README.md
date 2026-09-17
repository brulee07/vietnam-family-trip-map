# Vietnam Family Trip Sync Worker v12.8

가족 일정 + 메모 사진 공유용 Cloudflare Worker입니다. D1은 일정 상태를, R2는 메모 사진을 저장합니다.

## 기존 v12.1 Worker에서 업그레이드
1. Cloudflare Dashboard → R2에서 `vietnam-family-trip-photos` 버킷을 만듭니다.
2. 기존 `vietnam-family-trip-sync` Worker → Settings → Bindings → Add binding → R2 bucket.
3. Variable name은 반드시 `PHOTOS`, bucket은 위에서 만든 버킷을 선택합니다.
4. `worker.js`를 이 폴더 버전으로 교체하고 Deploy 합니다.
5. D1은 기존 `DB` binding을 그대로 유지합니다. 추가 SQL migration은 없습니다.
6. `/health`를 열어 `version: "12.8"`, `photoSync: true`, `maxDevices: 9`를 확인합니다.

## 사진 API
- `POST /photo/upload` : 인증된 가족 공유방에 JPEG 업로드
- `GET /photo/view/{room}/{photoId}` : R2 사진 표시
- `POST /photo/delete` : 인증된 가족 공유방 사진 삭제

사진은 앱에서 긴 변 960px 이하, 대략 160KB 목표로 압축한 뒤 업로드합니다. R2 원본은 공개 버킷으로 만들 필요가 없습니다. Worker가 읽어서 전달합니다.
