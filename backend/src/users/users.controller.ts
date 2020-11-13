import {
    Controller,
    Get,
    Param
} from '@nestjs/common';
import { UsersService } from  './users.service';
// import { ApiTags } from '@nestjs/swagger';

// @ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get(':userId')
    async getUserById(@Param('userId') userId: number) {
        return this.userService.getUserById(userId);
    }
}