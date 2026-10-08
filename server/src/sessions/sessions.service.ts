import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateSessionDto } from './Dto/create-session.dto.js';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSessionDto } from './Dto/update-session.dto.js';
import { VerifyTokenDto } from './Dto/token-verify.dto.js';
import { SessionsGateway } from './sessions.gateway.js';
@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    
  ) {}

  async create(createSessionDto: CreateSessionDto) {
    const session = this.sessionRepository.create({
      ...createSessionDto,
      isActive: true,
    });
    return await this.sessionRepository.save(session);
  }


  async getAllSessions(userId: number) {
    return this.sessionRepository.findBy({
      userId,
    });
  }

  async getAllUserActiveSessions(userId: number) {
    return this.sessionRepository.findBy({
      userId,
      isActive: true,
    });
  }

  async update(id: number, updateSessionDto: UpdateSessionDto) {
    let session = await this.findOne(id);
    if (!session)
      throw new NotFoundException({
        code: 'NOT_FOUND',
        message: 'message not found',
      });
    const newsession = { ...session, ...updateSessionDto };
    await this.sessionRepository.update(id, newsession);
    return newsession;
  }

  async getCode(id: number) {
    return await this.sessionRepository.findOne({
      where: {
        id,
      },
      select: {
        token: true,
      },
    });
  }
  async findOne(id: number) {
    return await this.sessionRepository.findOneBy({ id });
  }

  async verifyToken(userId: number, verifyTokenDto: VerifyTokenDto) {
    const session = await this.sessionRepository.findOne({
      where: {
        userId,
        isActive: true,
      },
    });

    if (!session?.token)
      throw new ConflictException({
        code: 'NOT_FOUND',
        message: 'Token not Found',
      });
    if (verifyTokenDto.token !== session?.token)
      throw new UnauthorizedException({
        code: 'UNAUTHORIZED',
        message: 'Invalid Token',
      });

    return { code: 'VERIFIED' };
  }

  async resetToken(userId: number) {
    const sessions = await this.getAllUserActiveSessions(userId);

    sessions.forEach(async (session) => {
      await this.update(session.id, { token: null });
    });

    return { message: 'token reset ' };
  }
}
