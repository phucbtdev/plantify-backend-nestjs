import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePlanSeller1761325356497 implements MigrationInterface {
  name = 'CreatePlanSeller1761325356497';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "plan_seller" ("is_active" boolean NOT NULL, "commission_rate" boolean NOT NULL, "priority_support" boolean NOT NULL, "price_yearly" integer, "price_monthly" integer NOT NULL, "slug" character varying NOT NULL, "name" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2da8716aefdc7d7e2464954854a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "plan_seller"`);
  }
}
