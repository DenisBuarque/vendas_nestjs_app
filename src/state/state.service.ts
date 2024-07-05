import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StateEntity } from './entities/state.entity';
import { Repository } from 'typeorm';
import { ReturnStateDTO } from './dto/return-state.dto';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateEntity)
    private stateRepository: Repository<StateEntity>,
  ) {}

  async findAll(): Promise<ReturnStateDTO[]> {
    return await this.stateRepository.find();
  }

  async findOne(id: number): Promise<StateEntity> {
    const state = await this.stateRepository.findOne({ where: { id } });
    if (!state) throw new NotFoundException('State not found!');

    return state;
  }
}
