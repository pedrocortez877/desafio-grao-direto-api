import { Restaurant } from '@prisma/client';

export interface RestaurantSearchParams {
  where: any;
  include: any;
}

export abstract class RestaurantRepository {
  abstract findAll(): Promise<Restaurant[]>;
  abstract findById(id: string): Promise<Restaurant>;
  abstract findMany(params: RestaurantSearchParams): Promise<Restaurant[]>;
}
