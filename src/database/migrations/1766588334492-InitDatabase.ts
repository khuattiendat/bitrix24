import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1766588334492 implements MigrationInterface {
    name = 'InitDatabase1766588334492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`project_members\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role_in_project\` enum ('owner', 'manager', 'member', 'viewer') NOT NULL DEFAULT 'member', \`joined_at\` datetime NOT NULL, \`project_id\` int NOT NULL, \`organization_member_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`projects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`status\` enum ('pending', 'in_progress', 'archived') NOT NULL DEFAULT 'pending', \`start_date\` date NULL, \`end_date\` date NULL, \`organization_id\` int NOT NULL, \`created_by_member_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`organization_members\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` enum ('active', 'inactive') NOT NULL DEFAULT 'active', \`role\` enum ('owner', 'admin', 'project_manager', 'member', 'guest') NOT NULL DEFAULT 'member', \`joined_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`organization_id\` int NOT NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`organizations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`tax_code\` varchar(255) NOT NULL, \`status\` enum ('active', 'suspended') NOT NULL DEFAULT 'active', \`plan\` enum ('free', 'premium', 'enterprise') NOT NULL DEFAULT 'free', \`address\` varchar(255) NULL, \`parent_id\` int NULL, UNIQUE INDEX \`IDX_9b7ca6d30b94fef571cff87688\` (\`name\`), UNIQUE INDEX \`IDX_963693341bd612aa01ddf3a4b6\` (\`slug\`), UNIQUE INDEX \`IDX_6016f015d3a971ad0f3ff6cf5f\` (\`tax_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`files\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_name\` varchar(255) NOT NULL, \`mimeType\` varchar(255) NOT NULL, \`size\` int NOT NULL, \`url\` varchar(255) NOT NULL, \`storage\` enum ('local', 's3', 'gcs') NOT NULL DEFAULT 'local', \`organization_id\` int NULL, \`uploaded_by\` int NULL, \`project_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`full_name\` varchar(255) NOT NULL, \`system_role\` enum ('none', 'admin') NOT NULL DEFAULT 'none', \`status\` enum ('active', 'inactive', 'pending') NOT NULL DEFAULT 'active', \`date_of_birth\` datetime NULL, \`last_login_at\` datetime NULL, \`avatar_id\` int NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`project_members\` ADD CONSTRAINT \`FK_b5729113570c20c7e214cf3f58d\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_members\` ADD CONSTRAINT \`FK_200ecd29aa7453dad3c3a0dfc14\` FOREIGN KEY (\`organization_member_id\`) REFERENCES \`organization_members\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_585c8ce06628c70b70100bfb842\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_5aac2844475acf565d99242b7d1\` FOREIGN KEY (\`created_by_member_id\`) REFERENCES \`organization_members\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`organization_members\` ADD CONSTRAINT \`FK_7062a4fbd9bab22ffd918e5d3d9\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`organization_members\` ADD CONSTRAINT \`FK_89bde91f78d36ca41e9515d91c6\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`organizations\` ADD CONSTRAINT \`FK_f3a7c9411eaa5f9cbc5363de331\` FOREIGN KEY (\`parent_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`files\` ADD CONSTRAINT \`FK_385dd167bc3fe894f301c7537bb\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`files\` ADD CONSTRAINT \`FK_63c92c51cd7fd95c2d79d709b61\` FOREIGN KEY (\`uploaded_by\`) REFERENCES \`organization_members\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`files\` ADD CONSTRAINT \`FK_b3c17c323fdc479a109e517f138\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_c3401836efedec3bec459c8f818\` FOREIGN KEY (\`avatar_id\`) REFERENCES \`files\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_c3401836efedec3bec459c8f818\``);
        await queryRunner.query(`ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_b3c17c323fdc479a109e517f138\``);
        await queryRunner.query(`ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_63c92c51cd7fd95c2d79d709b61\``);
        await queryRunner.query(`ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_385dd167bc3fe894f301c7537bb\``);
        await queryRunner.query(`ALTER TABLE \`organizations\` DROP FOREIGN KEY \`FK_f3a7c9411eaa5f9cbc5363de331\``);
        await queryRunner.query(`ALTER TABLE \`organization_members\` DROP FOREIGN KEY \`FK_89bde91f78d36ca41e9515d91c6\``);
        await queryRunner.query(`ALTER TABLE \`organization_members\` DROP FOREIGN KEY \`FK_7062a4fbd9bab22ffd918e5d3d9\``);
        await queryRunner.query(`ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_5aac2844475acf565d99242b7d1\``);
        await queryRunner.query(`ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_585c8ce06628c70b70100bfb842\``);
        await queryRunner.query(`ALTER TABLE \`project_members\` DROP FOREIGN KEY \`FK_200ecd29aa7453dad3c3a0dfc14\``);
        await queryRunner.query(`ALTER TABLE \`project_members\` DROP FOREIGN KEY \`FK_b5729113570c20c7e214cf3f58d\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`files\``);
        await queryRunner.query(`DROP INDEX \`IDX_6016f015d3a971ad0f3ff6cf5f\` ON \`organizations\``);
        await queryRunner.query(`DROP INDEX \`IDX_963693341bd612aa01ddf3a4b6\` ON \`organizations\``);
        await queryRunner.query(`DROP INDEX \`IDX_9b7ca6d30b94fef571cff87688\` ON \`organizations\``);
        await queryRunner.query(`DROP TABLE \`organizations\``);
        await queryRunner.query(`DROP TABLE \`organization_members\``);
        await queryRunner.query(`DROP TABLE \`projects\``);
        await queryRunner.query(`DROP TABLE \`project_members\``);
    }

}
