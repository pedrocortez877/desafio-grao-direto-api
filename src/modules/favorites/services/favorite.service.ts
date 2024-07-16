import { Injectable } from '@nestjs/common';
import { FavoriteRepository } from '../repositories/favorite.repository';
import { Favorite } from '@prisma/client';

@Injectable()
export class FavoriteService {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async addFavorite(userId: string, restaurantId: string): Promise<Favorite> {
    return this.favoriteRepository.createFavorite(userId, restaurantId);
  }

  async removeFavorite(userId: string, restaurantId: string): Promise<void> {
    return this.favoriteRepository.removeFavorite(userId, restaurantId);
  }

  async getUserFavorites(userId: string): Promise<Favorite[]> {
    return this.favoriteRepository.getFavoritesByUser(userId);
  }
}
