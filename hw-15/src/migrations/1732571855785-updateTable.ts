import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1732571855785 implements MigrationInterface {
    name = 'UpdateTable1732571855785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exhibit" DROP CONSTRAINT "FK_6ebb6cad6c8284f7fc62e686a50"`);
        await queryRunner.query(`ALTER TABLE "exhibit" ADD CONSTRAINT "FK_6ebb6cad6c8284f7fc62e686a50" FOREIGN KEY ("userInfoId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exhibit" DROP CONSTRAINT "FK_6ebb6cad6c8284f7fc62e686a50"`);
        await queryRunner.query(`ALTER TABLE "exhibit" ADD CONSTRAINT "FK_6ebb6cad6c8284f7fc62e686a50" FOREIGN KEY ("userInfoId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
