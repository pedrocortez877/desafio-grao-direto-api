import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/common/services/database/prisma.service';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByMenuId(menuId: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        menuId,
      },
    });
  }

  findByName(name: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }
}
