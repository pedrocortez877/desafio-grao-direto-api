import { User } from '@prisma/client';
import { CreateUserDto } from '../dtos/create-user.dto';

export abstract class UserRepository {
  abstract create(data: CreateUserDto): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
}
