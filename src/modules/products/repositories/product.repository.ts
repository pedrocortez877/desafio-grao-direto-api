import { Product } from '@prisma/client';

export abstract class ProductRepository {
  abstract findByMenuId(menuId: string): Promise<Product[]>;
  abstract findByName(name: string): Promise<Product[]>;
}
