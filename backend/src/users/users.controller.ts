import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    BadRequestException
} from '@nestjs/common';
import { UsersService } from  './users.service';
import { CreateUserDto } from './users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto){
        return this.userService.createUser(createUserDto);
    }
    @Get('/userId/:userId')
    async getUserById(@Param('userId') userId: number) {
        return this.userService.getUserById(userId);
    }

    // @Get('/name/:username')
    // async getUserByName(@Param('username') username: string){
    //     return this.userService.getUserByName(username);
    // }
}