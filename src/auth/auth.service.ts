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
import { AuthEntity } from './entities/auth.entity';
import { UserService } from 'src/user/user.service';

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
        username: user.name,
        useremail: user.email,
        userrole: user.role,
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

  async login(data: CreateAuthDto) {
    console.log('data login', data);
    return ;

    /*const user = await this.userRepository.findOne({where: { email: data.email}});

    if (!user) throw new UnauthorizedException('Você não tem autorização!');

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) throw new UnauthorizedException('Você não tem autorização!');

    const token = await this.createToken(user);

    return { token, user };*/
  }
}
