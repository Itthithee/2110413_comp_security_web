import { User } from 'src/entities/user.entity';
import { timeStamp } from 'console';


export class CreatePostDto {
    postId: number;
    text: string;
    owner: User;
}
