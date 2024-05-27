import { Injectable } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StateEntity } from './entities/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StateService {

  constructor(
    @InjectRepository(StateEntity)
    private stateRepository: Repository<StateEntity>,
  ){}

  async create(data: CreateStateDto): Promise<StateEntity> {
    return this.stateRepository.create(data);
  }

  async findAll(): Promise<StateEntity[]> {
    return await this.stateRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} state`;
  }

  update(id: number, updateStateDto: UpdateStateDto) {
    return `This action updates a #${id} state`;
  }

  remove(id: number) {
    return `This action removes a #${id} state`;
  }
}
