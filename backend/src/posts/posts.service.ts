
import {
    Injectable,
    BadRequestException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from 'src/entities/post.entity';
import { Comment } from 'src/entities/comment.entity';
import { Repository, getRepository } from 'typeorm';
import { CreatePostDto, EditPostDto } from './posts.dto';
import { timeStamp } from 'console';
import { User } from 'src/entities/user.entity';
import { text } from 'express';
import { EditCommentDto } from 'src/comments/comments.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,

        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async getPostById(postId: number): Promise<any> {
        const res = await this.postRepository.findOne(postId);
        if (!res) throw new BadRequestException('Invalid Post ID');
        return {postId:res.postId,text:res.text,ownerId:res.ownerId?.userId}
    }

    async getAllPost(): Promise<Post[]> {
        const res = await getRepository(Post).createQueryBuilder('post')
        .select(["post.postId", "post.text", "user.username"])
        .leftJoin("post.ownerId", "user")
        .getMany();
        if (!res) throw new BadRequestException('No Post Available');
        return res;
    }

    async editById(postId: number, editPostDto: EditPostDto) {
        this.postRepository.update(postId, editPostDto);
    }

    async createPost(createPostDto: CreatePostDto){
        console.log(createPostDto)
        const res = this.postRepository.insert(createPostDto);
        if (!res) throw new BadRequestException('Fail to create Post');
        return res
    }

    async deletePost(postId : number){
        try{
            const res1 = await getRepository(Comment)
                .createQueryBuilder()
                .softDelete()
                .from(Comment)
                .where("comment.postId = :postId", { postId: postId})
                .execute();
            const res2 = this.postRepository.delete(postId);
        }catch(e){
            getRepository(Comment)
            .createQueryBuilder()
            .restore()
            throw new BadRequestException('Fail to delete Post');
        }
    }

    async getCommentsByPostId(postId: number) {
        const res = getRepository(Comment).createQueryBuilder('comment')
        .select(["comment.commentId", "comment.text", "user.username"])
        .where("comment.postId = :postId", {postId: postId})
        .leftJoin("comment.ownerId", "user")
        .getMany();
        if (!res) throw new BadRequestException('Cannot find any comment');
        return res
    }

    async checkOwnerRelation(userId : number,postId: number) {
        const res = await this.postRepository.findOne(postId);
        if (!res) throw new BadRequestException('Invalid Post ID');
        return res.ownerId?.userId===userId;
    }

}
