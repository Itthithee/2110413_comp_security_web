import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    ManyToOne
} from 'typeorm';
import { User } from './user.entity';
import { timeStamp } from 'console';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    postId: number;

    @Column('varchar')
    text: string;

    @ManyToOne(type => User, { eager: true })
    @JoinColumn({ name: 'ownerId', referencedColumnName: 'userId'})
    ownerId: User;

}

