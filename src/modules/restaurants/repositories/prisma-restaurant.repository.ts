import { Restaurant } from '@prisma/client';
import {
  RestaurantRepository,
  RestaurantSearchParams,
} from './restaurant.repository';
import { PrismaService } from 'src/common/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaRestaurantRepository implements RestaurantRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Restaurant[]> {
    return this.prisma.restaurant.findMany();
  }

  findById(id: string): Promise<Restaurant> {
    return this.prisma.restaurant.findUnique({
      where: { id },
      include: { menus: { include: { products: true } } },
    });
  }

  findMany(params: RestaurantSearchParams): Promise<Restaurant[]> {
    return this.prisma.restaurant.findMany(params);
  }
}
