export enum NotificationType {
  /* ================= SYSTEM ================= */
  SYSTEM_ANNOUNCEMENT = 'system_announcement', // thông báo toàn hệ thống
  SYSTEM_MAINTENANCE = 'system_maintenance', // bảo trì hệ thống
  SYSTEM_UPDATE = 'system_update', // cập nhật phiên bản / tính năng
  SYSTEM_WARNING = 'system_warning', // cảnh báo chung
  SYSTEM_ERROR = 'system_error', // lỗi hệ thống ảnh hưởng user

  /* ================= ORGANIZATION ================= */
  ORG_INVITE = 'org_invite', // mời vào tổ chức
  ORG_ROLE_CHANGED = 'org_role_changed', // thay đổi role
  ORG_REMOVED = 'org_removed', // bị xoá khỏi org

  /* ================= PROJECT ================= */
  PROJECT_INVITE = 'project_invite', // mời vào project
  PROJECT_ROLE_CHANGED = 'project_role_changed',
  PROJECT_UPDATED = 'project_updated',
  PROJECT_ARCHIVED = 'project_archived',

  /* ================= TASK ================= */
  TASK_CREATED = 'task_created',
  TASK_ASSIGNED = 'task_assigned',
  TASK_UNASSIGNED = 'task_unassigned',
  TASK_STATUS_CHANGED = 'task_status_changed',
  TASK_DEADLINE_REMINDER = 'task_deadline_reminder',
  TASK_OVERDUE = 'task_overdue',
  TASK_COMMENTED = 'task_commented',
  TASK_MENTIONED = 'task_mentioned',

  /* ================= CHAT ================= */
  CHAT_MESSAGE = 'chat_message',
  CHAT_MENTION = 'chat_mention',
  CHAT_ROOM_INVITE = 'chat_room_invite',

  /* ================= USER ================= */
  USER_MENTIONED = 'user_mentioned', // mention chung (vd: feed)
  PROFILE_UPDATED = 'profile_updated',
  PASSWORD_CHANGED = 'password_changed',
}
export enum EntityNotificationType {
  //organization', 'project', 'task', 'chat_message', 'user', 'system'
  ORGANIZATION = 'organization',
  PROJECT = 'project',
  TASK = 'task',
  CHAT_MESSAGE = 'chat_message',
  USER = 'user',
  SYSTEM = 'system',
}
export enum NotificationLevel {
  //info | warning | error | success', default: 'info'
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
}
