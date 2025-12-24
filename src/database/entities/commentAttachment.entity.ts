import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Comment } from './comment.entity';
import { File } from './file.entity';
import { BaseEntity } from '@/common/base/base.entity';

@Entity('comment_attachments')
export class CommentAttachment extends BaseEntity {
  @ManyToOne(() => Comment, (comment) => comment.mentions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;
  // relation file
  @ManyToOne(() => File, (file) => file.commentAttachments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'file_id' })
  file: File;
}
