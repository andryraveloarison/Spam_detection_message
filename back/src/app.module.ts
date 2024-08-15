import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth/auth.module';
import * as dotenv from 'dotenv';
import { MessageModule } from './module/message/message.module';

dotenv.config()

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ 
    AuthModule,
    MessageModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:'localhost',
      port: 5432, 
      username: process.env.DATABASE_USERNAME, 
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE_NAME,
      entities:['dist/**/*.entity{.ts ,.js}'],
      synchronize: true,
    }),
  ],
  
})
export class AppModule {}
