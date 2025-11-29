import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * 사용자 정보 분리 마이그레이션
 *
 * 변경사항:
 * 1. users_info 테이블 생성
 * 2. users 테이블의 wedding_date, preferred_region, budget_limit를 users_info로 이동
 * 3. users 테이블의 gender, phone을 NOT NULL로 변경
 * 4. plans 테이블에 users_info_id 컬럼 추가
 *
 * 주의사항:
 * - 기존 데이터가 있는 경우, gender와 phone이 NULL인 레코드는 업데이트 필요
 * - users_info 테이블로 데이터 마이그레이션 필요
 */
export class SeparateUsersInfo1733000000000 implements MigrationInterface {
  name = 'SeparateUsersInfo1733000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. users_info 테이블 생성 (1:N 관계, UNIQUE 제약 없음)
    await queryRunner.query(`
      CREATE TABLE "users_info" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "user_id" uuid NOT NULL,
        "is_main_plan" boolean NOT NULL DEFAULT false,
        "wedding_date" date,
        "preferred_region" character varying,
        "budget_limit" integer,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_users_info" PRIMARY KEY ("id")
      )
    `);

    // 2. users 테이블의 데이터를 users_info로 복사 (is_main_plan은 true로 설정)
    await queryRunner.query(`
      INSERT INTO "users_info" ("user_id", "is_main_plan", "wedding_date", "preferred_region", "budget_limit", "created_at", "updated_at")
      SELECT "id", true, "wedding_date", "preferred_region", "budget_limit", now(), now()
      FROM "users"
      WHERE "wedding_date" IS NOT NULL 
         OR "preferred_region" IS NOT NULL 
         OR "budget_limit" IS NOT NULL
    `);

    // 3. users 테이블에서 이동된 컬럼 삭제
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "wedding_date"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "preferred_region"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "budget_limit"`);

    // 4. users 테이블의 gender, phone을 NOT NULL로 변경
    // 주의: 기존에 NULL 값이 있는 경우 먼저 기본값을 설정해야 함
    await queryRunner.query(`
      UPDATE "users" 
      SET "gender" = 'OTHER' 
      WHERE "gender" IS NULL
    `);
    await queryRunner.query(`
      UPDATE "users" 
      SET "phone" = '' 
      WHERE "phone" IS NULL
    `);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "gender" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" SET NOT NULL`);

    // 5. plans 테이블에 users_info_id 컬럼 추가
    await queryRunner.query(`
      ALTER TABLE "plan" 
      ADD COLUMN "users_info_id" uuid
    `);

    // 6. 기존 plans의 users_info_id 채우기
    await queryRunner.query(`
      UPDATE "plan" p
      SET "users_info_id" = ui."id"
      FROM "users_info" ui
      WHERE p."user_id" = ui."user_id"
    `);

    // 7. users_info_id를 NOT NULL로 변경하고 FK 제약조건 추가
    await queryRunner.query(`ALTER TABLE "plan" ALTER COLUMN "users_info_id" SET NOT NULL`);

    // 8. Foreign Key 제약조건 추가
    await queryRunner.query(`
      ALTER TABLE "users_info"
      ADD CONSTRAINT "FK_users_info_user_id"
      FOREIGN KEY ("user_id") 
      REFERENCES "users"("id") 
      ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "plan"
      ADD CONSTRAINT "FK_plan_users_info_id"
      FOREIGN KEY ("users_info_id") 
      REFERENCES "users_info"("id") 
      ON DELETE CASCADE
    `);

    // 9. 인덱스 생성
    await queryRunner.query(`
      CREATE INDEX "IDX_users_info_user_id" ON "users_info" ("user_id")
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_plan_users_info_id" ON "plan" ("users_info_id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 1. 인덱스 삭제
    await queryRunner.query(`DROP INDEX "IDX_plan_users_info_id"`);
    await queryRunner.query(`DROP INDEX "IDX_users_info_user_id"`);

    // 2. Foreign Key 제약조건 삭제
    await queryRunner.query(`ALTER TABLE "plan" DROP CONSTRAINT "FK_plan_users_info_id"`);
    await queryRunner.query(`ALTER TABLE "users_info" DROP CONSTRAINT "FK_users_info_user_id"`);

    // 3. users 테이블에 컬럼 다시 추가
    await queryRunner.query(`ALTER TABLE "users" ADD "wedding_date" date`);
    await queryRunner.query(`ALTER TABLE "users" ADD "preferred_region" character varying`);
    await queryRunner.query(`ALTER TABLE "users" ADD "budget_limit" integer`);

    // 4. users_info의 데이터를 users로 복원
    await queryRunner.query(`
      UPDATE "users" u
      SET "wedding_date" = ui."wedding_date",
          "preferred_region" = ui."preferred_region",
          "budget_limit" = ui."budget_limit"
      FROM "users_info" ui
      WHERE u."id" = ui."user_id"
    `);

    // 5. users 테이블의 gender, phone을 NULLABLE로 변경
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "gender" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" DROP NOT NULL`);

    // 6. plans 테이블에서 users_info_id 컬럼 삭제
    await queryRunner.query(`ALTER TABLE "plan" DROP COLUMN "users_info_id"`);

    // 7. users_info 테이블 삭제
    await queryRunner.query(`DROP TABLE "users_info"`);
  }
}
