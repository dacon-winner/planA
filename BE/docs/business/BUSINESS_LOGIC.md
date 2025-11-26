# 비즈니스 로직 문서

> **작성일**: 2025.11.26  
> **작성자**: 김동언  
> **버전**: 1.0.0

---

## 📋 목차

1. [RAG 기반 AI 추천 시스템](#1-rag-기반-ai-추천-시스템)
2. [플랜 생성 및 관리](#2-플랜-생성-및-관리)
3. [예약 프로세스](#3-예약-프로세스)
4. [리뷰 시스템](#4-리뷰-시스템)
5. [정책 정보 큐레이션](#5-정책-정보-큐레이션)

---

## 1. RAG 기반 AI 추천 시스템

### 1.1 개요

**RAG (Retrieval-Augmented Generation)**는 대규모 데이터에서 관련 정보를 먼저 검색한 후, 해당 정보를 컨텍스트로 LLM에 전달하여 더 정확한 응답을 생성하는 기술입니다.

**PlanA의 RAG 시스템 목표:**
- **비용 절감**: API 토큰 사용량 99% 감소 (100배 절감)
- **응답 속도**: DB 필터링으로 LLM 처리 시간 단축
- **정확도 향상**: 컨텍스트를 한정하여 환각(hallucination) 최소화

### 1.2 아키텍처

```
┌──────────────────────────────────────────────────────────────┐
│                     사용자 요청                               │
│  - category: "STUDIO"                                        │
│  - budget: 1,000,000원                                       │
│  - region: "강남구"                                           │
│  - style: "모던, 자연광"                                       │
└──────────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────────┐
│              1차 필터링 (Database Level)                      │
│                                                              │
│  SELECT * FROM ai_resource                                   │
│  WHERE category = 'STUDIO'                                   │
│    AND metadata->>'region' = '강남구'                         │
│    AND (metadata->>'price_min')::int <= 1000000             │
│  LIMIT 20;                                                   │
│                                                              │
│  결과: 2,000개 → 20개로 압축                                  │
└──────────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────────┐
│              2차 추천 (LLM Level)                             │
│                                                              │
│  컨텍스트 주입:                                               │
│  "다음은 강남구의 스튜디오 20곳입니다.                         │
│   1. A스튜디오: 모던한 인테리어, 50-80만원, 자연광...         │
│   2. B스튜디오: 빈티지 감성, 60-90만원, 실내조명...           │
│   ...                                                        │
│   20. T스튜디오: ..."                                        │
│                                                              │
│  프롬프트:                                                    │
│  "사용자는 '모던', '자연광' 스타일을 선호합니다.               │
│   예산은 100만원입니다. 가장 적합한 4곳을 추천하고             │
│   각각의 추천 이유를 JSON으로 반환하세요."                     │
│                                                              │
│  결과: 20개 → 4개 최종 추천                                   │
└──────────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────────┐
│              3단계: 로깅 (ai_log 테이블)                      │
│                                                              │
│  - user_id                                                   │
│  - request_prompt (전체 프롬프트)                             │
│  - response_result (추천 결과 JSON)                           │
│  - input_tokens: 500                                         │
│  - output_tokens: 200                                        │
│  - total_tokens: 700                                         │
└──────────────────────────────────────────────────────────────┘
                           ↓
                   최종 추천 결과 반환
```

### 1.3 구현 상세

#### 1단계: DB 필터링 (TypeORM)

```typescript
async findCandidates(
  category: string,
  region: string,
  budget: number,
): Promise<AiResource[]> {
  return await this.aiResourceRepository
    .createQueryBuilder('resource')
    .where('resource.category = :category', { category })
    .andWhere("resource.metadata->>'region' = :region", { region })
    .andWhere("(resource.metadata->>'price_min')::int <= :budget", { budget })
    .orderBy('RANDOM()') // 다양성 확보
    .limit(20)
    .getMany();
}
```

#### 2단계: LLM 추천 (OpenAI)

```typescript
async generateRecommendations(
  candidates: AiResource[],
  user: User,
  preferences: string[],
): Promise<RecommendationResult> {
  // 컨텍스트 생성
  const context = candidates
    .map((c, i) => `${i + 1}. ${c.content}`)
    .join('\n\n');

  // 프롬프트 생성
  const prompt = `
다음은 ${user.preferred_region} 지역의 웨딩 업체 정보입니다.

${context}

사용자 정보:
- 예산: ${user.budget_limit}원
- 선호 스타일: ${preferences.join(', ')}
- 결혼 날짜: ${user.wedding_date}

위 정보를 바탕으로 가장 적합한 4곳을 추천하고, 각 추천 이유를 설명해주세요.

응답 형식 (JSON):
[
  {
    "id": "리소스 ID",
    "name": "업체명",
    "reason": "추천 이유 (50자 이내)"
  }
]
`;

  // OpenAI API 호출
  const response = await this.openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 500,
  });

  // 응답 파싱
  const recommendations = JSON.parse(
    response.choices[0].message.content,
  );

  // 로깅
  await this.aiLogRepository.save({
    user_id: user.id,
    request_prompt: prompt,
    response_result: recommendations,
    model_name: 'gpt-4o-mini',
    input_tokens: response.usage.prompt_tokens,
    output_tokens: response.usage.completion_tokens,
    total_tokens: response.usage.total_tokens,
  });

  return recommendations;
}
```

### 1.4 비용 절감 효과

| 항목 | 기존 방식 | RAG 방식 | 절감률 |
|------|----------|---------|--------|
| 입력 데이터 | 전체 2,000개 업체 | 필터링된 20개 업체 | - |
| 예상 토큰 수 | ~50,000 tokens | ~500 tokens | **99%** |
| 비용 (GPT-4o-mini) | $0.0075/요청 | $0.000075/요청 | **100배** |
| 월간 비용 (1만 요청) | $75 | $0.75 | - |

### 1.5 AI Resource 데이터 생성

#### vendor → ai_resource 변환 로직

```typescript
async createAiResource(vendor: Vendor): Promise<AiResource> {
  // vendor 데이터를 AI가 이해하기 쉬운 문장형으로 가공
  const content = `
${vendor.name}은(는) ${vendor.region}에 위치한 ${this.getCategoryName(vendor.category)}입니다.
${vendor.introduction || ''}
가격대는 ${this.formatPriceRange(vendor)}이며, 네이버 평점 ${vendor.naver_rating}점을 받고 있습니다.
${vendor.badges.length > 0 ? `특징: ${vendor.badges.join(', ')}` : ''}
`.trim();

  // 메타데이터 구성
  const metadata = {
    region: vendor.region,
    category: vendor.category,
    price_min: this.getPriceMin(vendor),
    price_max: this.getPriceMax(vendor),
    rating: vendor.naver_rating,
    tags: vendor.badges,
  };

  return this.aiResourceRepository.save({
    vendor_id: vendor.id,
    category: vendor.category,
    name: vendor.name,
    content,
    metadata,
  });
}
```

### 1.6 향후 개선 계획

#### pgvector를 활용한 시맨틱 검색

```sql
-- pgvector 확장 설치
CREATE EXTENSION vector;

-- embedding 컬럼 추가
ALTER TABLE ai_resource ADD COLUMN embedding vector(1536);

-- 벡터 검색 인덱스
CREATE INDEX ON ai_resource USING ivfflat (embedding vector_cosine_ops);

-- 유사도 검색
SELECT * FROM ai_resource
ORDER BY embedding <=> '[...]'::vector
LIMIT 20;
```

**장점:**
- 키워드 매칭이 아닌 의미 기반 검색
- "자연광 스튜디오" → "창문이 큰 밝은 공간" 매칭
- 더 정확한 추천 가능

---

## 2. 플랜 생성 및 관리

### 2.1 AI 자동 플랜 생성

```
1. 사용자 프로필 분석
   - wedding_date, preferred_region, budget_limit
   ↓
2. 카테고리별 AI 추천
   - VENUE: 3개 추천
   - STUDIO: 3개 추천
   - DRESS: 2개 추천
   - MAKEUP: 2개 추천
   ↓
3. 예산 배분 최적화
   - VENUE: 50% (5,000,000원)
   - STUDIO: 20% (2,000,000원)
   - DRESS: 15% (1,500,000원)
   - MAKEUP: 15% (1,500,000원)
   ↓
4. Plan 및 PlanItem 생성
   - is_ai_generated = true
   - source = AI_RECOMMEND
   - selection_reason 저장
   ↓
5. 사용자 확인 및 수정
```

### 2.2 구현 예시

```typescript
async generateAiPlan(userId: string): Promise<Plan> {
  const user = await this.userRepository.findOne({ where: { id: userId } });

  // 카테고리별 추천 비율
  const budgetAllocation = {
    VENUE: 0.5,
    STUDIO: 0.2,
    DRESS: 0.15,
    MAKEUP: 0.15,
  };

  // 플랜 생성
  const plan = await this.planRepository.save({
    user_id: userId,
    title: `${user.name}님의 AI 추천 플랜`,
    total_budget: user.budget_limit,
    is_ai_generated: true,
  });

  // 카테고리별 추천 받기
  for (const [category, ratio] of Object.entries(budgetAllocation)) {
    const categoryBudget = user.budget_limit * ratio;
    const recommendations = await this.aiService.recommendVendors(
      category,
      user.preferred_region,
      categoryBudget,
    );

    // PlanItem 생성
    for (const [index, rec] of recommendations.entries()) {
      await this.planItemRepository.save({
        plan_id: plan.id,
        vendor_id: rec.vendor_id,
        source: 'AI_RECOMMEND',
        selection_reason: rec.reason,
        order_index: index,
      });
    }
  }

  return plan;
}
```

### 2.3 사용자 커스터마이징

- **항목 추가**: 다른 업체로 교체
- **항목 삭제**: 불필요한 항목 제거
- **순서 조정**: order_index 변경
- **확정 처리**: is_confirmed = true

---

## 3. 예약 프로세스

### 3.1 예약 상태 흐름

```
┌─────────────┐
│   PENDING   │ 예약 요청
│  (예약 대기) │
└──────┬──────┘
       │
       │ 업체 확인
       ↓
┌─────────────────┐
│ AWAITING_PAYMENT│
│   (결제 대기)    │
└────────┬────────┘
         │
         │ 계약금 납부
         ↓
┌─────────────┐
│  CONFIRMED  │
│  (예약 확정) │
└─────────────┘

       ↓ (어느 단계에서나 가능)
┌─────────────┐
│  CANCELLED  │
│  (예약 취소) │
└─────────────┘
```

### 3.2 비즈니스 규칙

#### 중복 예약 방지

```typescript
async createReservation(dto: CreateReservationDto): Promise<Reservation> {
  // 중복 예약 확인
  const existing = await this.reservationRepository.findOne({
    where: {
      user_id: dto.user_id,
      vendor_id: dto.vendor_id,
      reservation_date: dto.reservation_date,
      reservation_time: dto.reservation_time,
      status: Not(In(['CANCELLED'])),
    },
  });

  if (existing) {
    throw new ConflictException('이미 예약된 시간입니다.');
  }

  return this.reservationRepository.save({
    ...dto,
    status: 'PENDING',
  });
}
```

#### 계약금 관리

```typescript
async confirmPayment(
  reservationId: string,
  depositAmount: number,
): Promise<Reservation> {
  const reservation = await this.findOne(reservationId);

  if (reservation.status !== 'AWAITING_PAYMENT') {
    throw new BadRequestException('결제 대기 상태가 아닙니다.');
  }

  return this.reservationRepository.save({
    ...reservation,
    is_deposit_paid: true,
    deposit_amount: depositAmount,
    status: 'CONFIRMED',
  });
}
```

#### 취소 정책

```typescript
async cancelReservation(reservationId: string): Promise<{
  refundAmount: number;
  refundRate: number;
}> {
  const reservation = await this.findOne(reservationId);
  const daysUntilReservation = this.getDaysUntil(reservation.reservation_date);

  let refundRate = 0;

  if (daysUntilReservation >= 7) {
    refundRate = 1.0; // 전액 환불
  } else if (daysUntilReservation >= 3) {
    refundRate = 0.5; // 50% 환불
  } else {
    refundRate = 0; // 환불 불가
  }

  const refundAmount = reservation.deposit_amount * refundRate;

  await this.reservationRepository.update(reservationId, {
    status: 'CANCELLED',
  });

  return { refundAmount, refundRate };
}
```

---

## 4. 리뷰 시스템

### 4.1 리뷰 작성 조건

```typescript
async canWriteReview(userId: string, vendorId: string): Promise<boolean> {
  // 1. 예약 확정되었고 예약일이 지났는지 확인
  const reservation = await this.reservationRepository.findOne({
    where: {
      user_id: userId,
      vendor_id: vendorId,
      status: 'CONFIRMED',
      reservation_date: LessThan(new Date()),
    },
  });

  if (!reservation) {
    return false;
  }

  // 2. 이미 리뷰를 작성했는지 확인
  const existingReview = await this.reviewRepository.findOne({
    where: { user_id: userId, vendor_id: vendorId },
  });

  return !existingReview;
}
```

### 4.2 평점 계산 및 업데이트

```typescript
async updateVendorScore(vendorId: string): Promise<void> {
  const reviews = await this.reviewRepository.find({
    where: { vendor_id: vendorId },
  });

  if (reviews.length === 0) {
    return;
  }

  // 평균 평점 계산
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  // vendor 테이블 업데이트
  await this.vendorRepository.update(vendorId, {
    total_score: avgRating,
    review_count: reviews.length,
  });
}
```

---

## 5. 정책 정보 큐레이션

### 5.1 정책 추천 로직

```typescript
async recommendPolicies(user: User): Promise<PolicyInfo[]> {
  // 사용자 프로필 기반 필터링
  const query = this.policyRepository
    .createQueryBuilder('policy')
    .where('policy.type IN (:...types)', {
      types: ['SUBSIDY', 'LOAN'],
    });

  // 지역별 필터링 (메타데이터 활용)
  if (user.preferred_region) {
    query.andWhere(
      "policy.metadata->>'applicable_regions' @> :region",
      { region: JSON.stringify([user.preferred_region]) },
    );
  }

  // 예산 기반 필터링
  if (user.budget_limit < 10000000) {
    // 1천만원 미만: 지원금 우선
    query.orderBy("CASE WHEN policy.type = 'SUBSIDY' THEN 0 ELSE 1 END");
  } else {
    // 1천만원 이상: 대출 우선
    query.orderBy("CASE WHEN policy.type = 'LOAN' THEN 0 ELSE 1 END");
  }

  return query.limit(10).getMany();
}
```

### 5.2 스크랩 관리

```typescript
async scrapPolicy(userId: string, policyId: string): Promise<void> {
  try {
    await this.userPolicyScrapRepository.save({
      user_id: userId,
      policy_info_id: policyId,
    });
  } catch (error) {
    if (error.code === '23505') {
      // Unique constraint violation
      throw new ConflictException('이미 스크랩한 정책입니다.');
    }
    throw error;
  }
}
```

---

## 6. 참고 문서

- **데이터베이스 설계**: [../database/DATABASE.md](../database/DATABASE.md)
- **아키텍처**: [../architecture/ARCHITECTURE.md](../architecture/ARCHITECTURE.md)
- **API 설계**: [../api/API_DESIGN.md](../api/API_DESIGN.md)

---
