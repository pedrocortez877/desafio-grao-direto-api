import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    CommonModule, // Módulo comum com serviços compartilhados
    UsersModule, // Módulo de usuários
    AuthModule, // Módulo de autenticação
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
