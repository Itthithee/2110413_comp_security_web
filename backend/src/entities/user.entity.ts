import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column('varchar', { length: 50 })
  username: string;

  @Column('varchar', { length: 50 })
  password: string;

  // @OneToMany(
  //     () => Post,
  //     post => post.owner,
  //     { nullable: false },
  // )
  // posts: Post[];
}

 