import { OrganizationMemberRole } from '@/common/enum/organization.enum';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @MinLength(6)
  password: string;
  @IsNotEmpty()
  fullName: string;
  @IsNumber()
  organizationId: number;
  @IsEnum(OrganizationMemberRole)
  orgnazitionRole: OrganizationMemberRole;
}
