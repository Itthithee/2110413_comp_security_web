
import {
    Injectable,
    BadRequestException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { timeStamp } from 'console';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(createUserDto: CreateUserDto){
        this.userRepository.create(createUserDto);
    }

    async getUserById(userId: number): Promise<User>{
        const res = await this.userRepository.findOne(userId);
        if (!res) throw new BadRequestException('Invalid UserId');
        return res;
    }

    async getUserByName(username: string): Promise<User>{
        const res = await this.userRepository.find({where: {username: username}});
        if (!res) throw new BadRequestException('Invalid Username');
        return res[0];
    }
}
