import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserEntityAndAddConnection1732705770823 implements MigrationInterface {
    name = 'UpdateUserEntityAndAddConnection1732705770823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exhibit" DROP CONSTRAINT "FK_6ebb6cad6c8284f7fc62e686a50"`);
        await queryRunner.query(`ALTER TABLE "exhibit" RENAME COLUMN "userInfoId" TO "userID"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "access_token"`);
        await queryRunner.query(`ALTER TABLE "exhibit" ALTER COLUMN "userID" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "exhibit" ADD CONSTRAINT "FK_145a6a42858a9917e756fa2d5ca" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exhibit" DROP CONSTRAINT "FK_145a6a42858a9917e756fa2d5ca"`);
        await queryRunner.query(`ALTER TABLE "exhibit" ALTER COLUMN "userID" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "access_token" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "exhibit" RENAME COLUMN "userID" TO "userInfoId"`);
        await queryRunner.query(`ALTER TABLE "exhibit" ADD CONSTRAINT "FK_6ebb6cad6c8284f7fc62e686a50" FOREIGN KEY ("userInfoId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
