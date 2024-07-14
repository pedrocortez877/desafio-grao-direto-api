import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RestaurantsModule } from './modules/restaurants/restaurants.module';
import { MenusModule } from './modules/menus/menu.module';
import { ProductsModule } from './modules/products/product.module';

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
  providers: [],
})
export class AppModule {}
