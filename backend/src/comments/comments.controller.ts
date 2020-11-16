import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto, EditCommentDto } from './comments.dto';
import { timeStamp } from 'console';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentService: CommentsService) { }

    @Post()
    async createComment(@Body() createCommentDto: CreateCommentDto) {
        return this.commentService.createComment(createCommentDto);
    }

    @Get('/commentId/:commentId')
    async getPostById(@Param('commentId') commentId: Date) {
        return this.commentService.getCommentById(commentId);
    }

    @Post('/edit/:commentId')
    async editCommentById(@Body() editCommentDto: EditCommentDto, @Param('commentId') commentId: number) {
        return this.commentService.editCommentById(editCommentDto, commentId);
    }

    @Delete('/delete/:commentId')
    async deleteCommentById(@Param('commentId') commentId: number) {
        return this.commentService.deleteCommentById(commentId);
    }
}