import { PartialType } from '@nestjs/mapped-types';
import { InternDto } from './intern.dto';

export class UpdateInternDto extends PartialType(InternDto) {}
