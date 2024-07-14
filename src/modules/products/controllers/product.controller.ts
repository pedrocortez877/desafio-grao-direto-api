import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ProductService } from '../services/product.service';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('menu')
  async findByRestaurantId(@Query('menuId') menuId: string) {
    return await this.productService.findByMenuId(menuId);
  }

  @Get('name')
  async findByName(@Query('menuName') menuName: string) {
    return await this.productService.findByName(menuName);
  }
}
