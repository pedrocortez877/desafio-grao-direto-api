import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RestaurantService } from '../services/restaurant.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  async findAll() {
    return await this.restaurantService.findAll();
  }

  @Get('id')
  async getById(@Query('id') id: string) {
    return await this.restaurantService.findById(id);
  }

  @Get('search')
  async searchRestaurants(@Query('query') query: string) {
    return await this.restaurantService.searchRestaurants(query);
  }
}
