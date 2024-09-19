import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateConversationDto {
  @IsNotEmpty()
  @IsString()
  readonly userIdDest: string;

  @IsNotEmpty()
  @IsString()
  readonly userIdExpe: string;

  @IsNotEmpty()
  @IsArray()
  readonly messages: [];
}
