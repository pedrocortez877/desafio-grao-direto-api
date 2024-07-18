import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './user.service';
import { UserRepository } from '../repositories/user.repository';
import { User } from '@prisma/client';
import { HashService } from 'src/common/services/hash/hash.service';
import { CreateUserDto } from '../dtos/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UserRepository;
  let hashService: HashService;

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
    hashService = module.get<HashService>(HashService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Teste para a criação de usuário
  it('should create a user', async () => {
    const hashedPassword = 'hashedPassword';
    const createUserDto: CreateUserDto = {
      name: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'password',
    };

    const user: User = {
      id: 'someId',
      ...createUserDto,
    };

    jest.spyOn(repository, 'create').mockResolvedValue(user);
    jest.spyOn(hashService, 'hash').mockResolvedValue(hashedPassword);

    const result = await service.create(createUserDto);

    expect(result).toMatchObject(user);
    expect(repository.create).toHaveBeenCalledWith(createUserDto);
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
