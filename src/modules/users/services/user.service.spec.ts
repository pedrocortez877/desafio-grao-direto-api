import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './user.service';
import { UserRepository } from '../repositories/user.repository';
import { HashService } from 'src/common/services/hash.service';
import { User } from '@prisma/client';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            findByEmail: jest.fn(),
            findAll: jest.fn(),
          },
        },
        {
          provide: HashService,
          useValue: {
            hash: jest.fn(),
            comparePassword: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Teste para a criação de usuário
  it('should create a user', async () => {
    const createUserDto = {
      name: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'password',
    };
    const hashedPassword = 'hashedPassword';
    const user: User = {
      ...createUserDto,
      password: hashedPassword,
      id: 'someId',
    } as User;

    jest.spyOn(repository, 'create').mockResolvedValue(user);
    jest
      .spyOn(service['hashService'], 'hash')
      .mockResolvedValue(hashedPassword);

    const result = await service.create(createUserDto);

    expect(result).toMatchObject({
      name: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: hashedPassword,
    });
    expect(repository.create).toHaveBeenCalledWith({
      name: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: hashedPassword,
    });
  });

  // Teste para encontrar um usuário por email
  it('should find a user by email', async () => {
    const email = 'test@example.com';
    const user = {
      id: '2dwedf12313wf',
      name: 'John',
      lastName: 'Doe',
      email,
      password: 'hashedPassword',
    };
    jest.spyOn(repository, 'findByEmail').mockResolvedValue(user);

    const result = await service.findByEmail(email);

    expect(result).toEqual(user);
    expect(repository.findByEmail).toHaveBeenCalledWith(email);
  });
});
