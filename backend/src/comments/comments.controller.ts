import {
    Controller,
    Get,
    Param,
    Post,
    Body
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './comments.dto';
import { timeStamp } from 'console';
// import { ApiTags } from '@nestjs/swagger';

// @ApiTags('Posts')
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentService: CommentsService) { }

    @Get(':commentId')
    async getPostById(@Param('commentId') commentId: timeStamp) {
        return this.commentService.getCommentById(commentId);
    }

    @Get('id/:commentId')
    async getById(@Param('commentId') commentId: timeStamp) {
        return this.commentService.findById(commentId);
    }

    @Get('/')
    async getAll() {
        return this.commentService.getAll();
    }

    @Post('/')
    async editById(@Body() commentDto: CreateCommentDto) {
        return this.commentService.editById(commentDto);
    }
}