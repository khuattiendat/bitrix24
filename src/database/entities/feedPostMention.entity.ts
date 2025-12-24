import { BaseEntity } from '@/common/base/base.entity';
import { Entity, JoinColumn, ManyToOne, Or } from 'typeorm';
import { FeedPost } from './feedpost.entity';
import { OrganizationMember } from './organizationMember.entity';

@Entity('feed_posts_mentions')
export class FeedPostMention extends BaseEntity {
  @ManyToOne(() => FeedPost, (post) => post.mentions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'feed_post_id' })
  feedPost: FeedPost;
  @ManyToOne(() => OrganizationMember, (member) => member.feedPostMentions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organization_member_id' })
  mentionedMember: OrganizationMember;
}
