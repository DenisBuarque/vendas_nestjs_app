import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CityEntity } from './entities/city.entity';
import { ReturnCityDTO } from './dto/return-city.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async findAll(): Promise<ReturnCityDTO[]> {
    return await this.cityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cityService.findOne(+id);
  }

  @Get('/state/:id')
  async getAllCitiesByStateId(@Param('id') id: number): Promise<CityEntity[]> {
    return this.cityService.getAllCitiesByState(id);
  }
}
