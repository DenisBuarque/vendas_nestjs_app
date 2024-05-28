import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from './entities/city.entity';

@Injectable()
export class CityService {

  constructor(
    @InjectRepository(CityEntity)
    private cityRepository: Repository<CityEntity>,
  ){}

  async create(data: CreateCityDto): Promise<CityEntity> {
    return await this.cityRepository.save(data);
  }

  async findAll(): Promise<CityEntity[]> {
    return await this.cityRepository.find();
  }

  async getAllCitiesByStateId(id: number): Promise<CityEntity[]> {
    return await this.cityRepository.find({ where: {stateId: id}});
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
