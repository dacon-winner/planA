# Vendor 이미지 시딩 가이드

## 📁 이미지 현황

- **venue**: 20개 (weddingHall01~20)
- **studio**: 23개 (studio01~23)
- **dress**: 19개 (dress01~19)
- **makeup**: 17개 (makeup01~17)

## 🚀 실행 방법

### 1. Backend 서버 시작 (Static 파일 서빙)

```bash
cd BE
npm run start:dev
```

### 2. 이미지 접근 테스트

브라우저에서 확인:

```
http://localhost:3000/static/vendor-images/studio/studio01.jpg
http://localhost:3000/static/vendor-images/dress/dress01.jpg
http://localhost:3000/static/vendor-images/makeup/makeup01.jpg
http://localhost:3000/static/vendor-images/venue/weddingHall01.png
```

### 3. SQL 스크립트 실행

#### 방법 A: psql 명령어 사용

```bash
# .env 파일의 DB 정보 사용
psql -h localhost -U postgres -d plana -f docs/database/DEFAULT_DATAS/SEED_VENDOR_IMAGES.sql
```

#### 방법 B: TypeORM CLI 사용

```bash
# DB 연결 후 SQL 실행
npm run typeorm query "$(cat docs/database/DEFAULT_DATAS/SEED_VENDOR_IMAGES.sql)"
```

#### 방법 C: DBeaver 등 DB 클라이언트 사용

1. `docs/database/DEFAULT_DATAS/SEED_VENDOR_IMAGES.sql` 파일 열기
2. 전체 선택 후 실행

## 🔍 동작 원리

### 순환 할당 (Round-robin)

각 카테고리의 업체들에게 이미지를 순환하면서 할당합니다.

**예시 (STUDIO - 23개 이미지):**

- 업체 1번 → studio01.jpg (썸네일 + 상세 이미지 3개: 01~03)
- 업체 2번 → studio02.jpg (썸네일 + 상세 이미지 3개: 02~04)
- 업체 3번 → studio03.png (썸네일 + 상세 이미지 3개: 03~05)
- ...
- 업체 23번 → studio23.png (썸네일 + 상세 이미지 3개: 23, 01~02) ← 순환
- 업체 24번 → studio01.jpg (다시 처음부터)

### 일관성 유지

- `thumbnail_url`: 첫 번째 이미지로 설정
- `vendor_image`: 해당 이미지부터 시작해서 3개 연속 이미지 할당 (thumbnail 포함)
- `sort_order`: 0~2로 순서 지정

## ✅ 실행 결과 확인

SQL 스크립트 마지막에 자동으로 다음을 출력합니다:

```
category | vendor_count | unique_thumbnails | total_images
---------+--------------+-------------------+-------------
DRESS    | 59           | 59                | 177
MAKEUP   | 30           | 30                | 90
STUDIO   | 82           | 82                | 246
VENUE    | 40           | 40                | 120
```

(각 업체당 3개 이미지 = 총 633개)

## 🔧 문제 해결

### Static 파일이 안 보이는 경우

```bash
# 1. BE 서버 재시작
npm run start:dev

# 2. 이미지 파일 권한 확인
ls -la public/vendor-images/studio/

# 3. 브라우저에서 직접 접근 테스트
curl http://localhost:3000/static/vendor-images/studio/studio01.jpg
```

### SQL 실행 오류

```sql
-- 기존 이미지 데이터만 삭제하고 다시 실행
DELETE FROM vendor_image;
DELETE FROM vendor WHERE thumbnail_url IS NOT NULL;
```

## 🎯 해커톤 이후 마이그레이션

나중에 Cloudflare R2나 S3로 옮길 때:

```sql
-- URL만 일괄 변경
UPDATE vendor
SET thumbnail_url = REPLACE(
  thumbnail_url,
  'http://localhost:3000/static/vendor-images',
  'https://your-cdn.com/vendor-images'
);

UPDATE vendor_image
SET image_url = REPLACE(
  image_url,
  'http://localhost:3000/static/vendor-images',
  'https://your-cdn.com/vendor-images'
);
```
