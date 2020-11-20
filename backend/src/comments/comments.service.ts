
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

    async createComment(createCommentDto: CreateCommentDto) {
        const res = await this.commentRepository.insert(createCommentDto);    
        if (!res) throw new BadRequestException('Create Comment Failed');
        return res;
    }

    async getCommentById(commentId: Date): Promise<any> {
        const res = await this.commentRepository.findOne(commentId);
        if (!res) throw new BadRequestException('Invalid Comment ID');
        return {commentId:res.commentId,text:res.text,ownerId:res.ownerId,postId:res.postId};
    }

    async editCommentById(editCommentDto: EditCommentDto, commentId: number) {
        this.commentRepository.update(commentId, editCommentDto);
    }

    async deleteCommentById(commentId: number) {
        this.commentRepository.delete(commentId);
    }

    async checkOwnerRelation(userId : number,commentId: number): Promise<boolean> {
        const res = await this.commentRepository.findOne(commentId);
        if (!res) throw new BadRequestException('Invalid Comment ID');
        return res.ownerId?.userId===userId;
    }
}
