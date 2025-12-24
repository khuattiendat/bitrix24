import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '@/common/base/base.entity';
import { UserRole, userStatus } from '@/common/enum/user.enum';
import { File } from '@/database/entities/file.entity';
import { OrganizationMember } from '@/database/entities/organizationMember.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true, nullable: false, length: 255 })
  email: string;
  @Column({
    nullable: false,
    select: false,
  })
  password: string;
  @Column({
    nullable: false,
    length: 255,
  })
  full_name: string;
  @ManyToOne(() => File, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'avatar_id' })
  avatar?: File | null;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.NONE,
  })
  system_role: UserRole;
  @Column({
    type: 'enum',
    enum: userStatus,
    default: userStatus.ACTIVE,
  })
  status: userStatus;
  @Column({
    nullable: true,
  })
  date_of_birth: Date;
  @Column({
    nullable: true,
  })
  last_login_at: Date;
  @OneToMany(() => OrganizationMember, (member) => member.user)
  organizationMemberships: OrganizationMember[];
}
