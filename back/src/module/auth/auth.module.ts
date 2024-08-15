import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persons } from './entities/persons.entity';
import { Users } from './entities/users.entity';
import { Role } from './entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Persons]),
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([Role])
  ], 
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
