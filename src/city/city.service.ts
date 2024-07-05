import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from './entities/city.entity';
import { ReturnCityDTO } from './dto/return-city.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private cityRepository: Repository<CityEntity>,
  ) {}

  async findAll(): Promise<ReturnCityDTO[]> {
    return (
      await this.cityRepository.find({
        relations: {
          state: true,
        },
      })
    ).map((city) => new ReturnCityDTO(city));
  }

  async findOne(id: number): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({ where: { id } });
    if (!city) {
      throw new NotFoundException('City not found!');
    }
    return city;
  }

  async getAllCitiesByState(id: number): Promise<CityEntity[]> {
    return await this.cityRepository.find({ where: { stateId: id } });
  }
}
