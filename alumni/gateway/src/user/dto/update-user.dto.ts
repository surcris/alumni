import { PartialType } from '@nestjs/mapped-types';
import { UserTypeDto } from './user-type.dto';

export class UpdateUserDto extends PartialType(UserTypeDto) {}
