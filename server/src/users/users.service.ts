import {
  ConflictException,
  Headers,
  Injectable,
  Ip,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto.js';
import bcrypt from 'bcryptjs';
import { SessionService } from '../sessions/sessions.service.js';
import { Session } from '../sessions/entities/session.entity.js';
import { error } from 'console';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
  ) {}
  async create(createUserDto: CreateUserDto, ip: string, userAgent: string) {
    const existingUser = await this.findOneByEmail(createUserDto.email);
    if (existingUser)
      throw new ConflictException({
        code: 'ALREADY_EXIST',
        message: 'user already exist',
      });

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const result = await this.userRepository.save(user);
    // create session
    const session = await this.sessionService.create({
      userId: result.id,
      payload: {
        ip,
        userAgent,
      },
    });

    const payload = { id: result.id, email: result.email , session : session.id };

    const token = this.jwtService.sign(payload);

    return token;
  }

  async loginUser(loginUserDto: LoginUserDto, ip: string, userAgent: string) {
    const existingUser = await this.findOneByEmail(loginUserDto.email);

    if (!existingUser)
      throw new NotFoundException({
        code: 'NOT_FOUND',
        message: 'User not found',
      });

    const isAuthentic = await bcrypt.compare(
      loginUserDto.password,
      existingUser.password,
    );

    if (!isAuthentic)
      throw new UnauthorizedException({
        code: 'UNAUTHORIZE',
        message: 'user is not authorized',
      });

    const sessions = await this.sessionService.getAllUserActiveSessions(existingUser.id)
    this.handleSessions(sessions)
    const session = await this.sessionService.create({
      userId: existingUser.id,
      payload: {
        ip,
        userAgent,
      },
    });


    const token = this.jwtService.sign({
      id: existingUser.id,
      email: existingUser.email,
      session : session.id
    });
    return token;
  }

  async logout(id : number) {
    await this.sessionService.update(id, {isActive : false})
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({
      email,
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  handleSessions (sessions : Session[]) {
    if (sessions.length > 1) {
      const code = generateCode()
      sessions.forEach(async(session) => {
        await this.sessionService.update(session.id, {token : code})
      })
      throw new ConflictException({code : 'SESSION_FULL',message : 'session full, user need token to terminate one session'})
    }
    
  }
}

const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000)
}
