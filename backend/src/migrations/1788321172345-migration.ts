import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1788321172345 implements MigrationInterface {
    name = 'Migration1788321172345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`todo\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`completed\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`todo\``);
    }

}
