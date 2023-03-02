import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

import { RegisterDto } from '../dtos/register.dto';
import { PASSWORD_REGEX } from '../constants/auth.constants';

@ValidatorConstraint({ async: true, name: 'isPassword' })
@Injectable()
export class IsPasswordConstraint implements ValidatorConstraintInterface {
  async validate(value: string, args: any) {
    return !PASSWORD_REGEX.test(value);
  }

  defaultMessage(): string {
    return 'The password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number';
  }
}

export const IsPassword =
  (validationOptions?: ValidationOptions) =>
  (object: Partial<RegisterDto>, propertyName: string) =>
    registerDecorator({
      propertyName,
      target: object.constructor,
      options: validationOptions,
      constraints: [],
      validator: IsPasswordConstraint,
    });
