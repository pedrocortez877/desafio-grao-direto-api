import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findByMenuId(menuId: string) {
    return this.productRepository.findByMenuId(menuId);
  }

  async findByName(name: string) {
    return this.productRepository.findByName(name);
  }
}
