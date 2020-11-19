
import {
    Injectable,
    BadRequestException,
    UseGuards
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto, EditCommentDto } from './comments.dto';
import { timeStamp } from 'console';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) {}

    @UseGuards(AuthGuard('jwt'))
    async createComment(createCommentDto: CreateCommentDto) {
        const res = await this.commentRepository.insert(createCommentDto);    
        if (!res) throw new BadRequestException('Create Comment Failed');
        return res;
    }

    @UseGuards(AuthGuard('jwt'))
    async getCommentById(commentId: Date): Promise<Comment> {
        const res = await this.commentRepository.findOne(commentId);
        if (!res) throw new BadRequestException('Invalid Comment ID');
        return res;
    }

    @UseGuards(AuthGuard('jwt'))
    async editCommentById(editCommentDto: EditCommentDto, commentId: number) {
        this.commentRepository.update(commentId, editCommentDto);
    }

    @UseGuards(AuthGuard('jwt'))
    async deleteCommentById(commentId: number) {
        this.commentRepository.delete(commentId);
    }
}
