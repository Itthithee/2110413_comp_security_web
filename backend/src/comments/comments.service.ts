
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
    private readonly comments: Comment[];

    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) {
        this.comments = [
            
        ];
    }

    async findOne(commentId: timeStamp): Promise<Comment | undefined> {
        return this.comments.find(comment => comment.commentId === commentId);
    }

    async getCommentById(commentId: timeStamp): Promise<Comment> {
        const res = await this.commentRepository.findOne(commentId);
        if (!res) throw new BadRequestException('Invalid Comment ID');
        return res;
    }

    async findById(commentId: timeStamp): Promise<Comment> {
        const res = this.comments.find(comment => comment.commentId === commentId);
        if (!res) throw new BadRequestException('Not Found');
        return res;
    }

    async editById(commentDto: CreateCommentDto) {
        const res = this.comments.find(comment => comment.commentId === commentDto.commentId);
        this.comments.push({
            commentId: commentDto.commentId,
            text: commentDto.text,
            owner: commentDto.owner,
            postId: commentDto.postId
        });
    }

    async getAll(): Promise<Comment[]> {
        return this.comments;
    }
}
