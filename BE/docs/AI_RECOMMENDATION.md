# AI 추천 시스템 구현 가이드

> **작성일**: 2025.11.29  
> **최종 수정일**: 2025.12.01  
> **버전**: 1.1.0

---

## 📋 개요

사용자가 `users_info`를 생성할 때 AI가 자동으로 **스드메베(스튜디오, 드레스, 메이크업, 웨딩홀) 조합**을 추천하고, 추천 결과를 기반으로 플랜을 자동 생성하는 시스템입니다.

### 주요 특징

- **RAG(Retrieval-Augmented Generation) 패턴 적용**: 2단계 필터링으로 비용 최적화
- **OpenAI GPT-4o-mini 사용**: 비용 효율적인 모델
- **4개 카테고리 추천**: STUDIO, DRESS, MAKEUP, VENUE
- **웨딩홀 가격 정보 포함**: 식대, 대관료 등 상세 정보 기반 추천
- **에러 안전성**: AI 추천 실패 시에도 users_info는 정상 생성

---

## 🏗️ 아키텍처

### 추천 프로세스

```
[사용자] 
   ↓ POST /api/v1/users-info
[UsersInfoController]
   ↓
[UsersInfoService.create()]
   ↓
   ├─→ 1. users_info 생성 및 저장
   │
   ├─→ 2. AiService.recommendVendorCombination()
   │      ↓
   │      ├─→ 2-1. DB에서 후보 업체 추출 (SQL 필터링)
   │      │        - 지역, 예산 기반 필터링
   │      │        - 각 카테고리별 최대 10개
   │      │
   │      ├─→ 2-2. OpenAI API 호출
   │      │        - 프롬프트 생성
   │      │        - GPT-4o-mini로 최적 조합 선택
   │      │
   │      └─→ 2-3. AI 로그 저장 (비용 추적)
   │
   └─→ 3. PlansService.createFromRecommendations()
          - Plan 생성 (is_ai_generated=true)
          - PlanItem 생성 (source='AI_RECOMMEND')
```

### 비용 최적화 전략

```
2,000개 업체
   ↓ [1차 SQL 필터링]
   ↓ - 지역: preferred_region
   ↓ - 예산: budget_limit
   ↓ - 카테고리별 최대 10개
40개 후보 (각 카테고리별 10개)
   ↓ [2차 LLM 추천]
   ↓ - GPT-4o-mini 사용
   ↓ - JSON 응답 형식
   ↓ - Temperature: 0.3 (일관성 향상)
4개 추천 (스튜디오, 드레스, 메이크업, 웨딩홀)

💰 토큰 사용량: 99% 절감 (약 100배 비용 절감)
```

---

## 📁 파일 구조

```
src/
├── modules/
│   ├── ai/
│   │   ├── ai.module.ts              # AI 모듈
│   │   ├── ai.service.ts             # AI 추천 서비스
│   │   ├── interfaces/
│   │   │   ├── recommendation.interface.ts  # 추천 인터페이스
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── plans/
│   │   ├── plans.module.ts           # 플랜 모듈
│   │   ├── plans.service.ts          # 플랜 서비스
│   │   └── index.ts
│   │
│   └── users_info/
│       ├── users-info.module.ts      # UsersInfo 모듈 (통합)
│       ├── users-info.service.ts     # AI 추천 통합됨
│       └── users-info.controller.ts
│
└── entities/
    ├── ai-resource.entity.ts         # AI 추천용 리소스
    ├── ai-log.entity.ts              # AI 요청 로그
    ├── plan.entity.ts
    └── plan-item.entity.ts
```

---

## 🔧 환경변수 설정

`.env` 파일에 다음 환경변수를 추가하세요:

```bash
# OpenAI API 키 (필수)
OPENAI_API_KEY=sk-your-openai-api-key-here
```

### OpenAI API 키 발급 방법

1. [OpenAI Platform](https://platform.openai.com/) 접속
2. 로그인 후 **API keys** 메뉴 선택
3. **Create new secret key** 클릭
4. 생성된 키를 복사하여 `.env` 파일에 저장

**⚠️ 주의사항:**
- API 키는 절대 코드에 하드코딩하지 마세요
- `.env` 파일은 `.gitignore`에 포함되어 있어야 합니다
- 프로덕션 환경에서는 별도의 키를 사용하세요

---

## 📊 데이터 모델

### VendorCombinationRecommendation

```typescript
interface VendorCombinationRecommendation {
  studio: VendorRecommendation | null;   // 스튜디오 추천
  dress: VendorRecommendation | null;    // 드레스 추천
  makeup: VendorRecommendation | null;   // 메이크업 추천
  venue: VendorRecommendation | null;    // 웨딩홀 추천 ✨
  overall_reason?: string;               // 전체 추천 이유
}

interface VendorRecommendation {
  vendor_id: string;                     // 업체 ID
  category: string;                      // 카테고리 (STUDIO, DRESS, MAKEUP, VENUE)
  name: string;                          // 업체명
  selection_reason: string;              // 추천 이유
  confidence_score?: number;             // 신뢰도 (0-1)
}

// 웨딩홀 상세 정보 (VENUE 카테고리만)
interface VenueDetail {
  hall_type: string | null;              // 홀 타입 (예: "그랜드볼룸")
  meal_type: string | null;              // 식사 타입 (예: "양식")
  min_guarantee: number;                 // 최소 보증 인원
  meal_cost: number;                     // 식대 (1인당)
  rental_fee: number;                    // 대관료
}
```

---

## 🚀 API 사용 예시

### 요청

```bash
POST /api/v1/users-info
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "wedding_date": "2026-05-15",
  "preferred_region": "강남구",
  "budget_limit": 50000000  # 웨딩홀 포함 현실적인 예산
}
```

### 응답

```json
{
  "success": true,
  "data": {
    "usersInfo": {
      "id": "uuid",
      "user_id": "uuid",
      "is_main_plan": true,
      "wedding_date": "2026-05-15",
      "preferred_region": "강남구",
      "budget_limit": 10000000,
      "created_at": "2025-11-29T10:00:00.000Z"
    },
    "plan": {
      "id": "uuid",
      "user_id": "uuid",
      "users_info_id": "uuid",
      "title": "AI 추천 플랜",
      "is_ai_generated": true,
      "plan_items": [
        {
          "id": "uuid",
          "vendor_id": "uuid",
          "source": "AI_RECOMMEND",
          "selection_reason": "강남 지역의 인기 스튜디오로, 자연광 촬영에 특화되어 있습니다.",
          "order_index": 0,
          "vendor": {
            "id": "uuid",
            "name": "A 스튜디오",
            "category": "STUDIO",
            "region": "강남구"
          }
        },
        {
          "id": "uuid",
          "vendor_id": "uuid",
          "source": "AI_RECOMMEND",
          "selection_reason": "예산 내에서 최고의 퀄리티를 제공하는 드레스샵입니다.",
          "order_index": 1,
          "vendor": {
            "id": "uuid",
            "name": "B 드레스",
            "category": "DRESS",
            "region": "강남구"
          }
        },
        {
          "id": "uuid",
          "vendor_id": "uuid",
          "source": "AI_RECOMMEND",
          "selection_reason": "웨딩 메이크업 전문가로, 자연스러운 스타일이 특징입니다.",
          "order_index": 2,
          "vendor": {
            "id": "uuid",
            "name": "C 메이크업",
            "category": "MAKEUP",
            "region": "강남구"
          }
        },
        {
          "id": "uuid",
          "vendor_id": "uuid",
          "source": "AI_RECOMMEND",
          "selection_reason": "식대가 합리적이며, 대관료가 예산 내에서 적합합니다.",
          "order_index": 3,
          "vendor": {
            "id": "uuid",
            "name": "D 웨딩홀",
            "category": "VENUE",
            "region": "강남구",
            "venue_detail": {
              "hall_type": "그랜드볼룸",
              "meal_type": "양식",
              "min_guarantee": 200,
              "meal_cost": 99000,
              "rental_fee": 10000000
            }
          }
        }
      ],
      "created_at": "2025-12-01T10:00:00.000Z"
    }
  },
  "timestamp": "2025-12-01T10:00:00.000Z"
}
```

---

## 🔍 AI 리소스 데이터 준비

AI 추천이 작동하려면 `ai_resource` 테이블에 데이터가 있어야 합니다.

### 데이터 구조 예시

```sql
INSERT INTO ai_resource (vendor_id, category, name, content, metadata) VALUES
(
  'vendor-uuid-1',
  'STUDIO',
  'A 스튜디오',
  '강남역 인근의 모던한 스튜디오입니다. 자연광 촬영에 최적화된 공간으로, 다양한 컨셉 촬영이 가능합니다. 평균 가격대는 50-80만원이며, 가성비가 뛰어납니다.',
  '{
    "region": "강남구",
    "price_min": 500000,
    "price_max": 800000,
    "tags": ["자연광", "모던", "가성비"]
  }'
);
```

### 메타데이터 필드

- `region`: 지역 (예: "강남구", "송파구")
- `price_min`: 최소 가격
- `price_max`: 최대 가격
- `tags`: 태그 배열 (선택)

---

## 🧪 테스트 방법

### 1. AI 리소스 데이터 확인

```sql
SELECT COUNT(*) FROM ai_resource WHERE category IN ('STUDIO', 'DRESS', 'MAKEUP');
```

최소 각 카테고리별 1개 이상의 데이터가 있어야 합니다.

### 2. API 테스트

```bash
# 1. 로그인하여 토큰 획득
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# 2. users-info 생성 (AI 추천 자동 실행)
curl -X POST http://localhost:3000/api/v1/users-info \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {access_token}" \
  -d '{
    "wedding_date": "2026-05-15",
    "preferred_region": "강남구",
    "budget_limit": 10000000
  }'
```

### 3. AI 로그 확인

```sql
SELECT * FROM ai_log ORDER BY created_at DESC LIMIT 1;
```

토큰 사용량 및 응답 결과를 확인할 수 있습니다.

---

## 🔮 향후 확장 계획

### 1. 웨딩홀(VENUE) 추가

현재는 스드메(스튜디오, 드레스, 메이크업)만 추천하지만, 향후 웨딩홀을 추가할 수 있습니다:

```typescript
// ai.service.ts의 fetchCandidates 메서드
const categories = ['VENUE', 'STUDIO', 'DRESS', 'MAKEUP'] as const;
```

### 2. 벡터 검색 (pgvector)

시맨틱 검색을 위해 pgvector 확장을 사용할 수 있습니다:

```sql
-- pgvector 설치
CREATE EXTENSION IF NOT EXISTS vector;

-- embedding 컬럼 추가
ALTER TABLE ai_resource ADD COLUMN embedding vector(1536);

-- 벡터 인덱스 생성
CREATE INDEX ON ai_resource USING ivfflat (embedding vector_cosine_ops);
```

### 3. 추천 알고리즘 개선

- 사용자 선호도 학습
- 협업 필터링
- A/B 테스트

---

## 📝 참고 문서

- [OpenAI API 문서](https://platform.openai.com/docs/api-reference)
- [DATABASE.md](./database/DATABASE.md)
- [API_DESIGN.md](./api/API_DESIGN.md)

---

**문서 버전**: 1.0.0  
**최종 수정일**: 2025.11.29

