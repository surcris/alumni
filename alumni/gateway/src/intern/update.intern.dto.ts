import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class UpdateInternDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  // Ajouter d'autres champs et des validations selon ton modèle
}
