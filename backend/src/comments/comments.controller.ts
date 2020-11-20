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
import { CommentsService } from './comments.service';
import { CreateCommentDto, EditCommentDto } from './comments.dto';
import { timeStamp } from 'console';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';


@Controller('comments')
export class CommentsController {
    constructor(private readonly commentService: CommentsService,
        private authService: AuthService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createComment(@Body() createCommentDto: CreateCommentDto) {
        return this.commentService.createComment(createCommentDto);
    }

    @Get('/commentId/:commentId')
    async getPostById(@Param('commentId') commentId: Date) {
        return this.commentService.getCommentById(commentId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/edit/:commentId')
    async editCommentById(@Req() request: Request,@Body() editCommentDto: EditCommentDto, @Param('commentId') commentId: number) {
        let user : any= this.authService.decodeCookie(request?.cookies?.Authentication)
        if(!this.commentService.checkOwnerRelation(user.userId,commentId)) new BadRequestException('Invalid User ID');
        return this.commentService.editCommentById(editCommentDto, commentId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/delete/:commentId')
    async deleteCommentById(@Req() request: Request,@Param('commentId') commentId: number) {
        let user : any= this.authService.decodeCookie(request?.cookies?.Authentication)
        if(!this.commentService.checkOwnerRelation(user.userId,commentId)) new BadRequestException('Invalid User ID');
        return this.commentService.deleteCommentById(commentId);
    }
}