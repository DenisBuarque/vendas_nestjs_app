import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(data);
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @Get('/address/:id')
  async getAddressByUserId(@Param('id') id: number): Promise<UserEntity> {
    return await this.userService.getAddressByUserId(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: UpdateUserDto) {
    return this.userService.update(+id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.userService.remove(+id);
  }
}
