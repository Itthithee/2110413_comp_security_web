import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './posts.dto';
import { time, timeStamp } from 'console';
// import { ApiTags } from '@nestjs/swagger';

// @ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) { }

    @Get('/postId/:postId')
    async getPostById(@Param('postId') postId: number) {
        return this.postService.getPostById(postId);
    }

    @Get('/allPosts')
    async getAllPost() {
        return this.postService.getAllPost();
    }

    @Post('/:postId')
    async editById(@Body() postDto: CreatePostDto) {
        return this.postService.editById(postDto);
    }
    @Post('/')
    async createPost(@Body() postDto: CreatePostDto) {
        return this.postService.createPost(postDto);
    }

    @Delete('/delete/:userId')
    async deletePostById(@Param('postId') postId: number) {
        return this.postService.deletePost(postId);
    }

    @Get('/comments/:postId')
    async getCommentsByPostId(@Param('postId') postId: number) {
        return this.postService.getCommentsByPostId(postId);
    }
}