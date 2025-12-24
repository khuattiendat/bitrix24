import { BaseEntity } from '@/common/base/base.entity';
import { CommentStatus, CommentType } from '@/common/enum/comment.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { OrganizationMember } from './organizationMember.entity';
import { Organization } from './organization.entity';
import { FeedPost } from './feedpost.entity';
import { Task } from './tasks.entity';
import { CommentMention } from './commentMention.entity';
import { CommentAttachment } from './commentAttachment.entity';

@Entity('comments')
export class Comment extends BaseEntity {
  @Column({
    type: 'enum',
    enum: CommentType,
    default: CommentType.COMMENT,
  })
  type: CommentType;
  @Column({
    type: 'enum',
    enum: CommentStatus,
    default: CommentStatus.IN_PROGRESS,
  })
  status: CommentStatus;
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
    type: 'int',
    name: 'order_index',
    default: 0,
  })
  orderIndex: number;
  // relation member
  @ManyToOne(() => OrganizationMember, (member) => member.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'created_by_member_id' })
  member: Comment;
  // parent
  @ManyToOne(() => Comment, (comment) => comment.children, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parent_id' })
  parent?: Comment | null;

  @OneToMany(() => Comment, (comment) => comment.parent)
  children: Comment[];
  // relation with organization
  @ManyToOne(() => Organization, (org) => org.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;
  // relation with feed posts
  @ManyToOne(() => FeedPost, (post) => post.comments, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'feed_post_id' })
  feedPost?: FeedPost | null;
  // relation with tasks
  @ManyToOne(() => Task, (task) => task.comments, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'task_id' })
  task?: Task | null;
  // relation with mentions can be added later
  @OneToMany(() => CommentMention, (mention) => mention.comment, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  mentions?: CommentMention[];
  // relation with attachments can be added later
  @OneToMany(() => CommentAttachment, (attachment) => attachment.comment, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  attachments?: CommentAttachment[];
}
