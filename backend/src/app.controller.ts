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
import { JwtService } from '@nestjs/jwt';
@Controller('/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService) { }

  @HttpCode(200)
  @Post('auth/login')
  async login(@Req() request : Request,@Body() req: CreateUserDto, @Res() response: Response) {
    if(request.cookies?.Authentication){
      let user : any= this.authService.decodeCookie(request?.cookies?.Authentication)
      console.log("ver3",user)
    }
    const user: any = await this.authService.validateUser(req.username, req.password)
    const token = this.authService.login(user).access_token;
    const cookie = `Authentication=${token}; Path=/; Max-Age=\
    ${jwtConstants.expiration}`;
    response.setHeader('Set-Cookie', cookie);
    if (user === null) throw new UnauthorizedException();
    return response.send(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('auth/test')
  async sayHi() {
    return "hi";
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('auth/logout')
  async logOut(@Res() response: Response) {
    response.setHeader('Set-Cookie', `Authentication=; Path=/; Max-Age=0`);
    return response.sendStatus(200);
  }
}
