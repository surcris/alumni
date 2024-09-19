import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  // IsArray,
  IsNotEmpty,
  // IsNumber,
  IsString,
} from 'class-validator';
import { CompanyType } from 'src/models/company.type';
import { PoeType } from 'src/models/poe.type';
import { Skills } from 'src/schemas/skills.schema';

export class InternDto {
  // @IsNumber()
  readonly _id?: number;

  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @IsString()
  @IsNotEmpty()
  readonly firstname: string;

  @IsString()
  @IsNotEmpty()
  readonly gender: string;

  @IsString({ each: true })
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  readonly emails: string[];

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  readonly occupation: string;

  @IsNotEmpty()
  readonly company: CompanyType;

  @IsNotEmpty()
  readonly poe: PoeType;

  @IsNotEmpty()
  readonly userId: number;

  @IsArray()
  skills: Skills[];
}
