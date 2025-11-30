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

-- 2. 업체 (Vendor)
CREATE TABLE "vendor" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "category" vendor_category NOT NULL,
  "name" varchar NOT NULL,
  "address" varchar NOT NULL,
  "region" varchar NOT NULL,
  "phone" varchar NOT NULL,
  "introduction" text,
  "operating_hours" varchar,
  "latitude" decimal(10,7),
  "longitude" decimal(10,7),
  "naver_rating" double precision DEFAULT 0,
  "review_count" int DEFAULT 0,
  "total_score" double precision DEFAULT 0,
  "naver_place_url" varchar,
  "thumbnail_url" varchar,
  "badges" json DEFAULT '[]',
  "created_at" timestamp DEFAULT (now())
);

-- 웨딩홀 상세 정보
CREATE TABLE "vendor_venue_detail" (
  "vendor_id" uuid PRIMARY KEY,
  "hall_type" varchar,
  "meal_type" varchar,
  "min_guarantee" int DEFAULT 200,
  "meal_cost" int DEFAULT 0,
  "rental_fee" int DEFAULT 0
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
  "created_at" timestamp DEFAULT (now())
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

-- 8. 리뷰 (Review)
CREATE TABLE "review" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "vendor_id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  "rating" int NOT NULL,
  "content" text,
  "images" json,
  "created_at" timestamp DEFAULT (now())
);

-- 9. AI RAG 및 로그
-- AI 지식 저장소
CREATE TABLE "ai_resource" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "vendor_id" uuid,
  "category" varchar NOT NULL,
  "name" varchar NOT NULL,
  "content" text NOT NULL,
  "metadata" json DEFAULT '{}',
  "created_at" timestamp DEFAULT (now())
);

-- AI 비용 로그
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
-- 인덱스 정의
-- =========================================================

-- 사용자 정보 조회 최적화
CREATE INDEX "IDX_users_info_user_id" ON "users_info" ("user_id");

-- 플랜 조회 최적화
CREATE INDEX "IDX_plan_users_info_id" ON "plan" ("users_info_id");

-- 정책 스크랩 중복 방지
CREATE UNIQUE INDEX "idx_user_policy_scrap_unique" ON "user_policy_scrap" ("user_id", "policy_info_id");

-- =========================================================
-- 외래키 제약조건
-- =========================================================

-- users_info 관계
ALTER TABLE "users_info" 
  ADD CONSTRAINT "FK_users_info_user_id" 
  FOREIGN KEY ("user_id") 
  REFERENCES "users" ("id") 
  ON DELETE CASCADE;

-- vendor 관계
ALTER TABLE "vendor_venue_detail" 
  ADD CONSTRAINT "fk_vendor_venue_detail_vendor" 
  FOREIGN KEY ("vendor_id") 
  REFERENCES "vendor" ("id") 
  ON DELETE CASCADE;

ALTER TABLE "vendor_image" 
  ADD CONSTRAINT "fk_vendor_image_vendor" 
  FOREIGN KEY ("vendor_id") 
  REFERENCES "vendor" ("id") 
  ON DELETE CASCADE;

-- service_item 관계
ALTER TABLE "service_item" 
  ADD CONSTRAINT "fk_service_item_vendor" 
  FOREIGN KEY ("vendor_id") 
  REFERENCES "vendor" ("id") 
  ON DELETE CASCADE;

-- plan 관계
ALTER TABLE "plan" 
  ADD CONSTRAINT "fk_plan_user" 
  FOREIGN KEY ("user_id") 
  REFERENCES "users" ("id") 
  ON DELETE CASCADE;

ALTER TABLE "plan" 
  ADD CONSTRAINT "FK_plan_users_info_id" 
  FOREIGN KEY ("users_info_id") 
  REFERENCES "users_info" ("id") 
  ON DELETE CASCADE;

-- plan_item 관계
ALTER TABLE "plan_item" 
  ADD CONSTRAINT "fk_plan_item_plan" 
  FOREIGN KEY ("plan_id") 
  REFERENCES "plan" ("id") 
  ON DELETE CASCADE;

ALTER TABLE "plan_item" 
  ADD CONSTRAINT "fk_plan_item_vendor" 
  FOREIGN KEY ("vendor_id") 
  REFERENCES "vendor" ("id") 
  ON DELETE CASCADE;

ALTER TABLE "plan_item" 
  ADD CONSTRAINT "fk_plan_item_service_item" 
  FOREIGN KEY ("service_item_id") 
  REFERENCES "service_item" ("id") 
  ON DELETE SET NULL;

-- reservation 관계
ALTER TABLE "reservation" 
  ADD CONSTRAINT "fk_reservation_user" 
  FOREIGN KEY ("user_id") 
  REFERENCES "users" ("id") 
  ON DELETE CASCADE;

ALTER TABLE "reservation" 
  ADD CONSTRAINT "fk_reservation_vendor" 
  FOREIGN KEY ("vendor_id") 
  REFERENCES "vendor" ("id") 
  ON DELETE CASCADE;

ALTER TABLE "reservation" 
  ADD CONSTRAINT "fk_reservation_plan" 
  FOREIGN KEY ("plan_id") 
  REFERENCES "plan" ("id") 
  ON DELETE SET NULL;

-- personal_schedule 관계
ALTER TABLE "personal_schedule" 
  ADD CONSTRAINT "fk_personal_schedule_user" 
  FOREIGN KEY ("user_id") 
  REFERENCES "users" ("id") 
  ON DELETE CASCADE;

-- user_policy_scrap 관계
ALTER TABLE "user_policy_scrap" 
  ADD CONSTRAINT "fk_user_policy_scrap_user" 
  FOREIGN KEY ("user_id") 
  REFERENCES "users" ("id") 
  ON DELETE CASCADE;

ALTER TABLE "user_policy_scrap" 
  ADD CONSTRAINT "fk_user_policy_scrap_policy" 
  FOREIGN KEY ("policy_info_id") 
  REFERENCES "policy_info" ("id") 
  ON DELETE CASCADE;

-- review 관계
ALTER TABLE "review" 
  ADD CONSTRAINT "fk_review_vendor" 
  FOREIGN KEY ("vendor_id") 
  REFERENCES "vendor" ("id") 
  ON DELETE CASCADE;

ALTER TABLE "review" 
  ADD CONSTRAINT "fk_review_user" 
  FOREIGN KEY ("user_id") 
  REFERENCES "users" ("id") 
  ON DELETE CASCADE;

-- ai_resource 관계
ALTER TABLE "ai_resource" 
  ADD CONSTRAINT "fk_ai_resource_vendor" 
  FOREIGN KEY ("vendor_id") 
  REFERENCES "vendor" ("id") 
  ON DELETE SET NULL;

-- ai_log 관계
ALTER TABLE "ai_log" 
  ADD CONSTRAINT "fk_ai_log_user" 
  FOREIGN KEY ("user_id") 
  REFERENCES "users" ("id") 
  ON DELETE SET NULL;

-- =========================================================
-- 메타데이터
-- =========================================================
-- 버전: 1.1.0
-- 작성일: 2025.11.30
-- 작성자: 이윤재
-- 설명: PlanA 웨딩 플래닝 서비스 PostgreSQL 스키마
-- 참조: docs/database/DATABASE.md
-- 
-- 사용법:
-- psql -d plana -f Plan_A.sql
-- 
-- 주요 변경사항 (v1.1.0):
-- - uuid-ossp extension 명시적 추가
-- - 모든 PRIMARY KEY 제약조건 명시
-- - NOT NULL 제약조건 보완 (외래키 및 필수 필드)
-- - 외래키에 ON DELETE 동작 명시 (CASCADE/SET NULL)
-- - 인덱스 이름 명시
-- - float -> double precision 변경
-- - policy_type ENUM 제거 (미사용)
