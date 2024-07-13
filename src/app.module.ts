import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    CommonModule, // Módulo comum com serviços compartilhados
    UsersModule, // Módulo de usuários
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
