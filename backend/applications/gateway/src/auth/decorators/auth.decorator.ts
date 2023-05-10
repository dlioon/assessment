import { applyDecorators, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common/interfaces';

import { AuthBearerGuard } from '../guards/auth.bearer.guard';

export const Auth = (): (<TFunction extends Controller, Y>(
  target: TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void) => applyDecorators(UseGuards(AuthBearerGuard));
