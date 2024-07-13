import { Module } from '@nestjs/common';
import { HashService } from './services/hash.service';
import { PrismaService } from './services/prisma.service';

@Module({
  providers: [HashService, PrismaService],
  exports: [HashService, PrismaService],
})
export class CommonModule {}
