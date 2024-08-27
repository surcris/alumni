import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TypePost } from 'src/emums/type-post.enum';
export class PostDto {
  @IsOptional()
  @IsNumber()
  readonly id?: number;

  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsOptional()
  @IsString()
  readonly media?: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  readonly postedAt: Date;

  @IsEnum(TypePost)
  @Type(() => String)
  @IsNotEmpty()
  readonly type: TypePost;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly authorId: string;
}
