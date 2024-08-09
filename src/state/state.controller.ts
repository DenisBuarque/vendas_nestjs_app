import { Controller, Get, Param } from '@nestjs/common';
import { StateService } from './state.service';
import { ReturnAddressDto } from 'src/address/dto/return-address.dto';
import { ReturnStateDto } from './dto/return-state.dto';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  async findAll(): Promise<ReturnStateDto[]> {
    return (await this.stateService.findAll()).map((stateEntity) => new ReturnStateDto(stateEntity));
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.stateService.findOne(id);
  }

}
