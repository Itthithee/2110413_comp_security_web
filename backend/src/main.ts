import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import bodyParser = require('body-parser');
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

require('dotenv').config();
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json())
  app.use(helmet())
  // app.enableCors({
  //   origin : function(origin,callback){
  //     // console.log('origin :',origin)
  //     callback(null,true)
  //   },
  //   methods: 'GET,POST,DELETE',
  //   allowedHeaders: 'Content-Type, Accept',
  //   credentials: true,
  //   preflightContinue : false
  // });
  app.use(rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  )
  app.use(cookieParser());
  await app.listen(4000);

}
bootstrap();
