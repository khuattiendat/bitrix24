import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { User } from '@/database/entities/user.entity';
import { Organization } from '@/database/entities/organization.entity';
import { OrganizationMember } from '@/database/entities/organizationMember.entity';
import { Project } from '@/database/entities/project.entity';
import { ProjectMember } from '@/database/entities/projectMember.entity';
import { File } from '@/database/entities/file.entity';

export const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false, // Set to true only in development
  logging: true,
};
