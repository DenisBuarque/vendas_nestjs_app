import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ReturnSingInDto } from './dto/return-singin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async signIn(@Body() data: CreateAuthDto): Promise<ReturnSingInDto> {
    return await this.authService.signIn(data);
  }
}
