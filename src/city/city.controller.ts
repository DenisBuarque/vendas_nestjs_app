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
  async findOne(@Param('id') id: string): Promise<CityEntity> {
    return await this.cityService.findOne(+id);
  }
}
