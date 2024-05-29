import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(id: number, name: string, email: string) {
    return this.jwtService.sign(
      {
        sub: id,
        username: name,
        useremail: email,
      },
      {
        issuer: 'login',
        audience: 'users',
        secret: 'OP7u8lbhVcfcBI08rVuHauGI8hvftLKN'
      },
    );
  }

  async verifyToken(token: string) {
    try {
      const data = await this.jwtService.verify(token, {
        audience: 'users',
        issuer: 'login',
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async singIn(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) throw new UnauthorizedException('Você não tem autorização!');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException('Você não tem autorização!');

    const token = await this.createToken(user.id, user.name, user.email);

    return { token, user };
  }
}
