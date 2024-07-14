import { Controller, Get, UseGuards } from '@nestjs/common';
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
}
