import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import {
  OrganizationPlan,
  OrganizationStatus,
} from '@/common/enum/organization.enum';
import { BaseEntity } from '@/common/base/base.entity';
import { OrganizationMember } from '@/database/entities/organizationMember.entity';
import { Project } from '@/database/entities/project.entity';
import { Department } from './department.entity';
import { Task } from './tasks.entity';
import { TaskLog } from './taskLog.entity';
import { FeedPost } from './feedpost.entity';
import { Comment } from './comment.entity';

@Entity('organizations')
export class Organization extends BaseEntity {
  @Column({ unique: true, nullable: false, length: 255 })
  name: string;

  @Column({ unique: true, nullable: false, length: 255 })
  slug: string;

  @Column({ unique: true, nullable: false, length: 100 })
  tax_code: string;

  @Column({
    type: 'enum',
    enum: OrganizationStatus,
    default: OrganizationStatus.ACTIVE,
  })
  status: OrganizationStatus;

  @Column({
    type: 'enum',
    enum: OrganizationPlan,
    default: OrganizationPlan.FREE,
  })
  plan: OrganizationPlan;

  @Column({ nullable: true, length: 500 })
  address: string;

  @ManyToOne(() => Organization, (org) => org.children, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parent_id' })
  parent?: Organization | null;

  @OneToMany(() => Organization, (org) => org.parent)
  children: Organization[];
  // relations with organization members
  @OneToMany(() => OrganizationMember, (member) => member.organization)
  members: OrganizationMember[];
  // relations with projects
  @OneToMany(() => Project, (project) => project.organization)
  projects: Project[];
  // relations with departments
  @OneToMany(() => Department, (dept) => dept.organization)
  departments: Department[];
  // relations with tasks
  @OneToMany(() => Task, (task) => task.organization)
  tasks: Task[];
  // relations with task logs
  @OneToMany(() => TaskLog, (task) => task.organization)
  taskLogs: TaskLog[];
  // arelation with feed posts
  @OneToMany(() => FeedPost, (post) => post.organization)
  feedPosts: FeedPost[];
  // relation with comments
  @OneToMany(() => Comment, (comment) => comment.organization)
  comments: Comment[];
}
