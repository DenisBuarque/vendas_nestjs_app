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
import { AuthGuard } from 'src/guards/auth.guard';
import { UserId } from 'src/decorators/user-id.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Roles(Role.User)
  @Post('/user')
  async create(
    @UserId() userId: number,
    @Body() data: CreateAddressDto,
  ) {
    return await this.addressService.create(data, userId);
  }

  @Roles(Role.User)
  @Get()
  async findAll(@UserId() id: number): Promise<ReturnAddressDto[]> {
    return (await this.addressService.findAll(id)).map(
      (addressEntity) => new ReturnAddressDto(addressEntity),
    );
  }

  @Roles(Role.User)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<AddressEntity> {
    return await this.addressService.findOne(id);
  }

  @Roles(Role.User)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Roles(Role.User)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
