import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from './tasks.entity';
import { OrganizationMember } from './organizationMember.entity';

@Entity('task_assignees')
export class TaskAssignee {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    name: 'assigned_at',
    type: 'datetime',
    nullable: true,
  })
  assignedAt: Date;
  // relation task
  @ManyToOne(() => Task, (task) => task.members, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'task_id' })
  task: Task;
  // relation member
  @ManyToOne(() => OrganizationMember, (member) => member.taskAssignees, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organization_member_id' })
  member: OrganizationMember;
}
