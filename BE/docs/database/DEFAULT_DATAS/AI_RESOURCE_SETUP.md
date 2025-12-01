# AI Resource 테이블 설정 가이드

> AI 추천 시스템을 위한 `ai_resource` 테이블 초기화 문서

**작성일**: 2025.12.01  
**버전**: 1.0.0

---

## 📋 개요

`ai_resource` 테이블은 AI가 스드메(스튜디오, 드레스, 메이크업) 업체를 추천할 때 사용하는 데이터를 저장합니다.

이 테이블은 `vendor` 테이블의 데이터를 기반으로 자동 생성되며, AI가 쉽게 읽고 이해할 수 있는 텍스트 형식으로 변환됩니다.

---

## 🎯 1번 작업 완료: ai_resource 테이블 채우기

### ✅ 실행 완료

```bash
cd BE
psql -h localhost -U yunjae -d plana -f docs/database/DEFAULT_DATAS/SEED_AI_RESOURCES.sql
```

### 📊 생성된 데이터

| 카테고리 | 개수 | 설명 |
|---------|------|------|
| **STUDIO** | 82건 | 스튜디오 업체 |
| **DRESS** | 59건 | 드레스 업체 |
| **MAKEUP** | 30건 | 메이크업 업체 |
| **총계** | **171건** | 전체 AI 리소스 |

---

## 🧪 테스트 결과

### API 호출 테스트

```bash
curl -X POST http://localhost:3000/api/v1/users-info \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "wedding_date": "2026-05-15",
    "preferred_region": "서울",
    "budget_limit": 10000000
  }'
```

### ✅ 성공 응답

```json
{
  "success": true,
  "data": {
    "id": "aeca1549-522c-49ae-9460-cbb5cc4862ab",
    "title": "AI 추천 플랜",
    "is_ai_generated": true,
    "plan_items": [
      {
        "vendor": {
          "name": "구호스튜디오",
          "category": "STUDIO"
        },
        "selection_reason": "구호스튜디오는 가격이 1,140,000원으로 예산 내에 포함되며..."
      },
      {
        "vendor": {
          "name": "니콜스포사",
          "category": "DRESS"
        },
        "selection_reason": "니콜스포사는 가격이 1,320,000원으로 예산에 적합하며..."
      }
    ]
  }
}
```

---

## ⚠️ 알려진 이슈

### 지역 데이터 불일치

**문제**: 메이크업 업체가 추천되지 않을 수 있음

**원인**:
- STUDIO, DRESS: `region = '서울'`
- MAKEUP: `region = '강남/청담'`, `'강남/논현'` 등 세부 지역명

**현재 AI 서비스의 지역 필터링**:
```typescript
// 정확히 일치하는 지역만 필터링
queryBuilder.andWhere(
  "ai_resource.metadata->>'region' = :region OR ai_resource.metadata->>'region' IS NULL",
  { region: request.preferred_region }
);
```

**해결 방법** (2번 작업에서 처리):
1. AI 서비스 로직 수정: 부분 일치 지원 (`LIKE %서울%`)
2. 또는 vendor 테이블의 region 데이터 정규화

---

## 📂 생성된 파일

### SEED_AI_RESOURCES.sql

```sql
-- ai_resource 테이블 초기화 및 데이터 생성
-- vendor 테이블에서 스드메 업체 데이터를 변환
-- 각 업체의 정보를 AI가 읽을 수 있는 텍스트로 변환
```

**특징**:
- ✅ vendor 테이블에서 자동 생성
- ✅ 가격 범위 자동 계산 (MIN/MAX)
- ✅ AI가 읽기 쉬운 텍스트 형식
- ✅ metadata에 구조화된 데이터 포함
- ✅ TRUNCATE로 안전한 재실행 가능

---

## 🔄 데이터 업데이트

vendor 테이블에 새로운 업체가 추가되면, 다시 실행하여 ai_resource를 업데이트할 수 있습니다:

```bash
# 기존 데이터 삭제 후 재생성
psql -h localhost -U yunjae -d plana -f docs/database/DEFAULT_DATAS/SEED_AI_RESOURCES.sql
```

---

## 📖 ai_resource 데이터 구조

### content (텍스트)

AI가 읽는 자연어 텍스트:

```
업체명: 구호스튜디오
카테고리: 스튜디오
주소: 서울 성동구 아차산로15길 47-38 1층
지역: 서울
전화번호: 0507-1333-5282
가격대: 1,140,000원 ~ 1,140,000원
```

### metadata (JSON)

필터링 및 정렬에 사용되는 구조화된 데이터:

```json
{
  "region": "서울",
  "address": "서울 성동구 아차산로15길 47-38 1층",
  "phone": "0507-1333-5282",
  "price_min": 1140000,
  "price_max": 1140000,
  "latitude": 37.5474251,
  "longitude": 127.0631666,
  "thumbnail_url": "http://localhost:3000/static/vendor-images/studio/studio01.jpg"
}
```

---

## 🎯 다음 단계: 2번 작업

1. **웨딩홀(VENUE) 추가**: AI가 웨딩홀도 추천하도록 확장
2. **지역 필터링 개선**: 부분 일치 지원
3. **테스트 코드 수정**: 지역명 통일

---

## 🔗 관련 문서

- [DATABASE.md](../DATABASE.md) - 전체 데이터베이스 스키마
- [README.md](./README.md) - 초기 데이터 시딩 가이드
- [AI_RECOMMENDATION.md](../../AI_RECOMMENDATION.md) - AI 추천 시스템 문서

---

**작성자**: AI Assistant  
**검토자**: 이윤재

