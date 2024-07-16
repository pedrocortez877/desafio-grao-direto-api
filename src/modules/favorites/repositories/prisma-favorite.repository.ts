import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { FavoriteRepository } from './favorite.repository';
import { Favorite } from '@prisma/client';

@Injectable()
export class PrismaFavoriteRepository implements FavoriteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createFavorite(
    userId: string,
    restaurantId: string,
  ): Promise<Favorite> {
    return this.prisma.favorite.create({
      data: {
        userId,
        restaurantId,
      },
    });
  }

  async removeFavorite(userId: string, restaurantId: string): Promise<void> {
    await this.prisma.favorite.deleteMany({
      where: {
        userId,
        restaurantId,
      },
    });
  }

  async getFavoritesByUser(userId: string): Promise<Favorite[]> {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: { restaurant: true },
    });
  }
}
