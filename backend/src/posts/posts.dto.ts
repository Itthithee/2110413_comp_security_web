import { User } from 'src/entities/user.entity';
import { timeStamp } from 'console';


export class CreatePostDto {
    postId: Date;
    text: string;
    owner: User;
}
