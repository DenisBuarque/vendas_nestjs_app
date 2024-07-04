import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ReturnUserDTO } from './dto/return-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDto): Promise<UserEntity> {
    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(data.password, salt);

      data.password = hashPassword;

      return this.userRepository.save(data);
    } catch (error) {
      throw new BadRequestException('Create user error!');
    }
  }

  async findAll(): Promise<ReturnUserDTO[]> {
    return (await this.userRepository.find()).map((user) => new ReturnUserDTO(user));
  }

  async findOne(id: number): Promise<ReturnUserDTO> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found!');

    return new ReturnUserDTO(user);
  }

  async update(id: number, data: UpdateUserDto): Promise<UpdateResult> {
    await this.findOne(id);

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(data.password, salt);

    data.password = hashPassword;

    const user = await this.userRepository.update(id, data);

    return user;
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.userRepository.delete(id);
  }

  async getAddressByUser(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { id },
      relations: { address: { city: { state: true } } },
      select: ['id', 'name', 'phone', 'email'],
    });
  }

  async getUserByToken(id: number): Promise<UserEntity>  {
    return this.userRepository.findOne({ where: { id } });
  }
}
