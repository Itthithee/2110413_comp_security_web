import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    BadRequestException,
    UseGuards
} from '@nestjs/common';
import { UsersService } from  './users.service';
import { CreateUserDto } from './users.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto){
        return this.userService.createUser(createUserDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/userId/:userId')
    async getUserById(@Param('userId') userId: number) {
        return this.userService.getUserById(userId);
    }

    // @Get('/name/:username')
    // async getUserByName(@Param('username') username: string){
    //     return this.userService.getUserByName(username);
    // }
}