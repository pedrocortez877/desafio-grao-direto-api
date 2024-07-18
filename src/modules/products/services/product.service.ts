import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findByMenuId(menuId: string): Promise<Product[]> {
    return this.productRepository.findByMenuId(menuId);
  }

  async findByName(name: string): Promise<Product[]> {
    return this.productRepository.findByName(name);
  }
}
