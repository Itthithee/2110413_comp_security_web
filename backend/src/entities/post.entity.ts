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
    postId: Date;

    @Column('varchar')
    text: string;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'ownerId', referencedColumnName: 'userId' })
    owner: User;

}

