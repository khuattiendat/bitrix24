import { BaseEntity } from '@/common/base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { OrganizationMember } from './organizationMember.entity';
import { Organization } from './organization.entity';
import { Project } from './project.entity';
import { FeedPostMention } from './feedPostMention.entity';
import { FeedPostAttachment } from './feedPostAttachment.entity';
import { Comment } from './comment.entity';

@Entity('feed_posts')
export class FeedPost extends BaseEntity {
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
  // relation created by member
  @ManyToOne(() => OrganizationMember, (member) => member.feedPosts, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'created_by_member_id' })
  createdBy: OrganizationMember;
  // relation organization
  @ManyToOne(() => Organization, (organization) => organization.feedPosts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organization_id' })
  organization?: Organization;
  // relation project (optional)
  @ManyToOne(() => Project, (project) => project.feedPosts, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project?: Project | null;
  // relation mentions
  @OneToMany(() => FeedPostMention, (mention) => mention.feedPost, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  mentions?: FeedPostMention[];
  // relation attachments can be added later
  @OneToMany(() => FeedPostAttachment, (attachment) => attachment.feedPost, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  attachments?: FeedPostAttachment[];
  // relation comments
  @OneToMany(() => Comment, (comment) => comment.feedPost, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  comments?: Comment[];
}
