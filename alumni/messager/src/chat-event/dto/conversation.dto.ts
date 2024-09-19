import { IsNotEmpty, IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { MessageDto } from './message.dto';

export class ConversationDto {
  @IsString()
  @IsNotEmpty()
  readonly userIdDest: string;

  @IsNotEmpty()
  @IsString()
  readonly userIdExpe: string;

  @IsArray()
  readonly messages: [];
}
