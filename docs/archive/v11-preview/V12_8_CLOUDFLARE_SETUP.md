# v12.8 Cloudflare R2 설정

## 1. R2 버킷 생성
Cloudflare Dashboard → R2 Object Storage → Create bucket

- Bucket name: `vietnam-family-trip-photos`
- Location: Automatic 권장

버킷은 Public으로 만들 필요가 없습니다.

## 2. 기존 Sync Worker에 R2 binding 추가
Workers & Pages → `vietnam-family-trip-sync` → Settings → Bindings → Add binding → R2 bucket

- Variable name: `PHOTOS`
- R2 bucket: `vietnam-family-trip-photos`

기존 D1 binding `DB`는 그대로 유지합니다.

## 3. Worker 코드 교체
`sync-worker/worker.js` 전체를 기존 Sync Worker 코드와 교체하고 Deploy합니다.

D1 SQL migration은 필요 없습니다.

## 4. 정상 확인
브라우저에서 아래 주소를 확인합니다.

`https://vietnam-family-trip-sync.brulee07.workers.dev/health`

정상 예시:

```json
{
  "ok": true,
  "service": "vietnam-family-trip-sync",
  "version": "12.8",
  "maxDevices": 9,
  "photoSync": true
}
```

`photoSync: false`이면 R2 binding `PHOTOS`가 연결되지 않은 것입니다.

## 5. 앱 배포
v12.8 패키지 내용을 GitHub Pages의 기존 `v11-preview` 폴더에 덮어쓰고 Commit / Push합니다.

추천 Summary:

`v12.8 preview - sync memo photos with family via R2`

## 6. 두 휴대폰 테스트
1. A폰과 B폰이 같은 가족 공유방에 연결되어 있는지 확인
2. A폰에서 일정 → 메모 → 사진 추가 → 저장
3. B폰에서 도구 → 가족 일정 동기화 → 지금 동기화
4. 같은 날짜 메모 사진이 나타나는지 확인
5. A폰에서 사진 교체 후 B폰에서 다시 동기화
6. A폰에서 사진 삭제 후 B폰에서도 사라지는지 확인

## 저장 구조
- D1: 일정, 메모 텍스트, 사진 URL/ID 등 작은 메타데이터
- R2: 실제 JPEG 파일
- R2 버킷은 비공개 유지
- 사진 표시 요청은 Worker가 R2에서 읽어서 전달
