import { BaseEntity } from '@/common/base/base.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { FeedPost } from './feedpost.entity';
import { File } from './file.entity';

@Entity('feed_post_attachments')
export class FeedPostAttachment extends BaseEntity {
  @ManyToOne(() => FeedPost, (post) => post.attachments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'feed_post_id' })
  feedPost: FeedPost;
  // relation file
  @ManyToOne(() => File, (file) => file.feedPostAttachments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'file_id' })
  file: File;
}
