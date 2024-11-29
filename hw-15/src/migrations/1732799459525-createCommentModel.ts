import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCommentModel1732799459525 implements MigrationInterface {
    name = 'CreateCommentModel1732799459525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "comment" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "exhibitID" integer NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_9dd08bc67e5d802741315ad42d8" FOREIGN KEY ("exhibitID") REFERENCES "exhibit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_9dd08bc67e5d802741315ad42d8"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
