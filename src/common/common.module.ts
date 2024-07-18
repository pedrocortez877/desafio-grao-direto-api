import { Global, Module } from '@nestjs/common';
import { HashService } from './services/hash/hash.service';
import { PrismaService } from './services/database/prisma.service';
import { BcryptHashService } from './services/hash/bcrypt-hash.service';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: HashService,
      useClass: BcryptHashService,
    },
  ],
  exports: [HashService, PrismaService],
})
export class CommonModule {}
