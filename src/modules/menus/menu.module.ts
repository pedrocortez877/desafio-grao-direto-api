import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { MenuController } from './controllers/menu.controller';
import { MenuService } from './services/menu.service';
import { PrismaMenuRepository } from './repositories/prisma-menu.repository';
import { MenuRepository } from './repositories/menu.repository';

@Module({
  imports: [CommonModule],
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
