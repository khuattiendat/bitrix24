import { OrganizationMemberRole } from '@/common/enum/organization.enum';
import { IsEmail, IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsOptional()
  fullName: string;
  @IsOptional()
  dateOfBirth: Date;
}
