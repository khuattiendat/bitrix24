import { BaseEntity } from '@/common/base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Organization } from './organization.entity';
import { DepartmentMember } from './departmentMember.entity';

@Entity('departments')
export class Department extends BaseEntity {
  @Column({
    nullable: false,
    length: 255,
  })
  name: string;
  @Column({
    nullable: true,
    type: 'text',
  })
  description: string;
  //relatio organization
  @ManyToOne(() => Organization, (org) => org.departments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;
  // parent department
  @ManyToOne(() => Department, (dept) => dept.children, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parent_id' })
  parent?: Department | null;

  // child departments
  @OneToMany(() => Department, (dept) => dept.parent)
  children: Department[];
  // relations with department members
  @OneToMany(() => DepartmentMember, (member) => member.department)
  members: DepartmentMember[];
}
