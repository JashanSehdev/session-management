import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1791371001585 implements MigrationInterface {
    name = 'InitialSchema1791371001585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Session" ADD "token" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Session" DROP COLUMN "token"`);
    }

}
