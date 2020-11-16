import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: Date;

  @Column('varchar', { length: 50, unique: true, nullable: false })
  username: string;

  @Column('varchar', { length: 100, nullable: false })

  password: string;

    @Column({ nullable: false })
  isAdmin: boolean;
}

 