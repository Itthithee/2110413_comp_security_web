import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    ManyToOne
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';
import { timeStamp } from 'console';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    commentId: number;

    @Column('varchar')
    text: string;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'ownerId', referencedColumnName: 'userId' })
    owner: User;

    @ManyToOne(type => Post)
    @JoinColumn({ name: 'postId', referencedColumnName: 'postId' })
    postId: Post;

}

