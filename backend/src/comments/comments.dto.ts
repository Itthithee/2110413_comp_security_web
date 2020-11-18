import { User } from 'src/entities/user.entity';
import { Post } from 'src/entities/post.entity';
import { timeStamp } from 'console';


export class CreateCommentDto {
    commentId: number;
    text: string;
    owner: User;
    postId: Post;
}

export class EditCommentDto {
    commentId: number;
    text: string;
}