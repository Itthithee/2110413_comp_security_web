import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UnauthorizedException,
  Res,
  HttpCode,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import {jwtConstants} from './auth/constants'
import {Response} from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @HttpCode(200)
  @Post('auth/login')
  async login(@Body() req, @Res() response: Response) {
    const user: any = await this.authService.validateUser(req.username, req.password)
    console.log(user)
    const token =  this.authService.login(user).access_token;
    const cookie = `Authentication=${token}; HttpOnly; Path=/; Max-Age=\
    ${jwtConstants.expiration}`;
    console.log(cookie)
    response.setHeader('Set-Cookie', cookie);
    if (user === null) throw new UnauthorizedException();
    return response.send(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('test')
  async sayHi() {
    return "hi";
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('auth/logout')
  async logOut(@Res() response: Response) {
    response.setHeader('Set-Cookie', `Authentication=; HttpOnly; Path=/; Max-Age=0`);
    return response.sendStatus(200);
  }
}
