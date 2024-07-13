import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { HashService } from 'src/common/services/hash.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
  ) {}

  async create(data: CreateUserDto) {
    const { name, lastName, email, password } = data;

    const hashedPassword = await this.hashService.hash(password);

    return await this.userRepository.create({
      name,
      lastName,
      email,
      password: hashedPassword,
    });
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
}
