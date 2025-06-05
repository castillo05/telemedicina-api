import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialSchema1700000000000 implements MigrationInterface {
  name = 'CreateInitialSchema1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`users\` (
        \`id\` varchar(36) NOT NULL,
        \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deleted_at\` timestamp(6) NULL,
        \`first_name\` varchar(100) NOT NULL,
        \`last_name\` varchar(100) NOT NULL,
        \`email\` varchar(100) NOT NULL,
        \`phone\` varchar(20) NULL,
        \`role\` enum ('admin', 'doctor', 'patient') NOT NULL DEFAULT 'patient',
        \`is_active\` tinyint NOT NULL DEFAULT 0,
        \`is_email_verified\` tinyint NOT NULL DEFAULT 0,
        \`password\` varchar(255) NULL,
        \`reset_password_token\` varchar(255) NULL,
        \`reset_password_expires\` timestamp NULL,
        UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`users\``);
  }
} 