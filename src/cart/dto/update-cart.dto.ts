import { PartialType } from '@nestjs/mapped-types';
//import { CreateCartDto } from './create-cart.dto';
import { InsertCartDTO } from './insert-cart.dto';

export class UpdateCartDto extends PartialType(InsertCartDTO) {}
//export class UpdateCartDto extends PartialType(CreateCartDto) {}
