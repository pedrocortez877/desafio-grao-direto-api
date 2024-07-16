import { Injectable } from '@nestjs/common';
import { MenuRepository } from './menu.repository';
import { Menu } from '@prisma/client';
import { PrismaService } from 'src/common/services/database/prisma.service';

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
