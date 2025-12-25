import { BaseEntity } from '@/common/base/base.entity';
import { ChatMessageType } from '@/common/enum/chat.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Organization } from './organization.entity';
import { ChatRoom } from './chatRoom.entity';
import { OrganizationMember } from './organizationMember.entity';
import { ChatRoomMember } from './chatRoomMember.entity';
import { ChatMessageAttachment } from './chatMessageAttachment.entity';
import { ChatMessageMention } from './chatMessageMention.entity';
import { Reaction } from './reaction.entity';

@Entity('chat_messages')
export class ChatMessage extends BaseEntity {
  @Column({
    type: 'json',
    name: 'content_json',
    nullable: false,
  })
  contentJson: any;

  @Column({
    type: 'text',
    name: 'content_text',
    nullable: true,
  })
  contentText: string;

  @Column({
    type: 'enum',
    enum: ChatMessageType,
    default: ChatMessageType.TEXT,
  })
  type: ChatMessageType;

  @Column({
    name: 'is_system',
    type: 'boolean',
    default: false,
  })
  isSystem: boolean;

  // 👉 message này reply message nào
  @ManyToOne(() => ChatMessage, (message) => message.replies, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'reply_to_message_id' })
  replyToMessage?: ChatMessage | null;

  // 👉 các message reply message này
  @OneToMany(() => ChatMessage, (message) => message.replyToMessage)
  replies?: ChatMessage[];
  // relation organzation
  @ManyToOne(() => Organization, (org) => org.chatMessages, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;
  // relaytion chat room
  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.messages, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'room_id' })
  chatRoom: ChatRoom;
  // relation sender member
  @ManyToOne(() => OrganizationMember, (member) => member.sentChatMessages, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'sender_member_id' })
  sentBy: OrganizationMember;
  // relation read by members
  @OneToMany(() => ChatRoomMember, (member) => member.lastReadMessage)
  readByMembers: ChatRoomMember[];
  // relation attachments
  @OneToMany(
    () => ChatMessageAttachment,
    (attachment) => attachment.chatMessage,
  )
  attachments: ChatMessageAttachment[];
  // add more relations if needed
  @OneToMany(
    () => ChatMessageAttachment,
    (attachment) => attachment.chatMessage,
  )
  chatMessageAttachments?: ChatMessageAttachment[];
  // mentions
  @OneToMany(() => ChatMessageMention, (mention) => mention.chatMessage)
  mentions?: ChatMessageMention[];
  // reactions
  @OneToMany(() => Reaction, (reaction) => reaction.chatMessage)
  reactions?: Reaction[];
}
