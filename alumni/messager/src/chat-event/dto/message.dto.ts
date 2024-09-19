import { IsNotEmpty, IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class MessageDto {
    @IsNotEmpty()
    @IsString()
    readonly content: string;
  
    @IsNotEmpty()
    @IsString()
    readonly userId: string;
  
    readonly datetime?: Date;

    @IsString()
    statut: string;
}
