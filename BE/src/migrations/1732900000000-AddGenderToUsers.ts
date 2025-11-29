import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGenderToUsers1732900000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // gender 컬럼 추가 (name 필드 다음에)
    await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN "gender" VARCHAR;
    `);

    // gender ENUM 타입 생성
    await queryRunner.query(`
      CREATE TYPE "user_gender_enum" AS ENUM ('MALE', 'FEMALE', 'OTHER');
    `);

    // 기존 컬럼 타입 변경
    await queryRunner.query(`
      ALTER TABLE "users" 
      ALTER COLUMN "gender" TYPE "user_gender_enum" USING gender::"user_gender_enum";
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // gender 컬럼 제거
    await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN "gender";
    `);

    // ENUM 타입 제거
    await queryRunner.query(`
      DROP TYPE "user_gender_enum";
    `);
  }
}
