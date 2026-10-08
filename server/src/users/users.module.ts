import { MiddlewareConsumer, Module, NestMiddleware, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { SessionModule } from '../sessions/sessions.module.js';
import { AuthMiddleware } from '../middleware/auth.middleware.js';
import { SessionsGateway } from '../sessions/sessions.gateway.js';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SessionModule, SessionsGateway],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthMiddleware)
              .exclude({path :'auth/login', method: RequestMethod.POST})
              .exclude({path :'auth/register', method: RequestMethod.POST})
              .forRoutes('*')
  }
}
