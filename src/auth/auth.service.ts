import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ){}

  async singIn(data: CreateAuthDto): Promise<UserEntity> {

    const user = await this.userRepository.findOne({where: {email: data.email}});

    if(!user) throw new UnauthorizedException('Você não tem autorização!');

    const isMatch = await bcrypt.compare(data.password, user.password);

    if(!isMatch) throw new UnauthorizedException('Você não tem autorização!');

    const payload = {sub: user.id, username: user.name };

    const token = await this.jwtService.signAsync(payload);

    return user;
  }

}
