import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/login')
  async login(@Body() req) {
    const user: any = await this.authService.validateUser(req.username, req.password)
    console.log(user)
    if (user === null) throw new UnauthorizedException();
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('test')
  async sayHi() {
    return "hi";
  }

}
