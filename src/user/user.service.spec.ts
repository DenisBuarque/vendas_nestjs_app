import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '../enums/role.enum';
import { ForbiddenException } from '@nestjs/common';

const users = [
  {
    id: 4,
    name: 'Programador Web',
    email: 'denisprogramadorweb@gmail.com',
    phone: '82988365125',
    cpf: '14326641410',
    password: '$2b$10$bewo1N.Sk5h7ZQvlcXT30uF.gmbL0hggvgB4o4BRdWjuPP.X.Z9L6',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    name: 'Denis',
    email: 'denisbuarque@gmail.com',
    phone: '82988365125',
    cpf: '04226741412',
    password: '$2b$10$bewo1N.Sk5h7ZQvlcXT30uF.gmbL0hggvgB4o4BRdWjuPP.X.Z9L6',
    role: Role.User,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(users),
            findOne: jest.fn().mockResolvedValue(users[0]),
            save: jest.fn().mockResolvedValue(UserEntity),
            create: jest.fn().mockReturnValue(users[0]),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();
      expect(result).toEqual(users);
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw a excepion error', async () => {
      const error = new Error();
      jest.spyOn(userRepository, 'find').mockRejectedValueOnce(error);
      await expect(service.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(users[0]);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw a error if not found user', async () => {
      const error = new Error();
      jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(error);
      expect(service.findOne(1)).rejects.toThrowError();
    });
  });

  describe('getUserByEmail', () => {
    it('Should return an email user', async () => {
      const result = await service.getUserByEmail('denisbuarque@gmail.com');
      expect(result).toEqual(users[0]);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw exception if email not found', async () => {
      const error = new Error();
      jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(error);
      expect(service.findOne(undefined)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should return a new user', async () => {
      const data: CreateUserDto = {
        name: 'Programador Web',
        email: 'denisprogramadorweb@gmail.com',
        phone: '82988365125',
        cpf: '14326641410',
        password:
          '$2b$10$bewo1N.Sk5h7ZQvlcXT30uF.gmbL0hggvgB4o4BRdWjuPP.X.Z9L6',
        role: Role.Admin,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(null));

      const result = await service.create(data);

      expect(result).toEqual(UserEntity);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });

    it('Should throw an excepiton error', async () => {
      const data: CreateUserDto = {
        name: 'Denis',
        email: 'denisprogramadorweb@gmail.com',
        phone: '82988365125',
        cpf: '14326641412',
        password:
          '$2b$10$bewo1N.Sk5h7ZQvlcXT30uF.gmbL0hggvgB4o4BRdWjuPP.X.Z9L6',
        role: Role.Admin,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(null));

      jest.spyOn(userRepository, 'save').mockRejectedValueOnce('User not found.');

      expect(service.create(data)).rejects.toThrowError(ForbiddenException);
    });
  });

  /*describe('getUserByEmail', () => {
    it('should return user with email', async () => {
      const result = await service.getUserByEmail('john.doe@example.com');
      expect(result).toEqual(users[0]);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw a error if not found email user', async () => {
      const error = new Error('Repository error');
      jest.spyOn(userRepository, 'findOne').mockRejectedValue(error);
      await expect(service.getUserByEmail(undefined)).rejects.toThrowError(
        error,
      );
    });
  });*/

  /*
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
  
  */
});
