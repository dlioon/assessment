import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { User } from '../../users/types/user.type';

export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req.user;
  },
);
