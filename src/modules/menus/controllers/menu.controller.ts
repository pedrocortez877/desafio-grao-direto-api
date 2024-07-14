import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { MenuService } from '../services/menu.service';

@UseGuards(JwtAuthGuard)
@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('restaurant')
  async findByRestaurantId(@Query('restaurantId') restaurantId: string) {
    return await this.menuService.findByRestaurantId(restaurantId);
  }

  @Get('name')
  async findByName(@Query('name') name: string) {
    return await this.menuService.findByName(name);
  }
}
