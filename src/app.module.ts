import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { PedidosController } from './pedidos/pedidos.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, PedidosController],
  providers: [AppService],
})
export class AppModule {}
