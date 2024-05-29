import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ){}

  async create(data: CreateUserDto): Promise<UserEntity> {

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(data.password, salt);

    data.password = hashPassword;

    return this.userRepository.save(data);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getAddressByUserId(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { id }, relations: {address: {city: {state: true} } }, select: ['id', 'name','phone','email']
    });
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({where: {id}});
    if(!user){
      throw new NotFoundException("Usuário não encontrado!");
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
