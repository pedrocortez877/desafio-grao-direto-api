import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ProductRepository } from './repositories/product.repository';
import { PrismaProductRepository } from './repositories/prisma-product.repository';

@Module({
  imports: [CommonModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    },
  ],
})
export class ProductsModule {}
