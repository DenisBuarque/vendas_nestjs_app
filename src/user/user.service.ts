import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRetository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDto): Promise<UserEntity> {
    const salt = 10;
    const hash = await bcrypt.hash(data.password, salt);

    data.password = hash;

    return await this.userRetository.save(data);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRetository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRetository.findOne({
      where: { id },
      relations: {
        adresses: {
          city: {
            state: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException(`User ${id} not found.`);

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
