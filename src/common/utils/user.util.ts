import { User } from '@/database/entities/user.entity';

export const validateUserResponse = (user: User) => {
  const {
    email,
    fullName,
    dateOfBirth,
    systemRole,
    avatar,
    id,
    organizationMemberships,
  } = user;
  const organizations = organizationMemberships.map((membership) => {
    return {
      id: membership.organization.id,
      name: membership.organization.name,
      organizationRole: membership.role,
    };
  });
  return {
    id,
    email,
    fullName,
    dateOfBirth,
    systemRole,
    avatar,
    organizations,
  };
};
