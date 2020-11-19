import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
    UseGuards
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, EditPostDto } from './posts.dto';
import { AuthGuard } from '@nestjs/passport';
import { time, timeStamp } from 'console';
import { EditCommentDto } from 'src/comments/comments.dto';
// import { ApiTags } from '@nestjs/swagger';

// @ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('/postId/:postId')
    async getPostById(@Param('postId') postId: number) {
        return this.postService.getPostById(postId);
    }

    @Get('/allPosts')
    async getAllPost() {
        return this.postService.getAllPost();
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('/edit/:postId')
    async editById(@Body() editPostDto: EditPostDto, @Param('postId') postId: number) {
        return this.postService.editById(postId, editPostDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/')
    async createPost(@Body() postDto: CreatePostDto) {
        return this.postService.createPost(postDto);
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Delete('/delete/:postId')
    async deletePostById(@Param('postId') postId: number) {
        return this.postService.deletePost(postId);
    }

    @Get('/comments/:postId')
    async getCommentsByPostId(@Param('postId') postId: number) {
        return this.postService.getCommentsByPostId(postId);
    }
}