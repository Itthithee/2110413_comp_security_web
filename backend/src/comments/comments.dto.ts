import { User } from 'src/entities/user.entity';
import { Post } from 'src/entities/post.entity';
import { timeStamp } from 'console';


export class CreateCommentDto {
    commentId: timeStamp;
    text: string;
    owner: User;
    postId: Post;
}
