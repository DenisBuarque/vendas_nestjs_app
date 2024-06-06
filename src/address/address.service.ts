import { BadRequestException, Injectable, NotFoundException, Req, Res } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CityService } from 'src/city/city.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async create(data: CreateAddressDto): Promise<AddressEntity> {
    // verify user exist
    await this.userService.findOne(data.userId);
    //verify city exist
    await this.cityService.findOne(data.cityId);

    const user = await this.addressRepository.findOne({ where: {userId: data.userId}});
    if(user) throw new BadRequestException('Please! Add another user.');

    //save data address
    return await this.addressRepository.save(data);
  }

  async findAll(): Promise<AddressEntity[]> {
    return await this.addressRepository.find();
  }

  async findOne(id: number): Promise<AddressEntity> {

    const exist = await this.addressRepository.exists({ where: {id}});
    if(!exist) throw new NotFoundException('Address not fount!');

    return await this.addressRepository.findOne({ where: {id}, relations: { city: { state: true} }});
  }

  async update(id: number, data: UpdateAddressDto): Promise<UpdateResult> {

    data.updatedAt = new Date();

    return await this.addressRepository.update(id, data);
  }

}
