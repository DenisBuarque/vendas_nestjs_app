import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(data: CreateAuthDto): Promise<UserEntity> {
    const user = await this.userService
      .getUserByEmail(data.email)
      .catch(() => undefined);
    if (!user) throw new NotFoundException('Sorry, your e-mail is invalid.');

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch)
      throw new NotFoundException('Sorry, your password is invalid.');

    return user;
  }
}
