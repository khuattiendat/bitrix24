import { BaseEntity } from '@/common/base/base.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ChatMessage } from './chatMessage.entity';
import { OrganizationMember } from './organizationMember.entity';

@Entity('chat_message_mentions')
export class ChatMessageMention extends BaseEntity {
  @ManyToOne(() => ChatMessage, (message) => message.mentions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'message_id' })
  chatMessage: ChatMessage;
  @ManyToOne(() => OrganizationMember, (member) => member.chatMessageMentions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organization_member_id' })
  mentionedMember: OrganizationMember;
}
