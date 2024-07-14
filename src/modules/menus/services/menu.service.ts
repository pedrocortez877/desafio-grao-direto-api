import { Injectable } from '@nestjs/common';
import { MenuRepository } from '../repositories/menu.repository';

@Injectable()
export class MenuService {
  constructor(private readonly menuRepository: MenuRepository) {}

  async findByRestaurantId(restaurantId: string) {
    return this.menuRepository.findByRestaurantId(restaurantId);
  }

  async findByName(name: string) {
    return this.menuRepository.findByName(name);
  }
}
