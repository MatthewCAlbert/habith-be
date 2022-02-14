import {MigrationInterface, QueryRunner} from "typeorm";

export class migrate1644852366367 implements MigrationInterface {
    name = 'migrate1644852366367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "hash" character varying NOT NULL, "salt" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "habit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "category" character varying NOT NULL, "description" character varying NOT NULL, "target" double precision NOT NULL DEFAULT '0', "target_type" character varying NOT NULL, "start" TIMESTAMP, "end" TIMESTAMP, "repeat_every_day" integer, "repeat_on" text, "userId" uuid NOT NULL, CONSTRAINT "PK_71654d5d0512043db43bac9abfc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "habit_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "date" TIMESTAMP NOT NULL, "value" double precision NOT NULL DEFAULT '0', "habitId" uuid NOT NULL, CONSTRAINT "PK_d9f89162c8e45fa205f6bb4ed62" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "habit" ADD CONSTRAINT "FK_999000e9ce7a69128f471f0a3f9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "habit_history" ADD CONSTRAINT "FK_2bf1727ea25ea7ff570041db18e" FOREIGN KEY ("habitId") REFERENCES "habit"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "habit_history" DROP CONSTRAINT "FK_2bf1727ea25ea7ff570041db18e"`);
        await queryRunner.query(`ALTER TABLE "habit" DROP CONSTRAINT "FK_999000e9ce7a69128f471f0a3f9"`);
        await queryRunner.query(`DROP TABLE "habit_history"`);
        await queryRunner.query(`DROP TABLE "habit"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
