import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CityEntity } from './entities/city.entity';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async findAll(): Promise<CityEntity[]> {
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
