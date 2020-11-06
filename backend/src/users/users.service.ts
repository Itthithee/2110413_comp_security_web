
import {
    Injectable,
    BadRequestException
} from '@nestjs/common';
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
}
