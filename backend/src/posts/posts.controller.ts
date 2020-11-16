import {
    Controller,
    Get,
    Param,
    Post,
    Body
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './posts.dto';
// import { ApiTags } from '@nestjs/swagger';

// @ApiTags('Users')
@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) { }

    @Get(':postId')
    async getPostById(@Param('postId') postId: number) {
        return this.postService.getUserById(postId);
    }

    @Get('id/:postId')
    async getById(@Param('postId') postId: number) {
        return this.postService.findById(postId);
    }

    @Get('name/:username')
    async getByName(@Param('username') username: string) {
        return this.postService.findOne(username);
    }

    @Get('/')
    async getAll() {
        return this.postService.getAll();
    }

    @Post('/')
    async editById(@Body() userDto: CreatePostDto) {
        return this.postService.editById(postDto);
    }
}