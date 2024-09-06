import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Roles } from '../models/roles.enum';
import { Transform, TransformFnParams } from 'class-transformer';

export class UserTypeDto {
    @IsOptional()
    @IsNumber()
    id: number;

    @IsOptional()
    @IsString()
	email: string;

    @IsOptional()
    @IsString()
	password: string;

    @IsOptional()
    @IsString()
    @Transform((params: TransformFnParams)  => Roles[params.value])
	role: Roles;
}
