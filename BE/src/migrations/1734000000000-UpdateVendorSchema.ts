import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Vendor 스키마 업데이트 마이그레이션
 *
 * 변경사항:
 * 1. vendor_operating_hour 테이블 생성 (영업시간 정규화)
 * 2. vendor_cost_detail 테이블 생성 (스드메 추가 비용)
 * 3. vendor 테이블 수정:
 *    - operating_hours 컬럼 삭제 (정규화)
 *    - naver_rating, review_count, total_score 컬럼 삭제
 *    - parking_info, transport_info 컬럼 추가
 * 4. vendor_venue_detail 테이블에 ceremony_interval, ceremony_form 추가
 *
 * 참조: docs/database/PLAN_A.sql v1.1.0
 */
export class UpdateVendorSchema1734000000000 implements MigrationInterface {
  name = 'UpdateVendorSchema1734000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. vendor_operating_hour 테이블 생성
    await queryRunner.query(`
      CREATE TABLE "vendor_operating_hour" (
        "vendor_id" uuid NOT NULL,
        "day_of_week" int NOT NULL,
        "open_time" time,
        "close_time" time,
        "is_holiday" boolean DEFAULT false,
        CONSTRAINT "PK_vendor_operating_hour" PRIMARY KEY ("vendor_id", "day_of_week")
      )
    `);

    // 2. vendor_cost_detail 테이블 생성
    await queryRunner.query(`
      CREATE TABLE "vendor_cost_detail" (
        "vendor_id" uuid NOT NULL,
        "fitting_fee" int DEFAULT 0,
        "helper_fee" int DEFAULT 0,
        "early_start_fee" int DEFAULT 0,
        "original_file_fee" int DEFAULT 0,
        "modified_file_fee" int DEFAULT 0,
        "valet_fee" int DEFAULT 0,
        "after_party_fee" int DEFAULT 0,
        "cancellation_policy" text,
        "created_at" TIMESTAMP DEFAULT now(),
        CONSTRAINT "PK_vendor_cost_detail" PRIMARY KEY ("vendor_id")
      )
    `);

    // 3. vendor 테이블에 새 컬럼 추가
    await queryRunner.query(`
      ALTER TABLE "vendor" 
      ADD COLUMN "parking_info" character varying,
      ADD COLUMN "transport_info" character varying
    `);

    // 4. vendor_venue_detail 테이블에 새 컬럼 추가
    await queryRunner.query(`
      ALTER TABLE "vendor_venue_detail"
      ADD COLUMN "ceremony_interval" int DEFAULT 60,
      ADD COLUMN "ceremony_form" character varying
    `);

    // 5. vendor 테이블에서 사용하지 않는 컬럼 삭제
    await queryRunner.query(`
      ALTER TABLE "vendor"
      DROP COLUMN IF EXISTS "operating_hours",
      DROP COLUMN IF EXISTS "naver_rating",
      DROP COLUMN IF EXISTS "review_count",
      DROP COLUMN IF EXISTS "total_score"
    `);

    // 6. Foreign Key 제약조건 추가
    await queryRunner.query(`
      ALTER TABLE "vendor_operating_hour"
      ADD CONSTRAINT "fk_vendor_operating_hour_vendor"
      FOREIGN KEY ("vendor_id") 
      REFERENCES "vendor"("id") 
      ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "vendor_cost_detail"
      ADD CONSTRAINT "fk_vendor_cost_detail_vendor"
      FOREIGN KEY ("vendor_id") 
      REFERENCES "vendor"("id") 
      ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 1. Foreign Key 제약조건 삭제
    await queryRunner.query(`
      ALTER TABLE "vendor_cost_detail"
      DROP CONSTRAINT "fk_vendor_cost_detail_vendor"
    `);

    await queryRunner.query(`
      ALTER TABLE "vendor_operating_hour"
      DROP CONSTRAINT "fk_vendor_operating_hour_vendor"
    `);

    // 2. vendor 테이블에 컬럼 복원
    await queryRunner.query(`
      ALTER TABLE "vendor"
      ADD COLUMN "operating_hours" character varying,
      ADD COLUMN "naver_rating" double precision DEFAULT 0,
      ADD COLUMN "review_count" int DEFAULT 0,
      ADD COLUMN "total_score" double precision DEFAULT 0
    `);

    // 3. vendor_venue_detail 테이블에서 컬럼 삭제
    await queryRunner.query(`
      ALTER TABLE "vendor_venue_detail"
      DROP COLUMN "ceremony_form",
      DROP COLUMN "ceremony_interval"
    `);

    // 4. vendor 테이블에서 새 컬럼 삭제
    await queryRunner.query(`
      ALTER TABLE "vendor"
      DROP COLUMN "transport_info",
      DROP COLUMN "parking_info"
    `);

    // 5. 새 테이블 삭제
    await queryRunner.query(`DROP TABLE "vendor_cost_detail"`);
    await queryRunner.query(`DROP TABLE "vendor_operating_hour"`);
  }
}
