import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service'
import { AuthModule } from 'src/auth/auth.module';
@Module({
    imports: [AuthModule,TypeOrmModule.forFeature([Comment])],
    controllers: [CommentsController],
    providers: [CommentsService]
})
export class CommentsModule { }
