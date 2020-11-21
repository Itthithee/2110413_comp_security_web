import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    ManyToOne,
    DeleteDateColumn
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

    @ManyToOne(type => User, { eager: true })
    @JoinColumn({ name: 'ownerId', referencedColumnName: 'userId' })
    ownerId: User;

    @ManyToOne(type => Post, { eager: true, onDelete: "CASCADE" })
    @JoinColumn({ name: 'postId', referencedColumnName: 'postId' })
    postId: Post;

    @DeleteDateColumn()
    deletedAt?: Date;
}

