import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService
    ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByName(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  login(user: any) {
    const payload = { username: user.username, userId: user.userId, isAdmin: user.isAdmin };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  decodeCookie(cookie: string) {
    if (!cookie) throw new BadRequestException()
    return this.jwtService.decode(cookie)
  }
}

