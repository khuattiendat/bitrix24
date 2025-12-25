import { BaseEntity } from '@/common/base/base.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ChatMessage } from './chatMessage.entity';
import { File } from './file.entity';

@Entity('chat_message_attachments')
export class ChatMessageAttachment extends BaseEntity {
  @ManyToOne(() => ChatMessage, (message) => message.attachments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'message_id' })
  chatMessage: ChatMessage;
  @ManyToOne(() => File, (file) => file.chatMessageAttachments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'file_id' })
  file: File;
}
