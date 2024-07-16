import { Favorite } from '@prisma/client';

export abstract class FavoriteRepository {
  abstract createFavorite(
    userId: string,
    restaurantId: string,
  ): Promise<Favorite>;
  abstract removeFavorite(userId: string, restaurantId: string): Promise<void>;
  abstract getFavoritesByUser(userId: string): Promise<Favorite[]>;
}
