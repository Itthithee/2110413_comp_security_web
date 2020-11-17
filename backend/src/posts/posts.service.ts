
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

    async getPostById(postId: number): Promise<Post> {
        const res = await this.postRepository.findOne(postId);
        if (!res) throw new BadRequestException('Invalid Post ID');
        return res;
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
        const res = this.postRepository.insert(createPostDto);
        if (!res) throw new BadRequestException('Fail to create Post');
        return res
    }

    async deletePost(postId : number){
        const res = this.postRepository.delete(postId);
        if (!res) throw new BadRequestException('Fail to delete Post');
        return res
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
}
