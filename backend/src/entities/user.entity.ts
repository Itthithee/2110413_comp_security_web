import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column('varchar', { length: 50, unique: true })
  username: string;

  @Column('varchar', { length: 100 })
  password: string;

  @Column()
  isAdmin: boolean;

  // @OneToMany(
  //     () => Post,
  //     post => post.owner,
  //     { nullable: false },
  // )
  // posts: Post[];
}

 