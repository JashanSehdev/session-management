import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Ip,
  Headers,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto.js';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ) {
    const token = await this.usersService.create(createUserDto, ip, userAgent);
    res.cookie('access_token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    console.log('token', token);
    return { message: 'registration Successful' };
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ) {
    const token = await this.usersService.loginUser(loginUserDto, ip, userAgent);
    res.cookie('access_token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return { message: 'Login Successful' };
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response, @Req() req : Request & {user : any}  ){
    await this.usersService.logout(req.user.session)
    res.clearCookie('access_token');
    return 'logout successful'
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
