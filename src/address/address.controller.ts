import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressEntity } from './entities/address.entity';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { UpdateResult } from 'typeorm';
import { UserId } from '../decorators/userId.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Roles(Role.User)
  @Post()
  async create(
    @Body() data: CreateAddressDto,
    @UserId() userId: number,
  ): Promise<AddressEntity> {
    return await this.addressService.create(data, userId);
  }

  @Roles(Role.User)
  @Get()
  async findAll(): Promise<AddressEntity[]> {
    return await this.addressService.findAll();
  }

  @Roles(Role.User)
  @Get('user')
  async findAddressUser(@UserId() id: number): Promise<AddressEntity> {
    return await this.addressService.findAddressUser(id);
  }

  @Roles(Role.User)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AddressEntity> {
    return await this.addressService.findOne(+id);
  }

  @Roles(Role.User)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateAddressDto,
  ): Promise<UpdateResult> {
    return await this.addressService.update(+id, data);
  }
}
