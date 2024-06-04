import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from 'src/decorators/Role.decorator';
import { Role } from 'src/enums/role.enum';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const { authorization } = context.switchToHttp().getRequest().headers;

    const payload: UserEntity | undefined = await this.jwtService.verifyAsync(authorization, {
        secret: process.env.JWT_SECRET
    }).catch(() => undefined);

    if(!payload) {
        return false;
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    console.log(payload.role);
    console.log(payload);

    const { user } = context.switchToHttp().getRequest();
    //return requiredRoles.some((role) => user.roles?.includes(role));
    return requiredRoles.some((role) => payload.role?.includes(role));
  }
}