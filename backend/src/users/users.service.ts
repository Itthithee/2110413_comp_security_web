
import {
    Injectable,
    BadRequestException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        this.users = [
            {
                userId: 1,
                username: 'john',
                password: 'changeme',
                isAdmin: true
            },
            {
                userId: 2,
                username: 'chris',
                password: 'secret',
                isAdmin: false
            },
            {
                userId: 3,
                username: 'maria',
                password: 'guess',
                isAdmin: false
            },
        ];
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

    async getUserById(userId: number): Promise<User>{
        const res = await this.userRepository.findOne(userId);
        if (!res) throw new BadRequestException('Invalid User');
        return res;
    }

    async findById(userId: number): Promise<User> {
        const res = this.users.find(user => user.userId === userId);
        if (!res) throw new BadRequestException('Not Found');
        return res;
    }

    async editById(userDto: CreateUserDto) {
        const res = this.users.find(user => user.userId === userDto.userId);
        this.users.push({
            userId: userDto.userId,
            username: userDto.username,
            password: userDto.password,
            isAdmin: userDto.isAdmin
        });
    }

    async getAll(): Promise<User[]> {
        return this.users;
    }
}
