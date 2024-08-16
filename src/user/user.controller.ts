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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dto/return-user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@UseGuards(AuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Admin)
  @Post()
  async create(@Body() data: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(data);
  }

  @Roles(Role.Admin, Role.User)
  @Get()
  async findAll(): Promise<ReturnUserDto[]> {
    return (await this.userService.findAll()).map(
      (userEntity) => new ReturnUserDto(userEntity),
    );
  }

  @Roles(Role.Admin, Role.User)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.findOne(id));
  }

  @Roles(Role.Admin, Role.User)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: UpdateUserDto): Promise<UpdateResult> {
    return await this.userService.update(id, data);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return await this.userService.remove(id);
  }
}
