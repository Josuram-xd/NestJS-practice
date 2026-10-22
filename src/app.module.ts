import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.getOrThrow('POSTGRES_HOST'),
      port: Number(configService.getOrThrow('POSTGRES_PORT')),
      username: configService.getOrThrow('POSTGRES_USER'),
      password: configService.getOrThrow('POSTGRES_PASWORD'),
      database: configService.getOrThrow('POSTGRES_DB'),
      synchronize: true,
      autoLoadEntities: true,
      entities: [],
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    PedidosModule,
  ],
})
export class AppModule {}
