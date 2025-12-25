import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Organization } from '@/database/entities/organization.entity';
import { User } from '@/database/entities/user.entity';
import {
  OrganizationMemberRole,
  OrganizationMemberStatus,
} from '@/common/enum/organization.enum';
import { Project } from '@/database/entities/project.entity';
import { ProjectMember } from './projectMember.entity';
import { DepartmentMember } from './departmentMember.entity';
import { TaskAssignee } from './taskAssigne.entity';
import { TaskLog } from './taskLog.entity';
import { FeedPost } from './feedpost.entity';
import { FeedPostMention } from './feedPostMention.entity';
import { Comment } from './comment.entity';
import { CommentMention } from './commentMention.entity';
import { ChatRoom } from './chatRoom.entity';
import { ChatMessage } from './chatMessage.entity';
import { ChatMessageMention } from './chatMessageMention.entity';
import { Reaction } from './reaction.entity';
import { Notification } from './notification.entity';

@Entity('organization_members')
export class OrganizationMember {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    name: 'status',
    type: 'enum',
    enum: OrganizationMemberStatus,
    default: OrganizationMemberStatus.ACTIVE,
  })
  status: OrganizationMemberStatus;
  @Column({
    name: 'role',
    nullable: false,
    type: 'enum',
    enum: OrganizationMemberRole,
    default: OrganizationMemberRole.MEMBER,
  })
  role: OrganizationMemberRole;
  @Column({
    name: 'joined_at',
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  joinedAt: Date;

  // relations with organization
  @ManyToOne(() => Organization, (org) => org.members, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;
  // relations with user
  @ManyToOne(() => User, (user) => user.organizationMemberships, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
  // relations with projects created
  @OneToMany(() => Project, (project) => project.createdBy)
  projectsCreated: Project[];
  // relations with project members
  @OneToMany(() => ProjectMember, (member) => member.organizationMember)
  projectMemberships: ProjectMember[];
  // relations with department members
  @OneToMany(
    () => DepartmentMember,
    (deptMember) => deptMember.organizationMember,
  )
  departmentMemberships: DepartmentMember[];
  // add other relations as needed
  @OneToMany(() => Project, (task) => task.createdBy)
  taskCreated: Project[];
  // relations with task assignees
  @OneToMany(() => TaskAssignee, (assignee) => assignee.member)
  taskAssignees: TaskAssignee[];
  // relations with task logs
  @OneToMany(() => TaskLog, (log) => log.createBy)
  taskLogs: TaskLog[];
  // relations with feed posts
  @OneToMany(() => FeedPost, (post) => post.createdBy)
  feedPosts: FeedPost[];
  // relation with feed mentions
  @OneToMany(() => FeedPostMention, (post) => post.mentionedMember)
  feedPostMentions: FeedPostMention[];
  // relations with comments
  @OneToMany(() => Comment, (comment) => comment.member)
  comments: Comment[];
  // relation with comment mentions
  @OneToMany(() => CommentMention, (mention) => mention.mentionedMember)
  commentsMemberShips: CommentMention[];
  // relations with chat rooms created
  @OneToMany(() => ChatRoom, (chatRoom) => chatRoom.createdBy)
  createdChatRooms: ChatRoom[];
  // relaytion with chat messages sent
  @OneToMany(() => ChatMessage, (message) => message.sentBy)
  sentChatMessages: ChatMessage[];
  // relation with chat room memberships
  @OneToMany(() => ChatRoom, (chatRoom) => chatRoom.members)
  chatRooms: ChatRoom[];
  // relation with chat message mentions
  @OneToMany(() => ChatMessageMention, (mention) => mention.mentionedMember)
  chatMessageMentions: ChatMessageMention[];
  // relation with chat message reactions
  @OneToMany(() => Reaction, (reaction) => reaction.member)
  chatMessageReactions?: Reaction[];
  // relations with notifications
  @OneToMany(() => Notification, (notification) => notification.receiver)
  notifications: Notification[];
}
