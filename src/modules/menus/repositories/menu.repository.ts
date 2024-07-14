import { Menu } from '@prisma/client';

export abstract class MenuRepository {
  abstract findByRestaurantId(restaurantId: string): Promise<Menu[]>;
  abstract findByName(name: string): Promise<Menu[]>;
}
