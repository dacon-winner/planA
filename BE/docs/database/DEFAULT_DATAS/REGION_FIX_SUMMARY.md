# Vendor Region 수정 및 AI Resource 재생성 요약

> vendor 테이블의 region을 구 단위로 수정하여 AI 추천 정확도 개선

**작성일**: 2025.12.01  
**작업자**: AI Assistant + 이윤재

---

## 🎯 문제 상황

### 기존 문제

```
❌ region = '서울'           (181개 업체 - 너무 광범위)
❌ region = '강남/청담'      (13개 업체 - 잘못된 형식)
❌ region = '강남/신사'      (4개 업체 - 잘못된 형식)
```

**문제점**:
1. 서비스가 **서울시만 대상**이므로 구 단위가 중요함
2. 사용자가 "강남구"로 검색하면 매칭되지 않음
3. AI 추천이 제대로 작동하지 않음 (메이크업 미추천)

---

## ✅ 해결 방법

### 1단계: vendor 테이블 region 수정

**스크립트**: `FIX_VENDOR_REGIONS.sql`

```sql
-- address에서 구 단위 자동 추출
UPDATE vendor
SET region = (
    SELECT 
        CASE
            WHEN address ~ '^서울\s+\S+구' THEN
                (regexp_match(address, '^서울\s+(\S+구)'))[1]
            -- ... 기타 패턴
        END
)
```

**실행**:
```bash
psql -h localhost -U yunjae -d plana -f docs/database/DEFAULT_DATAS/FIX_VENDOR_REGIONS.sql
```

**결과**:
```
✅ region = '강남구'    (167개)
✅ region = '송파구'    (5개)
✅ region = '서초구'    (4개)
✅ region = '마포구'    (4개)
✅ region = '중구'      (4개)
... 등등

📊 전체 211개 중 204개(96.7%)가 구 단위로 변경됨
```

### 2단계: ai_resource 테이블 재생성

```bash
psql -h localhost -U yunjae -d plana -f docs/database/DEFAULT_DATAS/SEED_AI_RESOURCES.sql
```

---

## 🧪 테스트 결과

### Before (서울로 검색)

```json
{
  "plan_items": [
    { "vendor": { "name": "구호스튜디오", "category": "STUDIO" } },
    { "vendor": { "name": "니콜스포사", "category": "DRESS" } }
    // ❌ 메이크업 누락
  ]
}
```

### After (강남구로 검색)

```json
{
  "plan_items": [
    { 
      "vendor": { "name": "디하우스스튜디오", "category": "STUDIO", "region": "강남구" },
      "selection_reason": "가격대가 1,570,000원으로 예산에 적합하며, 강남구에 위치..."
    },
    { 
      "vendor": { "name": "모네뜨아르", "category": "DRESS", "region": "강남구" },
      "selection_reason": "가격대가 1,050,000원으로 예산에 적합하며, 강남구에 위치..."
    },
    { 
      "vendor": { "name": "고바이씬", "category": "MAKEUP", "region": "강남구" },
      "selection_reason": "가격대가 660,000원으로 예산에 적합하며, 강남구에 위치..."
    }
  ]
}
```

✅ **스튜디오, 드레스, 메이크업 모두 정상 추천!**

---

## 📂 생성된 파일

```
BE/docs/database/DEFAULT_DATAS/
├── FIX_VENDOR_REGIONS.sql       # 🆕 vendor region 수정 스크립트
├── SEED_AI_RESOURCES.sql        # ✅ AI 리소스 생성 (기존 파일)
├── AI_RESOURCE_SETUP.md         # ✅ 설정 가이드
└── REGION_FIX_SUMMARY.md        # 🆕 이 파일 (수정 요약)
```

---

## 🔧 수정된 데이터 통계

| 구분 | Before | After | 변경 |
|------|--------|-------|------|
| **서울** | 181개 | 0개 | ✅ 구 단위로 분리 |
| **강남구** | 0개 | 167개 | ✅ 신규 |
| **송파구** | 0개 | 5개 | ✅ 신규 |
| **서초구** | 0개 | 4개 | ✅ 신규 |
| **마포구** | 1개 | 4개 | ✅ 증가 |
| **중구** | 1개 | 4개 | ✅ 증가 |
| **강남/청담** | 13개 | 0개 | ✅ 강남구로 통합 |
| **강남/신사** | 4개 | 0개 | ✅ 강남구로 통합 |
| **구 단위 비율** | 0% | **96.7%** | ✅ |

---

## 🎯 영향 범위

### 1. Database

- ✅ `vendor` 테이블의 `region` 컬럼 업데이트 (211개 행)
- ✅ `ai_resource` 테이블 재생성 (171개 행)

### 2. API

- ✅ `/api/v1/users-info` (AI 추천) 정확도 대폭 향상
- ✅ 사용자가 구 단위로 검색 시 정확한 결과 반환

### 3. Frontend

- ⚠️ 사용자 입력 폼에서 **구 단위** 입력 권장
  - 예: "강남구", "서초구", "마포구" 등

---

## 📝 주의사항

### 신규 Vendor 추가 시

앞으로 새로운 vendor를 추가할 때는 **반드시 구 단위로 region 설정**:

```sql
-- ✅ 올바른 예시
INSERT INTO vendor (name, address, region, ...)
VALUES ('새업체', '서울 강남구 테헤란로 123', '강남구', ...);

-- ❌ 잘못된 예시
INSERT INTO vendor (name, address, region, ...)
VALUES ('새업체', '서울 강남구 테헤란로 123', '서울', ...);
```

### AI Resource 업데이트

Vendor 데이터가 변경되면, ai_resource도 재생성:

```bash
psql -h localhost -U yunjae -d plana -f docs/database/DEFAULT_DATAS/SEED_AI_RESOURCES.sql
```

---

## 🚀 다음 단계: 2번 작업

이제 1번 작업이 완료되었으므로, 2번 작업을 진행할 수 있습니다:

### 2번 작업: 웨딩홀(VENUE) AI 추천 추가

1. **VENUE 데이터를 ai_resource에 추가**
   - `SEED_AI_RESOURCES.sql` 수정
   - VENUE 카테고리 포함하도록 확장

2. **AI 서비스 로직 업데이트**
   - `ai.service.ts` 수정
   - VENUE 추천 로직 추가
   - 응답 인터페이스에 venue 필드 추가

3. **Plans 서비스 업데이트**
   - 4개 카테고리 (STUDIO, DRESS, MAKEUP, **VENUE**) 처리

---

## 🔗 관련 문서

- [AI_RESOURCE_SETUP.md](./AI_RESOURCE_SETUP.md) - AI 리소스 설정 가이드
- [README.md](./README.md) - 초기 데이터 시딩 가이드
- [DATABASE.md](../DATABASE.md) - 전체 데이터베이스 스키마

---

**완료일**: 2025.12.01  
**검증**: AI 추천 API 테스트 완료 ✅

