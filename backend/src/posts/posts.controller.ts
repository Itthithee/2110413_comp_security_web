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

// @ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) { }

    @Get(':postId')
    async getPostById(@Param('postId') postId: number) {
        return this.postService.getPostById(postId);
    }

    @Get('id/:postId')
    async getById(@Param('postId') postId: number) {
        return this.postService.findById(postId);
    }

    @Get('/')
    async getAll() {
        return this.postService.getAll();
    }

    @Post('/')
    async editById(@Body() postDto: CreatePostDto) {
        return this.postService.editById(postDto);
    }
}