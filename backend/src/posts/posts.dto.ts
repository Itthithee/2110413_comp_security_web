import { User } from 'src/entities/user.entity';


export class CreatePostDto {
    postId: number;
    text: string;
    owner: User;
}
