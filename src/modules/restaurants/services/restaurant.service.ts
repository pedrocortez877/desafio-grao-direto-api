import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '../repositories/restaurant.repository';
import { Restaurant } from '@prisma/client';

@Injectable()
export class RestaurantService {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  async findAll(): Promise<Restaurant[]> {
    return await this.restaurantRepository.findAll();
  }

  async findById(id: string): Promise<Restaurant> {
    return await this.restaurantRepository.findById(id);
  }

  async searchRestaurants(query: string): Promise<Restaurant[]> {
    return this.restaurantRepository.findMany({
      where: this.getSearchRestaurantConditions(query),
      include: this.getSearchRestaurantInclude(),
    });
  }

  private getSearchRestaurantConditions(query: string) {
    const productSearchConditions = {
      OR: [{ name: { contains: query } }, { description: { contains: query } }],
    };

    const menuSearchConditions = {
      some: {
        products: {
          some: productSearchConditions,
        },
      },
    };

    return {
      OR: [{ name: { contains: query } }, { menus: menuSearchConditions }],
    };
  }

  private getSearchRestaurantInclude() {
    return {
      menus: {
        include: {
          products: true,
        },
      },
    };
  }
}
