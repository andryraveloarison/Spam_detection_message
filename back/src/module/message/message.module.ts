import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../auth/entities/users.entity';
import { Message } from './entities/message.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule, 
    TypeOrmModule.forFeature([Message]),
    TypeOrmModule.forFeature([Users]),
 ], 
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}
