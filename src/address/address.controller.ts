import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressEntity } from './entities/address.entity';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/Role.decorator';
import { Role } from 'src/enums/role.enum';

//@UseGuards(RolesGuard)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  //@Roles(Role.User)
  @Post()
  async create(@Body() data: CreateAddressDto): Promise<AddressEntity> {
    return await this.addressService.create(data);
  }

  @Get()
  async findAll(): Promise<AddressEntity[]> {
    return await this.addressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
