# 데이터베이스 설계 문서

> **작성일**: 2025.11.26  
> **작성자**: 김동언  
> **버전**: 1.0.0

---

## 📋 목차

1. [설계 원칙](#1-설계-원칙)
2. [ERD (Entity Relationship Diagram)](#2-erd-entity-relationship-diagram)
3. [테이블 상세 명세](#3-테이블-상세-명세)
4. [인덱스 전략](#4-인덱스-전략)
5. [마이그레이션 가이드](#5-마이그레이션-가이드)

---

## 1. 설계 원칙

### 1.1 정규화 (Normalization)

- **3차 정규화(3NF) 준수**
- 데이터 중복 최소화
- 참조 무결성 유지

### 1.2 확장성 (Scalability)

- **UUID 사용**: 분산 시스템 대응 및 보안 강화
- **JSONB 타입 활용**: 유연한 메타데이터 저장
- **샤딩 및 파티셔닝 고려**: 향후 확장 대비

### 1.3 성능 (Performance)

- 적절한 인덱스 설계
- 복합 키 최소화
- 쿼리 최적화를 고려한 테이블 설계

### 1.4 비즈니스 요구사항 반영

- AI 추천 시스템을 위한 별도 테이블 (`ai_resource`)
- 비용 추적을 위한 로깅 테이블 (`ai_log`)
- 유연한 메타데이터 저장 (JSONB)

---

## 2. ERD (Entity Relationship Diagram)

### 2.1 전체 구조

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│    User     │1      n│  UsersInfo  │1      1│    Plan     │
│             ├────────→│             ├────────→│             │
│  (사용자)    │         │ (상세정보)   │         │  (웨딩플랜)   │
└─────┬───────┘         └─────────────┘         └──────┬──────┘
      │1                                               │1
      │                                                │
      │n                                               │n
      ↓                                                ↓
┌─────────────┐                              ┌─────────────┐
│    Plan     │1                          n│  PlanItem   │
│             ├──────────────────────────→│             │
│  (웨딩플랜)   │                              │  (플랜항목)  │
└──────┬──────┘                              └──────┬──────┘
       │1                                           │n
       │                                            │
       │n                                           │1
       ↓                                            ↓
┌─────────────┐         ┌─────────────┐    ┌─────────────┐
│ Reservation │         │ Personal    │    │   Vendor    │
│             │         │  Schedule   │    │             │
│   (예약)     │         │ (개인일정)   │    │   (업체)     │
└─────────────┘         └─────────────┘    └──────┬──────┘
      ↑1                       ↑1                  │1
      │n                       │n                  │
      │                        │                   │
┌──────────┐            ┌──────────┐              │
│   User   │            │   User   │              │
└──────────┘            └──────────┘              │
                                                   │
                  ┌────────────────────────────────┼────┐
                  │1                   │1          │1   │1
                  ↓                    ↓           ↓    ↓
          ┌─────────────┐      ┌─────────────┐  ┌──────┐ ┌────────┐
          │VendorVenue  │      │VendorImage  │  │Service│ │AiResource│
          │   Detail    │      │             │  │ Item  │ │         │
          │(웨딩홀 상세) │      │ (업체이미지) │  │(상품) │ │(AI자원)  │
          └─────────────┘      └─────────────┘  └───────┘ └─────────┘

┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│  PolicyInfo │1      n│ UserPolicy  │         │   Review    │
│             │←────────┤   Scrap     │         │             │
│  (정책정보)  │         │             │n        │   (리뷰)     │
└─────────────┘         └──────┬──────┘    ┌───→└──────┬──────┘
                               │1          │n          │n
                               ↓           │           ↓
                         ┌──────────┐     │     ┌──────────┐
                         │   User   │─────┘     │  Vendor  │
                         └────┬─────┘           └──────────┘
                              │1
                              │n
                              ↓
                        ┌──────────┐
                        │  AiLog   │
                        └──────────┘
```

### 2.2 주요 관계

| 관계                       | 카디널리티 | 설명                                            |
| -------------------------- | ---------- | ----------------------------------------------- |
| User → UsersInfo           | **1:N**    | 사용자는 여러 상세 정보 보유 가능               |
| UsersInfo → Plan           | **1:1**    | 하나의 상세 정보는 하나의 플랜만 보유           |
| User → Plan                | 1:N        | 사용자는 여러 플랜 생성 가능 (UsersInfo를 통해) |
| Plan → PlanItem            | 1:N        | 플랜은 여러 항목으로 구성                       |
| User → Reservation         | 1:N        | 사용자는 여러 예약 가능                         |
| Vendor → VendorVenueDetail | 1:1        | 웨딩홀만 상세 정보 보유                         |
| Vendor → AiResource        | 1:N        | 업체당 여러 AI 리소스                           |
| User → AiLog               | 1:N        | 사용자의 AI 요청 이력                           |

---

## 3. 테이블 상세 명세

### 3.1 사용자 관련 테이블

#### **users** - 사용자 기본 정보

| 컬럼명        | 타입      | 제약조건         | 기본값             | 설명                       |
| ------------- | --------- | ---------------- | ------------------ | -------------------------- |
| id            | UUID      | PK               | uuid_generate_v4() | 사용자 고유 ID             |
| email         | VARCHAR   | UNIQUE, NOT NULL | -                  | 이메일 (로그인 ID)         |
| password_hash | VARCHAR   | NULLABLE         | NULL               | 암호화된 비밀번호          |
| provider      | VARCHAR   | NOT NULL         | 'EMAIL'            | 로그인 제공자              |
| name          | VARCHAR   | NOT NULL         | -                  | 사용자 이름                |
| gender        | ENUM      | **NOT NULL**     | -                  | 성별 (MALE, FEMALE, OTHER) |
| phone         | VARCHAR   | **NOT NULL**     | -                  | 전화번호 (1단계 입력)      |
| is_push_on    | BOOLEAN   | NOT NULL         | true               | 푸시 알림 수신 여부        |
| created_at    | TIMESTAMP | NOT NULL         | now()              | 가입일                     |

**설계 의도:**

- `provider`: 'EMAIL', 'GOOGLE', 'KAKAO' 등 다양한 로그인 방식 지원
- `password_hash`: 소셜 로그인 시 NULL (nullable)
- **2단계 회원가입**: 1단계에서 name, email, password, gender, phone 입력 (필수)
- `gender`, `phone`: NOT NULL로 변경하여 1단계에서 필수 입력
- 결혼 관련 상세 정보는 users_info 테이블로 분리

**관계:**

- users_info (1:N)
- plans (1:N)
- reservations (1:N)
- personal_schedules (1:N)
- policy_scraps (1:N)
- reviews (1:N)
- ai_logs (1:N)

#### **users_info** - 사용자 상세 정보

| 컬럼명           | 타입      | 제약조건 | 기본값             | 설명                                   |
| ---------------- | --------- | -------- | ------------------ | -------------------------------------- |
| id               | UUID      | PK       | uuid_generate_v4() | 상세 정보 ID                           |
| user_id          | UUID      | FK       | -                  | 사용자 ID (users.id)                   |
| is_main_plan     | BOOLEAN   | NOT NULL | false              | 메인 플랜 여부 (한 유저당 하나만 true) |
| wedding_date     | DATE      | NULLABLE | NULL               | 결혼 예정일 (2단계 입력)               |
| preferred_region | VARCHAR   | NULLABLE | NULL               | 선호 지역 (2단계 입력)                 |
| budget_limit     | INT       | NULLABLE | NULL               | 총 예산 (2단계 입력)                   |
| created_at       | TIMESTAMP | NOT NULL | now()              | 생성일                                 |
| updated_at       | TIMESTAMP | NOT NULL | now()              | 수정일                                 |

**설계 의도:**

- users 테이블과 **1:N 관계** (한 사용자가 여러 개의 상세 정보 보유 가능)
- 각 users_info는 정확히 **하나의 plan과 1:1 관계** (동일한 조건으로 여러 플랜 생성 시 새로운 users_info 생성)
- 2단계 회원가입에서 입력되는 결혼 계획 관련 정보 관리
- **여러 시나리오 관리 가능**: 사용자가 결혼 계획을 여러 번 수정하거나 다양한 옵션 비교 가능
- **메인 플랜 지정**: `is_main_plan=true`인 것이 현재 활성화된 플랜 (한 유저당 하나만 존재)
- **API 응답**: Auth 및 사용자 정보 조회 시 `is_main_plan=true`인 데이터만 반환
- `wedding_date`, `preferred_region`, `budget_limit`: AI 추천의 핵심 파라미터

**관계:**

- user (N:1) → users.id
- plan (1:1)

---

### 3.2 업체 관련 테이블

#### **vendor** - 웨딩 업체 정보

| 컬럼명          | 타입          | 제약조건 | 기본값             | 설명                         |
| --------------- | ------------- | -------- | ------------------ | ---------------------------- |
| id              | UUID          | PK       | uuid_generate_v4() | 업체 고유 ID                 |
| category        | ENUM          | NOT NULL | -                  | VENUE, STUDIO, DRESS, MAKEUP |
| name            | VARCHAR       | NOT NULL | -                  | 업체명                       |
| address         | VARCHAR       | NOT NULL | -                  | 주소                         |
| region          | VARCHAR       | NOT NULL | -                  | 지역 (검색/필터링용)         |
| phone           | VARCHAR       | NOT NULL | -                  | 전화번호                     |
| introduction    | TEXT          | NULLABLE | NULL               | 업체 소개                    |
| operating_hours | VARCHAR       | NULLABLE | NULL               | 영업시간                     |
| latitude        | DECIMAL(10,7) | NULLABLE | NULL               | 위도                         |
| longitude       | DECIMAL(10,7) | NULLABLE | NULL               | 경도                         |
| naver_rating    | FLOAT         | NOT NULL | 0                  | 네이버 평점                  |
| review_count    | INT           | NOT NULL | 0                  | 리뷰 수                      |
| total_score     | FLOAT         | NOT NULL | 0                  | 자체 평점                    |
| naver_place_url | VARCHAR       | NULLABLE | NULL               | 네이버 플레이스 URL          |
| thumbnail_url   | VARCHAR       | NULLABLE | NULL               | 대표 이미지 URL              |
| badges          | JSON          | NOT NULL | '[]'               | 배지 배열                    |
| created_at      | TIMESTAMP     | NOT NULL | now()              | 등록일                       |

**설계 의도:**

- `category`: ENUM으로 업체 유형 명확히 구분
- `region`: 지역별 필터링 최적화 (인덱스 대상)
- `naver_rating` vs `total_score`: 외부 평점과 내부 알고리즘 분리
- `badges`: JSON 배열로 유연한 태그 시스템 (예: ["인기업체", "가성비 추천"])

**관계:**

- venue_detail (1:1) - VENUE 카테고리만
- images (1:N)
- service_items (1:N)
- plan_items (1:N)
- reservations (1:N)
- reviews (1:N)
- ai_resources (1:N)

#### **vendor_venue_detail** - 웨딩홀 상세 정보

| 컬럼명        | 타입    | 제약조건           | 기본값 | 설명                      |
| ------------- | ------- | ------------------ | ------ | ------------------------- |
| vendor_id     | UUID    | PK, FK → vendor.id | -      | 업체 ID                   |
| hall_type     | VARCHAR | NULLABLE           | NULL   | 홀 타입 (호텔, 웨딩홀 등) |
| meal_type     | VARCHAR | NULLABLE           | NULL   | 식사 타입 (뷔페, 코스 등) |
| min_guarantee | INT     | NOT NULL           | 200    | 최소 보증 인원            |
| meal_cost     | INT     | NOT NULL           | 0      | 식대 (1인당)              |
| rental_fee    | INT     | NOT NULL           | 0      | 대관료                    |

**설계 의도:**

- VENUE 카테고리만 해당하는 정보를 별도 테이블로 분리 (정규화)
- 1:1 관계로 vendor_id를 PK이자 FK로 사용

#### **vendor_image** - 업체 이미지

| 컬럼명     | 타입    | 제약조건       | 기본값             | 설명        |
| ---------- | ------- | -------------- | ------------------ | ----------- |
| id         | UUID    | PK             | uuid_generate_v4() | 이미지 ID   |
| vendor_id  | UUID    | FK → vendor.id | -                  | 업체 ID     |
| image_url  | VARCHAR | NOT NULL       | -                  | 이미지 URL  |
| role       | VARCHAR | NOT NULL       | 'DETAIL'           | 이미지 역할 |
| sort_order | INT     | NOT NULL       | 0                  | 정렬 순서   |

**설계 의도:**

- `role`: THUMBNAIL, DETAIL, PORTFOLIO 등으로 이미지 용도 구분
- `sort_order`: 이미지 표시 순서 제어

#### **service_item** - 업체 상품/서비스

| 컬럼명        | 타입      | 제약조건       | 기본값             | 설명        |
| ------------- | --------- | -------------- | ------------------ | ----------- |
| id            | UUID      | PK             | uuid_generate_v4() | 상품 ID     |
| vendor_id     | UUID      | FK → vendor.id | -                  | 업체 ID     |
| name          | VARCHAR   | NOT NULL       | -                  | 상품명      |
| description   | TEXT      | NULLABLE       | NULL               | 상품 설명   |
| thumbnail_url | VARCHAR   | NULLABLE       | NULL               | 상품 이미지 |
| price         | INT       | NOT NULL       | -                  | 가격        |
| is_package    | BOOLEAN   | NOT NULL       | false              | 패키지 여부 |
| created_at    | TIMESTAMP | NOT NULL       | now()              | 등록일      |

**설계 의도:**

- 업체가 제공하는 개별 상품/서비스 관리
- `is_package`: 패키지 상품과 일반 상품 구분
- 플랜에서 특정 상품 선택 가능

---

### 3.3 플랜 관련 테이블

#### **plan** - 웨딩 플랜

| 컬럼명          | 타입      | 제약조건           | 기본값             | 설명             |
| --------------- | --------- | ------------------ | ------------------ | ---------------- |
| id              | UUID      | PK                 | uuid_generate_v4() | 플랜 ID          |
| user_id         | UUID      | FK → users.id      | -                  | 사용자 ID        |
| users_info_id   | UUID      | FK → users_info.id | -                  | 사용자 상세 정보 |
| title           | VARCHAR   | NOT NULL           | '나의 웨딩'        | 플랜 제목        |
| total_budget    | INT       | NULLABLE           | NULL               | 총 예산          |
| is_ai_generated | BOOLEAN   | NOT NULL           | false              | AI 생성 여부     |
| created_at      | TIMESTAMP | NOT NULL           | now()              | 생성일           |

**설계 의도:**

- 사용자가 여러 플랜 생성/비교 가능
- `is_ai_generated`: AI 자동 생성과 수동 생성 구분
- `users_info_id`: users_info 테이블 참조하여 결혼 계획 정보 활용
- 플랜별로 사용자의 결혼 상세 정보(예정일, 선호지역, 예산)를 참조하여 AI 추천 및 관리에 활용

#### **plan_item** - 플랜 항목

| 컬럼명           | 타입      | 제약조건             | 기본값             | 설명                      |
| ---------------- | --------- | -------------------- | ------------------ | ------------------------- |
| id               | UUID      | PK                   | uuid_generate_v4() | 항목 ID                   |
| plan_id          | UUID      | FK → plan.id         | -                  | 플랜 ID                   |
| vendor_id        | UUID      | FK → vendor.id       | -                  | 업체 ID                   |
| service_item_id  | UUID      | FK → service_item.id | NULL               | 상품 ID (선택)            |
| source           | ENUM      | NOT NULL             | 'AI_RECOMMEND'     | AI_RECOMMEND, USER_SELECT |
| selection_reason | TEXT      | NULLABLE             | NULL               | 선택 이유                 |
| order_index      | INT       | NOT NULL             | 0                  | 정렬 순서                 |
| is_confirmed     | BOOLEAN   | NOT NULL             | false              | 확정 여부                 |
| created_at       | TIMESTAMP | NOT NULL             | now()              | 추가일                    |

**설계 의도:**

- `source`: AI 추천과 사용자 선택 구분 → 추천 시스템 개선에 활용
- `selection_reason`: AI의 추천 근거 저장
- `is_confirmed`: 예비 선택과 확정 구분

---

### 3.4 예약 관련 테이블

#### **reservation** - 예약 정보

| 컬럼명           | 타입      | 제약조건       | 기본값             | 설명             |
| ---------------- | --------- | -------------- | ------------------ | ---------------- |
| id               | UUID      | PK             | uuid_generate_v4() | 예약 ID          |
| user_id          | UUID      | FK → users.id  | -                  | 사용자 ID        |
| vendor_id        | UUID      | FK → vendor.id | -                  | 업체 ID          |
| plan_id          | UUID      | FK → plan.id   | NULL               | 플랜 ID (선택)   |
| reservation_date | DATE      | NOT NULL       | -                  | 예약 날짜        |
| reservation_time | TIME      | NOT NULL       | -                  | 예약 시간        |
| status           | ENUM      | NOT NULL       | 'PENDING'          | 예약 상태        |
| is_deposit_paid  | BOOLEAN   | NOT NULL       | false              | 계약금 납부 여부 |
| deposit_amount   | INT       | NOT NULL       | 0                  | 계약금 금액      |
| visitor_name     | VARCHAR   | NULLABLE       | NULL               | 방문자 이름      |
| visitor_phone    | VARCHAR   | NULLABLE       | NULL               | 방문자 연락처    |
| visitor_count    | INT       | NOT NULL       | 2                  | 방문 인원        |
| memo             | TEXT      | NULLABLE       | NULL               | 메모             |
| created_at       | TIMESTAMP | NOT NULL       | now()              | 예약 생성일      |

**예약 상태 (ENUM):**

- `PENDING`: 예약 대기
- `AWAITING_PAYMENT`: 결제 대기
- `CONFIRMED`: 예약 확정
- `CANCELLED`: 예약 취소

**설계 의도:**

- 예약 상태를 4단계로 관리하여 프로세스 명확히 추적
- `plan_id` nullable: 플랜 없이도 예약 가능 -> 플랜 없이는 예약이 안되는걸로 방향 수정됨.
- 방문자 정보 별도 저장 (사용자와 다를 수 있음)

---

### 3.5 일정 관련 테이블

#### **personal_schedule** - 개인 일정

| 컬럼명        | 타입      | 제약조건      | 기본값             | 설명             |
| ------------- | --------- | ------------- | ------------------ | ---------------- |
| id            | UUID      | PK            | uuid_generate_v4() | 일정 ID          |
| user_id       | UUID      | FK → users.id | -                  | 사용자 ID        |
| title         | VARCHAR   | NOT NULL      | -                  | 일정 제목        |
| memo          | TEXT      | NULLABLE      | NULL               | 메모             |
| schedule_date | DATE      | NOT NULL      | -                  | 일정 날짜        |
| schedule_time | TIME      | NULLABLE      | NULL               | 일정 시간 (선택) |
| color_hex     | VARCHAR   | NOT NULL      | '#E1E1E1'          | 색상 코드        |
| created_at    | TIMESTAMP | NOT NULL      | now()              | 생성일           |

**설계 의도:**

- 예약 외 개인적인 웨딩 준비 일정 관리
- `color_hex`: 캘린더에서 일정 분류 및 시각화
- `schedule_time` nullable: 하루 종일 일정 지원

---

### 3.6 정책 관련 테이블

#### **policy_info** - 정책 정보

| 컬럼명          | 타입    | 제약조건 | 기본값             | 설명               |
| --------------- | ------- | -------- | ------------------ | ------------------ |
| id              | UUID    | PK       | uuid_generate_v4() | 정책 ID            |
| title           | VARCHAR | NOT NULL | -                  | 정책 제목          |
| subtitle        | VARCHAR | NULLABLE | NULL               | 부제목             |
| type            | VARCHAR | NULLABLE | NULL               | SUBSIDY, LOAN, ETC |
| badges          | JSON    | NOT NULL | '[]'               | 배지 배열          |
| benefit_summary | VARCHAR | NULLABLE | NULL               | 혜택 요약          |
| apply_url       | VARCHAR | NULLABLE | NULL               | 신청 URL           |
| thumbnail_url   | VARCHAR | NULLABLE | NULL               | 썸네일 이미지      |

**설계 의도:**

- 정부 지원 정책, 지자체 혜택 등 큐레이션
- `badges`: ["인기", "마감임박"] 등으로 주목도 표시

#### **user_policy_scrap** - 정책 스크랩

| 컬럼명         | 타입      | 제약조건            | 기본값             | 설명        |
| -------------- | --------- | ------------------- | ------------------ | ----------- |
| id             | UUID      | PK                  | uuid_generate_v4() | 스크랩 ID   |
| user_id        | UUID      | FK → users.id       | -                  | 사용자 ID   |
| policy_info_id | UUID      | FK → policy_info.id | -                  | 정책 ID     |
| created_at     | TIMESTAMP | NOT NULL            | now()              | 스크랩 일시 |

**제약조건:**

- UNIQUE (user_id, policy_info_id) - 중복 스크랩 방지

---

### 3.7 리뷰 관련 테이블

#### **review** - 리뷰

| 컬럼명     | 타입      | 제약조건       | 기본값             | 설명            |
| ---------- | --------- | -------------- | ------------------ | --------------- |
| id         | UUID      | PK             | uuid_generate_v4() | 리뷰 ID         |
| vendor_id  | UUID      | FK → vendor.id | -                  | 업체 ID         |
| user_id    | UUID      | FK → users.id  | -                  | 작성자 ID       |
| rating     | INT       | NOT NULL       | -                  | 평점 (1-5)      |
| content    | TEXT      | NULLABLE       | NULL               | 리뷰 내용       |
| images     | JSON      | NULLABLE       | NULL               | 이미지 URL 배열 |
| created_at | TIMESTAMP | NOT NULL       | now()              | 작성일          |

**설계 의도:**

- 사용자의 실제 경험 기반 리뷰
- `images`: JSON 배열로 여러 이미지 첨부 가능

---

### 3.8 AI 관련 테이블 (핵심)

#### **ai_resource** - AI 추천용 리소스

| 컬럼명     | 타입      | 제약조건       | 기본값             | 설명                        |
| ---------- | --------- | -------------- | ------------------ | --------------------------- |
| id         | UUID      | PK             | uuid_generate_v4() | 리소스 ID                   |
| vendor_id  | UUID      | FK → vendor.id | NULL               | 업체 ID (선택)              |
| category   | VARCHAR   | NOT NULL       | -                  | 카테고리 (studio, dress 등) |
| name       | VARCHAR   | NOT NULL       | -                  | 업체명/리소스명             |
| content    | TEXT      | NOT NULL       | -                  | AI가 읽을 텍스트            |
| metadata   | JSON      | NOT NULL       | '{}'               | 필터링용 메타데이터         |
| created_at | TIMESTAMP | NOT NULL       | now()              | 생성일                      |

**설계 의도 (RAG 시스템의 핵심):**

1. **비용 최적화:**

   ```
   2,000개 → [1차 SQL 필터링] → 20개 → [2차 LLM 추천] → 4개
   토큰 사용량 99% 절감 (100배 비용 절감)
   ```

2. **콘텐츠 가공:**
   - `vendor` 테이블의 raw 데이터를 AI가 이해하기 쉬운 문장형으로 가공
   - 예: "강남역 인근의 모던한 스튜디오. 가격대 50-80만원. 자연광 촬영 전문."

3. **메타데이터 활용:**

   ```json
   {
     "region": "강남구",
     "price_min": 500000,
     "price_max": 800000,
     "tags": ["자연광", "모던", "가성비"]
   }
   ```

   ```sql
   -- 1차 필터링 쿼리 예시
   WHERE metadata->>'region' = '강남구'
   AND (metadata->>'price_min')::int <= 1000000
   ```

4. **향후 확장:**
   - pgvector 설치 시 `embedding vector(1536)` 컬럼 추가
   - 시맨틱 검색으로 더 정교한 추천 가능

#### **ai_log** - AI 요청 로그

| 컬럼명          | 타입      | 제약조건      | 기본값             | 설명           |
| --------------- | --------- | ------------- | ------------------ | -------------- |
| id              | UUID      | PK            | uuid_generate_v4() | 로그 ID        |
| user_id         | UUID      | FK → users.id | NULL               | 요청 사용자 ID |
| request_prompt  | TEXT      | NULLABLE      | NULL               | 요청 프롬프트  |
| response_result | JSON      | NULLABLE      | NULL               | AI 응답 결과   |
| model_name      | VARCHAR   | NOT NULL      | 'gpt-4o-mini'      | 사용 모델      |
| input_tokens    | INT       | NOT NULL      | 0                  | 입력 토큰 수   |
| output_tokens   | INT       | NOT NULL      | 0                  | 출력 토큰 수   |
| total_tokens    | INT       | NOT NULL      | 0                  | 총 토큰 수     |
| created_at      | TIMESTAMP | NOT NULL      | now()              | 요청 일시      |

**설계 의도:**

1. **비용 관리**: 토큰 사용량 추적으로 월별/사용자별 비용 분석
2. **품질 개선**: 프롬프트와 응답 저장으로 추천 품질 모니터링
3. **디버깅**: 문제 발생 시 요청 내역 추적

---

## 4. 인덱스 전략

### 4.1 성능 최적화를 위한 인덱스

```sql
-- 사용자 이메일 검색 (로그인)
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- 업체 검색 (카테고리 + 지역)
CREATE INDEX idx_vendor_category_region ON vendor(category, region);
CREATE INDEX idx_vendor_total_score ON vendor(total_score DESC);

-- AI 리소스 필터링 (카테고리 + 메타데이터)
CREATE INDEX idx_ai_resource_category ON ai_resource(category);
CREATE INDEX idx_ai_resource_metadata ON ai_resource USING GIN (metadata);

-- 플랜 조회 (사용자별)
CREATE INDEX idx_plan_user_id ON plan(user_id);
CREATE INDEX idx_plan_item_plan_id ON plan_item(plan_id);

-- 예약 조회 (사용자별, 업체별, 날짜별)
CREATE INDEX idx_reservation_user_id ON reservation(user_id);
CREATE INDEX idx_reservation_vendor_id ON reservation(vendor_id);
CREATE INDEX idx_reservation_date ON reservation(reservation_date);

-- 일정 조회 (사용자별, 날짜별)
CREATE INDEX idx_personal_schedule_user_date ON personal_schedule(user_id, schedule_date);

-- 리뷰 조회 (업체별, 최신순)
CREATE INDEX idx_review_vendor_created ON review(vendor_id, created_at DESC);

-- AI 로그 분석 (사용자별, 날짜별)
CREATE INDEX idx_ai_log_user_created ON ai_log(user_id, created_at DESC);

-- 정책 스크랩 (중복 방지 및 조회 최적화)
CREATE UNIQUE INDEX idx_user_policy_scrap_unique ON user_policy_scrap(user_id, policy_info_id);
```

### 4.2 인덱스 설계 고려사항

1. **복합 인덱스 순서**: 선택도가 높은 컬럼을 앞에 배치
2. **GIN 인덱스**: JSONB 타입의 메타데이터 검색 최적화
3. **부분 인덱스**: 필요 시 WHERE 조건과 함께 사용
4. **인덱스 모니터링**: pg_stat_user_indexes로 사용률 추적

---

## 5. 마이그레이션 가이드

### 5.1 스키마 파일 위치

- **DBML 형식**: `docs/database/DATABASE_V.1.0.0.dbml`
- **SQL 스크립트**: `docs/database/Plan_A.sql`
- **TypeORM 엔티티**: `src/entities/*.entity.ts`
- **마이그레이션 파일**: `src/migrations/*.ts`

### 5.2 마이그레이션 실행

```bash
# 마이그레이션 실행
npm run migration:run

# 마이그레이션 되돌리기
npm run migration:revert

# 새 마이그레이션 생성
npm run migration:generate src/migrations/MigrationName
```

### 5.3 데이터베이스 초기화

```bash
# PostgreSQL 접속
psql postgres

# 데이터베이스 생성
CREATE DATABASE plana;

# UUID 확장 활성화
\c plana
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

# (선택) pgvector 확장 (향후)
CREATE EXTENSION IF NOT EXISTS vector;
```

### 5.4 스키마 변경 절차

1. **엔티티 수정**: `src/entities/*.entity.ts`
2. **마이그레이션 생성**: `npm run migration:generate`
3. **마이그레이션 검토**: 생성된 파일 확인
4. **마이그레이션 실행**: `npm run migration:run`
5. **문서 업데이트**: DBML 및 SQL 파일 동기화

---

## 6. 참고 문서

- **DBML 스키마**: [DATABASE_V.1.0.0.dbml](./DATABASE_V.1.0.0.dbml)
- **SQL 스크립트**: [Plan_A.sql](./Plan_A.sql)
- **비즈니스 로직**: [../business/BUSINESS_LOGIC.md](../business/BUSINESS_LOGIC.md)
- **API 설계**: [../api/API_DESIGN.md](../api/API_DESIGN.md)

---

**문서 버전**: 1.1.0  
**최종 수정일**: 2025.11.29

---

## 수정사항 - 2025.11.29

### 1. USERS 테이블에서 제거된 필드

| 필드명           | 설명        |
| ---------------- | ----------- |
| wedding_date     | 결혼 예정일 |
| preferred_region | 선호 지역   |
| budget_limit     | 예산 한도   |

### 2. USERS_INFO 테이블로 분기

| 필드명           | 타입      | 설명           |
| ---------------- | --------- | -------------- |
| id               | INT       | 기본 키        |
| user_id          | INT       | 사용자 ID (FK) |
| is_main_plan     | BOOLEAN   | 메인 플랜 여부 |
| wedding_date     | DATE      | 결혼 예정일    |
| preferred_region | VARCHAR   | 선호 지역      |
| budget_limit     | INT       | 예산 한도      |
| created_at       | TIMESTAMP | 생성 일시      |
| updated_at       | TIMESTAMP | 수정 일시      |

**변경 사유**: 사용자별 다중 플랜 지원을 위해 결혼 관련 정보를 별도 테이블로 분리
