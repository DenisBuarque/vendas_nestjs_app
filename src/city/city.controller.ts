import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CityEntity } from './entities/city.entity';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  async create(@Body() createCityDto: CreateCityDto): Promise<CityEntity> {
    return await this.cityService.create(createCityDto);
  }

  @Get()
  async findAll(): Promise<CityEntity[]> {
    return await this.cityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCityDto: UpdateCityDto) {
    return this.cityService.update(+id, updateCityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cityService.remove(+id);
  }
}
