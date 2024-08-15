import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CityService } from 'src/city/city.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async create(data: CreateAddressDto, userId: number): Promise<AddressEntity> {
    // verify if user id exist
    await this.userService.findOne(userId);
    // verify if city id exist
    await this.cityService.findOne(data.cityId);

    return await this.addressRepository.save({ ...data, userId });
  }

  async findAll(id: number): Promise<AddressEntity[]> {
    const adresses = await this.addressRepository.find({
      where: { userId: id },
    });
    if (!adresses)
      throw new NotFoundException(
        'No address added in the system, please add an address.',
      );
    return adresses;
  }

  async findOne(id: number): Promise<AddressEntity> {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: {
        city: {
          state: true,
        },
      },
    });
    if (!address) throw new NotFoundException(`Address ${id} not found.`);
    return address;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
