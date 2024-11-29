import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1732887336885 implements MigrationInterface {
    name = 'UpdateTable1732887336885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_9dd08bc67e5d802741315ad42d8"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_9dd08bc67e5d802741315ad42d8" FOREIGN KEY ("exhibitID") REFERENCES "exhibit"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_9dd08bc67e5d802741315ad42d8"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_9dd08bc67e5d802741315ad42d8" FOREIGN KEY ("exhibitID") REFERENCES "exhibit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
