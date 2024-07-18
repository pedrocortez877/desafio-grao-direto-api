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

    const restaurantSearchConditions = {
      OR: [{ name: { contains: query } }, { menus: menuSearchConditions }],
    };

    return this.restaurantRepository.findMany({
      where: restaurantSearchConditions,
      include: {
        menus: {
          include: {
            products: true,
          },
        },
      },
    });
  }
}
