import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColum1732883252649 implements MigrationInterface {
    name = 'AddColum1732883252649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exhibit" ADD "commentCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exhibit" DROP COLUMN "commentCount"`);
    }

}
