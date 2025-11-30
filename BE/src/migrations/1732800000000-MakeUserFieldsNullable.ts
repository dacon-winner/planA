import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeUserFieldsNullable1732800000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // phone, wedding_date, preferred_region, budget_limit을 NULLABLE로 변경
    await queryRunner.query(`
      ALTER TABLE "users" 
      ALTER COLUMN "phone" DROP NOT NULL,
      ALTER COLUMN "wedding_date" DROP NOT NULL,
      ALTER COLUMN "preferred_region" DROP NOT NULL,
      ALTER COLUMN "budget_limit" DROP NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 되돌리기 (다시 NOT NULL로)
    await queryRunner.query(`
      ALTER TABLE "users" 
      ALTER COLUMN "phone" SET NOT NULL,
      ALTER COLUMN "wedding_date" SET NOT NULL,
      ALTER COLUMN "preferred_region" SET NOT NULL,
      ALTER COLUMN "budget_limit" SET NOT NULL;
    `);
  }
}
