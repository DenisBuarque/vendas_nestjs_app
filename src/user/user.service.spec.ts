import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from '../enums/role.enum';

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
            save: jest.fn().mockResolvedValue(UserEntity),
            find: jest.fn().mockResolvedValue(UserEntity),
            findAll: jest.fn().mockResolvedValue(UserEntity),
            findOne: jest.fn().mockResolvedValue(UserEntity),
            update: jest.fn().mockResolvedValue(UserEntity),
            exists: jest.fn().mockResolvedValue(UserEntity),
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
  });


  test('Test: create user', async () => {
    const data = {
      name: 'Moanna',
      phone: '82954876322',
      cpf: '042.457.678-65',
      email: 'moanna@gmail.com',
      password: '$2b$10$bewo1N.Sk5h7ZQvlcXT30uF.gmbL0hggvgB4o4BRdWjuPP.X.Z9L6',
      role: Role.User,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const user = await service.create(data);
    expect(user).toEqual(UserEntity);
    //expect(service.findAll()).toContainEqual(data);
  });

  test('Test: findAll users', async () => {
    const result = await service.findAll();
    expect(result).toEqual(UserEntity);
  });

  test('Test: findOne user by id', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(UserEntity);
  });

  test('update', async () => {
    const result = await service.update(1, {
      name: 'Moanna',
      phone: '82954876322',
      cpf: '042.457.678-65',
      email: 'moanna@gmail.com',
      password: '$2b$10$bewo1N.Sk5h7ZQvlcXT30uF.gmbL0hggvgB4o4BRdWjuPP.X.Z9L6',
      role: Role.User,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    expect(result).toEqual(UserEntity);
  });

  test('remove', async () => {
    const result = await service.remove(1);
    expect(result).toEqual(UserEntity);
  });
});
