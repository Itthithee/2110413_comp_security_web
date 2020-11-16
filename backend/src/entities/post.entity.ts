import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    ManyToOne
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    postId: number; // timestamp

    @Column('varchar')
    text: string;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'ownerId', referencedColumnName: 'userId' })
    owner: User;

}

