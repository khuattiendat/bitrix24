import { BaseEntity } from '@/common/base/base.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Comment } from './comment.entity';
import { OrganizationMember } from './organizationMember.entity';

@Entity('comment_mentions')
export class CommentMention extends BaseEntity {
  @ManyToOne(() => Comment, (comment) => comment.mentions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;
  @ManyToOne(() => OrganizationMember, (member) => member.commentsMemberShips, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organization_member_id' })
  mentionedMember: OrganizationMember;
}
