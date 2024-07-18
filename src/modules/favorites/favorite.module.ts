import { Module } from '@nestjs/common';
import { FavoriteService } from './services/favorite.service';
import { FavoriteController } from './controllers/favorite.controller';
import { PrismaFavoriteRepository } from './repositories/prisma-favorite.repository';
import { FavoriteRepository } from './repositories/favorite.repository';

@Module({
  controllers: [FavoriteController],
  providers: [
    FavoriteService,
    {
      provide: FavoriteRepository,
      useClass: PrismaFavoriteRepository,
    },
  ],
})
export class FavoriteModule {}
