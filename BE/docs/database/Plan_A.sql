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

CREATE TYPE "policy_type" AS ENUM (
  'SUBSIDY',
  'LOAN',
  'ETC'
);

CREATE TABLE "users" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "email" varchar UNIQUE NOT NULL,
  "password_hash" varchar,
  "provider" varchar DEFAULT 'EMAIL',
  "name" varchar NOT NULL,
  "phone" varchar NOT NULL,
  "wedding_date" date NOT NULL,
  "preferred_region" varchar NOT NULL,
  "budget_limit" int NOT NULL,
  "is_push_on" boolean DEFAULT true,
  "created_at" timestamp DEFAULT (now())
);

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
  "naver_rating" float DEFAULT 0,
  "review_count" int DEFAULT 0,
  "total_score" float DEFAULT 0,
  "naver_place_url" varchar,
  "thumbnail_url" varchar,
  "badges" json DEFAULT '[]',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "vendor_venue_detail" (
  "vendor_id" uuid PRIMARY KEY,
  "hall_type" varchar,
  "meal_type" varchar,
  "min_guarantee" int DEFAULT 200,
  "meal_cost" int DEFAULT 0,
  "rental_fee" int DEFAULT 0
);

CREATE TABLE "vendor_image" (
  "id" uuid PRIMARY KEY,
  "vendor_id" uuid,
  "image_url" varchar NOT NULL,
  "role" varchar DEFAULT 'DETAIL',
  "sort_order" int DEFAULT 0
);

CREATE TABLE "service_item" (
  "id" uuid PRIMARY KEY,
  "vendor_id" uuid,
  "name" varchar NOT NULL,
  "description" text,
  "thumbnail_url" varchar,
  "price" int NOT NULL,
  "is_package" boolean DEFAULT false,
  "created_at" timestamp
);

CREATE TABLE "plan" (
  "id" uuid PRIMARY KEY,
  "user_id" uuid,
  "title" varchar DEFAULT '나의 웨딩',
  "total_budget" int,
  "is_ai_generated" boolean DEFAULT false,
  "created_at" timestamp
);

CREATE TABLE "plan_item" (
  "id" uuid PRIMARY KEY,
  "plan_id" uuid,
  "vendor_id" uuid,
  "service_item_id" uuid,
  "source" item_source DEFAULT 'AI_RECOMMEND',
  "selection_reason" text,
  "order_index" int DEFAULT 0,
  "is_confirmed" boolean DEFAULT false,
  "created_at" timestamp
);

CREATE TABLE "reservation" (
  "id" uuid PRIMARY KEY,
  "user_id" uuid,
  "vendor_id" uuid,
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
  "created_at" timestamp
);

CREATE TABLE "personal_schedule" (
  "id" uuid PRIMARY KEY,
  "user_id" uuid,
  "title" varchar NOT NULL,
  "memo" text,
  "schedule_date" date NOT NULL,
  "schedule_time" time,
  "color_hex" varchar DEFAULT '#E1E1E1',
  "created_at" timestamp
);

CREATE TABLE "policy_info" (
  "id" uuid PRIMARY KEY,
  "title" varchar NOT NULL,
  "subtitle" varchar,
  "type" varchar,
  "badges" json DEFAULT '[]',
  "benefit_summary" varchar,
  "apply_url" varchar,
  "thumbnail_url" varchar
);

CREATE TABLE "user_policy_scrap" (
  "id" uuid PRIMARY KEY,
  "user_id" uuid,
  "policy_info_id" uuid,
  "created_at" timestamp
);

CREATE TABLE "review" (
  "id" uuid PRIMARY KEY,
  "vendor_id" uuid,
  "user_id" uuid,
  "rating" int,
  "content" text,
  "images" json,
  "created_at" timestamp
);

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

CREATE UNIQUE INDEX ON "user_policy_scrap" ("user_id", "policy_info_id");

ALTER TABLE "vendor_venue_detail" ADD FOREIGN KEY ("vendor_id") REFERENCES "vendor" ("id");

ALTER TABLE "vendor_image" ADD FOREIGN KEY ("vendor_id") REFERENCES "vendor" ("id");

ALTER TABLE "service_item" ADD FOREIGN KEY ("vendor_id") REFERENCES "vendor" ("id");

ALTER TABLE "plan" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "plan_item" ADD FOREIGN KEY ("plan_id") REFERENCES "plan" ("id");

ALTER TABLE "plan_item" ADD FOREIGN KEY ("vendor_id") REFERENCES "vendor" ("id");

ALTER TABLE "plan_item" ADD FOREIGN KEY ("service_item_id") REFERENCES "service_item" ("id");

ALTER TABLE "reservation" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "reservation" ADD FOREIGN KEY ("vendor_id") REFERENCES "vendor" ("id");

ALTER TABLE "reservation" ADD FOREIGN KEY ("plan_id") REFERENCES "plan" ("id");

ALTER TABLE "personal_schedule" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_policy_scrap" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_policy_scrap" ADD FOREIGN KEY ("policy_info_id") REFERENCES "policy_info" ("id");

ALTER TABLE "review" ADD FOREIGN KEY ("vendor_id") REFERENCES "vendor" ("id");

ALTER TABLE "review" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "ai_resource" ADD FOREIGN KEY ("vendor_id") REFERENCES "vendor" ("id");

ALTER TABLE "ai_log" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

-- =========================================================
-- 메타데이터
-- =========================================================
-- 버전: 1.0.0
-- 작성일: 2025.11.26
-- 작성자: 김동언
-- 설명: PlanA 웨딩 플래닝 서비스 PostgreSQL 스키마
-- 참조: docs/database/DATABASE.md
-- 
-- 사용법:
-- psql -U postgres -d plana -f Plan_A.sql
