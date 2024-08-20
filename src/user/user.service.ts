import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDto): Promise<UserEntity> {
    
    const email = await this.userRepository.findOne({ where: { email: data.email }});
    if (email) throw new ForbiddenException('E-mail registered in sistem.');

    const salt = 10;
    const hash = await bcrypt.hash(data.password, salt);

    data.password = hash;

    return await this.userRepository.save(data);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    if (!users)
      throw new NotFoundException('Lista de users empty, please add an user.');
    return users;
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        adresses: {
          city: {
            state: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException(`User not found.`);

    return user;
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException(`E-mail ${email} not found.`);
    return user;
  }

  async update(id: number, data: UpdateUserDto): Promise<UpdateResult> {

    const user = await this.findOne(id);
    if (!user) throw new NotFoundException(`User not found.`);

    const salt = 10;
    const hash = await bcrypt.hash(data.password, salt);
    data.password = hash;
    
    data.updatedAt = new Date();

    return await this.userRepository.update(id, data);
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.userRepository.delete(id);
  }
}
