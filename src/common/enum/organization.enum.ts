export enum OrganizationStatus {
  ACTIVE = 'active', // Organization is active and operational
  SUSPENDED = 'suspended', // Organization is temporarily suspended
}
export enum OrganizationPlan {
  FREE = 'free', // Free plan with limited features
  PREMIUM = 'premium', // Premium plan with full features
  ENTERPRISE = 'enterprise', // Enterprise plan for large organizations
}
export enum OrganizationMemberStatus {
  ACTIVE = 'active', // Member is active
  INACTIVE = 'inactive', // Member is inactive
}
export enum OrganizationMemberRole {
  OWNER = 'owner', // Organization owner with full permissions
  ADMIN = 'admin', // Organization admin with elevated permissions
  PROJECT_MANAGER = 'project_manager', // Project manager with project-level permissions
  MEMBER = 'member', // Regular member with standard permissions
  GUEST = 'guest', // Guest member with limited permissions
}
