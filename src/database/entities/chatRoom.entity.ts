import { BaseEntity } from '@/common/base/base.entity';
import { ChatRoomType } from '@/common/enum/chat.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { OrganizationMember } from './organizationMember.entity';
import { Organization } from './organization.entity';
import { Project } from './project.entity';
import { ChatMessage } from './chatMessage.entity';
import { ChatRoomMember } from './chatRoomMember.entity';

@Entity('chat_rooms')
export class ChatRoom extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ChatRoomType,
    default: ChatRoomType.DIRECT,
  })
  type: ChatRoomType;
  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;
  @Column({
    type: 'boolean',
    default: false,
    name: 'is_private',
  })
  isPrivate: boolean;
  // relations create by member
  @ManyToOne(() => OrganizationMember, (member) => member.createdChatRooms, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'created_by_member_id' })
  createdBy: OrganizationMember;
  // relation organization
  @ManyToOne(() => Organization, (org) => org.chatRooms, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;
  // realation project
  @ManyToOne(() => Project, (project) => project.chatRooms, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project?: Project | null;
  // relation with messages
  @OneToMany(() => ChatMessage, (message) => message.chatRoom)
  messages: ChatMessage[];
  // relation with chat room members
  @OneToMany(() => ChatRoomMember, (member) => member.chatRoom)
  members: ChatRoomMember[];
}
