import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessionController } from "./sessions.controller.js";
import { SessionService } from "./sessions.service.js";
import { Session } from "./entities/session.entity.js";


@Module({
    imports: [TypeOrmModule.forFeature([Session])],
    controllers: [SessionController],
    providers: [SessionService],
    exports: [SessionService]
})

export class SessionModule{}