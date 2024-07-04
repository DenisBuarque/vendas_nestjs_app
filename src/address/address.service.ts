import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';
import { ReturnAddressDTO } from './dto/return-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async create(data: CreateAddressDto, userId: number): Promise<AddressEntity> {
    //verify user exist
    await this.userService.findOne(userId);
    //verify city exist
    await this.cityService.findOne(data.cityId);

    data.userId = userId;

    return await this.addressRepository.save(data);
  }

  async findAll(): Promise<ReturnAddressDTO[]> {
    return (
      await this.addressRepository.find({
        relations: {
          user: true,
        },
      })
    ).map((address) => new ReturnAddressDTO(address));
  }

  async findOne(id: number): Promise<ReturnAddressDTO> {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: { city: { state: true } },
    });

    if (!address) throw new NotFoundException('Address not fount!');

    return new ReturnAddressDTO(address);
  }

  async findAddressUser(id: number): Promise<AddressEntity> {
    return await this.addressRepository.findOne({ where: { userId: id } });
  }

  async update(id: number, data: UpdateAddressDto): Promise<UpdateResult> {
    data.updatedAt = new Date();

    return await this.addressRepository.update(id, data);
  }
}
