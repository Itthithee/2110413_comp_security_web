
import {
    Injectable,
    BadRequestException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { timeStamp } from 'console';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './users.dto';
import bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(createUserDto: CreateUserDto){
        if(createUserDto.password.length < 8 ) return new BadRequestException('password need at least 8 characters');
        const hashedPass = await bcrypt.hash(createUserDto.password, 10);
        createUserDto.password = hashedPass;
        const res = this.userRepository.insert(createUserDto);
        if (!res) throw new BadRequestException('Fail to create user');
        return res
    }

    async getUserById(userId: number): Promise<User>{
        const res = await this.userRepository.findOne(userId);
        if (!res) throw new BadRequestException('Invalid User ID');
        return res;
    }

    async getUserByName(username: string): Promise<User>{
        const res = await this.userRepository.find({where: {username: username}});
        if (!res) throw new BadRequestException('Invalid Username');
        return res[0];
    }
}
