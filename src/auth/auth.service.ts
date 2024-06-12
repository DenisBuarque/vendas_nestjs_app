import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { UserId } from 'src/decorators/userId.decorator';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}

  async createToken(user: UserEntity) {
    return this.jwtService.sign(
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
        audience: 'users',
        issuer: 'login',
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(data: CreateAuthDto) {
    const user = await this.userRepository.findOne({where: { email: data.email}});

    if (!user) throw new UnauthorizedException('Você não tem autorização!');

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) throw new UnauthorizedException('Você não tem autorização!');

    const token = await this.createToken(user);

    return { token, user };
  }
}
