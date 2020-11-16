import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "http://localhost:3000",
    methods: 'GET,POST,DELETE',
    
  });
  await app.listen(4000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
