import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressEntity } from './entities/address.entity';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { UpdateResult } from 'typeorm';

@UseGuards(AuthGuard, RolesGuard)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Roles(Role.User)
  @Post()
  async create(@Body() data: CreateAddressDto): Promise<AddressEntity> {
    return await this.addressService.create(data);
  }

  @Roles(Role.User)
  @Get()
  async findAll(): Promise<AddressEntity[]> {
    return await this.addressService.findAll();
  }

  @Roles(Role.User)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<AddressEntity> {
    return this.addressService.findOne(+id);
  }

  @Roles(Role.User)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: UpdateAddressDto): Promise<UpdateResult> {

    return await this.addressService.update(+id, data);
  }
}
