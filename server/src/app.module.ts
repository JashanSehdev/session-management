import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { SessionModule } from './sessions/sessions.module.js';
import { SessionsGateway } from './sessions/sessions.gateway.js';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }), JwtModule.register({
      global: true,
      secret : 'secret'
    }),
    SessionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
