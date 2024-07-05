import { Test, TestingModule } from '@nestjs/testing';
import { StateService } from './state.service';
import { StateEntity } from './entities/state.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReturnStateDTO } from './dto/return-state.dto';

const listState: ReturnStateDTO[] = [
  {
    id: 1,
    name: 'Acre',
    sigla: 'AC',
    cities: [],
  },
  {
    id: 2,
    name: 'Alagoas',
    sigla: 'AL',
    cities: [],
  },
  {
    id: 3,
    name: 'Amazonas',
    sigla: 'AM',
    cities: [],
  },
];

describe('StateService', () => {
  let service: StateService;
  let repository: Repository<StateEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateService,
        {
          provide: getRepositoryToken(StateEntity),
          useValue: {
            find: jest.fn().mockReturnValue(listState),
            findOne: jest.fn().mockResolvedValue(listState[0]),
          },
        },
      ],
    }).compile();

    service = module.get<StateService>(StateService);
    repository = module.get<Repository<StateEntity>>(
      getRepositoryToken(StateEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return list states', async () => {
      const result = await service.findAll();
      expect(result).toEqual(listState);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });

    it('should return throw error states list', async () => {
      jest.spyOn(repository, 'find').mockRejectedValueOnce(() => {
        throw new Error('States not found');
      });
      await expect(repository.find).rejects.toThrow('States not found');
    });
  });

  describe('findOne', () => {
    it('should return show state', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(listState[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return error show state', async () => {
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(() => {
        throw new Error('Erro return show state');
      });
      await expect(service.findOne(undefined)).rejects.toThrow(
        'Erro return show state',
      );
    });
  });
});
