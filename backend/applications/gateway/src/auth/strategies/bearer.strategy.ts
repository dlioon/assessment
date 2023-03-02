import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { Injectable } from '@nestjs/common';

import { UserService } from '../../users/services/user.service';
import { User } from '../../users/types/user.type';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }

  validate(payload: string): Promise<User> {
    return this.userService.validate(payload);
  }
}
