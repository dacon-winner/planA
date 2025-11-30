import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1732600000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create Enums
    await queryRunner.query(`
      CREATE TYPE "vendor_category" AS ENUM (
        'VENUE',
        'STUDIO',
        'DRESS',
        'MAKEUP'
      );
    `);

    await queryRunner.query(`
      CREATE TYPE "item_source" AS ENUM (
        'AI_RECOMMEND',
        'USER_SELECT'
      );
    `);

    await queryRunner.query(`
      CREATE TYPE "reservation_status" AS ENUM (
        'PENDING',
        'AWAITING_PAYMENT',
        'CONFIRMED',
        'CANCELLED'
      );
    `);

    // Enable UUID extension
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    // Create Users table
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "email" varchar UNIQUE NOT NULL,
        "password_hash" varchar,
        "provider" varchar DEFAULT 'EMAIL',
        "name" varchar NOT NULL,
        "phone" varchar NOT NULL,
        "wedding_date" date NOT NULL,
        "preferred_region" varchar NOT NULL,
        "budget_limit" int NOT NULL,
        "is_push_on" boolean DEFAULT true,
        "created_at" timestamp DEFAULT now()
      );
    `);

    // Create Vendor table
    await queryRunner.query(`
      CREATE TABLE "vendor" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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
        "created_at" timestamp DEFAULT now()
      );
    `);

    // Create Vendor Venue Detail table
    await queryRunner.query(`
      CREATE TABLE "vendor_venue_detail" (
        "vendor_id" uuid PRIMARY KEY,
        "hall_type" varchar,
        "meal_type" varchar,
        "min_guarantee" int DEFAULT 200,
        "meal_cost" int DEFAULT 0,
        "rental_fee" int DEFAULT 0,
        CONSTRAINT "fk_vendor_venue_detail_vendor" FOREIGN KEY ("vendor_id") REFERENCES "vendor" ("id") ON DELETE CASCADE
      );
    `);

    // Create Vendor Image table
    await queryRunner.query(`
      CREATE TABLE "vendor_image" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "vendor_id" uuid NOT NULL,
        "image_url" varchar NOT NULL,
        "role" varchar DEFAULT 'DETAIL',
        "sort_order" int DEFAULT 0,
        CONSTRAINT "fk_vendor_image_vendor" FOREIGN KEY ("vendor_id") REFERENCES "vendor" ("id") ON DELETE CASCADE
      );
    `);

    // Create Service Item table
    await queryRunner.query(`
      CREATE TABLE "service_item" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "vendor_id" uuid NOT NULL,
        "name" varchar NOT NULL,
        "description" text,
        "thumbnail_url" varchar,
        "price" int NOT NULL,
        "is_package" boolean DEFAULT false,
        "created_at" timestamp DEFAULT now(),
        CONSTRAINT "fk_service_item_vendor" FOREIGN KEY ("vendor_id") REFERENCES "vendor" ("id") ON DELETE CASCADE
      );
    `);

    // Create Plan table
    await queryRunner.query(`
      CREATE TABLE "plan" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "user_id" uuid NOT NULL,
        "title" varchar DEFAULT '나의 웨딩',
        "total_budget" int,
        "is_ai_generated" boolean DEFAULT false,
        "created_at" timestamp DEFAULT now(),
        CONSTRAINT "fk_plan_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
      );
    `);

    // Create Plan Item table
    await queryRunner.query(`
      CREATE TABLE "plan_item" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "plan_id" uuid NOT NULL,
        "vendor_id" uuid NOT NULL,
        "service_item_id" uuid,
        "source" item_source DEFAULT 'AI_RECOMMEND',
        "selection_reason" text,
        "order_index" int DEFAULT 0,
        "is_confirmed" boolean DEFAULT false,
        "created_at" timestamp DEFAULT now(),
        CONSTRAINT "fk_plan_item_plan" FOREIGN KEY ("plan_id") REFERENCES "plan" ("id") ON DELETE CASCADE,
        CONSTRAINT "fk_plan_item_vendor" FOREIGN KEY ("vendor_id") REFERENCES "vendor" ("id") ON DELETE CASCADE,
        CONSTRAINT "fk_plan_item_service_item" FOREIGN KEY ("service_item_id") REFERENCES "service_item" ("id") ON DELETE SET NULL
      );
    `);

    // Create Reservation table
    await queryRunner.query(`
      CREATE TABLE "reservation" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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
        "created_at" timestamp DEFAULT now(),
        CONSTRAINT "fk_reservation_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE,
        CONSTRAINT "fk_reservation_vendor" FOREIGN KEY ("vendor_id") REFERENCES "vendor" ("id") ON DELETE CASCADE,
        CONSTRAINT "fk_reservation_plan" FOREIGN KEY ("plan_id") REFERENCES "plan" ("id") ON DELETE SET NULL
      );
    `);

    // Create Personal Schedule table
    await queryRunner.query(`
      CREATE TABLE "personal_schedule" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "user_id" uuid NOT NULL,
        "title" varchar NOT NULL,
        "memo" text,
        "schedule_date" date NOT NULL,
        "schedule_time" time,
        "color_hex" varchar DEFAULT '#E1E1E1',
        "created_at" timestamp DEFAULT now(),
        CONSTRAINT "fk_personal_schedule_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
      );
    `);

    // Create Policy Info table
    await queryRunner.query(`
      CREATE TABLE "policy_info" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "title" varchar NOT NULL,
        "subtitle" varchar,
        "type" varchar,
        "badges" json DEFAULT '[]',
        "benefit_summary" varchar,
        "apply_url" varchar,
        "thumbnail_url" varchar
      );
    `);

    // Create User Policy Scrap table
    await queryRunner.query(`
      CREATE TABLE "user_policy_scrap" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "user_id" uuid NOT NULL,
        "policy_info_id" uuid NOT NULL,
        "created_at" timestamp DEFAULT now(),
        CONSTRAINT "fk_user_policy_scrap_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE,
        CONSTRAINT "fk_user_policy_scrap_policy" FOREIGN KEY ("policy_info_id") REFERENCES "policy_info" ("id") ON DELETE CASCADE
      );
    `);

    // Create unique index for user_policy_scrap
    await queryRunner.query(`
      CREATE UNIQUE INDEX "idx_user_policy_scrap_unique" ON "user_policy_scrap" ("user_id", "policy_info_id");
    `);

    // Create Review table
    await queryRunner.query(`
      CREATE TABLE "review" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "vendor_id" uuid NOT NULL,
        "user_id" uuid NOT NULL,
        "rating" int NOT NULL,
        "content" text,
        "images" json,
        "created_at" timestamp DEFAULT now(),
        CONSTRAINT "fk_review_vendor" FOREIGN KEY ("vendor_id") REFERENCES "vendor" ("id") ON DELETE CASCADE,
        CONSTRAINT "fk_review_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
      );
    `);

    // Create AI Resource table
    await queryRunner.query(`
      CREATE TABLE "ai_resource" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "vendor_id" uuid,
        "category" varchar NOT NULL,
        "name" varchar NOT NULL,
        "content" text NOT NULL,
        "metadata" json DEFAULT '{}',
        "created_at" timestamp DEFAULT now(),
        CONSTRAINT "fk_ai_resource_vendor" FOREIGN KEY ("vendor_id") REFERENCES "vendor" ("id") ON DELETE SET NULL
      );
    `);

    // Create AI Log table
    await queryRunner.query(`
      CREATE TABLE "ai_log" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "user_id" uuid,
        "request_prompt" text,
        "response_result" json,
        "model_name" varchar DEFAULT 'gpt-4o-mini',
        "input_tokens" int DEFAULT 0,
        "output_tokens" int DEFAULT 0,
        "total_tokens" int DEFAULT 0,
        "created_at" timestamp DEFAULT now(),
        CONSTRAINT "fk_ai_log_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order
    await queryRunner.query(`DROP TABLE IF EXISTS "ai_log" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ai_resource" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "review" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "user_policy_scrap" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "policy_info" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "personal_schedule" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "reservation" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "plan_item" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "plan" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "service_item" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "vendor_image" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "vendor_venue_detail" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "vendor" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users" CASCADE;`);

    // Drop enums
    await queryRunner.query(`DROP TYPE IF EXISTS "reservation_status";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "item_source";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "vendor_category";`);
  }
}
