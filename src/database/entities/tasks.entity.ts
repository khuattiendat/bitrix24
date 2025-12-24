import { BaseEntity } from '@/common/base/base.entity';
import { TaskPriority, TaskStatus } from '@/common/enum/task.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { OrganizationMember } from './organizationMember.entity';
import { Organization } from './organization.entity';
import { Project } from './project.entity';
import { TaskAssignee } from './taskAssigne.entity';
import { TaskLog } from './taskLog.entity';
import { Comment } from './comment.entity';

@Entity('tasks')
export class Task extends BaseEntity {
  @Column({
    nullable: false,
    length: 255,
  })
  title: string;
  @Column({ type: 'text', nullable: true })
  description: string;
  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;
  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.LOW,
  })
  priority: TaskPriority;
  @Column({ type: 'datetime', nullable: true, name: 'start_date' })
  startDate?: Date;
  @Column({ type: 'datetime', nullable: true, name: 'due_date' })
  dueDate?: Date;
  @Column({
    type: 'int',
    nullable: true,
    name: 'order_index',
  })
  orderIndex?: number;
  @Column({ type: 'datetime', nullable: true, name: 'closed_at' })
  closedAt?: Date;
  // create other relations as needed
  @ManyToOne(() => OrganizationMember, (member) => member.taskCreated, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'created_by_member_id' })
  createdBy: OrganizationMember;
  // rellation organization
  @ManyToOne(() => Organization, (organization) => organization.tasks, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;
  // relation project
  @ManyToOne(() => Project, (project) => project.tasks, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Project;
  // relation assignees
  @OneToMany(() => TaskAssignee, (assignee) => assignee.task)
  members: TaskAssignee[];
  //
  // relation logs
  @OneToMany(() => TaskLog, (log) => log.task)
  logs: TaskLog[];
  // relation comments
  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];
}
