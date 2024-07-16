import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UseGuards,
  Body,
} from '@nestjs/common';
import { FavoriteService } from '../services/favorite.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { User } from '@prisma/client';
import { GetUser } from 'src/modules/auth/decorators/get-user.decorator';
import { CreateFavoriteDto } from '../dtos/create-favorite.dto';

@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  async addFavorite(
    @Body() { restaurantId }: CreateFavoriteDto,
    @GetUser() user: User,
  ) {
    console.log('🚀 ~ FavoriteController ~ restaurantId:', restaurantId);
    return this.favoriteService.addFavorite(user.id, restaurantId);
  }

  @Delete(':restaurantId')
  async removeFavorite(
    @Param('restaurantId') restaurantId: string,
    @GetUser() user: User,
  ) {
    return this.favoriteService.removeFavorite(user.id, restaurantId);
  }

  @Get()
  async getUserFavorites(@GetUser() user: User) {
    return this.favoriteService.getUserFavorites(user.id);
  }
}
