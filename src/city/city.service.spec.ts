import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { CityEntity } from './entities/city.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const listCity = [
  {
    id: 1,
    name: 'Maceió',
    stateId: 147,
  },
  {
    id: 2,
    name: 'Arapiraca',
    stateId: 147,
  },
  {
    id: 3,
    name: 'Penedo',
    stateId: 147,
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
            findAll: jest.fn().mockResolvedValue(listCity),
            find: jest.fn().mockResolvedValue(listCity),
            findOne: jest.fn().mockResolvedValue(listCity[0]),
            getAllCitiesByState: jest.fn().mockResolvedValue(listCity[0]),
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
    it('should return all cities', async () => {
      const result = await service.findAll();
      expect(result).toEqual(listCity);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });

    it('should return erro list cities', async () => {
      jest.spyOn(repository, 'find').mockRejectedValueOnce(() => {
        throw new Error('Error city not found');
      });
      await expect(repository.find).rejects.toThrow('Error city not found');
    });
  });

  describe('findOne', () => {
    it('should return show city', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(listCity[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return throw erro show city', async () => {
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(() => {
        throw new Error('Error city not found');
      });
      await expect(service.findOne(undefined)).rejects.toThrow(
        'Error city not found',
      );
    });
  });

  describe('getAllCitiesByState', () => {
    it('should return all cities by state', async () => {
      const result = await service.getAllCitiesByState(1);
      expect(result).toEqual(listCity);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });

    it('should return error get all cities by state', async () => {
      jest.spyOn(repository, 'find').mockRejectedValueOnce(() => {
        throw new Error('Error state not found');
      });
      await expect(repository.find).rejects.toThrow('Error state not found');
    });
  });
});
