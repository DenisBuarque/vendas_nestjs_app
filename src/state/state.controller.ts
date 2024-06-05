import { Controller, Get, Param } from '@nestjs/common';
import { StateService } from './state.service';
import { StateEntity } from './entities/state.entity';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  async findAll(): Promise<StateEntity[]>  {
    return await this.stateService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<StateEntity> {
    return await this.stateService.findOne(+id);
  }

}
