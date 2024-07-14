import { Restaurant } from '@prisma/client';

export abstract class RestaurantRepository {
  abstract findAll(): Promise<Restaurant[]>;
}
