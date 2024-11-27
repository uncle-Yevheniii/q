import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExhibitNewColum1732735495059 implements MigrationInterface {
    name = 'AddExhibitNewColum1732735495059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exhibit" ADD "imagePublicId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exhibit" DROP COLUMN "imagePublicId"`);
    }

}
