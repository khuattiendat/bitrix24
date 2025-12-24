import { BaseEntity } from '@/common/base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { OrganizationMember } from './organizationMember.entity';
import { Task } from './tasks.entity';
import { Organization } from './organization.entity';

@Entity('task_logs')
export class TaskLog extends BaseEntity {
  @Column({ type: 'varchar', length: 255, name: 'update_desciption' })
  updateDescription: string;
  @Column({ type: 'varchar', length: 255, name: 'change_detail' })
  changeDetail: string;
  @ManyToOne(() => OrganizationMember, (member) => member.taskLogs, {
    nullable: false,
  })
  @JoinColumn({ name: 'created_by' })
  createBy: OrganizationMember;
  @ManyToOne(() => Task, (task) => task.logs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'task_id' })
  task: Task;
  @ManyToOne(() => Organization, (organization) => organization.taskLogs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;
}
