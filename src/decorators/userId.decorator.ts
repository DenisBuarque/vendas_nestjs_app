import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const UserId = createParamDecorator(
    (_, ctx: ExecutionContext) => {
        const { authorization } = ctx.switchToHttp().getRequest().headers;

        const splitToke = authorization.split('.');
        const user = JSON.parse(Buffer.from(splitToke[1], 'base64').toString('ascii'));
        return user.sub;
    }
  );