import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { PedidosController } from './pedidos/pedidos.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, PedidosController],
  providers: [AppService, UserService],
})
export class AppModule {}
