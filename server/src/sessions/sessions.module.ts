import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessionController } from "./sessions.controller.js";
import { SessionService } from "./sessions.service.js";
import { Session } from "./entities/session.entity.js";
import { SessionsGateway } from './sessions.gateway.js';
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [TypeOrmModule.forFeature([Session]), JwtModule.register({
        secret:'secret'
    })],
    controllers: [SessionController],
    providers: [SessionService, SessionsGateway],
    exports: [SessionService, SessionsGateway]
})

export class SessionModule{}