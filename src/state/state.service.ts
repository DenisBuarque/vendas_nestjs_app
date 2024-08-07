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
    private readonly stateRepository: Repository<StateEntity>,
  ){}

  async findAll(): Promise<StateEntity[]> {
    return await this.stateRepository.find();
  }

  async findOne(id: number) {
    const state = await this.stateRepository.findOne({ where: { id }});
    
    return state;
  }
}
