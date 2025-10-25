import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSubscriptionSeller1761358849964
  implements MigrationInterface
{
  name = 'CreateSubscriptionSeller1761358849964';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "subscription_seller" ("transaction_id" character varying, "status" character varying, "payment_method" character varying NOT NULL, "end_date" TIMESTAMP NOT NULL, "start_date" TIMESTAMP NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "planIdId" uuid NOT NULL, "userIdId" integer NOT NULL, CONSTRAINT "PK_b9fbfac0068fdb103cec9ba4895" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_seller" ADD CONSTRAINT "FK_bf46f3ebbf5aec4d15003d8c05d" FOREIGN KEY ("planIdId") REFERENCES "plan_seller"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_seller" ADD CONSTRAINT "FK_ff624afbc497f66b8446ce5d0be" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription_seller" DROP CONSTRAINT "FK_ff624afbc497f66b8446ce5d0be"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_seller" DROP CONSTRAINT "FK_bf46f3ebbf5aec4d15003d8c05d"`,
    );
    await queryRunner.query(`DROP TABLE "subscription_seller"`);
  }
}
