import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import {AuthModule} from './auth/auth.module'
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
          type: 'mysql',
          host: process.env.MYSQL_URL,
          port: 3306,
          username: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DB,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          charset: 'utf8mb4_general_ci',
      }),
    }),
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
