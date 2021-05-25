import { MigrationInterface, QueryRunner } from 'typeorm';

export class brandRelationProducts1621957468674 implements MigrationInterface {
  name = 'brandRelationProducts1621957468674';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" ADD "brandId" integer`);
    await queryRunner.query(
      `ALTER TABLE "brand" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6"`,
    );
    await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "updateAt"`);
    await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "createAt"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "brandId"`);
  }
}
