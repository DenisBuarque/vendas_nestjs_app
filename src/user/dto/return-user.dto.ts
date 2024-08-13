import { ReturnAddressDto } from 'src/address/dto/return-address.dto';
import { UserEntity } from '../entities/user.entity';

export class ReturnUserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  role: string;
  adresses?: ReturnAddressDto[];

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.phone = userEntity.phone;
    this.cpf = userEntity.cpf;
    this.role = userEntity.role;
    this.adresses = userEntity.adresses
      ? userEntity.adresses.map((address) => new ReturnAddressDto(address))
      : undefined;
  }
}
