import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config()
  app.enableCors({ 
    origin: 'http://localhost:5173',
    methods: 'GET, HEAD, PUT, POST, PATCH, DELETE',
    credentials: true
  })
  
  await app.listen(3000);
}
bootstrap();
