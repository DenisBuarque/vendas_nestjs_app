import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from './address.service';
import { Repository } from 'typeorm';
import { AddressEntity } from './entities/address.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CityService } from '../city/city.service';
import { UserService } from '../user/user.service';
import { Role } from '../enums/role.enum';
import { CreateAddressDto } from './dto/create-address.dto';
import { UserId } from 'src/decorators/userId.decorator';

const listAddressEntity = [
  {
    id: 1,
    zip_code: '57000-000',
    address: 'Rua projetada 1',
    numberAddress: '8',
    district: 'Cannã',
    userId: 3,
    cityId: 147,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    zip_code: '57000-000',
    address: 'Rua projetada 2',
    numberAddress: '8',
    district: 'Serraria',
    userId: 6,
    cityId: 147,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

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

const listUserEntity = [
  {
    id: 1,
    name: 'Moanna',
    phone: '82954876322',
    cpf: '042.457.678-65',
    email: 'moanna@gmail.com',
    password: '$2b$10$bewo1N.Sk5h7ZQvlcXT30uF.gmbL0hggvgB4o4BRdWjuPP.X.Z9L6',
    role: Role.User,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Denis',
    phone: '82954876322',
    cpf: '042.457.678-65',
    email: 'denis@gmail.com',
    password: '$2b$10$bewo1N.Sk5h7ZQvlcXT30uF.gmbL0hggvgB4o4BRdWjuPP.X.Z9L6',
    role: Role.User,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'Marley',
    phone: '82954876322',
    cpf: '042.457.678-65',
    email: 'marley@gmail.com',
    password: '$2b$10$bewo1N.Sk5h7ZQvlcXT30uF.gmbL0hggvgB4o4BRdWjuPP.X.Z9L6',
    role: Role.User,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('AddressService', () => {
  let service: AddressService;
  let repository: Repository<AddressEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            create: jest.fn().mockReturnValue(listAddressEntity[0]),
            save: jest.fn().mockResolvedValue(listAddressEntity[0]),
            findAll: jest.fn().mockResolvedValue(listAddressEntity),
            find: jest.fn().mockResolvedValue(listAddressEntity),
            findOne: jest.fn().mockResolvedValue(listAddressEntity[0]),
            update: jest.fn().mockResolvedValue(listAddressEntity[0]),
            findAddressUser: jest.fn().mockResolvedValue(listAddressEntity[0]),
          },
        },
        {
          provide: CityService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(listCityEntity[0]),
          },
        },
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(listUserEntity[0]),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    repository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('Test: function findAll success', async () => {
      const result = await service.findAll();
      expect(result).toEqual(listAddressEntity);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });

    it('Test: function findAll error', async () => {
      // Espionando o método findOne e mockando sua implementação para lançar um erro
      jest.spyOn(repository, 'find').mockRejectedValueOnce(() => {
        throw new Error('Address not found');
      });
      // Testando se a chamada de findOne com um ID inválido lança o erro esperado
      await expect(repository.find).rejects.toThrow('Address not found');
    });
  });

  describe('findOne', () => {
    it('Test: function findOne success', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(listAddressEntity[0]);
      //Obriga a função findOne se executada pelomentos uma vez.
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Test: function findOne error', async () => {
      // Espionando o método findOne e mockando sua implementação para lançar um erro
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(() => {
        throw new Error('Address not found');
      });
      // Testando se a chamada de findOne com um ID inválido lança o erro esperado
      await expect(service.findOne(undefined)).rejects.toThrow(
        'Address not found',
      );
    });
  });

  describe('create', () => {
    it('Test: function create success', async () => {
      const data: CreateAddressDto = {
        zip_code: '57000-000',
        address: 'Rua projetada 1',
        numberAddress: '8',
        district: 'Cannã',
        userId: 3,
        cityId: 147,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await service.create(data, 3);
      expect(result).toEqual(listAddressEntity[0]);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('Test: function create error', async () => {
      const data: CreateAddressDto = {
        zip_code: '57000-000',
        address: '',
        numberAddress: '8',
        district: 'Cannã',
        cityId: 147,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Espionando o método findOne e mockando sua implementação para lançar um erro
      jest.spyOn(repository, 'save').mockRejectedValueOnce(() => {
        throw new Error('Address not found');
      });
      // Testando se a chamada de findOne com um ID inválido lança o erro esperado
      await expect(service.create(data, 3)).rejects.toThrow('Address not found');
    });
  });
});
