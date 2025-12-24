import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ProjectStatus } from '@/common/enum/project.enum';
import { BaseEntity } from '@/common/base/base.entity';
import { Organization } from '@/database/entities/organization.entity';
import { OrganizationMember } from '@/database/entities/organizationMember.entity';
import { ProjectMember } from '@/database/entities/projectMember.entity';
import { Task } from './tasks.entity';
import { FeedPost } from './feedpost.entity';

@Entity('projects')
export class Project extends BaseEntity {
  @Column({
    nullable: false,
    length: 255,
  })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.PENDING,
  })
  status: ProjectStatus;

  @Column({ type: 'date', nullable: true })
  start_date?: Date;

  @Column({ type: 'date', nullable: true })
  end_date?: Date;

  /* ================= relations ================= */

  @ManyToOne(() => Organization, (org) => org.projects, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @ManyToOne(() => OrganizationMember, (member) => member.projectsCreated, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'created_by_member_id' })
  createdBy: OrganizationMember;

  @OneToMany(() => ProjectMember, (member) => member.project)
  members: ProjectMember[];
  // relations with tasks
  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
  // realtion with feed posts
  @OneToMany(() => FeedPost, (post) => post.project)
  feedPosts: FeedPost[];
}
