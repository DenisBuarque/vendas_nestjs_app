import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { StateEntity } from './entities/state.entity';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  async create(@Body() data: CreateStateDto): Promise<StateEntity> {
    return await this.stateService.create(data);
  }

  @Get()
  async findAll(): Promise<StateEntity[]>  {
    return await this.stateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStateDto: UpdateStateDto) {
    return this.stateService.update(+id, updateStateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stateService.remove(+id);
  }
}
