import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthBearerGuard extends AuthGuard('bearer') {
  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }
}
