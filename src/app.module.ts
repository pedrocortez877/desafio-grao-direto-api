import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RestaurantsModule } from './modules/restaurants/restaurants.module';

@Module({
  imports: [
    CommonModule, // Módulo comum com serviços compartilhados
    UsersModule, // Módulo de usuários
    AuthModule, // Módulo de autenticação
    RestaurantsModule, // Módulo de restaurantes
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
