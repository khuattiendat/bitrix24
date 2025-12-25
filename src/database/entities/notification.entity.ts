import { BaseEntity } from '@/common/base/base.entity';
import {
  EntityNotificationType,
  NotificationLevel,
  NotificationType,
} from '@/common/enum/notification.enum';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Organization } from './organization.entity';
import { join } from 'node:path';
import { User } from './user.entity';
import { OrganizationMember } from './organizationMember.entity';

@Entity('notifications')
export class Notification extends BaseEntity {
  @Column({
    type: 'enum',
    enum: NotificationType,
    default: NotificationType.SYSTEM_ANNOUNCEMENT,
  })
  type: NotificationType;
  @Column({
    type: 'enum',
    name: 'entity_type',
    enum: EntityNotificationType,
    default: EntityNotificationType.SYSTEM,
  })
  entityType: EntityNotificationType;
  @Column({
    name: 'entity_id',
    type: 'int',
    nullable: true,
  })
  entityId: number | null;
  @Column({
    type: 'enum',
    enum: NotificationLevel,
    default: NotificationLevel.INFO,
  })
  level: NotificationLevel;
  @Column({
    type: 'boolean',
    name: 'is_read',
    default: false,
  })
  isRead: boolean;
  @Column({
    type: 'boolean',
    name: 'read_at',
    default: false,
  })
  readAt: boolean;
  @Column({
    type: 'json',
    nullable: false,
    name: 'content',
  })
  content: any;
  // relations organization
  @ManyToOne(() => Organization, (organization) => organization.notifications, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;
  // relations user
  @ManyToMany(() => User, (user) => user.notifications, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
  // relation receiver_id
  @ManyToOne(() => OrganizationMember, (member) => member.notifications, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'receiver_id' })
  receiver: OrganizationMember;
}
