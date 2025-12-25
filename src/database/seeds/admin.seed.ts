// src/database/seeds/user.seed.ts
import { DataSource } from 'typeorm';
import { User } from '@/database/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@/common/enum/user.enum';

export async function seedAdmin(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);

  const email = 'admin@system.com';

  const exists = await userRepo.findOne({ where: { email } });
  if (exists) return;

  const password = await bcrypt.hash('Abc@123456', 10);
  const fullName = 'System Admin';
  const role = UserRole.ADMIN;

  await userRepo.save(
    userRepo.create({
      email,
      password,
      full_name: fullName,
      system_role: role,
    }),
  );

  console.log('✔ Admin user created');
}
