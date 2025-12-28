import { User } from '@/database/entities/user.entity';

export const validateUserResponse = (user: User) => {
  const {
    email,
    full_name,
    date_of_birth,
    system_role,
    avatar,
    id,
    organizationMemberships,
  } = user;
  const organizations = organizationMemberships.map((membership) => {
    return {
      id: membership.organization.id,
      name: membership.organization.name,
      organization_role: membership.role,
    };
  });
  return {
    id,
    email,
    full_name,
    date_of_birth,
    system_role,
    avatar,
    organizations,
  };
};
