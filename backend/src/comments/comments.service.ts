
import {
    Injectable,
    BadRequestException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './comments.dto';
import { timeStamp } from 'console';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) {}

    async createComment(createCommentDto: CreateCommentDto) {
        const res = await this.commentRepository.insert(createCommentDto);    
        if (!res) throw new BadRequestException('Create Comment Failed');
        return res;
    }

    async getCommentById(commentId: Date): Promise<Comment> {
        const res = await this.commentRepository.findOne(commentId);
        if (!res) throw new BadRequestException('Invalid Comment ID');
        return res;
    }

    async editCommentById(commentDto: CreateCommentDto, commentId: number) {
        this.commentRepository.update(commentId, commentDto);
    }

    async deleteCommentById(commentId: number) {
        this.commentRepository.delete(commentId);
    }
}
