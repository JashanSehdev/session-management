import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1791355247404 implements MigrationInterface {
    name = 'InitialSchema1791355247404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Session" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Session" ADD CONSTRAINT "FK_5d4e8000d78793c81fe0b2f38f6" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Session" DROP CONSTRAINT "FK_5d4e8000d78793c81fe0b2f38f6"`);
        await queryRunner.query(`ALTER TABLE "Session" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "email"`);
    }

}
