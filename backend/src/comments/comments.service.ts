
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

    async getCommentById(commentId: Date): Promise<Comment> {
        const res = await this.commentRepository.findOne(commentId);
        if (!res) throw new BadRequestException('Invalid Comment ID');
        return res;
    }

    async editById(commentDto: CreateCommentDto) {
        this.commentRepository.update(commentDto.commentId, commentDto);
    }
}
