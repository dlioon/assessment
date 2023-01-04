import { HttpException, HttpStatus } from '@nestjs/common';

import { ErrorType } from '../types/error.type';

export class StripeException extends HttpException {
  constructor(params: ErrorType) {
    super(params, HttpStatus.BAD_REQUEST);
  }
}
