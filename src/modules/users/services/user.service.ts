import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(newUser: CreateUserDto) {
    return await this.userRepository.create(newUser);
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
}
