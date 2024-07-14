import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { MenuRepository } from './menu.repository';
import { Menu } from '@prisma/client';

@Injectable()
export class PrismaMenuRepository implements MenuRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByRestaurantId(restaurantId: string): Promise<Menu[]> {
    return this.prisma.menu.findMany({
      where: {
        restaurantId,
      },
    });
  }

  findByName(name: string): Promise<Menu[]> {
    return this.prisma.menu.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }
}
