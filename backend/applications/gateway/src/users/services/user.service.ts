import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CommandService } from '@app/command';

import { User } from '../types/user.type';
import {
  USER_SERVICE_NAME,
  UserAction,
  UserRoute,
} from '../constants/user.constants';

@Injectable()
export class UserService extends CommandService<UserRoute, UserAction> {
  constructor(
    @Inject(USER_SERVICE_NAME) private readonly userService: ClientProxy,
  ) {
    super(userService);
  }

  async validate(token: string): Promise<User> {
    return this.send(
      { module: UserRoute.AUTH, cmd: UserAction.VALIDATE },
      {
        token,
      },
    );
  }
}
