import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RestaurantsModule } from './modules/restaurants/restaurants.module';
import { MenusModule } from './modules/menus/menu.module';
import { ProductsModule } from './modules/products/product.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [
    CommonModule, // Módulo comum com serviços compartilhados
    UsersModule, // Módulo de usuários
    AuthModule, // Módulo de autenticação
    RestaurantsModule, // Módulo de restaurantes
    MenusModule, // Módulo de menus
    ProductsModule, // Módulo de produtos
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
