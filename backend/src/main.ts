import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import {Logger} from '@nestjs/common'
import bodyParser = require('body-parser');
require('dotenv').config();
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json())
  // app.use(helmet())
  app.enableCors({
    origin : function(origin,callback){
      console.log('origin :',origin)
      callback(null,true)
    },
    methods: 'GET,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(4000);
  // if (module.hot) {
  //   module.hot.accept();
  //   module.hot.dispose(() => app.close());
  // }
}
bootstrap();
