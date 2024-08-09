import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {

  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>
  ){}

  async findAll(): Promise<CityEntity[]> {
    return await this.cityRepository.find();
  }

  async findOne(id: number): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({ where: { id }});
    if(!city) throw new NotFoundException(`City ${id} not found.`);
    return city;
  }

  async getAllCitiesByState (id: number): Promise<CityEntity[]> {
    const cities = await this.cityRepository.find({ where: { stateId: id }});
    return cities;
  }
}
