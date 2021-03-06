import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service'
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [forwardRef(() => AuthModule),TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
