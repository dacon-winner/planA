-- =========================================================
-- PostgreSQL Extensions
-- =========================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================================
-- Enum 정의
-- =========================================================
CREATE TYPE "vendor_category" AS ENUM (
  'VENUE',
  'STUDIO',
  'DRESS',
  'MAKEUP'
);

CREATE TYPE "item_source" AS ENUM (
  'AI_RECOMMEND',
  'USER_SELECT'
);

CREATE TYPE "reservation_status" AS ENUM (
  'PENDING',
  'AWAITING_PAYMENT',
  'CONFIRMED',
  'CANCELLED'
);

CREATE TYPE "user_gender_enum" AS ENUM (
  'MALE',
  'FEMALE',
  'OTHER'
);

-- =========================================================
-- 테이블 정의
-- =========================================================

-- 1. 사용자 (User)
CREATE TABLE "users" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "email" varchar UNIQUE NOT NULL,
  "password_hash" varchar,
  "provider" varchar DEFAULT 'EMAIL',
  "name" varchar NOT NULL,
  "gender" user_gender_enum NOT NULL,
  "phone" varchar NOT NULL,
  "is_push_on" boolean DEFAULT true,
  "created_at" timestamp DEFAULT (now())
);

-- 사용자 상세 정보 (결혼 계획 관련)
CREATE TABLE "users_info" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "user_id" uuid NOT NULL,
  "is_main_plan" boolean NOT NULL DEFAULT false,
  "wedding_date" date,
  "preferred_region" varchar,
  "budget_limit" int,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

-- 2. 업체 (Vendor) - 기본 정보
CREATE TABLE "vendor" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "category" vendor_category NOT NULL,
  "name" varchar NOT NULL,
  "address" varchar NOT NULL,
  "region" varchar NOT NULL,
  "phone" varchar NOT NULL,
  "introduction" text,
  -- operating_hours 삭제됨 -> vendor_operating_hour 테이블로 이동
  -- naver_rating 등 평점 필드 삭제됨
  
  "latitude" decimal(10,7),
  "longitude" decimal(10,7),
  
  "naver_place_url" varchar,
  "thumbnail_url" varchar,
  "badges" json DEFAULT '[]',
  
  -- [NEW] 시트 데이터 대응 필드
  "parking_info" varchar,   -- 예: "500대 / 혼주 6시간 무료"
  "transport_info" varchar, -- 예: "셔틀버스 수시 운행"
  
  "created_at" timestamp DEFAULT (now())
);

-- [NEW] 업체 영업시간 (정규화)
CREATE TABLE "vendor_operating_hour" (
  "vendor_id" uuid NOT NULL,
  "day_of_week" int NOT NULL, -- 0:일요일 ~ 6:토요일
  "open_time" time,
  "close_time" time,
  "is_holiday" boolean DEFAULT false,
  PRIMARY KEY ("vendor_id", "day_of_week")
);

-- 2-1. 웨딩홀 상세 정보 (VENUE)
CREATE TABLE "vendor_venue_detail" (
  "vendor_id" uuid PRIMARY KEY,
  "hall_type" varchar,    -- 어두운/밝은/채플 등
  "meal_type" varchar,    -- 뷔페/코스 등
  "min_guarantee" int DEFAULT 200,
  "meal_cost" int DEFAULT 0,
  "rental_fee" int DEFAULT 0,
  
  -- [NEW] 시트 데이터 대응 필드
  "ceremony_interval" int DEFAULT 60, -- 예식 간격 (분)
  "ceremony_form" varchar             -- 분리예식/동시예식
);

-- [NEW] 2-2. 스드메 추가 비용 상세 (Cost Detail)
CREATE TABLE "vendor_cost_detail" (
  "vendor_id" uuid PRIMARY KEY,
  
  -- 드레스/메이크업
  "fitting_fee" int DEFAULT 0,       -- 피팅비
  "helper_fee" int DEFAULT 0,        -- 헬퍼비
  "early_start_fee" int DEFAULT 0,   -- 얼리비
  
  -- 스튜디오
  "original_file_fee" int DEFAULT 0, -- 원본비
  "modified_file_fee" int DEFAULT 0, -- 수정비
  
  -- 공통
  "valet_fee" int DEFAULT 0,         -- 발렛비
  "after_party_fee" int DEFAULT 0,   -- 피로연 비용
  "cancellation_policy" text,        -- 위약금 규정
  
  "created_at" timestamp DEFAULT (now())
);

-- 업체 이미지
CREATE TABLE "vendor_image" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "vendor_id" uuid NOT NULL,
  "image_url" varchar NOT NULL,
  "role" varchar DEFAULT 'DETAIL',
  "sort_order" int DEFAULT 0
);

-- 3. 상품 (Service)
CREATE TABLE "service_item" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "vendor_id" uuid NOT NULL,
  "name" varchar NOT NULL,
  "description" text,
  "thumbnail_url" varchar,
  "price" int NOT NULL,
  "is_package" boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now())
);

-- 4. 플랜 (Plan)
CREATE TABLE "plan" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "user_id" uuid NOT NULL,
  "users_info_id" uuid NOT NULL,
  "title" varchar DEFAULT '나의 웨딩',
  "total_budget" int,
  "is_ai_generated" boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now()),
  "deleted_at" timestamp DEFAULT NULL
);

-- 플랜 항목
CREATE TABLE "plan_item" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "plan_id" uuid NOT NULL,
  "vendor_id" uuid NOT NULL,
  "service_item_id" uuid,
  "source" item_source DEFAULT 'AI_RECOMMEND',
  "selection_reason" text,
  "order_index" int DEFAULT 0,
  "is_confirmed" boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now())
);

-- 5. 예약 (Reservation)
CREATE TABLE "reservation" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "user_id" uuid NOT NULL,
  "vendor_id" uuid NOT NULL,
  "plan_id" uuid,
  "reservation_date" date NOT NULL,
  "reservation_time" time NOT NULL,
  "status" reservation_status DEFAULT 'PENDING',
  "is_deposit_paid" boolean DEFAULT false,
  "deposit_amount" int DEFAULT 0,
  "visitor_name" varchar,
  "visitor_phone" varchar,
  "visitor_count" int DEFAULT 2,
  "memo" text,
  "created_at" timestamp DEFAULT (now())
);

-- 6. 개인 일정 (Personal Schedule)
CREATE TABLE "personal_schedule" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "user_id" uuid NOT NULL,
  "title" varchar NOT NULL,
  "memo" text,
  "schedule_date" date NOT NULL,
  "schedule_time" time,
  "color_hex" varchar DEFAULT '#E1E1E1',
  "created_at" timestamp DEFAULT (now())
);

-- 7. 정책 정보 (Policy)
CREATE TABLE "policy_info" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "title" varchar NOT NULL,
  "subtitle" varchar,
  "type" varchar,
  "badges" json DEFAULT '[]',
  "benefit_summary" varchar,
  "apply_url" varchar,
  "thumbnail_url" varchar
);

-- 정책 스크랩
CREATE TABLE "user_policy_scrap" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "user_id" uuid NOT NULL,
  "policy_info_id" uuid NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

-- 8. 리뷰 (Review) - 삭제됨

-- 9. AI RAG 및 로그
CREATE TABLE "ai_resource" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "vendor_id" uuid,
  "category" varchar NOT NULL,
  "name" varchar NOT NULL,
  "content" text NOT NULL,
  "metadata" json DEFAULT '{}',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "ai_log" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "user_id" uuid,
  "request_prompt" text,
  "response_result" json,
  "model_name" varchar DEFAULT 'gpt-4o-mini',
  "input_tokens" int DEFAULT 0,
  "output_tokens" int DEFAULT 0,
  "total_tokens" int DEFAULT 0,
  "created_at" timestamp DEFAULT (now())
);

-- =========================================================
-- 인덱스 및 제약조건
-- =========================================================

-- Indexes
CREATE INDEX "IDX_users_info_user_id" ON "users_info" ("user_id");
CREATE INDEX "IDX_plan_users_info_id" ON "plan" ("users_info_id");
CREATE UNIQUE INDEX "idx_user_policy_scrap_unique" ON "user_policy_scrap" ("user_id", "policy_info_id");

-- Foreign Keys
ALTER TABLE "users_info" ADD CONSTRAINT "FK_users_info_user_id" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "vendor_operating_hour" ADD CONSTRAINT "fk_vendor_operating_hour_vendor" FOREIGN KEY ("vendor_id") REFERENCES "vendor" ("id") ON DELETE CASCADE;
ALTER TABLE "vendor_venue_detail" ADD CONSTRAINT "fk_vendor_venue_detail_vendor" FOREIGN KEY ("vendor_id") REFERENCES "vendor" ("id") ON DELETE CASCADE;
ALTER TABLE "vendor_cost_detail" ADD CONSTRAINT "fk_vendor_cost_detail_vendor" FOREIGN KEY ("vendor_id") REFERENCES "vendor" ("id") ON DELETE CASCADE;
ALTER TABLE "vendor_image" ADD CONSTRAINT "fk_vendor_image_vendor" FOREIGN KEY ("vendor_id") REFERENCES "vendor" ("id") ON DELETE CASCADE;

ALTER TABLE "service_item" ADD CONSTRAINT "fk_service_item_vendor" FOREIGN KEY ("vendor_id") REFERENCES "vendor" ("id") ON DELETE CASCADE;

ALTER TABLE "plan" ADD CONSTRAINT "fk_plan_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;
ALTER TABLE "plan" ADD CONSTRAINT "FK_plan_users_info_id" FOREIGN KEY ("users_info_id") REFERENCES "users_info" ("id") ON DELETE CASCADE;

ALTER TABLE "plan_item" ADD CONSTRAINT "fk_plan_item_plan" FOREIGN KEY ("plan_id") REFERENCES "plan" ("id") ON DELETE CASCADE;
ALTER TABLE "plan_item" ADD CONSTRAINT "fk_plan_item_vendor" FOREIGN KEY ("vendor_id") REFERENCES "vendor" ("id") ON DELETE CASCADE;
ALTER TABLE "plan_item" ADD CONSTRAINT "fk_plan_item_service_item" FOREIGN KEY ("service_item_id") REFERENCES "service_item" ("id") ON DELETE SET NULL;

ALTER TABLE "reservation" ADD CONSTRAINT "fk_reservation_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;
ALTER TABLE "reservation" ADD CONSTRAINT "fk_reservation_vendor" FOREIGN KEY ("vendor_id") REFERENCES "vendor" ("id") ON DELETE CASCADE;
ALTER TABLE "reservation" ADD CONSTRAINT "fk_reservation_plan" FOREIGN KEY ("plan_id") REFERENCES "plan" ("id") ON DELETE SET NULL;

ALTER TABLE "personal_schedule" ADD CONSTRAINT "fk_personal_schedule_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "user_policy_scrap" ADD CONSTRAINT "fk_user_policy_scrap_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;
ALTER TABLE "user_policy_scrap" ADD CONSTRAINT "fk_user_policy_scrap_policy" FOREIGN KEY ("policy_info_id") REFERENCES "policy_info" ("id") ON DELETE CASCADE;

ALTER TABLE "ai_resource" ADD CONSTRAINT "fk_ai_resource_vendor" FOREIGN KEY ("vendor_id") REFERENCES "vendor" ("id") ON DELETE SET NULL;
ALTER TABLE "ai_log" ADD CONSTRAINT "fk_ai_log_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL;

-- =========================================================
-- 메타데이터
-- =========================================================
-- 버전: 1.2.0
-- 작성일: 2025.11.30
-- 작성자: 김동언
-- 설명: PlanA 웨딩 플래닝 서비스 PostgreSQL 스키마
-- 참조: docs/database/DATABASE.md
-- 
-- 사용법:
-- psql -d plana -f Plan_A.sql
-- 
-- 주요 변경사항 (v1.2.0):
-- - vendor 테이블: operating_hours 삭제 (정규화), 평점 필드 삭제
-- - vendor 테이블: parking_info, transport_info 추가
-- - vendor_operating_hour 테이블 추가 (영업시간 정규화)
-- - vendor_cost_detail 테이블 추가 (스드메 추가 비용)
-- - vendor_venue_detail: ceremony_interval, ceremony_form 추가
--
-- 주요 변경사항 (v1.1.0):
-- - uuid-ossp extension 명시적 추가
-- - 모든 PRIMARY KEY 제약조건 명시
-- - NOT NULL 제약조건 보완 (외래키 및 필수 필드)
-- - 외래키에 ON DELETE 동작 명시 (CASCADE/SET NULL)
-- - 인덱스 이름 명시
-- - float -> double precision 변경
-- - policy_type ENUM 제거 (미사용)
