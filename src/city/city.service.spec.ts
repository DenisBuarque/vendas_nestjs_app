import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { CityEntity } from './entities/city.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const listCityEntity = [
  {
    id: 1,
    name: 'Maceió',
    stateId: 147,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Arapiraca',
    stateId: 147,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'Penedo',
    stateId: 147,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('CityService', () => {
  let service: CityService;
  let repository: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            findAll: jest.fn().mockResolvedValue(listCityEntity),
            find: jest.fn().mockResolvedValue(listCityEntity),
            findOne: jest.fn().mockResolvedValue(listCityEntity[0]),
            getAllCitiesByState: jest.fn().mockResolvedValue(listCityEntity[0]),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    repository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('Test: function findAll success', async () => {
      const result = await service.findAll();
      expect(result).toEqual(listCityEntity);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });

    it('Test: function findAll error', async () => {
      // Espionando o método findOne e mockando sua implementação para lançar um erro
      jest.spyOn(repository, 'find').mockRejectedValueOnce(() => {
        throw new Error('City not found');
      });
      // Testando se a chamada de findOne com um ID inválido lança o erro esperado
      await expect(repository.find).rejects.toThrow('City not found');
    });
  });

  describe('findOne', () => {
    it('Test: function findOne success', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(listCityEntity[0]);
      //Obriga a função findOne se executada pelomentos uma vez.
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Test: function findOne error', async () => {
      // Espionando o método findOne e mockando sua implementação para lançar um erro
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(() => {
        throw new Error('City not found');
      });
      // Testando se a chamada de findOne com um ID inválido lança o erro esperado
      await expect(service.findOne(undefined)).rejects.toThrow(
        'City not found',
      );
    });
  });

  describe('getAllCitiesByState', () => {
    it('Test: function getAllCitiesByState success', async () => {
      const result = await service.getAllCitiesByState(1);
      expect(result).toEqual(listCityEntity);
      //Obriga a função findOne se executada pelomentos uma vez.
      expect(repository.find).toHaveBeenCalledTimes(1);
    });

    it('Test: function getAllCitiesByState error', async () => {
      // Espionando o método findOne e mockando sua implementação para lançar um erro
      jest.spyOn(repository, 'find').mockRejectedValueOnce(() => {
        throw new Error('Cities not found');
      });
      // Testando se a chamada de findOne com um ID inválido lança o erro esperado
      await expect(repository.find).rejects.toThrow('Cities not found');
    });
  });
});
