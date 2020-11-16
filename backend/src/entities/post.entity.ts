import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    postId: number; // timestamp

    @Column('varchar')
    text: string;

    @JoinColumn( { name: 'ownerId', referencedColumnName: 'userId' } )
    owner: User;

}

