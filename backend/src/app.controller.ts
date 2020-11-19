import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UnauthorizedException,
  Res,
  Req,
  HttpCode,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { jwtConstants } from './auth/constants'
import { Response,Request } from 'express';
import {Logger} from '@nestjs/common'
import { CreateUserDto } from './users/users.dto';
@Controller('/auth')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @HttpCode(200)
  @Post('/login')
  async login(@Body() req: CreateUserDto, @Res() response: Response) {
    Logger.log("ver2",req.toString())
    if(req === null ) throw new UnauthorizedException();
    const user: any = await this.authService.validateUser(req.username, req.password)
    const token = this.authService.login(user).access_token;
    const cookie = `Authentication=${token}; Path=/; Max-Age=\
    ${jwtConstants.expiration}`;
    response.setHeader('Set-Cookie', cookie);
    if (user === null) throw new UnauthorizedException();
    return response.send(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/test')
  async sayHi() {
    return "hi";
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  async logOut(@Res() response: Response) {
    response.setHeader('Set-Cookie', `Authentication=; Path=/; Max-Age=0`);
    return response.sendStatus(200);
  }
}
