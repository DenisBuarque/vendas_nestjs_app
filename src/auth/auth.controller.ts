import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ReturnUserDto } from 'src/user/dto/return-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() data: CreateAuthDto): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.authService.login(data));
  }
}
