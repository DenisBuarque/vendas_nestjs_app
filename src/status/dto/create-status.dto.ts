import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateStatusDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'Digite no máximo 50 caracters.' })
  readonly name: string;

  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;
}
