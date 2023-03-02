import { HttpException, HttpStatus } from '@nestjs/common';

export class FirebaseException extends HttpException {
  constructor(error) {
    super(error.errorInfo, error.response.status ?? HttpStatus.BAD_REQUEST);
  }
}
