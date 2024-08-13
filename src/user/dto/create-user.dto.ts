import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(11)
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(11)
  readonly cpf: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'A senha deve ter no minimo 6 caracteres' })
  password: string;

  @IsString()
  @IsOptional()
  @IsEnum(Role)
  readonly role: Role;

  @IsString()
  @IsOptional()
  readonly createdAt?: Date;

  @IsString()
  @IsOptional()
  updatedAt?: Date;
}
