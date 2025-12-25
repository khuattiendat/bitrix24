import { BaseEntity } from '@/common/base/base.entity';
import { ChatRoomMemberRole } from '@/common/enum/chat.enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ChatRoom } from './chatRoom.entity';
import { OrganizationMember } from './organizationMember.entity';
import { ChatMessage } from './chatMessage.entity';

@Entity('chat_room_members')
export class ChatRoomMember extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ChatRoomMemberRole,
    default: ChatRoomMemberRole.MEMBER,
  })
  role: ChatRoomMemberRole;
  @Column({
    name: 'joined_at',
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  joinedAt: Date;
  // relation room
  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.members, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'room_id' })
  chatRoom: ChatRoom;
  @Column({
    name: 'last_read_at',
    nullable: true,
    type: 'timestamp',
  })
  lastReadAt: Date | null;
  // relation member
  @ManyToOne(() => OrganizationMember, (member) => member.chatRooms, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'organization_member_id' })
  member: OrganizationMember;
  // relation last_read_message_id
  @ManyToOne(() => ChatMessage, (message) => message.readByMembers, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'last_read_message_id' })
  lastReadMessage: ChatMessage;
}
