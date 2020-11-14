
import {
    Injectable,
    BadRequestException
} from '@nestjs/common';
import { CreateUserDto } from './users.dto';
export type User = any;

@Injectable()
export class UsersService {
        private readonly users: User[];

    constructor() {
        this.users = [
            {
                userId: 1,
                username: 'john',
                password: 'changeme',
            },
            {
                userId: 2,
                username: 'chris',
                password: 'secret',
            },
            {
                userId: 3,
                username: 'maria',
                password: 'guess',
            },
        ];
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

    async getUserById(userId: number): Promise<User>{
        // const ret = await this.userRepository.findOne(userId);
        // if (!ret) throw new BadRequestException('Invalid User');
        // return ret;
    }

    async findById(userId: number): Promise<User> {
        const res = this.users.find(user => user.userId.toString() === userId);
        if (!res) throw new BadRequestException('cannot find');
        return res;
    }

    async editById(userDto: CreateUserDto): Promise<User> {
        const res = this.users.find(user => user.userId === userDto.userId);
        if (res) this.users.reduce(res);
        this.users.push({
            userId: userDto.userId,
            username: userDto.username,
            password: userDto.password
        });
    }

    async getAll(): Promise<User[]> {
        return this.users;
    }
}
