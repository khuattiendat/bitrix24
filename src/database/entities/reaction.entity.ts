import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ChatMessage } from './chatMessage.entity';
import { OrganizationMember } from './organizationMember.entity';
import { Comment } from './comment.entity';
import { FeedPost } from './feedpost.entity';
import { ReactionType } from '@/common/enum/chat.enum';

@Entity('reactions')
export class Reaction {
  @Column({
    type: 'enum',
    enum: ReactionType,
    primary: true,
  })
  reaction: ReactionType;
  // relation chat message
  @ManyToOne(() => ChatMessage, (chatMessage) => chatMessage.reactions, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'message_id' })
  chatMessage?: ChatMessage;
  // relaton organization member
  @ManyToOne(
    () => OrganizationMember,
    (member) => member.chatMessageReactions,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'organization_member_id' })
  member: OrganizationMember;
  // relation comment
  @ManyToOne(() => Comment, (comment) => comment.commentReactions, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'comment_id' })
  comment?: Comment;
  // relation feed post
  @ManyToOne(() => FeedPost, (post) => post.feedPostReactions, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'feed_post_id' })
  feedPost?: FeedPost;
}
