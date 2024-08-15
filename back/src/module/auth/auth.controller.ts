import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/RegistrationDto';
import { LoginDto } from './dto/LoginDto';
import { Users } from './entities/users.entity';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('register')
    async register(@Body() registrationDto: RegistrationDto) {
        return this.authService.register(registrationDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('user')
    findAll():Promise<Users[]>{
        return this.authService.findAll();
    }


}
