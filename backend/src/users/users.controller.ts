import {
    Controller,
    Get,
    Param,
    Post,
    Body
} from '@nestjs/common';
import { UsersService } from  './users.service';
import { CreateUserDto } from './users.dto';
// import { ApiTags } from '@nestjs/swagger';

// @ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get(':userId')
    async getUserById(@Param('userId') userId: number) {
        return this.userService.getUserById(userId);
    }

    @Get('id/:userId')
    async getById(@Param('userId') userId: number) {
        return this.userService.findById(userId);
    }

    @Get('name/:username')
    async getByName(@Param('username') username: string) {
        return this.userService.findOne(username);
    }

    @Get('/')
    async getAll() {
        return this.userService.getAll();
    }

    @Post('/')
    async editById(@Body() userDto: CreateUserDto) {
        return this.userService.editById(userDto);
    }
}