import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dtos/register.dto';
import { ValidateTokenDto } from '../dtos/validate-token.dto';
import { AUTH_ROUTE, UserAction } from '../constants/auth.constants';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ module: AUTH_ROUTE, cmd: UserAction.REGISTER })
  register(params: RegisterDto): Promise<UserRecord> {
    return this.authService.register(params);
  }

  @MessagePattern({ module: AUTH_ROUTE, cmd: UserAction.VALIDATE })
  validate(params: ValidateTokenDto): Promise<UserRecord> {
    return this.authService.validate(params);
  }
}
