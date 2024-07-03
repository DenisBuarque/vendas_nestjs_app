import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from '../enums/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn().mockReturnValue(listUserEntity[0]),
            save: jest.fn().mockResolvedValue(listUserEntity[0]),
            findAll: jest.fn().mockResolvedValue(listUserEntity),
            find: jest.fn().mockResolvedValue(listUserEntity),
            findOne: jest.fn().mockResolvedValue(listUserEntity[0]),
            update: jest.fn().mockResolvedValue(listUserEntity[0]),
            remove: jest.fn().mockResolvedValue(UserEntity),
            delete: jest.fn().mockResolvedValue(UserEntity),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('Test: function findAll success', async () => {
      const result = await service.findAll();
      expect(result).toEqual(listUserEntity);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });

    it('Test: function findAll error', async () => {
      // Espionando o método findOne e mockando sua implementação para lançar um erro
      jest.spyOn(repository, 'find').mockRejectedValueOnce(() => {
        throw new Error('Users not found');
      });
      // Testando se a chamada de findOne com um ID inválido lança o erro esperado
      await expect(repository.find).rejects.toThrow('Users not found');
    });
  });

  describe('findOne', () => {
    it('Test: function findOne success', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(listUserEntity[0]);
      //Obriga a função findOne se executada pelomentos uma vez.
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Test: function findOne error', async () => {
      // Espionando o método findOne e mockando sua implementação para lançar um erro
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(() => {
        throw new Error('User not found');
      });
      // Testando se a chamada de findOne com um ID inválido lança o erro esperado
      await expect(service.findOne(undefined)).rejects.toThrow(
        'User not found',
      );
    });
  });

  describe('create', () => {
    it('Test: function create success', async () => {
      const data: CreateUserDto = {
        name: 'Moanna',
        phone: '82954876322',
        cpf: '042.457.678-65',
        email: 'moanna@gmail.com',
        password:
          '$2b$10$bewo1N.Sk5h7ZQvlcXT30uF.gmbL0hggvgB4o4BRdWjuPP.X.Z9L6',
        role: Role.User,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await service.create(data);
      expect(result).toEqual(listUserEntity[0]);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('Test: function create error', async () => {
      const data: CreateUserDto = {
        name: '',
        phone: '82954876322',
        cpf: '042.457.678-65',
        email: 'moanna@gmail.com',
        password:
          '$2b$10$bewo1N.Sk5h7ZQvlcXT30uF.gmbL0hggvgB4o4BRdWjuPP.X.Z9L6',
        role: Role.User,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Espionando o método findOne e mockando sua implementação para lançar um erro
      jest.spyOn(repository, 'save').mockRejectedValueOnce(() => {
        throw new Error('User not found');
      });
      // Testando se a chamada de findOne com um ID inválido lança o erro esperado
      await expect(service.create(data)).rejects.toThrow('User not found');
    });
  });

  describe('update', () => {
    it('Test: function update success', async () => {
      const data: UpdateUserDto = {
        name: 'Moanna',
        phone: '82954876322',
        cpf: '042.457.678-65',
        email: 'moanna@gmail.com',
        password:
          '$2b$10$bewo1N.Sk5h7ZQvlcXT30uF.gmbL0hggvgB4o4BRdWjuPP.X.Z9L6',
        role: Role.User,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await service.update(1, data);
      expect(result).toEqual(listUserEntity[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.update).toHaveBeenCalledTimes(1);
    });

    it('Test: function update error', async () => {
      const data: CreateUserDto = {
        name: '',
        phone: '82954876322',
        cpf: '042.457.678-65',
        email: 'moanna@gmail.com',
        password:
          '$2b$10$bewo1N.Sk5h7ZQvlcXT30uF.gmbL0hggvgB4o4BRdWjuPP.X.Z9L6',
        role: Role.User,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Espionando o método findOne e mockando sua implementação para lançar um erro
      jest.spyOn(repository, 'update').mockRejectedValueOnce(() => {
        throw new Error('User not found');
      });
      // Testando se a chamada de findOne com um ID inválido lança o erro esperado
      await expect(service.update(1, data)).rejects.toThrow('User not found');
    });
  });

  describe('delete', () => {
    it('Test: function delete success', async () => {
      const result = await service.remove(1);
      expect(result).toEqual(UserEntity);
    });

    it('Test: function delete error', async () => {
      // Espionando o método findOne e mockando sua implementação para lançar um erro
      jest.spyOn(repository, 'delete').mockRejectedValueOnce(() => {
        throw new Error('User not delete');
      });
      // Testando se a chamada de findOne com um ID inválido lança o erro esperado
      await expect(repository.delete(undefined)).rejects.toThrow(
        'User not delete',
      );
    });
  });
});
