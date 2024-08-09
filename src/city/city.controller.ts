import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { CityEntity } from './entities/city.entity';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async findAll(): Promise<CityEntity[]> {
    return await this.cityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CityEntity> {
    return await this.cityService.findOne(id);
  }

  @Get('/state/:id')
  async getAllCitiesByState(@Param('id') id: number): Promise<CityEntity[]> {
    return await this.cityService.getAllCitiesByState(+id);
  }
}
