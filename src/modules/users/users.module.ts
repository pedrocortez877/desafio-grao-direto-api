import { Module } from '@nestjs/common';
import { CommonModule } from '../../common/common.module';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/create-user.service';
import { UserRepository } from './repositories/user.repository';
import { PrismaUserRepository } from './repositories/prisma-user.repository';

@Module({
  imports: [CommonModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class UsersModule {}
