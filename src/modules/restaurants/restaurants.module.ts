import { Module } from '@nestjs/common';
import { RestaurantController } from './controllers/restaurant.controller';
import { RestaurantService } from './services/restaurant.service';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { PrismaRestaurantRepository } from './repositories/prisma-restaurant.repository';

@Module({
  controllers: [RestaurantController],
  providers: [
    RestaurantService,
    {
      provide: RestaurantRepository,
      useClass: PrismaRestaurantRepository,
    },
  ],
})
export class RestaurantsModule {}
