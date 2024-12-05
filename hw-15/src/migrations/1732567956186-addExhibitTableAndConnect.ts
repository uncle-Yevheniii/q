import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExhibitTableAndConnect1732567956186 implements MigrationInterface {
    name = 'AddExhibitTableAndConnect1732567956186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exhibit" ("id" SERIAL NOT NULL, "imageUrl" character varying NOT NULL, "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userInfoId" integer, CONSTRAINT "PK_cea6ca681dbeff3b69e0961a129" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "exhibit" ADD CONSTRAINT "FK_6ebb6cad6c8284f7fc62e686a50" FOREIGN KEY ("userInfoId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exhibit" DROP CONSTRAINT "FK_6ebb6cad6c8284f7fc62e686a50"`);
        await queryRunner.query(`DROP TABLE "exhibit"`);
    }

}
