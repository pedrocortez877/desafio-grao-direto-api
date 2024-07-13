import { CreateUserDto } from '../dtos/create-user.dto';

export abstract class UserRepository {
  abstract create(data: CreateUserDto): Promise<void>;
}
