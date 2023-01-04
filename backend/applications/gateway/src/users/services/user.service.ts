import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { RequestPatternType } from '../../app/types/request-pattern.type';

import { User } from '../types/user.type';
import {
  USER_SERVICE_NAME,
  UserAction,
  UserRoute,
} from '../constants/user.constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_SERVICE_NAME) private readonly userService: ClientProxy,
  ) {}

  async send(
    {
      module = UserRoute.AUTH,
      cmd,
    }: Partial<RequestPatternType<UserRoute, UserAction>>,
    data,
  ) {
    // @ts-ignore
    const { error, ...response } = await firstValueFrom(
      this.userService.send(
        {
          module,
          cmd,
        },
        data,
      ),
    );

    if (error) {
      throw new BadRequestException(error.message);
    }

    return response;
  }

  async validate(token: string): Promise<User> {
    return this.send(
      { cmd: UserAction.VALIDATE },
      {
        token,
      },
    );
  }
}
