import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { ReturnSingInDto } from './dto/return-singin.dto';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { ReturnUserDto } from 'src/user/dto/return-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createToken(user: UserEntity) {

    return this.jwtService.signAsync(
      {
        sub: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      {
        issuer: 'login',
        audience: 'users',
        secret: process.env.JWT_SECRET,
      },
    );
  }

  verifyToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: 'login',
        audience: 'users',
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async signIn(data: CreateAuthDto): Promise<ReturnSingInDto> {
    const user = await this.userService.getUserByEmail(data.email);
    if (!user) throw new UnauthorizedException('Sorry, your e-mail is invalid.');

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Sorry, your password is invalid.');

    const token = await this.createToken(user);

    return { user, token };
  }
}
