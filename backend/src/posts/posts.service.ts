
import {
    Injectable,
    BadRequestException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from 'src/entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './posts.dto';
import { timeStamp } from 'console';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ) {}

    async getPostById(postId: Date): Promise<Post> {
        const res = await this.postRepository.findOne(postId);
        if (!res) throw new BadRequestException('Invalid Post ID');
        return res;
    }

    async editById(postDto: CreatePostDto) {
        this.postRepository.update(postDto.postId, postDto);
    }
}
