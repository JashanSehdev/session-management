import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req } from "@nestjs/common";
import { CreateSessionDto } from "./Dto/create-session.dto.js";
import { Repository } from "typeorm";
import { Session } from "./entities/session.entity.js";
import { SessionService } from "./sessions.service.js";
import { RemoveUserOptions } from "typeorm/driver/mongodb/typings.js";
import { VerifyTokenDto } from "./Dto/token-verify.dto.js";

@Controller('sessions')

export class SessionController {
    constructor(
    private readonly sessionService : SessionService
){}

    @Get('code/:id')
    async getCode(@Param('id', ParseIntPipe) sessionId : number ) {
        return await this.sessionService.getCode(sessionId)
    }

    @Get('active')
    async getAllActiveSessions(@Req() req : Request & {user : any}) {
        return await this.sessionService.getAllUserActiveSessions(req.user.id)
    }

    @Patch('deactive/:id')
    async deactivateSession(@Param('id') id : number  ,@Req() req : Request & {user : any}) {
        await this.sessionService.update(id, {isActive : false})
        await this.sessionService.resetToken(req.user.id)
        return {code : "SESSION_DEACTIVATED", message : 'session deactivated kindly login'}
    }

    @Post('check')
    async checkToken(@Req() req : Request & {user : any}, @Body() verifyTokenDto : VerifyTokenDto){
        return await this.sessionService.verifyToken(req.user.id, verifyTokenDto)
    }
    
}