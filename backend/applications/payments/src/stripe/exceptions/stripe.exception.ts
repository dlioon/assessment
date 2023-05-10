import { HttpException, HttpStatus } from '@nestjs/common';

export class StripeException extends HttpException {
  constructor(error) {
    super(
      {
        code: error.raw.code,
        message: error.raw.message,
      },
      error.response.status ?? HttpStatus.BAD_REQUEST,
    );
  }
}
