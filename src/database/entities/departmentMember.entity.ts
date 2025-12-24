import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from './department.entity';
import { OrganizationMember } from './organizationMember.entity';

@Entity('department_members')
export class DepartmentMember {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 255,
    nullable: true,
    type: 'varchar',
  })
  position: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  // relation with department
  @ManyToOne(() => Department, (dept) => dept.members, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'department_id' })
  department: Department;
  // relation with organization member
  @ManyToOne(
    () => OrganizationMember,
    (member) => member.departmentMemberships,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'organization_member_id' })
  organizationMember: OrganizationMember;
}
