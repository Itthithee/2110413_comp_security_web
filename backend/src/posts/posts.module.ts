import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service'
import { AuthModule } from 'src/auth/auth.module';
@Module({
    imports: [AuthModule,TypeOrmModule.forFeature([Post, Comment, User])],
    controllers: [PostsController],
    providers: [PostsService],
    exports: [PostsService]
})
export class PostsModule { }
