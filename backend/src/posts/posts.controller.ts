import {
    Controller,
    Get,
    Param,
    Post,
    Body
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './posts.dto';
import { time, timeStamp } from 'console';
// import { ApiTags } from '@nestjs/swagger';

// @ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) { }

    @Get(':postId')
    async getPostById(@Param('postId') postId: Date) {
        return this.postService.getPostById(postId);
    }

    @Post('/')
    async editById(@Body() postDto: CreatePostDto) {
        return this.postService.editById(postDto);
    }
}