import { Injectable } from '@nestjs/common';
import { MenuRepository } from '../repositories/menu.repository';
import { Menu } from '@prisma/client';

@Injectable()
export class MenuService {
  constructor(private readonly menuRepository: MenuRepository) {}

  async findByRestaurantId(restaurantId: string): Promise<Menu[]> {
    return this.menuRepository.findByRestaurantId(restaurantId);
  }

  async findByName(name: string): Promise<Menu[]> {
    return this.menuRepository.findByName(name);
  }
}
