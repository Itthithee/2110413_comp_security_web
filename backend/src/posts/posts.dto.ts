import { User } from 'src/entities/user.entity';
import { timeStamp } from 'console';


export class CreatePostDto {
    postId: timeStamp;
    text: string;
    owner: User;
}
