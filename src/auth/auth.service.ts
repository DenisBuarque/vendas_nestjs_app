import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { ReturnSingInDto } from './dto/return-singin.dto';
import { ReturnUserDto } from 'src/user/dto/return-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(data: CreateAuthDto): Promise<ReturnSingInDto> {
    const user = await this.userService
      .getUserByEmail(data.email)
      .catch(() => undefined);
    if (!user) throw new NotFoundException('Sorry, your e-mail is invalid.');

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch)
      throw new NotFoundException('Sorry, your password is invalid.');

    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    };

    return {
      user: new ReturnUserDto(user),
      token: await this.jwtService.signAsync(payload),
    };
  }
}
