import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { SessionService } from '../sessions/sessions.service.js';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sessionService : SessionService
  ) {}

  async use(req: Request & { user: any }, res: Response, next: NextFunction) {
    const token = this.extractTokenFromCookie(req);
    console.log("middleware",token)
    if (!token) {
      return next(new UnauthorizedException('Token not found')); 
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      console.log(payload)
      req['user'] = payload;
      const session = await this.sessionService.findOne(payload.session)
        console.log("session", session)
      if (!session?.isActive){
        return next(new UnauthorizedException({code : 'INVALID_SESSION'}))
      }
      next(); 
    } catch (error) {
      return next(new UnauthorizedException('Invalid or expired token'));
    }
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    console.log("request called",request.cookies)
    return request.cookies?.access_token; 
  }
}