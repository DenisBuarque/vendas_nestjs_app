import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressEntity } from './entities/address.entity';
import { ReturnAddressDto } from './dto/return-address.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@UseGuards(RolesGuard)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('/user/:userId')
  @Roles(Role.User)
  async create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() data: CreateAddressDto,
  ) {
    return await this.addressService.create(data, userId);
  }

  @Get()
  async findAll(): Promise<ReturnAddressDto[]> {
    return (await this.addressService.findAll()).map(
      (addressEntity) => new ReturnAddressDto(addressEntity),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<AddressEntity> {
    return await this.addressService.findOne(id);
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
