import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from '../enums/role.enum';
import { CreateUserDto } from './dto/create-user.dto';

const users = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.doe@example.com' },
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

    it('should throw an error if the repository throws an error', async () => {
      const error = new Error('Repository error');
      jest.spyOn(userRepository, 'find').mockRejectedValue(error);
      await expect(service.findAll()).rejects.toThrowError(error);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(users[0]);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw a error if not found user', async () => {
      const error = new Error('Repository error');
      jest.spyOn(userRepository, 'findOne').mockRejectedValue(error);
      await expect(service.findOne(undefined)).rejects.toThrowError(error);
    });
  });

  describe('getUserByEmail', () => {
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
  });

  
});
