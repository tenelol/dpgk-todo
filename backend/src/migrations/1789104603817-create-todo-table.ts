import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTodoTable1789104603817 implements MigrationInterface {
    name = 'CreateTodoTable1789104603817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`todo\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`title\` varchar(255) NOT NULL,
                \`description\` text NULL,
                \`completed\` tinyint NOT NULL DEFAULT 0,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE \`todo\`
        `);
    }

}
