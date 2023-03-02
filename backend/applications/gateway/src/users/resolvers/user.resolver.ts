import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { Auth } from '../../auth/decorators/auth.decorator';
import { AuthUser } from '../../auth/decorators/auth-user.decorator';

import { User } from '../entities/user.graphql.entity';
import { UserService } from '../services/user.service';
import { UserAction } from '../constants/user.constants';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Query(() => User)
  getMe(@AuthUser() user: User): User {
    return user;
  }

  @Mutation(() => User)
  register(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<User> {
    return this.userService.send(
      { cmd: UserAction.REGISTER },
      {
        email,
        password,
      },
    );
  }
}
