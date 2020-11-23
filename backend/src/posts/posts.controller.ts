import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
    UseGuards,
    Req,
    BadRequestException
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, EditPostDto } from './posts.dto';
import { AuthGuard } from '@nestjs/passport';
import { time, timeStamp } from 'console';
import { EditCommentDto } from 'src/comments/comments.dto';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service'
import { User } from 'src/entities/user.entity';
// import { ApiTags } from '@nestjs/swagger';

// @ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService,
        private authService: AuthService) { }

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
    async editById(@Req() request: Request, @Body() editPostDto: EditPostDto, @Param('postId') postId: number) {
        let user: any = this.authService.decodeCookie(request ?.cookies ?.Authentication)
        if (!this.postService.checkOwnerRelation(user.userId, postId)) new BadRequestException('Invalid User ID');
        return this.postService.editById(postId, editPostDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/')
    async createPost(@Req() request: Request, @Body() postDto: CreatePostDto) {
        let user: any = this.authService.decodeCookie(request ?.cookies ?.Authentication)
        if (!user && !user.userId) new BadRequestException('Invalid User ID');
        let { userId }: User = user
        let payload: any = { text: postDto.text, ownerId:userId}
        return this.postService.createPost(payload);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/delete/:postId')
    async deletePostById(@Req() request: Request, @Param('postId') postId: number) {
        let user: any = this.authService.decodeCookie(request ?.cookies ?.Authentication)
        if (!this.postService.checkOwnerRelation(user.userId, postId)) new BadRequestException('Invalid User ID');
        return this.postService.deletePost(postId);
    }

    @Get('/comments/:postId')
    async getCommentsByPostId(@Param('postId') postId: number) {
        return this.postService.getCommentsByPostId(postId);
    }

}