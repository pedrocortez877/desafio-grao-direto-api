import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { HashService } from '../../../common/services/hash.service';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { name, lastName, email, password } = createUserDto;

    const hashedEmail = await this.hashService.hash(email);
    const hashedPassword = await this.hashService.hash(password);

    const user = await this.userRepository.create({
      name,
      lastName,
      email: hashedEmail,
      password: hashedPassword,
    });

    return user;
  }
}
