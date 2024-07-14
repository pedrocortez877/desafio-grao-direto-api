import { Module } from '@nestjs/common';
import { RestaurantController } from './controllers/restaurant.controller';
import { RestaurantService } from './services/restaurant.service';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { PrismaRestaurantRepository } from './repositories/prisma-restaurant.repository';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
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
