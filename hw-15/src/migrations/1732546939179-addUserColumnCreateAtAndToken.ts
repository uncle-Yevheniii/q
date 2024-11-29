import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserColumnCreateAtAndToken1732546939179 implements MigrationInterface {
    name = 'AddUserColumnCreateAtAndToken1732546939179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "access_token" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "access_token"`);
    }

}
