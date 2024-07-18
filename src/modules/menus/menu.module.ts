import { Module } from '@nestjs/common';
import { MenuController } from './controllers/menu.controller';
import { MenuService } from './services/menu.service';
import { PrismaMenuRepository } from './repositories/prisma-menu.repository';
import { MenuRepository } from './repositories/menu.repository';

@Module({
  controllers: [MenuController],
  providers: [
    MenuService,
    {
      provide: MenuRepository,
      useClass: PrismaMenuRepository,
    },
  ],
})
export class MenusModule {}
