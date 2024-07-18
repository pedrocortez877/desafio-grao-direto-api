import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from 'src/modules/users/services/user.service';
import { HashService } from '../../../common/services/hash/hash.service';
import { BadRequestException } from '@nestjs/common';
import { SignInDto } from '../dtos/signIn.dto';
import { SignUpDto } from '../dtos/signup.dto';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;
  let hashService: Partial<HashService>;

  beforeEach(async () => {
    usersService = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };
    jwtService = {
      sign: jest.fn(),
    };
    hashService = {
      hash: jest.fn(),
      compare: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
        { provide: HashService, useValue: hashService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return null if user is not found', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);
      const result = await service.validateUser('test@example.com', 'password');
      expect(result).toBeNull();
    });

    it('should return null if password does not match', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
      } as any;
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(hashService, 'compare').mockResolvedValue(false);
      const result = await service.validateUser('test@example.com', 'password');
      expect(result).toBeNull();
    });

    it('should return user if password matches', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
      } as any;
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(hashService, 'compare').mockResolvedValue(true);
      const result = await service.validateUser('test@example.com', 'password');
      expect(result).toEqual(user);
    });
  });

  describe('checkEmailAlreadyExists', () => {
    it('should return true if email exists', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue({} as any);
      const result = await service.checkEmailAlreadyExists('test@example.com');
      expect(result).toBe(true);
    });

    it('should return false if email does not exist', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);
      const result = await service.checkEmailAlreadyExists('test@example.com');
      expect(result).toBe(false);
    });
  });

  describe('signIn', () => {
    it('should throw error if user is not validated', async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValue(null);
      const signInDto: SignInDto = {
        email: 'test@example.com',
        password: 'password',
      };
      await expect(service.signIn(signInDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return access token if user is validated', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      } as any;
      jest.spyOn(service, 'validateUser').mockResolvedValue(user);
      jest.spyOn(jwtService, 'sign').mockReturnValue('signedJwtToken');
      const signInDto: SignInDto = {
        email: 'test@example.com',
        password: 'password',
      };
      const result = await service.signIn(signInDto);
      expect(result).toEqual({ access_token: 'signedJwtToken' });
    });
  });

  describe('signUp', () => {
    it('should throw error if email already exists', async () => {
      jest.spyOn(service, 'checkEmailAlreadyExists').mockResolvedValue(true);
      const signUpDto: SignUpDto = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
        lastName: 'Last Name',
      };
      await expect(service.signUp(signUpDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should create new user if email does not exist', async () => {
      jest.spyOn(service, 'checkEmailAlreadyExists').mockResolvedValue(false);
      jest.spyOn(hashService, 'hash').mockResolvedValue('hashedPassword');
      jest
        .spyOn(usersService, 'create')
        .mockResolvedValue({ id: '1', email: 'test@example.com' } as any);
      const signUpDto: SignUpDto = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
        lastName: 'Last Name',
      };
      const result = await service.signUp(signUpDto);
      expect(result).toEqual({ id: '1', email: 'test@example.com' });
    });
  });
});
