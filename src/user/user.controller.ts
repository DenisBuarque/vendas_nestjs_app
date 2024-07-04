import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserId } from '../decorators/userId.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { ReturnUserDTO } from './dto/return-user.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Admin)
  @Post()
  async create(@Body() data: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(data);
  }

  @Roles(Role.Admin)
  @Get()
  async findAll(): Promise<ReturnUserDTO[]> {
    return await this.userService.findAll();
  }

  @Roles(Role.Admin)
  @Get('/bytoken')
  async getUserByToken(@UserId() userId: number): Promise<UserEntity> {
    return await this.userService.getUserByToken(userId);
  }

  @Roles(Role.Admin)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReturnUserDTO> {
    return this.userService.findOne(+id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userService.update(+id, data);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.remove(+id);
  }

  @Roles(Role.Admin)
  @Get('/address/:id')
  async getAddressByUserId(@Param('id') id: number): Promise<UserEntity> {
    return await this.userService.getAddressByUser(id);
  }

}
