import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../enum/user.enum';

export const ROLES_KEY = 'system_role';

export const RoleSystem = (...roles: UserRole[]) =>
  SetMetadata(ROLES_KEY, roles);
