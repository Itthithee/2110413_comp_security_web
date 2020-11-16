
import {
    Injectable,
    BadRequestException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from 'src/entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './posts.dto';

@Injectable()
export class PostsService {
    private readonly posts: Post[];

    constructor(
        @InjectRepository(Post)
        private readonly userRepository: Repository<Post>,
    ) {
        this.posts = [
            {
                postId: 1,
                text: 'Hello world!',
                owner: {
                    userId: 1,
                    username: 'john',
                    password: 'changeme',
                    isAdmin: true
                }
            },
            {
                postId: 2,
                text: 'I am Chris!',
                owner: {
                    userId: 2,
                    username: 'chris',
                    password: 'secret',
                    isAdmin: false
                }
            }
        ];
    }

    async findOne(postId: number): Promise<Post | undefined> {
        return this.posts.find(post => post.postId === postId);
    }

    async getPostById(postId: number): Promise<Post> {
        const res = await this.userRepository.findOne(postId);
        if (!res) throw new BadRequestException('Invalid Post ID');
        return res;
    }

    async findById(postId: number): Promise<Post> {
        const res = this.posts.find(post => post.postId === postId);
        if (!res) throw new BadRequestException('Not Found');
        return res;
    }

    async editById(postDto: CreatePostDto) {
        const res = this.posts.find(post => post.postId === postDto.postId);
        this.posts.push({
            postId: postDto.postId,
            text: postDto.text,
            owner: postDto.owner
        });
    }

    async getAll(): Promise<Post[]> {
        return this.posts;
    }
}
